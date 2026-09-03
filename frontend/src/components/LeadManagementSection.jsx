import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Download,
  Trash2,
  ExternalLink,
  MessageSquare,
  RefreshCw,
  Save,
  CheckCircle,
  AlertCircle,
  Users,
  CheckSquare,
  Square,
  FileSpreadsheet,
  Globe,
  FileText
} from 'lucide-react';
import {
  fetchLeadsApi,
  deleteLeadApi,
  bulkDeleteLeadsApi,
  updateLeadStatusApi
} from '../services/api';

export default function LeadManagementSection({ siteData, onUpdateSiteData, authToken }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedPage, setSelectedPage] = useState('All');
  const [distinctPages, setDistinctPages] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [webhookUrl, setWebhookUrl] = useState(
    siteData?.leadSettings?.googleSheetWebhookUrl || siteData?.googleSheetWebhookUrl || ''
  );
  const [savingWebhook, setSavingWebhook] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, [selectedPage]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params = { limit: 500 };
      if (selectedPage !== 'All') {
        params.pageSource = selectedPage;
      }

      const data = await fetchLeadsApi(params, authToken);
      if (data && data.success) {
        setLeads(data.leads || []);
        if (data.distinctPages) {
          setDistinctPages(data.distinctPages);
        }
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWebhook = async () => {
    setSavingWebhook(true);
    try {
      const updatedLeadSettings = {
        ...siteData?.leadSettings,
        googleSheetWebhookUrl: webhookUrl.trim()
      };

      await onUpdateSiteData('leadSettings', updatedLeadSettings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert('Failed to save Webhook URL');
    } finally {
      setSavingWebhook(false);
    }
  };

  const handleDeleteSingle = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await deleteLeadApi(id, authToken);
      if (res && res.success) {
        setLeads(prev => prev.filter(l => l._id !== id));
        setSelectedIds(prev => prev.filter(item => item !== id));
      }
    } catch (err) {
      alert('Failed to delete lead');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} selected leads?`)) return;

    try {
      const res = await bulkDeleteLeadsApi(selectedIds, authToken);
      if (res && res.success) {
        setLeads(prev => prev.filter(l => !selectedIds.includes(l._id)));
        setSelectedIds([]);
      }
    } catch (err) {
      alert('Failed to bulk delete leads');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await updateLeadStatusApi(id, newStatus, authToken);
      if (res && res.success) {
        setLeads(prev => prev.map(l => l._id === id ? { ...l, status: newStatus } : l));
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredLeads.map(l => l._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleExportCSV = () => {
    if (filteredLeads.length === 0) {
      alert('No lead data to export.');
      return;
    }

    const headers = ['Date & Time', 'Name', 'Country Code', 'Phone Number', 'Full Phone', 'Source Page', 'Page URL'];
    const rows = filteredLeads.map(l => [
      `"${new Date(l.createdAt).toLocaleString()}"`,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.countryCode || '+91'}"`,
      `"${l.phone}"`,
      `"${l.fullPhone || (l.countryCode + ' ' + l.phone)}"`,
      `"${(l.pageSource || 'Website').replace(/"/g, '""')}"`,
      `"${l.pageUrl || '/'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `winera_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    if (filteredLeads.length === 0) {
      alert('No lead data to export to PDF.');
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Pop-up blocked. Please allow pop-ups for this site to export PDF.');
      return;
    }

    const rowsHtml = filteredLeads.map((l, index) => `
      <tr style="border-bottom: 1px solid #e2e8f0; ${index % 2 === 1 ? 'background-color: #f8fafc;' : ''}">
        <td style="padding: 10px; font-weight: 600; color: #64748b;">${index + 1}</td>
        <td style="padding: 10px; font-weight: 600; color: #334155;">${new Date(l.createdAt).toLocaleString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}</td>
        <td style="padding: 10px; font-weight: 800; color: #0f172a;">${l.name || 'N/A'}</td>
        <td style="padding: 10px; font-weight: 700; color: #0284c7;">${l.fullPhone || `${l.countryCode || '+91'} ${l.phone}`}</td>
        <td style="padding: 10px; font-weight: 700; color: #1e293b;">${l.pageSource || 'Website CTA'}</td>
      </tr>
    `).join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Winera_Leads_Report_${new Date().toISOString().slice(0, 10)}</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #0f172a; margin: 0; }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0284c7; padding-bottom: 16px; margin-bottom: 20px; }
            .title { font-size: 24px; font-weight: 900; color: #0284c7; margin: 0; }
            .subtitle { font-size: 13px; color: #64748b; margin-top: 4px; }
            .meta { font-size: 12px; color: #475569; text-align: right; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px; }
            th { background: #0284c7; color: #ffffff; padding: 12px 10px; text-align: left; font-weight: 800; }
            td { padding: 10px; }
            .footer { margin-top: 30px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px; }
            @media print {
              body { padding: 0; }
              @page { size: A4 portrait; margin: 1.5cm; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1 class="title">Winera International</h1>
              <div class="subtitle">Lead Inquiries & CTA Popup Dashboard Report</div>
            </div>
            <div class="meta">
              <div><strong>Total Leads:</strong> ${filteredLeads.length}</div>
              <div><strong>Generated On:</strong> ${new Date().toLocaleString()}</div>
              <div><strong>Filter Page:</strong> ${selectedPage}</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th style="width: 30px;">#</th>
                <th>Date & Time</th>
                <th>Client Name</th>
                <th>Phone Number</th>
                <th>Source Page</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>

          <div class="footer">
            Confidential Lead Report • Winera International Pvt Ltd
          </div>

          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const filteredLeads = leads.filter(l => {
    const query = search.toLowerCase().trim();
    if (!query) return true;
    return (
      (l.name && l.name.toLowerCase().includes(query)) ||
      (l.phone && l.phone.toLowerCase().includes(query)) ||
      (l.fullPhone && l.fullPhone.toLowerCase().includes(query)) ||
      (l.pageSource && l.pageSource.toLowerCase().includes(query))
    );
  });

  return (
    <div style={{ padding: '24px', background: '#f8fafc', minHeight: '100vh' }}>

      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', borderRadius: '20px', padding: '28px 32px', color: '#ffffff', marginBottom: '28px', boxShadow: '0 10px 25px rgba(2, 132, 199, 0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', marginBottom: '8px' }}>
              <Users style={{ width: '14px', height: '14px' }} />
              CTA POPUP LEADS & INQUIRIES
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '900', margin: 0 }}>
              Lead Management Dashboard
            </h2>
            <p style={{ fontSize: '14px', opacity: 0.9, margin: '4px 0 0' }}>
              Track inquiries from CTA banners and export to Excel/CSV or PDF with one click.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={handleExportCSV}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#ffffff',
                color: '#0284c7',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '12px',
                fontWeight: '800',
                fontSize: '13.5px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <Download style={{ width: '16px', height: '16px' }} />
              Export CSV / Excel
            </button>

            <button
              onClick={handleExportPDF}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#ffffff',
                color: '#0284c7',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '12px',
                fontWeight: '800',
                fontSize: '13.5px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <FileText style={{ width: '16px', height: '16px' }} />
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Toolbar: Search, Filter, Refresh & Bulk Actions */}
      <div style={{ background: '#ffffff', borderRadius: '20px', padding: '20px 24px', marginBottom: '24px', border: '1.5px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        
        {/* Search & Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', flex: 1 }}>
          <div style={{ position: 'relative', width: '280px' }}>
            <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '17px', height: '17px', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 40px',
                borderRadius: '12px',
                border: '1.5px solid #cbd5e1',
                fontSize: '13.5px',
                fontWeight: '600',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Filter Page Source */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Filter style={{ width: '16px', height: '16px', color: '#64748b' }} />
            <select
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1.5px solid #cbd5e1',
                background: '#f8fafc',
                fontSize: '13.5px',
                fontWeight: '700',
                color: '#0f172a',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="All">All Source Pages ({leads.length})</option>
              {distinctPages.map((page, idx) => (
                <option key={idx} value={page}>{page}</option>
              ))}
            </select>
          </div>

          <button
            onClick={fetchLeads}
            style={{
              background: '#f1f5f9',
              border: 'none',
              padding: '10px 14px',
              borderRadius: '12px',
              color: '#475569',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <RefreshCw style={{ width: '15px', height: '15px' }} />
            Refresh
          </button>
        </div>

        {/* Bulk Delete Button */}
        {selectedIds.length > 0 && (
          <button
            onClick={handleBulkDelete}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#ef4444',
              color: '#ffffff',
              border: 'none',
              padding: '10px 16px',
              borderRadius: '12px',
              fontWeight: '800',
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)'
            }}
          >
            <Trash2 style={{ width: '16px', height: '16px' }} />
            Delete Selected ({selectedIds.length})
          </button>
        )}
      </div>

      {/* Leads Table */}
      <div style={{ background: '#ffffff', borderRadius: '20px', border: '1.5px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#64748b', fontWeight: '600' }}>
            Loading lead inquiries...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
            <Users style={{ width: '48px', height: '48px', color: '#cbd5e1', marginBottom: '12px' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>No Leads Found</h4>
            <p style={{ fontSize: '13.5px', margin: 0 }}>Try clearing your search or selecting another source page filter.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0', color: '#475569', fontWeight: '800' }}>
                  <th style={{ padding: '14px 18px', width: '40px' }}>
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedIds.length > 0 && selectedIds.length === filteredLeads.length}
                      style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                    />
                  </th>
                  <th style={{ padding: '14px 18px' }}>Date & Time</th>
                  <th style={{ padding: '14px 18px' }}>Client Name</th>
                  <th style={{ padding: '14px 18px' }}>Phone Number</th>
                  <th style={{ padding: '14px 18px' }}>Source Page</th>
                  <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => {
                  const isSelected = selectedIds.includes(lead._id);
                  const cleanPhone = (lead.fullPhone || `${lead.countryCode || '+91'}${lead.phone}`).replace(/[^0-9]/g, '');
                  const whatsappLink = `https://wa.me/${cleanPhone}`;

                  return (
                    <tr
                      key={lead._id}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        background: isSelected ? '#f0f9ff' : 'transparent',
                        transition: 'background 0.15s ease'
                      }}
                    >
                      {/* Checkbox */}
                      <td style={{ padding: '14px 18px' }}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(lead._id)}
                          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                        />
                      </td>

                      {/* Date & Time */}
                      <td style={{ padding: '14px 18px', color: '#64748b', fontWeight: '600', whitespace: 'nowrap' }}>
                        {new Date(lead.createdAt).toLocaleString('en-IN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </td>

                      {/* Name */}
                      <td style={{ padding: '14px 18px', color: '#0f172a', fontWeight: '800' }}>
                        {lead.name}
                      </td>

                      {/* Phone & WhatsApp Action */}
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontWeight: '700', color: '#1e293b' }}>
                            {lead.fullPhone || `${lead.countryCode || '+91'} ${lead.phone}`}
                          </span>
                          <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noreferrer"
                            title="Open WhatsApp Chat"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '30px',
                              height: '30px',
                              borderRadius: '50%',
                              background: '#25D366',
                              color: '#ffffff',
                              textDecoration: 'none',
                              boxShadow: '0 3px 8px rgba(37, 211, 102, 0.35)',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.483 1.332 5.001L2 22l5.127-1.341c1.464.798 3.116 1.218 4.881 1.218h.004c5.507 0 9.99-4.478 9.99-9.985 0-2.667-1.039-5.176-2.924-7.06C17.194 3.04 14.68 2 12.012 2zm5.836 14.28c-.244.688-1.226 1.282-1.696 1.349-.47.067-1.077.106-3.486-.889-3.078-1.272-5.068-4.417-5.221-4.62-.153-.204-1.246-1.657-1.246-3.161 0-1.504.787-2.245 1.066-2.551.279-.306.608-.382.812-.382.203 0 .407.002.585.01.192.008.452-.072.706.536.255.609.865 2.115.942 2.268.076.153.127.33.025.534-.102.204-.153.33-.306.51-.153.178-.321.398-.458.535-.153.153-.313.319-.134.625.178.306.79 1.305 1.696 2.112 1.164 1.037 2.148 1.36 2.454 1.513.306.153.484.128.663-.076.178-.204.764-.891.968-1.196.204-.306.408-.255.688-.153.28.102 1.782.84 2.087.993.306.153.509.229.585.357.076.127.076.738-.168 1.426z"/>
                            </svg>
                          </a>
                        </div>
                      </td>

                      {/* Source Page Tag */}
                      <td style={{ padding: '14px 18px' }}>
                        <span style={{
                          display: 'inline-block',
                          background: '#e0f2fe',
                          color: '#0284c7',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '800'
                        }}>
                          {lead.pageSource || 'Website CTA'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <button
                          onClick={() => handleDeleteSingle(lead._id)}
                          title="Delete Lead"
                          style={{
                            background: '#fef2f2',
                            border: 'none',
                            color: '#ef4444',
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s'
                          }}
                        >
                          <Trash2 style={{ width: '16px', height: '16px' }} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
