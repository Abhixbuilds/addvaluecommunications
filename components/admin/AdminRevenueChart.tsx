"use client";

import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

interface DataPoint {
  month: string;
  revenue: number;
  projects: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-[#0F172A]/95 backdrop-blur-sm p-3 text-xs shadow-xl">
      <p className="text-white/50 font-medium mb-2">{label}</p>
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2 h-2 rounded-full bg-[#A78BFA]" />
        <span className="text-white/70">Revenue</span>
        <span className="font-bold text-[#A78BFA] ml-auto">₹{(payload[0]?.value / 1000).toFixed(0)}k</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
        <span className="text-white/70">Projects</span>
        <span className="font-bold text-[#38BDF8] ml-auto">{payload[1]?.value}</span>
      </div>
    </div>
  );
};

export default function AdminRevenueChart({ data }: { data: DataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} axisLine={false} tickLine={false} width={45} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
        <Bar dataKey="revenue" fill="#A78BFA" radius={[4, 4, 0, 0]} maxBarSize={28} fillOpacity={0.85} />
        <Bar dataKey="projects" fill="#38BDF8" radius={[4, 4, 0, 0]} maxBarSize={14} fillOpacity={0.7} />
      </BarChart>
    </ResponsiveContainer>
  );
}
