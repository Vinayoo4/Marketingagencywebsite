import { useEffect, useState } from 'react';
import { api, type Inquiry } from '../lib/api';

const LS_TOKEN = 'snma_admin_token';

const Admin = () => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(LS_TOKEN));
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState<'all' | Inquiry['status']>('all');

  const loadInquiries = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.adminInquiries();
      setInquiries(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load inquiries';
      setError(message);
      if (message.toLowerCase().includes('unauthorized') || message.toLowerCase().includes('session')) {
        localStorage.removeItem(LS_TOKEN);
        setToken(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      void loadInquiries();
    }
  }, [token]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await api.adminLogin(username, password);
      localStorage.setItem(LS_TOKEN, result.token);
      setToken(result.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const updateInquiry = async (id: string, payload: Partial<Pick<Inquiry, 'status' | 'admin_notes'>>) => {
    try {
      await api.adminUpdateInquiry(id, payload);
      await loadInquiries();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update inquiry');
    }
  };

  if (!token) {
    return (
      <div className="container py-16">
        <form onSubmit={handleLogin} className="service-card max-w-md mx-auto space-y-4">
          <h1 className="text-2xl font-semibold text-cyan-300">Admin login</h1>
          <input className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
          <input className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button className="btn btn-primary w-full" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
          <p className="text-xs text-slate-500">Default local credentials: admin / admin123</p>
        </form>
      </div>
    );
  }

  const visibleInquiries = filter === 'all' ? inquiries : inquiries.filter((item) => item.status === filter);

  return (
    <div className="container py-12">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="text-3xl font-bold">Inquiry dashboard</h1>
        <div className="flex items-center gap-3">
          <select className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm" value={filter} onChange={(e) => setFilter(e.target.value as 'all' | Inquiry['status'])}>
            <option value="all">All</option>
            <option value="new">New</option>
            <option value="in_progress">In progress</option>
            <option value="closed">Closed</option>
          </select>
          <button className="btn btn-secondary" onClick={() => void loadInquiries()} disabled={loading}>Refresh</button>
          <button className="btn btn-secondary" onClick={() => { localStorage.removeItem(LS_TOKEN); setToken(null); }}>Logout</button>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <div className="space-y-4">
        {visibleInquiries.map((inquiry) => (
          <article key={inquiry.id} className="service-card">
            <div className="grid gap-3 md:grid-cols-3">
              <div>
                <p className="font-semibold text-cyan-300">{inquiry.name}</p>
                <p className="text-sm text-slate-400">{inquiry.business_name}</p>
                <p className="text-xs text-slate-500 mt-1">{new Date(inquiry.created_at).toLocaleString('en-IN')}</p>
              </div>

              <div className="text-sm text-slate-300 space-y-1">
                <p>Email: {inquiry.email}</p>
                <p>Phone: {inquiry.phone}</p>
                <p>Stage: {inquiry.business_stage}</p>
                <p>Services: {inquiry.services_interested.join(', ') || '—'}</p>
              </div>

              <div>
                <select
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                  value={inquiry.status}
                  onChange={(e) => void updateInquiry(inquiry.id, { status: e.target.value as Inquiry['status'] })}
                >
                  <option value="new">New</option>
                  <option value="in_progress">In progress</option>
                  <option value="closed">Closed</option>
                </select>
                <textarea
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm min-h-24"
                  value={inquiry.admin_notes}
                  onChange={(e) => {
                    setInquiries((current) =>
                      current.map((item) =>
                        item.id === inquiry.id ? { ...item, admin_notes: e.target.value } : item
                      )
                    );
                  }}
                  onBlur={(e) => void updateInquiry(inquiry.id, { admin_notes: e.target.value })}
                />
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-300">{inquiry.message}</p>
          </article>
        ))}
        {visibleInquiries.length === 0 && <p className="text-sm text-slate-400">No inquiries found.</p>}
      </div>
    </div>
  );
};

export default Admin;
