import { useState } from 'react'
import { COMPANY } from '../data/catalog'
import { Icon } from '../ui/Icon'

const LINKS = [
  { href: '#services', label: 'Услуги' },
  { href: '#masters', label: 'Мастера' },
  { href: '#how', label: 'Как это работает' },
  { href: '#contacts', label: 'Контакты' },
]

export function Header({ onOrder }: { onOrder: () => void }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="header">
      <div className="container header-in">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">
            <Icon name="wrench" size={16} />
          </span>
          <span>{COMPANY.brand}</span>
          <span className="brand-tag mono">{COMPANY.tag}</span>
        </a>
        <nav className="nav">
          {LINKS.map(l => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="header-right">
          <a className="header-phone mono" href={COMPANY.phoneHref}>
            {COMPANY.phone}
          </a>
          <button className="btn btn--primary btn--sm" onClick={onOrder}>
            Заказать
          </button>
          <button className="icon-btn burger" onClick={() => setOpen(o => !o)} aria-label="Меню">
            <Icon name="menu" size={17} />
          </button>
        </div>
      </div>
      {open && (
        <div className="m-menu">
          {LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href={COMPANY.phoneHref} className="m-menu-phone mono">
            {COMPANY.phone}
          </a>
        </div>
      )}
    </header>
  )
}
