import React, { useState, useMemo } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import SearchBar from '../../components/common/SearchBar';
import EmptyState from '../../components/common/EmptyState';
import StatusBadge from '../../components/common/StatusBadge';
import BuyerForm from '../../components/forms/BuyerForm';
import ConfirmDialog from '../../components/dialogs/ConfirmDialog';
import { useInventory } from '../../context/InventoryContext';
import { formatDate } from '../../utils/helpers';

const paymentTone = { Paid: 'success', Pending: 'warning', Partial: 'info' };

const Buyers = () => {
  const { buyers, addBuyer, updateBuyer, deleteBuyer } = useInventory();
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingBuyer, setEditingBuyer] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return buyers;
    return buyers.filter((b) => b.name.toLowerCase().includes(term) || b.product.toLowerCase().includes(term));
  }, [buyers, search]);

  const openAdd = () => {
    setEditingBuyer(null);
    setFormOpen(true);
  };

  const openEdit = (buyer) => {
    setEditingBuyer(buyer);
    setFormOpen(true);
  };

  const handleSave = (data) => {
    try {
      setErrorMsg('');
      if (editingBuyer) {
        updateBuyer(editingBuyer.id, data);
      } else {
        addBuyer(data);
      }
      setFormOpen(false);
      setEditingBuyer(null);
    } catch (err) {
      setErrorMsg(err.message || 'Unable to save buyer');
    }
  };

  return (
    <div>
      <PageHeader
        title="Buyers"
        subtitle="Manage customer purchase records"
        actions={
          <div className="header-actions">
            <SearchBar value={search} onChange={setSearch} placeholder="Search by name or product" />
            <button className="btn btn-primary" onClick={openAdd}>
              <Plus size={16} /> Add Buyer
            </button>
          </div>
        }
      />

      {errorMsg && <div className="alert-error">{errorMsg}</div>}

      {filtered.length === 0 ? (
        <EmptyState message="No buyers found" />
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>S.No</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Type</th>
                <th>Payment</th>
                <th>Booking Date</th>
                <th style={{ width: 110 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((buyer, idx) => (
                <tr key={buyer.id}>
                  <td>{idx + 1}</td>
                  <td className="cell-title">{buyer.name}</td>
                  <td>{buyer.phone}</td>
                  <td>{buyer.product}</td>
                  <td>{buyer.quantityPurchased}</td>
                  <td>{buyer.customerType}</td>
                  <td><StatusBadge label={buyer.paymentStatus} tone={paymentTone[buyer.paymentStatus] || 'neutral'} /></td>
                  <td>{formatDate(buyer.bookingDate)}</td>
                  <td>
                    <div className="row-actions">
                      <button className="icon-btn" title="Edit" onClick={() => openEdit(buyer)}>
                        <Pencil size={16} />
                      </button>
                      <button className="icon-btn danger" title="Delete" onClick={() => setDeleteTarget(buyer)}>
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

      <BuyerForm
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditingBuyer(null); setErrorMsg(''); }}
        onSave={handleSave}
        initialData={editingBuyer}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && deleteBuyer(deleteTarget.id)}
        title="Delete Buyer"
        message={`Delete "${deleteTarget?.name}"? Their purchased quantity will be returned to inventory.`}
      />
    </div>
  );
};

export default Buyers;
