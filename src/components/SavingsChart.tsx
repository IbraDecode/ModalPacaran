import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatCurrency } from '@/utils/currency';

export type ChartPoint = { day: string; aku: number; dia: number; total: number };

const SavingsChart = ({ data }: { data: ChartPoint[] }) => (
  <div className="glass-card rounded-3xl p-4">
    <div className="flex items-center justify-between mb-2 text-sm text-white/70">
      <span>Timeline</span>
      <span className="text-xs">live</span>
    </div>
    <div className="h-48 w-full">
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ left: -20, right: 10 }}>
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" tick={{ fill: '#cbd5f5', fontSize: 10 }} tickLine={false} axisLine={false} />
          <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fill: '#cbd5f5', fontSize: 10 }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ background: '#111827', borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)' }}
            formatter={(value) => formatCurrency(Number(value))}
          />
          <Area type="monotone" dataKey="total" stroke="#8b5cf6" fill="url(#total)" strokeWidth={2} />
          <Area type="monotone" dataKey="aku" stroke="#22d3ee" fillOpacity={0} strokeWidth={1.5} />
          <Area type="monotone" dataKey="dia" stroke="#a3e635" fillOpacity={0} strokeWidth={1.5} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default SavingsChart;
