import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const AreaChartComponent = ({ data, dataKey, title, height = 300, color = '#3b82f6' }) => (
  <div className="chart-container">
    {title && <h3 className="chart-title">{title}</h3>}
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey={dataKey} stroke={color} fillOpacity={1} fill="url(#colorGradient)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
)

export default AreaChartComponent
