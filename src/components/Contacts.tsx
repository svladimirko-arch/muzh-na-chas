import { COMPANY } from '../data/catalog'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'

interface Props {
  onOrder: () => void
}

export function Contacts({ onOrder }: Props) {
  return (
    <section className="section section--alt" id="contacts">
      <div className="container">
        <Reveal>
          <div className="sec-head">
            <div className="kicker">04 · Контакты</div>
            <h2 className="sec-title">Диспетчерская на связи</h2>
          </div>
        </Reveal>
        <Reveal>
          <div className="contact-panel">
            <div className="c-left">
              <a className="c-phone mono" href={COMPANY.phoneHref}>
                {COMPANY.phone}
              </a>
              <div className="c-rows">
                <div className="c-row">
                  <Icon name="mail" size={16} />
                  <a href={'mailto:' + COMPANY.email}>{COMPANY.email}</a>
                </div>
                <div className="c-row">
                  <Icon name="send" size={16} />
                  <a href={COMPANY.telegram} target="_blank" rel="noreferrer">
                    Telegram {COMPANY.telegramLabel}
                  </a>
                </div>
                <div className="c-row">
                  <Icon name="pin" size={16} />
                  <span>
                    {COMPANY.city}, {COMPANY.area}
                  </span>
                </div>
                <div className="c-row">
                  <Icon name="clock" size={16} />
                  <span>{COMPANY.hours}</span>
                </div>
                <div className="c-row">
                  <Icon name="pin" size={16} />
                  <span>{COMPANY.address}</span>
                </div>
              </div>
            </div>
            <div className="c-right">
              <div className="c-note mono">РЕЖИМ РАБОТЫ ЗАЯВОК</div>
              <ul className="c-list">
                <li>Заявка с сайта — круглосуточно</li>
                <li>Подтверждение — в течение {COMPANY.responseMin} минут</li>
                <li>Выезд — от {COMPANY.eta} минут</li>
                <li>Оплата — после выполнения работ</li>
              </ul>
              <div className="c-cta">
                <button className="btn btn--primary btn--lg" onClick={onOrder}>
                  Заказать мастера
                </button>
                <a className="btn btn--ghost" href={COMPANY.phoneHref}>
                  <Icon name="phone" size={14} /> Позвонить
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
