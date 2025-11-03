// React page to view all eligibility submissions from the backend
import React, { useEffect, useState } from 'react';

interface Submission {
  id: number;
  data: any;
  created_at: string;
}

const SubmissionsPage: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/submissions')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch submissions');
        return res.json();
      })
      .then((data) => {
        setSubmissions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Eligibility Submissions</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Submission Data</th>
                <th className="border px-4 py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s.id}>
                  <td className="border px-4 py-2">{s.id}</td>
                  <td className="border px-4 py-2 text-xs whitespace-pre-wrap">
                    <pre>{JSON.stringify(s.data, null, 2)}</pre>
                  </td>
                  <td className="border px-4 py-2">{s.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubmissionsPage;
