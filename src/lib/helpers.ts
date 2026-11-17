import { MASTERS } from '../data/catalog'

/* ---------- Время работы (слоты) ---------- */

export const SLOT_TIMES = [
  '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
]

/**
 * Демонстрационная сетка занятости.
 * Стабильно считается из пары «мастер + дата», поэтому картинка не «прыгает».
 * При подключении реального календаря заменить одной функцией.
 */
function hashCode(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function freeSlots(masterId: string, iso: string): string[] {
  const ids = masterId === 'any' ? MASTERS.map(m => m.id) : [masterId]
  const free: string[] = []
  for (const slot of SLOT_TIMES) {
    const busyEverywhere = ids.every(id => hashCode(id + '|' + iso + '|' + slot) % 10 < 3)
    if (!busyEverywhere) free.push(slot)
  }
  if (free.length === 0) return SLOT_TIMES.slice(1, 3)
  return free
}

/* ---------- Даты ---------- */

export function toISO(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

export function todayISO(): string {
  return toISO(new Date())
}

export function parseISO(iso: string): Date {
  return new Date(iso + 'T12:00:00')
}

export function fmtDayLong(iso: string): string {
  const s = parseISO(iso).toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })
  return s.charAt(0).toUpperCase() + s.slice(1)
}

/* ---------- Прочее ---------- */

export function initials(name: string): string {
  return name.split(' ').map(w => w.charAt(0)).join('').slice(0, 2).toUpperCase()
}
