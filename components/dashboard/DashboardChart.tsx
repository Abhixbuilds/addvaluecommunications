"use client";

import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

interface DataPoint {
  month: string;
  spend: number;
  roi: number;
}

interface Props {
  data: DataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-[#0F172A]/95 backdrop-blur-sm p-3 text-xs shadow-xl">
      <p className="text-white/50 font-medium mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-white/70 capitalize">{p.dataKey === "spend" ? "Investment" : "Returns"}</span>
          <span className="font-bold ml-auto" style={{ color: p.color }}>
            ₹{p.value.toLocaleString("en-IN")}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function DashboardChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F5C518" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#F5C518" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="roiGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          width={45}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="spend" stroke="#F5C518" strokeWidth={2} fill="url(#spendGrad)" dot={false} />
        <Area type="monotone" dataKey="roi" stroke="#38BDF8" strokeWidth={2} fill="url(#roiGrad)" dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
