import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, RefreshCw, Search, Inbox, Clock, CheckCircle, Mail, Phone, User, Building2 } from 'lucide-react';
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
  const [search, setSearch] = useState('');

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

  const getStatusBadge = (status: Inquiry['status']) => {
    switch (status) {
      case 'new': return <span className="status-badge status-badge-new"><Inbox className="w-3 h-3 mr-1" />New</span>;
      case 'in_progress': return <span className="status-badge status-badge-progress"><Clock className="w-3 h-3 mr-1" />In Progress</span>;
      case 'closed': return <span className="status-badge status-badge-closed"><CheckCircle className="w-3 h-3 mr-1" />Closed</span>;
    }
  };

  if (!token) {
    return (
      <div className="container py-16 md:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center mx-auto shadow-xl shadow-cyan-500/20 animate-float">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-white font-display">Admin Login</h1>
            <p className="mt-1 text-sm text-slate-400">Sign in to manage inquiries</p>
          </div>

          <form onSubmit={handleLogin} className="glass-card p-6 space-y-4">
            <div>
              <input
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-cyan-400/50 focus:bg-white/10 focus:ring-2 focus:ring-cyan-400/20"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </div>
            <div>
              <input
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-cyan-400/50 focus:bg-white/10 focus:ring-2 focus:ring-cyan-400/20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
              />
            </div>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-400 bg-red-500/10 rounded-xl px-4 py-3"
              >
                {error}
              </motion.div>
            )}
            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
            <p className="text-xs text-slate-500 text-center">Default: admin / admin123</p>
          </form>
        </motion.div>
      </div>
    );
  }

  const visibleInquiries = inquiries
    .filter((item) => filter === 'all' || item.status === filter)
    .filter(
      (item) =>
        !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.business_name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
    );

  const stats = {
    total: inquiries.length,
    new: inquiries.filter((i) => i.status === 'new').length,
    inProgress: inquiries.filter((i) => i.status === 'in_progress').length,
    closed: inquiries.filter((i) => i.status === 'closed').length,
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white font-display">Inquiry Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">{inquiries.length} total inquiries</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="btn btn-secondary text-sm px-4 py-2"
            onClick={() => void loadInquiries()}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            className="btn bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 text-sm px-4 py-2 rounded-xl transition-all"
            onClick={() => { localStorage.removeItem(LS_TOKEN); setToken(null); }}
          >
            <LogOut className="w-4 h-4 mr-1.5" />
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total', value: stats.total, color: 'from-cyan-400 to-blue-500' },
          { label: 'New', value: stats.new, color: 'from-blue-400 to-blue-500' },
          { label: 'In Progress', value: stats.inProgress, color: 'from-amber-400 to-orange-500' },
          { label: 'Closed', value: stats.closed, color: 'from-emerald-400 to-green-500' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-4 text-center">
            <p className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent font-display`}>
              {stat.value}
            </p>
            <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 transition-all focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
            placeholder="Search inquiries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1">
          {(['all', 'new', 'in_progress', 'closed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 text-xs rounded-lg transition-all ${
                filter === f
                  ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-300 border border-cyan-400/30'
                  : 'text-slate-400 border border-white/5 hover:border-white/10'
              }`}
            >
              {f === 'all' ? 'All' : f === 'in_progress' ? 'Progress' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-sm text-red-400 bg-red-500/10 rounded-xl px-4 py-3"
        >
          {error}
        </motion.div>
      )}

      <div className="space-y-4">
        {visibleInquiries.map((inquiry, idx) => (
          <motion.article
            key={inquiry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.03 }}
            className="glass-card p-5 md:p-6"
          >
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold text-white">{inquiry.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Building2 className="w-3.5 h-3.5" />
                  {inquiry.business_name}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Mail className="w-3.5 h-3.5" />
                  {inquiry.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Phone className="w-3.5 h-3.5" />
                  {inquiry.phone}
                </div>
                <p className="text-xs text-slate-500">Stage: {inquiry.business_stage}</p>
                <p className="text-xs text-slate-500">
                  {new Date(inquiry.created_at).toLocaleString('en-IN')}
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {inquiry.services_interested.map((s) => (
                    <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>{getStatusBadge(inquiry.status)}</div>
                </div>
                <p className="text-sm text-slate-300 bg-white/5 rounded-xl p-4 leading-relaxed">{inquiry.message}</p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Status</label>
                    <select
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white transition-all focus:border-cyan-400/50"
                      value={inquiry.status}
                      onChange={(e) => void updateInquiry(inquiry.id, { status: e.target.value as Inquiry['status'] })}
                    >
                      <option value="new">New</option>
                      <option value="in_progress">In Progress</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Admin Notes</label>
                    <textarea
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white transition-all focus:border-cyan-400/50 min-h-20 resize-y"
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
              </div>
            </div>
          </motion.article>
        ))}
        {visibleInquiries.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Inbox className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No inquiries found.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Admin;
