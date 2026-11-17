import { useMemo, useState } from 'react'
import { freeSlots, parseISO, toISO, todayISO } from '../../lib/helpers'
import { Icon } from '../../ui/Icon'

const DOW = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
]
const MAX_OFFSET = 5

interface Props {
  masterId: string
  value: string | null
  onChange: (iso: string) => void
}

export function Calendar({ masterId, value, onChange }: Props) {
  const [offset, setOffset] = useState(0)
  const today = todayISO()

  const { y, m } = useMemo(() => {
    const d = new Date()
    return { y: d.getFullYear(), m: d.getMonth() }
  }, [])

  const viewY = y + Math.floor((m + offset) / 12)
  const viewM = (m + offset) % 12

  const cells = useMemo(() => {
    const lead = (new Date(viewY, viewM, 1).getDay() + 6) % 7
    const days = new Date(viewY, viewM + 1, 0).getDate()
    const out: (number | null)[] = Array(lead).fill(null)
    for (let d = 1; d <= days; d++) out.push(d)
    while (out.length % 7 !== 0) out.push(null)
    return out
  }, [viewY, viewM])

  const todayNoon = parseISO(today)

  return (
    <div className="cal">
      <div className="cal-head">
        <div className="cal-title mono">
          {MONTHS[viewM]} {viewY}
        </div>
        <div className="cal-nav">
          <button
            type="button"
            className="icon-btn"
            disabled={offset === 0}
            onClick={() => setOffset(o => o - 1)}
            aria-label="Предыдущий месяц"
          >
            <Icon name="chevL" size={14} />
          </button>
          <button
            type="button"
            className="icon-btn"
            disabled={offset >= MAX_OFFSET}
            onClick={() => setOffset(o => o + 1)}
            aria-label="Следующий месяц"
          >
            <Icon name="chevR" size={14} />
          </button>
        </div>
      </div>
      <div className="cal-grid">
        {DOW.map(d => (
          <div key={d} className="cal-dow mono">
            {d}
          </div>
        ))}
        {cells.map((d, i) => {
          if (d === null) return <div key={'e' + i} />
          const iso = toISO(new Date(viewY, viewM, d))
          const past = parseISO(iso) < todayNoon
          const n = freeSlots(masterId, iso).length
          const off = past || n === 0
          const cls = ['cal-day mono']
          if (off) cls.push('is-off')
          if (iso === today) cls.push('is-today')
          if (iso === value) cls.push('is-sel')
          else if (!off) cls.push('is-free')
          return (
            <button
              key={iso}
              type="button"
              disabled={off}
              className={cls.join(' ')}
              onClick={() => onChange(iso)}
              title={off ? 'Нет свободных окон' : 'Свободных окон: ' + n}
            >
              <span>{d}</span>
            </button>
          )
        })}
      </div>
      <div className="cal-legend mono">
        <span>
          <i className="lg-dot ok" /> есть окна
        </span>
        <span>
          <i className="lg-dot" /> нет окон
        </span>
      </div>
    </div>
  )
}
