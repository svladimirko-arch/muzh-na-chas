import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Icon } from './Icon'

interface Props {
  title: string
  kicker?: string
  onClose: () => void
  wide?: boolean
  children: ReactNode
}

export function Modal({ title, kicker, onClose, wide, children }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.classList.add('no-scroll')
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('no-scroll')
    }
  }, [onClose])

  return (
    <div
      className="modal-overlay"
      onMouseDown={e => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={'modal' + (wide ? ' modal--wide' : '')} role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-head">
          <div>
            {kicker && <div className="modal-kicker mono">{kicker}</div>}
            <div className="modal-title">{title}</div>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Закрыть">
            <Icon name="x" size={16} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}
