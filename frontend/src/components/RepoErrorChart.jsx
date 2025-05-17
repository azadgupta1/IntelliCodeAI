import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Link } from 'react-router';
import { API_BASE_URL } from '../services/githubServices';

const RepoErrorChart = ({ repoId, range, errorCount }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchErrorHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          `${API_BASE_URL}/api/history/repo/${repoId}/error-history?range=${range}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          const grouped = res.data.data.reduce((acc, item) => {
            const date = new Date(item.timestamp);
            const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD
            acc[dateKey] = (acc[dateKey] || 0) + item.errorCount;
            return acc;
          }, {});

          const sortedDates = Object.entries(grouped).sort(
            ([a], [b]) => new Date(a) - new Date(b)
          );

          const formattedData = sortedDates.map(([date, count], index, arr) => {
            const prevCount = index > 0 ? arr[index - 1][1] : null;
            const delta = prevCount !== null ? count - prevCount : null;
            return {
              date,
              errorCount: count,
              delta,
            };
          });

          // setChartData(formattedData);

          const today = new Date().toISOString().split('T')[0];
const hasToday = formattedData.some(item => item.date === today);

if (!hasToday) {
  const prevCount = formattedData.length > 0 ? formattedData[formattedData.length - 1].errorCount : 0;
  const todayData = {
    date: today,
    errorCount: errorCount,
    delta: errorCount - prevCount,
  };
  formattedData.push(todayData);
}

setChartData(formattedData);

        }
      } catch (err) {
        console.error('Failed to fetch error history:', err);
      }
    };

    fetchErrorHistory();
  }, [repoId, range]);

  // Formatter for X-axis based on range
  const formatXAxis = (dateStr) => {
    const date = new Date(dateStr);
    if (range === '7d') {
      return date.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit' }); // Fri-21
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }); // Apr-21
    }
  };

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const errorCount = payload[0].value;
      const delta = payload[0].payload.delta;
      const dateFormatted = new Date(label).toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'short', day: 'numeric',
      });

      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow text-sm">
          <p className="font-medium">{dateFormatted}</p>
          <p>
            <span className="font-semibold">Errors:</span> {errorCount}
            {delta !== null && delta !== 0 && (
              <span className={`ml-2 ${delta > 0 ? 'text-red-500' : 'text-green-600'}`}>
                {delta > 0 ? '▲' : '▼'} {Math.abs(delta)}
              </span>
            )}
          </p>
        </div>
      );
    }

    return null;
  };

return (
  <div className="p-6 mt-6 bg-white rounded-2xl shadow-md border border-gray-100">
    <Link to="/repositories/azadgupta1/Blogger/issues">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 bg-gray-50 py-2 w-35 ml-15 cursor-pointer hover:bg-gray-100 rounded-md transition">
        Issues: <span className="font-bold text-red-500">{errorCount}</span>
      </h2>
    </Link>
    <ResponsiveContainer width="100%" height={320}>
      <LineChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="date"
          tickFormatter={formatXAxis}
          stroke="#6b7280"
          tick={{ fontSize: 12 }}
        />
        <YAxis
          allowDecimals={false}
          stroke="#6b7280"
          tick={{ fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="step"
          dataKey="errorCount"
          stroke="#2f80eb"
          strokeWidth={2}
          dot={{ r: 4, stroke: '#2f80eb', strokeWidth: 1.5, fill: '#fff' }}
          activeDot={{ r: 6, fill: '#2f80eb', stroke: '#fff', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);
};

export default RepoErrorChart;
