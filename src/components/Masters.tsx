import { MASTERS, SERVICES } from '../data/catalog'
import { freeSlots, initials, todayISO } from '../lib/helpers'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'

interface Props {
  filter: string | null
  onFilter: (serviceId: string | null) => void
  onOrder: (masterId: string) => void
}

export function Masters({ filter, onFilter, onOrder }: Props) {
  const list = filter ? MASTERS.filter(m => m.serviceIds.includes(filter)) : MASTERS
  const today = todayISO()
  const active = SERVICES.find(s => s.id === filter) ?? null

  return (
    <section className="section section--alt" id="masters">
      <div className="container">
        <Reveal>
          <div className="sec-head">
            <div className="kicker">02 · Мастера</div>
            <h2 className="sec-title">Выберите мастера</h2>
            <p className="sec-sub">
              Рейтинг, стаж и специализация — в каждой карточке. Кнопка «Заказать» открывает форму с календарём
              свободных окон.
            </p>
          </div>
          <div className="chips">
            <button
              className={'chip mono' + (filter === null ? ' is-on' : '')}
              onClick={() => onFilter(null)}
            >
              Все мастера
            </button>
            {SERVICES.map(s => (
              <button
                key={s.id}
                className={'chip mono' + (filter === s.id ? ' is-on' : '')}
                onClick={() => onFilter(s.id)}
              >
                {s.title}
              </button>
            ))}
          </div>
          {active && (
            <div className="filter-note mono">
              <Icon name="target" size={13} /> Фильтр: {active.title} · найдено {list.length}{' '}
              <button className="filter-reset" onClick={() => onFilter(null)}>
                сбросить
              </button>
            </div>
          )}
        </Reveal>

        <div className="mst-grid">
          {list.map((m, i) => {
            const freeToday = freeSlots(m.id, today).length > 0
            return (
              <Reveal key={m.id} className="mst-cell" style={{ transitionDelay: i * 50 + 'ms' }}>
                <article className="mst-card">
                  {m.top && (
                    <div className="mst-badge mono">
                      <Icon name="starFill" size={10} /> ТОП
                    </div>
                  )}
                  <div className="mst-top">
                    <span className={'mst-ava g' + (MASTERS.indexOf(m) % 6)}>{initials(m.name)}</span>
                    <span className="mst-id">
                      <span className="mst-name">{m.name}</span>
                      <span className="mst-role">{m.role}</span>
                    </span>
                    <span className="mst-rating mono">
                      <Icon name="starFill" size={12} />
                      <b>{m.rating.toFixed(2)}</b>
                      <span className="mst-rev">({m.reviews})</span>
                    </span>
                  </div>
                  <div className="mst-meta mono">
                    {m.experience} · {m.orders} заказов
                  </div>
                  <p className="mst-bio">{m.bio}</p>
                  <div className="mst-skills">
                    {m.skills.map(sk => (
                      <span className="skill mono" key={sk}>
                        {sk}
                      </span>
                    ))}
                  </div>
                  <div className="mst-foot">
                    <span className={'mst-status mono'}>
                      <i className={'dot' + (freeToday ? ' ok' : '')} />
                      {freeToday ? 'свободен сегодня' : 'окна завтра'}
                    </span>
                    <button className="btn btn--primary btn--sm" onClick={() => onOrder(m.id)}>
                      Заказать
                    </button>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
