'use client'

import { useEffect, useMemo, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'

type CalendarTransaction = { name: string; category: string; date: string; amount: number; type: 'expense' | 'income' }

export function InteractiveMoneyCalendar({ transactions }: { transactions: CalendarTransaction[] }) {
  const [month, setMonth] = useState<number | null>(null)
  const [year, setYear] = useState<number | null>(null)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  useEffect(() => {
    const today = new Date()
    setMonth(today.getMonth())
    setYear(today.getFullYear())
  }, [])

  const spendingByDay = useMemo(() => {
    if (month === null || year === null) return {}
    return transactions.reduce<Record<number, number>>((result, item) => {
      if (item.type !== 'expense') return result
      const date = new Date(item.date)
      if (date.getMonth() === month && date.getFullYear() === year) result[date.getDate()] = (result[date.getDate()] || 0) + item.amount
      return result
    }, {})
  }, [transactions, month, year])

  if (month === null || year === null) return <section id="money-calendar" className="mt-7 min-h-[420px] rounded-2xl border border-[#e5eae6] bg-white p-6"><p className="text-sm font-semibold text-[#93a098]">Loading calendar…</p></section>

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()
  const monthName = new Date(year, month, 1).toLocaleString('en-IN', { month: 'long', year: 'numeric' })
  const selectedExpenses = selectedDay ? transactions.filter((item) => item.type === 'expense' && new Date(item.date).getDate() === selectedDay && new Date(item.date).getMonth() === month && new Date(item.date).getFullYear() === year) : []

  function changeMonth(direction: number) {
    const next = new Date(year, month + direction, 1)
    setMonth(next.getMonth())
    setYear(next.getFullYear())
    setSelectedDay(null)
  }

  return <section id="money-calendar" className="mt-7 rounded-2xl border border-[#e5eae6] bg-white p-6 shadow-[0_2px_8px_rgba(25,55,40,.025)]"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><div className="flex items-center gap-2"><CalendarDays size={17} className="text-[#0e9f6e]" /><h2 className="text-[15px] font-bold">Money control calendar</h2></div><p className="mt-1 text-xs text-[#93a098]">Click any day to see expenses. Under ₹1,500 is green; over ₹1,500 is red.</p></div><div className="flex items-center gap-3 text-[11px] font-semibold text-[#6d7972]"><span className="flex items-center gap-1.5"><i className="size-2.5 rounded-full bg-[#65c994]" /> Under ₹1,500</span><span className="flex items-center gap-1.5"><i className="size-2.5 rounded-full bg-[#f37b70]" /> Over ₹1,500</span></div></div><div className="mt-6 flex items-center justify-between border-b border-[#edf0ed] pb-4"><button aria-label="Previous month" onClick={() => changeMonth(-1)} className="grid size-8 place-items-center rounded-lg border border-[#e5eae6] text-[#718078] hover:bg-[#f3f6f3]"><ChevronLeft size={15} /></button><h3 className="text-sm font-bold">{monthName}</h3><button aria-label="Next month" onClick={() => changeMonth(1)} className="grid size-8 place-items-center rounded-lg border border-[#e5eae6] text-[#718078] hover:bg-[#f3f6f3]"><ChevronRight size={15} /></button></div><div className="mt-4 grid grid-cols-7 gap-2 text-center">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <span key={day} className="pb-2 text-[10px] font-bold uppercase tracking-wide text-[#a0aaa4]">{day}</span>)}{Array.from({ length: firstDay + daysInMonth }, (_, index) => index < firstDay ? null : index - firstDay + 1).map((day, index) => day === null ? <span key={`empty-${index}`} /> : <button key={day} onClick={() => setSelectedDay(day)} className={`min-h-14 rounded-xl border p-2 text-left transition hover:scale-[1.02] ${selectedDay === day ? 'border-[#0e9f6e] ring-2 ring-[#b9ead3]' : 'border-transparent'} ${spendingByDay[day] > 1500 ? 'bg-[#fff0ef] text-[#bf554d]' : 'bg-[#ecfbf1] text-[#287a52]'}`}><span className="text-xs font-bold">{day}</span><span className="mt-2 block truncate text-[10px] font-semibold">₹{(spendingByDay[day] || 0).toLocaleString('en-IN')}</span></button>)}</div>{selectedDay && <div className="mt-5 rounded-xl border border-[#e5eae6] bg-[#f8faf8] p-4"><div className="flex items-center justify-between"><div><p className="text-xs font-bold">{new Date(year, month, selectedDay).toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}</p><p className="mt-1 text-[11px] text-[#93a098]">Total spent: ₹{(spendingByDay[selectedDay] || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p></div><button onClick={() => setSelectedDay(null)} className="text-xs font-bold text-[#0e9f6e]">Close</button></div>{selectedExpenses.length ? <div className="mt-3 flex flex-col gap-2">{selectedExpenses.map((item, index) => <div key={`${item.name}-${index}`} className="flex justify-between text-xs"><span className="font-semibold text-[#526159]">{item.name} <span className="text-[#9aa49e]">· {item.category}</span></span><span className="font-bold text-[#35433c]">₹{item.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span></div>)}</div> : <p className="mt-3 text-xs text-[#93a098]">No expenses added for this day yet. Add one from the Add expense page.</p>}</div>}</section>
}
