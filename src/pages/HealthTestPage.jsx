import axios from "axios";
import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const HealthTestPage = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const testHealth = async () => {
    setResult(null);
    setError(null);
    setLoading(true);

    try {
      const res = await axios.get(`${API_BASE_URL}/health`);
      setResult(res.data);
    } catch (err) {
      setError({
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white px-6">
      <h1 className="text-4xl font-bold mb-6">Health Test</h1>

      <div className="bg-slate-800 rounded-xl p-6 text-center shadow-lg mb-6 w-full max-w-2xl">
        <button
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={testHealth}
          disabled={loading}
        >
          {loading ? "Loading..." : "Test /health"}
        </button>

        {loading && (
          <div className="mt-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}

        {result && (
          <div className="mt-6 text-left">
            <h3 className="text-xl font-semibold mb-2">Result</h3>
            <pre className="bg-slate-700 p-4 rounded-lg overflow-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        {error && (
          <div className="mt-6 text-left">
            <h3 className="text-xl font-semibold mb-2 text-red-400">Error</h3>
            <pre className="bg-slate-700 p-4 rounded-lg overflow-auto text-sm">
              {JSON.stringify(error, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

HealthTestPage.displayName = "HealthTestPage";

export default HealthTestPage;
