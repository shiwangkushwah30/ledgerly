'use client'

import { useMemo, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Coffee,
  CreditCard,
  DollarSign,
  Download,
  Home,
  LayoutDashboard,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  SlidersHorizontal,
  Utensils,
  Wallet,
  X,
} from 'lucide-react'

type Transaction = {
  name: string
  category: string
  date: string
  amount: number
  type: 'expense' | 'income'
  icon: typeof Coffee
  tone: string
}

const initialTransactions: Transaction[] = [
  { name: 'Whole Foods Market', category: 'Groceries', date: 'Today, 10:24 AM', amount: 84.32, type: 'expense', icon: ShoppingBag, tone: 'mint' },
  { name: 'Salary deposit', category: 'Income', date: 'Today, 9:00 AM', amount: 4200, type: 'income', icon: DollarSign, tone: 'blue' },
  { name: 'The Coffee House', category: 'Dining', date: 'Yesterday, 8:15 AM', amount: 5.75, type: 'expense', icon: Coffee, tone: 'peach' },
  { name: 'Netflix', category: 'Subscriptions', date: 'Jun 12, 2024', amount: 15.49, type: 'expense', icon: CreditCard, tone: 'purple' },
]

const navItems = [
  { label: 'Overview', icon: LayoutDashboard, href: '#overview' },
  { label: 'Transactions', icon: CreditCard, href: '#transactions' },
  { label: 'Budgets', icon: Wallet, href: '#budgets' },
  { label: 'Reports', icon: CalendarDays, href: '#reports' },
  { label: 'Add expense', icon: Plus, href: '/add-expense' },
]

