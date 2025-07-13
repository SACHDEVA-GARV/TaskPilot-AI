// todo-frontend/src/components/DailySummary.jsx

import { useState, useEffect } from 'react';
import { getDailySummary } from '../services/aiService';
import { useAuth } from '../context/AuthContext';

function DailySummary() {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchSummary = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const summaryText = await getDailySummary(token);
        setSummary(summaryText);
      } catch (err) {
        console.error('Error fetching daily summary:', err);
        setError('Failed to load daily summary');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [token]);

  if (loading) {
    return (
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600 mr-3"></div>
          <span className="text-indigo-600 font-medium">Loading your daily summary...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
        <div className="flex items-center">
          <svg className="h-5 w-5 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-red-700">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-indigo-800 mb-2">
            🌟 Your AI Daily Summary
          </h3>
          <p className="text-indigo-700 leading-relaxed">
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DailySummary;