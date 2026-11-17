import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/** Плавное появление блока при прокрутке. Всегда есть страховка, чтобы блок не остался невидимым. */
export function Reveal({ children, className, style }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const vh = window.innerHeight || 0
    if (vh === 0 || el.getBoundingClientRect().top < vh) {
      // блок уже в первом экране (или окно без размеров) — показываем сразу
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.08 },
    )
    io.observe(el)
    // страховка: если наблюдатель не сработал (скрытое окно), показываем контент
    const t = window.setTimeout(() => {
      setShown(true)
      io.disconnect()
    }, 1800)
    return () => {
      io.disconnect()
      window.clearTimeout(t)
    }
  }, [])

  return (
    <div
      ref={ref}
      style={style}
      className={'reveal' + (shown ? ' is-in' : '') + (className ? ' ' + className : '')}
    >
      {children}
    </div>
  )
}
