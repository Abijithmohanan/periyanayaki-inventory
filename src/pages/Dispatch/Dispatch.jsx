import React, { useState, useMemo } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import EmptyState from '../../components/common/EmptyState';
import StatusBadge from '../../components/common/StatusBadge';
import ImageCarousel from '../../components/common/ImageCarousel';
import DispatchForm from '../../components/forms/DispatchForm';
import ConfirmDialog from '../../components/dialogs/ConfirmDialog';
import { useInventory } from '../../context/InventoryContext';
import { formatDate, MONTH_NAMES } from '../../utils/helpers';

const Dispatch = () => {
  const { dispatch, addDispatchRecord, updateDispatchRecord, deleteDispatchRecord } = useInventory();
  const [formOpen, setFormOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const [filterYear, setFilterYear] = useState('all');
  const [filterMonth, setFilterMonth] = useState('all');
  const [filterDate, setFilterDate] = useState('');

  const years = useMemo(() => {
    const set = new Set(dispatch.map((d) => new Date(d.dispatchDate).getFullYear()));
    return Array.from(set).sort((a, b) => b - a);
  }, [dispatch]);

  const filtered = useMemo(() => {
    return dispatch.filter((d) => {
      const dt = new Date(d.dispatchDate);
      if (filterDate) {
        return d.dispatchDate === filterDate;
      }
      if (filterYear !== 'all' && dt.getFullYear() !== Number(filterYear)) return false;
      if (filterMonth !== 'all' && dt.getMonth() !== Number(filterMonth)) return false;
      return true;
    });
  }, [dispatch, filterYear, filterMonth, filterDate]);

  const openAdd = () => {
    setEditingRecord(null);
    setFormOpen(true);
  };

  const openEdit = (record) => {
    setEditingRecord(record);
    setFormOpen(true);
  };

  const handleSave = (data) => {
    try {
      setErrorMsg('');
      if (editingRecord) {
        updateDispatchRecord(editingRecord.id, data);
      } else {
        addDispatchRecord(data);
      }
      setFormOpen(false);
      setEditingRecord(null);
    } catch (err) {
      setErrorMsg(err.message || 'Unable to save dispatch');
    }
  };

  const clearFilters = () => {
    setFilterYear('all');
    setFilterMonth('all');
    setFilterDate('');
  };

  return (
    <div>
      <PageHeader
        title="Dispatch Management"
        subtitle="Record and track outgoing shipments"
        actions={
          <div className="header-actions">
            <div className="filter-group">
              <select value={filterYear} onChange={(e) => { setFilterYear(e.target.value); setFilterDate(''); }}>
                <option value="all">All Years</option>
                {years.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
              <select value={filterMonth} onChange={(e) => { setFilterMonth(e.target.value); setFilterDate(''); }}>
                <option value="all">All Months</option>
                {MONTH_NAMES.map((m, i) => <option key={m} value={i}>{m}</option>)}
              </select>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                title="Filter by exact date"
              />
              {(filterYear !== 'all' || filterMonth !== 'all' || filterDate) && (
                <button className="btn btn-outline btn-sm" onClick={clearFilters}>Clear</button>
              )}
            </div>
            <button className="btn btn-primary" onClick={openAdd}>
              <Plus size={16} /> New Dispatch
            </button>
          </div>
        }
      />

      {errorMsg && <div className="alert-error">{errorMsg}</div>}

      {filtered.length === 0 ? (
        <EmptyState message="No dispatch records found" />
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>S.No</th>
                <th>Dispatch Date</th>
                <th>Product Name</th>
                <th>Delivery Mode</th>
                <th style={{ width: 100 }}>Proof</th>
                <th>Quantity</th>
                <th>Remarks</th>
                <th style={{ width: 110 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((record, idx) => (
                <tr key={record.id}>
                  <td>{idx + 1}</td>
                  <td>{formatDate(record.dispatchDate)}</td>
                  <td className="cell-title">{record.productName}</td>
                  <td><StatusBadge label={record.deliveryMode} tone="info" /></td>
                  <td><ImageCarousel images={record.photos} size={56} /></td>
                  <td>{record.quantity}</td>
                  <td>{record.remarks || '-'}</td>
                  <td>
                    <div className="row-actions">
                      <button className="icon-btn" title="Edit" onClick={() => openEdit(record)}>
                        <Pencil size={16} />
                      </button>
                      <button className="icon-btn danger" title="Delete" onClick={() => setDeleteTarget(record)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <DispatchForm
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditingRecord(null); setErrorMsg(''); }}
        onSave={handleSave}
        initialData={editingRecord}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && deleteDispatchRecord(deleteTarget.id)}
        title="Delete Dispatch Record"
        message="Deleting this record will restore the dispatched quantity back to inventory. Continue?"
      />
    </div>
  );
};

export default Dispatch;
