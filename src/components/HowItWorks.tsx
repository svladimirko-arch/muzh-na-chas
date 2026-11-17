import { Reveal } from '../ui/Reveal'

const STEPS = [
  {
    n: '01',
    t: 'Выберите услугу',
    d: 'Нажмите на карточку — откроется прайс и список мастеров, которые её выполняют.',
  },
  {
    n: '02',
    t: 'Выберите мастера',
    d: 'В карточке мастера — специализация, стаж, рейтинг и статус на сегодня.',
  },
  {
    n: '03',
    t: 'Выберите время',
    d: 'Календарь показывает только свободные окна. Подтверждение диспетчера — 15 минут.',
  },
  {
    n: '04',
    t: 'Оплата после работы',
    d: 'Без предоплаты. Мастер фиксирует цену, чек и гарантия 30 дней.',
  },
]

export function HowItWorks() {
  return (
    <section className="section" id="how">
      <div className="container">
        <Reveal>
          <div className="sec-head">
            <div className="kicker">03 · Как это работает</div>
            <h2 className="sec-title">Четыре шага до результата</h2>
          </div>
        </Reveal>
        <div className="steps">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} className="step-cell" style={{ transitionDelay: i * 60 + 'ms' }}>
              <div className="step">
                <div className="step-num mono">{s.n}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