export default function Page() {
  const [transactions, setTransactions] = useState(initialTransactions)
  const [active, setActive] = useState('Overview')
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({ name: '', amount: '', category: 'Groceries' })

  const filteredTransactions = useMemo(
    () => transactions.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase())),
    [transactions, search],
  )

  function addExpense(event: React.FormEvent) {
    event.preventDefault()
    if (!form.name || !form.amount) return
    setTransactions((items) => [{ name: form.name, category: form.category, date: 'Just now', amount: Number(form.amount), type: 'expense', icon: ShoppingBag, tone: 'mint' }, ...items])
    setForm({ name: '', amount: '', category: 'Groceries' })
    setShowForm(false)
  }

  return (
    <main className="min-h-screen bg-[#f7f8f6] text-[#18221e]">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[242px] flex-col border-r border-[#e6eae6] bg-white px-5 py-7 lg:flex">
        <a href="#overview" className="mb-12 flex items-center gap-3 px-3" onClick={() => setActive('Overview')}>
          <span className="grid size-9 place-items-center rounded-xl bg-[#0e9f6e] text-white shadow-sm"><Wallet size={19} /></span>
          <span className="text-[17px] font-bold tracking-tight">Pennywise</span>
        </a>
        <nav className="flex flex-col gap-2" aria-label="Main navigation">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#99a39e]">Workspace</p>
          {navItems.map((item) => {
            const Icon = item.icon
            return <a key={item.label} href={item.href} onClick={() => setActive(item.label)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-semibold transition-colors ${active === item.label ? 'bg-[#e6f7ef] text-[#07875d]' : 'text-[#78827d] hover:bg-[#f3f6f3]'}`}><Icon size={18} strokeWidth={active === item.label ? 2.2 : 1.8} />{item.label}</a>
          })}
        </nav>
        <div className="mt-auto flex flex-col gap-2">
          <a href="#help" className="flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-semibold text-[#78827d] hover:bg-[#f3f6f3]"><CircleHelp size={18} />Help center</a>
          <a href="#settings" className="flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-semibold text-[#78827d] hover:bg-[#f3f6f3]"><Settings size={18} />Settings</a>
          <div className="mt-5 flex items-center gap-3 border-t border-[#edf0ed] px-3 pt-5"><div className="grid size-9 place-items-center rounded-full bg-[#f4d3b8] text-xs font-bold text-[#734b35]">JD</div><div className="min-w-0"><p className="truncate text-xs font-bold">Jordan Davis</p><p className="text-[11px] text-[#98a19c]">Personal account</p></div><MoreHorizontal size={17} className="ml-auto text-[#9aa49e]" /></div>
        </div>
      </aside>

      <div className="lg:pl-[242px]">
        <header className="flex h-[76px] items-center justify-between border-b border-[#e6eae6] bg-white/80 px-5 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-3 lg:hidden"><span className="grid size-8 place-items-center rounded-lg bg-[#0e9f6e] text-white"><Wallet size={16} /></span><span className="font-bold">Pennywise</span></div>
          <div className="hidden items-center gap-2 text-xs text-[#85908a] sm:flex"><Home size={14} /> / <span className="font-semibold text-[#35433c]">Overview</span></div>
          <div className="ml-auto flex items-center gap-3"><button aria-label="Notifications" className="relative grid size-9 place-items-center rounded-full border border-[#e7ebe7] text-[#65736b] hover:bg-[#f4f7f4]"><Bell size={17} /><span className="absolute right-2 top-1.5 size-1.5 rounded-full bg-[#f36f56]" /></button><div className="hidden h-6 w-px bg-[#e6eae6] sm:block" /><button className="flex items-center gap-2 text-xs font-bold text-[#526159]">This month <ChevronDown size={14} /></button></div>
        </header>

        <div className="mx-auto max-w-[1320px] px-5 py-8 sm:px-8 lg:px-10">
          <section id="overview" className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-2 text-xs font-semibold text-[#93a098]">Monday, June 17, 2024</p><h1 className="text-[30px] font-bold tracking-[-0.04em] text-[#1c2922] sm:text-[34px]">Good morning, Jordan <span className="text-[#0e9f6e]">.</span></h1><p className="mt-2 text-sm text-[#829088]">Here&apos;s your financial snapshot for June.</p></div><div className="flex flex-wrap gap-3"><a href="/add-expense" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0e9f6e] px-5 text-sm font-bold text-white shadow-[0_5px_12px_rgba(14,159,110,.18)] transition hover:bg-[#087f58]"><Plus size={18} /> Add expense</a><button onClick={() => setShowForm(true)} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#dfe7e1] bg-white px-4 text-sm font-bold text-[#526159] hover:bg-[#f3f6f3]">Quick add</button></div></section>

          <section className="grid gap-4 md:grid-cols-3" aria-label="Financial summary"><SummaryCard label="Total balance" amount="$12,450.80" note="↑ 8.2% from last month" icon={Wallet} tone="green" /><SummaryCard label="Spent this month" amount="$1,842.35" note="↓ 4.6% from last month" icon={ArrowDownRight} tone="peach" /><SummaryCard label="Money in" amount="$4,200.00" note="↑ 12.0% from last month" icon={ArrowUpRight} tone="blue" /></section>

          <MoneyCalendar />

          <section className="mt-7 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
            <div id="reports" className="rounded-2xl border border-[#e5eae6] bg-white p-6 shadow-[0_2px_8px_rgba(25,55,40,.025)]"><div className="mb-8 flex items-start justify-between"><div><h2 className="text-[15px] font-bold">Spending overview</h2><p className="mt-1 text-xs text-[#93a098]">Your spending over the last 6 months</p></div><button className="flex items-center gap-2 rounded-lg border border-[#e5eae6] px-3 py-2 text-xs font-semibold text-[#68766e]">Last 6 months <ChevronDown size={13} /></button></div><div className="relative h-[220px] pl-9"><div className="absolute inset-x-0 top-0 flex flex-col justify-between text-[10px] text-[#a9b2ad]" style={{ height: '180px' }}><span>$4,000</span><span>$3,000</span><span>$2,000</span><span>$1,000</span><span>$0</span></div><div className="absolute inset-x-0 top-1 flex flex-col justify-between" style={{ height: '180px' }}>{[0,1,2,3,4].map((i) => <div key={i} className="border-t border-dashed border-[#edf0ed]" />)}</div><div className="absolute bottom-8 left-9 right-0 flex h-[168px] items-end justify-around gap-3"><ChartBar month="Jan" value="40%" /><ChartBar month="Feb" value="59%" /><ChartBar month="Mar" value="48%" /><ChartBar month="Apr" value="73%" active /><ChartBar month="May" value="63%" /><ChartBar month="Jun" value="83%" /></div></div></div>
            <div id="budgets" className="rounded-2xl border border-[#e5eae6] bg-white p-6 shadow-[0_2px_8px_rgba(25,55,40,.025)]"><div className="mb-7 flex items-start justify-between"><div><h2 className="text-[15px] font-bold">Budget progress</h2><p className="mt-1 text-xs text-[#93a098]">June spending limits</p></div><a href="#budgets" className="text-xs font-bold text-[#0e9f6e]">View all</a></div><div className="flex flex-col gap-6"><Budget label="Housing" spent="$1,200" total="$1,500" percent={80} color="bg-[#61b39a]" /><Budget label="Food & dining" spent="$426" total="$600" percent={71} color="bg-[#f1ac72]" /><Budget label="Transport" spent="$118" total="$300" percent={39} color="bg-[#9b91df]" /><Budget label="Entertainment" spent="$98" total="$150" percent={65} color="bg-[#e98282]" /></div></div>
          </section>

          <section id="transactions" className="mt-7 rounded-2xl border border-[#e5eae6] bg-white shadow-[0_2px_8px_rgba(25,55,40,.025)]"><div className="flex flex-col justify-between gap-4 border-b border-[#edf0ed] p-6 sm:flex-row sm:items-center"><div><h2 className="text-[15px] font-bold">Recent transactions</h2><p className="mt-1 text-xs text-[#93a098]">Your latest income and expenses</p></div><div className="flex gap-2"><div className="flex h-9 items-center gap-2 rounded-lg border border-[#e5eae6] px-3 text-[#9aa49e]"><Search size={15} /><input aria-label="Search transactions" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="w-24 bg-transparent text-xs text-[#35433c] outline-none placeholder:text-[#aab2ad]" /></div><button aria-label="Filter transactions" className="grid size-9 place-items-center rounded-lg border border-[#e5eae6] text-[#748078]"><SlidersHorizontal size={15} /></button><button className="grid size-9 place-items-center rounded-lg border border-[#e5eae6] text-[#748078]"><Download size={15} /></button></div></div><div className="divide-y divide-[#f0f2f0]">{filteredTransactions.map((item) => <TransactionRow key={`${item.name}-${item.date}`} item={item} />)}</div><div className="p-4 text-center"><a href="#transactions" className="text-xs font-bold text-[#0e9f6e]">View all transactions →</a></div></section>
          <footer className="flex justify-between py-8 text-[11px] text-[#a0aaa4]"><span>© 2024 Pennywise</span><span>Made for better money habits.</span></footer>
        </div>
      </div>

      {showForm && <div className="fixed inset-0 z-30 grid place-items-center bg-[#17241e]/30 p-5 backdrop-blur-sm"><form onSubmit={addExpense} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"><div className="mb-6 flex items-center justify-between"><div><h2 className="text-lg font-bold">Add an expense</h2><p className="mt-1 text-xs text-[#93a098]">Keep your spending history up to date.</p></div><button type="button" aria-label="Close" onClick={() => setShowForm(false)} className="grid size-8 place-items-center rounded-full bg-[#f3f6f3] text-[#718078]"><X size={16} /></button></div><label className="mb-4 block text-xs font-bold text-[#4d5c54]">What did you spend on?<input autoFocus value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#dfe7e1] px-3 text-sm font-medium outline-none focus:border-[#0e9f6e]" placeholder="e.g. Grocery shopping" /></label><div className="mb-6 grid grid-cols-2 gap-3"><label className="text-xs font-bold text-[#4d5c54]">Amount<input type="number" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#dfe7e1] px-3 text-sm font-medium outline-none focus:border-[#0e9f6e]" placeholder="0.00" /></label><label className="text-xs font-bold text-[#4d5c54]">Category<select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#dfe7e1] bg-white px-3 text-sm font-medium outline-none focus:border-[#0e9f6e]"><option>Groceries</option><option>Dining</option><option>Transport</option><option>Entertainment</option></select></label></div><button type="submit" className="h-11 w-full rounded-xl bg-[#0e9f6e] text-sm font-bold text-white hover:bg-[#087f58]">Save expense</button></form></div>}
    </main>
  )
}

function SummaryCard({ label, amount, note, icon: Icon, tone }: { label: string; amount: string; note: string; icon: typeof Wallet; tone: string }) { return <div className="rounded-2xl border border-[#e5eae6] bg-white p-5 shadow-[0_2px_8px_rgba(25,55,40,.025)]"><div className="flex items-center justify-between"><p className="text-xs font-semibold text-[#89958e]">{label}</p><span className={`grid size-8 place-items-center rounded-lg ${tone === 'green' ? 'bg-[#e6f7ef] text-[#0e9f6e]' : tone === 'peach' ? 'bg-[#fff0e7] text-[#df8a58]' : 'bg-[#eaf2ff] text-[#6f91d7]'}`}><Icon size={16} /></span></div><p className="mt-4 text-[25px] font-bold tracking-[-0.04em]">{amount}</p><p className={`mt-2 text-[11px] font-semibold ${note.includes('↓') ? 'text-[#e49b69]' : 'text-[#35a279]'}`}>{note}</p></div> }
function ChartBar({ month, value, active }: { month: string; value: string; active?: boolean }) { return <div className="flex h-full flex-1 flex-col items-center justify-end gap-2"><div className={`w-full max-w-10 rounded-t-md ${active ? 'bg-[#0e9f6e]' : 'bg-[#cdebdc]'}`} style={{ height: value }} /><span className={`text-[10px] ${active ? 'font-bold text-[#4d5c54]' : 'text-[#a0aaa4]'}`}>{month}</span></div> }
function Budget({ label, spent, total, percent, color }: { label: string; spent: string; total: string; percent: number; color: string }) { return <div><div className="mb-2 flex justify-between text-xs"><span className="font-semibold text-[#536159]">{label}</span><span className="text-[#9aa49e]">{spent} <span className="text-[#c1c8c3]">/ {total}</span></span></div><div className="h-2 rounded-full bg-[#edf1ee]"><div className={`h-2 rounded-full ${color}`} style={{ width: `${percent}%` }} /></div></div> }
function TransactionRow({ item }: { item: Transaction }) { const Icon = item.icon; return <div className="flex items-center gap-3 px-6 py-4"><span className={`grid size-9 place-items-center rounded-xl ${item.tone === 'mint' ? 'bg-[#e6f7ef] text-[#0e9f6e]' : item.tone === 'blue' ? 'bg-[#eaf2ff] text-[#6f91d7]' : item.tone === 'peach' ? 'bg-[#fff0e7] text-[#df8a58]' : 'bg-[#f0edff] text-[#958bdb]'}`}><Icon size={16} /></span><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-[#35433c]">{item.name}</p><p className="mt-1 text-[11px] text-[#9aa49e]">{item.category} · {item.date}</p></div><p className={`text-sm font-bold ${item.type === 'income' ? 'text-[#19956b]' : 'text-[#35433c]'}`}>{item.type === 'income' ? '+' : '-'}${item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p><button aria-label={`More options for ${item.name}`} className="text-[#aab2ad]"><MoreHorizontal size={16} /></button></div> }

const dailySpending = [210, 84, 430, 1520, 1780, 960, 320, 125, 670, 1510, 84, 340, 1120, 1850, 430, 218, 90, 740, 1320, 1880, 280, 120, 560, 920, 1620, 310, 76, 440, 1210, 1820]

function MoneyCalendar() {
  const [month, setMonth] = useState(5)
  const monthName = new Date(2024, month, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' })
  const daysInMonth = new Date(2024, month + 1, 0).getDate()
  const firstDay = new Date(2024, month, 1).getDay()
  const days = Array.from({ length: firstDay + daysInMonth }, (_, index) => index < firstDay ? null : index - firstDay + 1)

  return <section id="money-calendar" className="mt-7 rounded-2xl border border-[#e5eae6] bg-white p-6 shadow-[0_2px_8px_rgba(25,55,40,.025)]"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><div className="flex items-center gap-2"><CalendarDays size={17} className="text-[#0e9f6e]" /><h2 className="text-[15px] font-bold">Money control calendar</h2></div><p className="mt-1 text-xs text-[#93a098]">Daily spending at a glance. Days over $1,500 are flagged red.</p></div><div className="flex items-center gap-3"><span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#6d7972]"><i className="size-2.5 rounded-full bg-[#65c994]" /> Under $1,500</span><span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#6d7972]"><i className="size-2.5 rounded-full bg-[#f37b70]" /> Over $1,500</span></div></div><div className="mt-6 flex items-center justify-between border-b border-[#edf0ed] pb-4"><button aria-label="Previous month" onClick={() => setMonth((value) => (value + 11) % 12)} className="grid size-8 place-items-center rounded-lg border border-[#e5eae6] text-[#718078] hover:bg-[#f3f6f3]"><ChevronLeft size={15} /></button><h3 className="text-sm font-bold">{monthName}</h3><button aria-label="Next month" onClick={() => setMonth((value) => (value + 1) % 12)} className="grid size-8 place-items-center rounded-lg border border-[#e5eae6] text-[#718078] hover:bg-[#f3f6f3]"><ChevronRight size={15} /></button></div><div className="mt-4 grid grid-cols-7 gap-1.5 text-center">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <span key={day} className="pb-2 text-[10px] font-bold uppercase tracking-wide text-[#a0aaa4]">{day}</span>)}{days.map((day, index) => day === null ? <span key={`empty-${index}`} /> : <button key={day} title={`June ${day}: $${dailySpending[day - 1].toLocaleString()}`} className={`group relative flex min-h-12 flex-col items-center justify-center rounded-xl border text-xs font-bold transition hover:-translate-y-0.5 hover:shadow-sm ${dailySpending[day - 1] > 1500 ? 'border-[#ffd0ca] bg-[#fff0ee] text-[#c9514e]' : 'border-[#ccebd9] bg-[#effaf3] text-[#388966]'}`}><span>{day}</span><span className="mt-1 text-[9px] font-semibold opacity-75">${dailySpending[day - 1]}</span></button>)}</div></section>
}

