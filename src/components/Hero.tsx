import { COMPANY, HERO_STATS } from '../data/catalog'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'

const LOAD = [
  { id: 'C-01', v: 72 },
  { id: 'C-02', v: 41 },
  { id: 'C-03', v: 88 },
  { id: 'C-04', v: 23 },
  { id: 'C-05', v: 57 },
]

interface Props {
  onOrder: () => void
}

export function Hero({ onOrder }: Props) {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <Reveal>
          <div className="kicker">Сервис бытовых мастеров · {COMPANY.city}</div>
          <h1>
            Муж на час. <span className="hl">Без поиска</span> и переговоров.
          </h1>
          <p className="hero-sub">
            Выберите услугу, мастера и свободное окно в календаре. Диспетчер подтверждает выезд за{' '}
            {COMPANY.responseMin} минут, мастер приезжает с инструментом. Оплата — после работы.
          </p>
          <div className="hero-cta">
            <button className="btn btn--primary btn--lg" onClick={onOrder}>
              Заказать мастера
              <Icon name="arrow" size={15} />
            </button>
            <a className="btn btn--ghost btn--lg" href="#services">
              Смотреть услуги
            </a>
          </div>
          <div className="hero-stats">
            {HERO_STATS.map(s => (
              <div className="stat" key={s.cap}>
                <div className="stat-val">{s.value}</div>
                <div className="stat-cap mono">{s.cap}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="hero-side">
          <div className="dispatch">
            <div className="dispatch-head">
              <span className="d-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="mono">DISPATCH · LIVE</span>
            </div>
            <div className="dispatch-body">
              <div className="d-row mono">
                <i className="dot ok" /> мастеров на линии: <b>12</b>
              </div>
              <div className="d-row mono">
                <i className="dot ok" /> свободных окон сегодня: <b>7</b>
              </div>
              <div className="d-row mono">
                <i className="dot" /> средняя скорость выезда: <b>{COMPANY.eta} мин</b>
              </div>
              <div className="bars">
                {LOAD.map(b => (
                  <div className="bar-row mono" key={b.id}>
                    <span>{b.id}</span>
                    <span className="bar">
                      <i style={{ width: b.v + '%' }} />
                    </span>
                    <span>{b.v}%</span>
                  </div>
                ))}
              </div>
              <div className="d-term mono">
                &gt; заявка <b>#2317</b> принята — мастер назначен, выезд 14:30
                <span className="blink">_</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
