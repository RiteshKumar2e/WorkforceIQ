import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const LineChartComponent = ({ data, dataKey, title, height = 300 }) => (
  <div className="chart-container">
    {title && <h3 className="chart-title">{title}</h3>}
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={dataKey} stroke="#3b82f6" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
)

export default LineChartComponent
