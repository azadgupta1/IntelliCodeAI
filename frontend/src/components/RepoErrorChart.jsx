// // components/RepoErrorChart.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
// } from 'recharts';

// const RepoErrorChart = ({ repoId, range = '7d' }) => {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     const fetchErrorHistory = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Adjust the key if different

//         const res = await axios.get(
//           `http://localhost:3000/api/history/repo/${repoId}/error-history?range=${range}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//             withCredentials: true, // if your API also requires cookies/session
//           }
//         );

//         console.log("CHART DATA is:", res);
//         if (res.data.success) {

//           const grouped = res.data.data.reduce((acc, item) => {
//             const date = new Date(item.timestamp).toLocaleDateString();
//             acc[date] = (acc[date] || 0) + item.errorCount;
//             return acc;
//           }, {});
          
          
//           const formattedData = Object.entries(grouped).map(([date, count]) => ({
//             date,
//             errorCount: count,
//           }));

//           setChartData(formattedData);
//         }
//       } catch (err) {
//         console.error('Failed to fetch error history:', err);
//       }
//     };

//     fetchErrorHistory();
//   }, [repoId, range]);

//   return (
//     <div className="p-4 mt-6 bg-white rounded-xl shadow">
//       <h2 className="text-xl font-semibold mb-4">Error History (Last {range})</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={chartData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis allowDecimals={false} />
//           <Tooltip />
//           <Line type="monotone" dataKey="errorCount" stroke="#ef4444" strokeWidth={2} />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default RepoErrorChart;

// components/RepoErrorChart.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';

// // Custom tooltip component
// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     const current = payload[0].payload;
//     const prev = payload[0].payload.prevErrorCount ?? 0;
//     const diff = current.errorCount - prev;
//     const isIncrease = diff > 0;

//     return (
//       <div className="bg-white border rounded shadow p-2 text-sm">
//         <p><strong>{label}</strong></p>
//         <p>Error Count: {current.errorCount}</p>
//         {diff !== 0 && (
//           <p style={{ color: isIncrease ? 'green' : 'red' }}>
//             {isIncrease ? '▲' : '▼'} {Math.abs(diff)} {isIncrease ? 'increase' : 'decrease'}
//           </p>
//         )}
//         {diff === 0 && <p>No change</p>}
//       </div>
//     );
//   }

//   return null;
// };

// const RepoErrorChart = ({ repoId, range = '7d' }) => {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     const fetchErrorHistory = async () => {
//       try {
//         const token = localStorage.getItem('token');

//         const res = await axios.get(
//           `http://localhost:3000/api/history/repo/${repoId}/error-history?range=${range}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//             withCredentials: true,
//           }
//         );

//         console.log("CHART DATA is:", res);

//         if (res.data.success) {
//           const grouped = res.data.data.reduce((acc, item) => {
//             const date = new Date(item.timestamp).toLocaleDateString();
//             acc[date] = (acc[date] || 0) + item.errorCount;
//             return acc;
//           }, {});

//           const sortedDates = Object.entries(grouped)
//             .sort(([a], [b]) => new Date(a) - new Date(b))
//             .map(([date, count], index, arr) => ({
//               date,
//               errorCount: count,
//               prevErrorCount: index > 0 ? arr[index - 1][1] : 0,
//             }));

//           setChartData(sortedDates);
//         }
//       } catch (err) {
//         console.error('Failed to fetch error history:', err);
//       }
//     };

//     fetchErrorHistory();
//   }, [repoId, range]);

//   return (
//     <div className="p-4 mt-6 bg-white rounded-xl shadow">
//       <h2 className="text-xl font-semibold mb-4">Error History (Last {range})</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={chartData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis allowDecimals={false} />
//           <Tooltip content={<CustomTooltip />} />
//           <Line
//             type="stepAfter"
//             dataKey="errorCount"
//             stroke="#ef4444"
//             strokeWidth={2}
//             dot={{ r: 4 }}
//             activeDot={{ r: 6 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default RepoErrorChart;



// components/RepoErrorChart.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const RepoErrorChart = ({ repoId, range = '7d' }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchErrorHistory = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get(
          `http://localhost:3000/api/history/repo/${repoId}/error-history?range=${range}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          const grouped = res.data.data.reduce((acc, item) => {
            const date = new Date(item.timestamp).toLocaleDateString();
            acc[date] = (acc[date] || 0) + item.errorCount;
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

          setChartData(formattedData);
        }
      } catch (err) {
        console.error('Failed to fetch error history:', err);
      }
    };

    fetchErrorHistory();
  }, [repoId, range]);

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const errorCount = payload[0].value;
      const delta = payload[0].payload.delta;

      return (
        // <div className="bg-white p-2 border border-gray-300 rounded shadow text-sm">
        //   <p><strong>Date:</strong> {label}</p>
        //   <p><strong>Errors:</strong> {errorCount}</p>
        //   {delta !== null && delta !== 0 && (
        //     <p>
        //       <strong>Change:</strong>{' '}
        //       <span className={delta > 0 ? 'text-red-500' : 'text-green-600'}>
        //         {delta > 0 ? '▲' : '▼'} {Math.abs(delta)}
        //       </span>
        //     </p>
        //   )}
        // </div>

        <div className="bg-white p-2 border border-gray-300 rounded shadow text-sm">
  <p><strong>Date:</strong> {label}</p>
  <p>
    <strong>Errors:</strong> {errorCount}
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
    <div className="p-4 mt-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Error History (Last {range})</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="step"
            dataKey="errorCount"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RepoErrorChart;
