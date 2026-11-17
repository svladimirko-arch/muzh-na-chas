import { SERVICES } from '../data/catalog'
import type { Service } from '../data/catalog'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'

interface Props {
  onOpenPrice: (service: Service) => void
}

export function Services({ onOpenPrice }: Props) {
  return (
    <section className="section" id="services">
      <div className="container">
        <Reveal>
          <div className="sec-head">
            <div className="kicker">01 · Услуги</div>
            <h2 className="sec-title">Нажмите на услугу — откроется прайс</h2>
            <p className="sec-sub">
              Внутри каждой карточки — фиксированный прайс, время работ и свободные мастера по этой услуге.
            </p>
          </div>
        </Reveal>
        <div className="srv-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} className="srv-cell" style={{ transitionDelay: i * 60 + 'ms' }}>
              <div
                className="srv-card"
                role="button"
                tabIndex={0}
                onClick={() => onOpenPrice(s)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onOpenPrice(s)
                  }
                }}
              >
                <div className="srv-top mono">
                  <span>{s.code}</span>
                  <span className="srv-open">
                    прайс <Icon name="arrow" size={12} />
                  </span>
                </div>
                <span className="srv-icon">
                  <Icon name={s.icon} size={22} />
                </span>
                <div className="srv-title">{s.title}</div>
                <div className="srv-desc">{s.short}</div>
                <div className="srv-foot">
                  <span className="srv-price mono">от {s.minPrice} ₽</span>
                  <span className="srv-dur mono">{s.duration}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
