import { COMPANY } from '../data/catalog'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-in mono">
        <span>
          © 2026 {COMPANY.brand} · {COMPANY.city}
        </span>
        <span className="footer-links">
          <a href="#services">услуги</a>
          <a href="#masters">мастера</a>
          <a href="#how">как это работает</a>
          <a href="#contacts">контакты</a>
        </span>
        <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
      </div>
    </footer>
  )
}
