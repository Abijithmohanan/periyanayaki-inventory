import React, { useState } from 'react';
import { PlusCircle, Check } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import EmptyState from '../../components/common/EmptyState';
import StatusBadge from '../../components/common/StatusBadge';
import ProductDetailModal from '../../components/common/ProductDetailModal';
import { useInventory } from '../../context/InventoryContext';
import { isLowStock } from '../../utils/helpers';

const RestockCell = ({ product, onSave }) => {
  const [amount, setAmount] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const qty = Number(amount);
    if (!qty || qty <= 0) return;
    onSave(product.id, qty);
    setAmount('');
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="restock-cell">
      <button
        type="button"
        className="stepper-btn"
        onClick={() => setAmount((prev) => String((Number(prev) || 0) + 1))}
      >
        +
      </button>
      <input
        type="number"
        min="0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="0"
        className="restock-input"
      />
      <button type="button" className="btn btn-primary btn-sm" onClick={handleSave} disabled={!amount || Number(amount) <= 0}>
        {saved ? <Check size={14} /> : <PlusCircle size={14} />}
        {saved ? 'Saved' : 'Save'}
      </button>
    </div>
  );
};

const Inventory = () => {
  const { products, restockProduct } = useInventory();
  const [viewProduct, setViewProduct] = useState(null);

  return (
    <div>
      <PageHeader title="Inventory Management" subtitle="Track and restock current stock levels" />

      {products.length === 0 ? (
        <EmptyState message="No products in inventory" />
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>S.No</th>
                <th>Product Name</th>
                <th style={{ width: 150 }}>Current Stock</th>
                <th style={{ width: 260 }}>Add / Restock Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => {
                const low = isLowStock(product.quantity);
                return (
                  <tr
                    key={product.id}
                    className={'row-clickable' + (low ? ' row-low-stock' : '')}
                    onClick={() => setViewProduct(product)}
                  >
                    <td>{idx + 1}</td>
                    <td>
                      <div className="cell-title">{product.name}</div>
                      {low && <StatusBadge label="Low Stock" tone="danger" />}
                    </td>
                    <td>
                      <span className={low ? 'qty-badge qty-low' : 'qty-badge'}>{product.quantity}</span>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <RestockCell product={product} onSave={restockProduct} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <ProductDetailModal
        open={!!viewProduct}
        onClose={() => setViewProduct(null)}
        product={viewProduct}
      />
    </div>
  );
};

export default Inventory;
