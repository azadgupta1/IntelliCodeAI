import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  Tooltip, CartesianGrid, Cell
} from 'recharts';

const ChartSection = ({ data }) => {
  const navigate = useNavigate();

  console.log("Data is : ",data);

  if (!data.length) return null;

  return (
    <div className="bg-white shadow-lg w-200 rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 ml-4">Error Overview</h2>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }} barSize={60}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="Blogger" />
          <YAxis allowDecimals={false}/>
          <Tooltip formatter={(value, name) => [value < 1 ? 0 : value, name]} />
          <Bar dataKey="Errors" fill="#38bdf8" onClick={(data) => navigate(`/repositories/${data.ownerName}/${data.repoName}`)}>
            {data.map((entry) => (
              <Cell key={entry.id} cursor="pointer" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartSection;
