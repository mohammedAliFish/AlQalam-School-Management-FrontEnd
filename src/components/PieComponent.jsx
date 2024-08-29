import { PieChart, Pie, Cell } from 'recharts';

const data = [
    { name: 'الاساتذه', value: 400 },
    { name: 'الطلاب', value: 300 },
    { name: 'الصفوف', value: 300 },
    
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
const PieComponent = () => {
  return (
    <div>
        <PieChart width={400} height={400}>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      labelLine={false}
      label={renderCustomizedLabel}
      outerRadius={100}
      fill="#8884d8"
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
  </PieChart>
 <div className=''>
 <div className="flex justify-between ">
      {data.map((item, index) => (
        <p key={index} className="font-almarai cursor-pointer font-bold text-center">{item.name}</p>
      ))}
    </div>

    {/* مربعات الألوان */}
    <div className="flex justify-between mt-2">
      {COLORS.map((item, index) => (
        <div className="h-[30px] w-[30px] rounded-full" style={{ backgroundColor: item }} key={index}></div>
      ))}
    </div>
 </div>
    </div>
  )
}

export default PieComponent