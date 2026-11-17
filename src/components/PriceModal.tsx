import { MASTERS } from '../data/catalog'
import type { Service } from '../data/catalog'
import { freeSlots, initials, todayISO } from '../lib/helpers'
import { Icon } from '../ui/Icon'
import { Modal } from '../ui/Modal'

interface Props {
  service: Service
  onClose: () => void
  /** Перейти к списку мастеров, отфильтрованному по этой услуге */
  onMasters: (serviceId: string) => void
  /** Открыть форму заказа сразу */
  onOrder: (serviceId: string) => void
}

export function PriceModal({ service, onClose, onMasters, onOrder }: Props) {
  const doing = MASTERS.filter(m => m.serviceIds.includes(service.id))
  const today = todayISO()

  return (
    <Modal wide onClose={onClose} title={service.title} kicker={`${service.code} · Прайс`}>
      <div className="price-grid">
        <div className="price-col">
          <div className="price-lead">
            {service.short}. Обычное время работ: {service.duration}.
          </div>
          <div className="price-list">
            {service.prices.map(p => (
              <div className="price-row" key={p.label}>
                <span className="price-name">{p.label}</span>
                <span className="price-dots" />
                <span className="price-val mono">{p.price}</span>
              </div>
            ))}
          </div>
          <div className="price-note mono">Финальную стоимость мастер фиксирует после осмотра</div>
        </div>

        <div className="price-col price-col--masters">
          <div className="price-sub">Мастера по услуге</div>
          <div className="price-masters">
            {doing.map(m => {
              const freeToday = freeSlots(m.id, today).length > 0
              return (
                <button key={m.id} type="button" className="pm-row" onClick={() => onOrder(m.id)}>
                  <span className={'mst-ava mst-ava--sm g' + (MASTERS.indexOf(m) % 6)}>{initials(m.name)}</span>
                  <span className="pm-id">
                    <span className="pm-name">{m.name}</span>
                    <span className="pm-role mono">
                      {m.role} · ★ {m.rating.toFixed(2)}
                    </span>
                  </span>
                  <span className={'pm-status mono' + (freeToday ? ' is-free' : '')}>
                    <i className={'dot' + (freeToday ? ' ok' : '')} />
                    {freeToday ? 'свободен сегодня' : 'окна завтра'}
                  </span>
                  <Icon name="arrow" size={14} className="pm-arrow" />
                </button>
              )
            })}
          </div>
          <div className="price-tip">Нажмите на мастера, чтобы сразу оформить заявку на него</div>
        </div>
      </div>

      <div className="modal-foot">
        <button className="btn btn--primary" onClick={() => onMasters(service.id)}>
          Выбрать мастера
        </button>
        <button className="btn btn--ghost" onClick={() => onOrder(service.id)}>
          Заказать сразу — от {service.minPrice} ₽
        </button>
      </div>
    </Modal>
  )
}
