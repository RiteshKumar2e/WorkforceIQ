import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const BarChartComponent = ({ data, dataKey, title, height = 300, color = '#3b82f6' }) => (
  <div className="chart-container">
    {title && <h3 className="chart-title">{title}</h3>}
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey} fill={color} />
      </BarChart>
    </ResponsiveContainer>
  </div>
)

export default BarChartComponent
