import { useEffect, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { COMPANY, MASTERS, ORDER_ENDPOINT, SERVICES } from '../../data/catalog'
import type { Master, Service } from '../../data/catalog'
import { SLOT_TIMES, fmtDayLong, freeSlots } from '../../lib/helpers'
import { Icon } from '../../ui/Icon'
import { Modal } from '../../ui/Modal'
import { Calendar } from './Calendar'

type Errors = Partial<Record<'name' | 'phone' | 'service' | 'when' | 'agree', string>>

interface Done {
  num: string
  service: Service
  master: Master | null
  date: string
  slot: string
}

interface Props {
  initialServiceId: string
  initialMasterId: string
  onClose: () => void
}

function onlyDigits(v: string): string {
  return v.replace(/\D/g, '')
}

/** Приводит ввод к виду +7 (900) 123-45-67. */
function formatPhone(value: string): string {
  let d = onlyDigits(value)
  if (d.startsWith('8')) d = '7' + d.slice(1)
  if (d !== '' && !d.startsWith('7')) d = '7' + d
  d = d.slice(0, 11)
  const p1 = d.slice(1, 4)
  const p2 = d.slice(4, 7)
  const p3 = d.slice(7, 9)
  const p4 = d.slice(9)
  let out = '+7'
  if (p1) out += ' (' + p1
  if (p1.length === 3) out += ')'
  if (p2) out += ' ' + p2
  if (p3) out += '-' + p3
  if (p4) out += '-' + p4
  return out
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div className={'field' + (error ? ' has-err' : '')}>
      <label className="mono">{label}</label>
      {children}
      {error && <div className="err">{error}</div>}
    </div>
  )
}

export function OrderModal({ initialServiceId, initialMasterId, onClose }: Props) {
  const [serviceId, setServiceId] = useState(initialServiceId)
  const [masterId, setMasterId] = useState(initialMasterId || 'any')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState<string | null>(null)
  const [slot, setSlot] = useState('')
  const [comment, setComment] = useState('')
  const [agree, setAgree] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [done, setDone] = useState<Done | null>(null)

  const service = SERVICES.find(s => s.id === serviceId) ?? null
  const master = masterId === 'any' ? null : MASTERS.find(m => m.id === masterId) ?? null
  const capable = service ? MASTERS.filter(m => m.serviceIds.includes(service.id)) : MASTERS
  const free = date ? freeSlots(masterId, date) : []

  // Если мастер не выполняет выбранную услугу — сбрасываем на «любой».
  useEffect(() => {
    if (service && master && !master.serviceIds.includes(service.id)) setMasterId('any')
  }, [service, master])

  // Выбранное время могло заняться при смене мастера.
  useEffect(() => {
    if (date && slot && !freeSlots(masterId, date).includes(slot)) setSlot('')
  }, [masterId, date, slot])

  function submit(e: FormEvent) {
    e.preventDefault()
    const errs: Errors = {}
    if (name.trim().length < 2) errs.name = 'Укажите имя'
    if (onlyDigits(phone).length !== 11) errs.phone = 'Введите номер полностью'
    if (!service) errs.service = 'Выберите услугу'
    if (!date || !slot) errs.when = 'Выберите дату и время'
    if (!agree) errs.agree = 'Отметьте согласие'
    setErrors(errs)
    if (Object.keys(errs).length > 0 || !service || !date) return

    const num = 'З-' + Math.floor(1000 + Math.random() * 9000)
    const payload = {
      number: num,
      name: name.trim(),
      phone,
      serviceId: service.id,
      service: service.title,
      masterId: masterId === 'any' ? null : masterId,
      master: master ? master.name : 'любой свободный',
      date,
      slot,
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    }
    if (ORDER_ENDPOINT) {
      void fetch(ORDER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => undefined)
    }
    setDone({ num, service, master, date, slot })
  }

  return (
    <Modal wide onClose={onClose} title="Заявка на мастера" kicker="ORDER FORM">
      {done ? (
        <div className="done">
          <div className="done-ico">
            <Icon name="check" size={28} />
          </div>
          <h3>Заявка принята</h3>
          <div className="done-num mono">{done.num}</div>
          <div className="done-rows">
            <div className="done-row">
              <span>Услуга</span>
              <b>{done.service.title}</b>
            </div>
            <div className="done-row">
              <span>Мастер</span>
              <b>{done.master ? done.master.name : 'любой свободный'}</b>
            </div>
            <div className="done-row">
              <span>Дата и время</span>
              <b>
                {fmtDayLong(done.date)}, {done.slot}
              </b>
            </div>
            <div className="done-row">
              <span>Телефон</span>
              <b>{phone}</b>
            </div>
          </div>
          <p className="done-note">
            Диспетчер перезвонит в течение {COMPANY.responseMin} минут, чтобы подтвердить выезд. Оплата — после
            работы.
          </p>
          <button className="btn btn--primary" onClick={onClose}>
            Отлично
          </button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate>
          <div className="order-grid">
            <div className="of-fields">
              <div className="of-row2">
                <Field label="Имя" error={errors.name}>
                  <input
                    className="input"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Как к вам обращаться"
                  />
                </Field>
                <Field label="Телефон" error={errors.phone}>
                  <input
                    className="input"
                    type="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={e => setPhone(formatPhone(e.target.value))}
                    placeholder="+7 (900) 000-00-00"
                  />
                </Field>
              </div>
              <Field label="Услуга" error={errors.service}>
                <select className="input" value={serviceId} onChange={e => setServiceId(e.target.value)}>
                  <option value="">Выберите услугу…</option>
                  {SERVICES.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.title} — от {s.minPrice} ₽
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Мастер">
                <select className="input" value={masterId} onChange={e => setMasterId(e.target.value)}>
                  <option value="any">Любой свободный мастер</option>
                  {capable.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} · {m.role} · ★ {m.rating.toFixed(2)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Комментарий — необязательно">
                <textarea
                  className="input"
                  rows={2}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Например: домофон 12К, этаж 5, лифт работает"
                />
              </Field>
              <label className="agree">
                <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} />
                <span>Согласен на обработку персональных данных</span>
              </label>
              {errors.agree && <div className="err">{errors.agree}</div>}
            </div>

            <div className="of-cal">
              <div className="of-cal-label mono">Календарь · свободные окна</div>
              <Calendar
                masterId={masterId}
                value={date}
                onChange={iso => {
                  setDate(iso)
                  setSlot('')
                  setErrors(er => ({ ...er, when: undefined }))
                }}
              />
              {date ? (
                <>
                  <div className="of-free mono">
                    Свободно окон: <b>{free.length}</b> · {fmtDayLong(date)}
                  </div>
                  <div className="slot-grid">
                    {SLOT_TIMES.map(t => {
                      const busy = !free.includes(t)
                      return (
                        <button
                          key={t}
                          type="button"
                          disabled={busy}
                          className={'slot mono' + (t === slot ? ' is-sel' : '')}
                          onClick={() => setSlot(t)}
                        >
                          {t}
                        </button>
                      )
                    })}
                  </div>
                </>
              ) : (
                <div className="of-hint">Выберите дату — покажем только свободные окна</div>
              )}
              {errors.when && <div className="err">{errors.when}</div>}
            </div>
          </div>

          <div className="of-foot">
            <button type="submit" className="btn btn--primary btn--lg">
              Отправить заявку
            </button>
            <div className="of-note mono">
              ответ диспетчера ~{COMPANY.responseMin} мин · без предоплаты
            </div>
          </div>
        </form>
      )}
    </Modal>
  )
}
