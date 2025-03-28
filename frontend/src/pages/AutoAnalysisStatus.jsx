import React, { useEffect, useState } from "react";
import axios from "axios";

const AutoAnalysisStatus = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/github/status", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStatus(response.data);
      } catch (error) {
        console.error("Error fetching auto-analysis status:", error);
      }
    };

    fetchStatus();
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold">🔍 Auto-Analysis Status</h2>
      {status ? (
        <pre className="mt-4 p-3 bg-gray-100 border">{JSON.stringify(status, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AutoAnalysisStatus;
