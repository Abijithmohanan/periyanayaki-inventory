import React, { useState, useMemo } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import SearchBar from '../../components/common/SearchBar';
import EmptyState from '../../components/common/EmptyState';
import StatusBadge from '../../components/common/StatusBadge';
import ImageCarousel from '../../components/common/ImageCarousel';
import ProductForm from '../../components/forms/ProductForm';
import ConfirmDialog from '../../components/dialogs/ConfirmDialog';
import ProductDetailModal from '../../components/common/ProductDetailModal';
import { useInventory } from '../../context/InventoryContext';
import { formatCurrency, isLowStock } from '../../utils/helpers';

const Products = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useInventory();
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return products;
    return products.filter((p, idx) => {
      const sNo = String(idx + 1);
      return p.name.toLowerCase().includes(term) || sNo.includes(term);
    });
  }, [products, search]);

  const openAdd = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const handleSave = async (data) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, data);
    } else {
      await addProduct(data);
    }
    setFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <div>
      <PageHeader
        title="Product List"
        subtitle="Manage machines and tools in your catalog"
        actions={
          <div className="header-actions">
            <SearchBar value={search} onChange={setSearch} placeholder="Search by S.No or Machine Name" />
            <button className="btn btn-primary" onClick={openAdd}>
              <Plus size={16} /> Add Product
            </button>
          </div>
        }
      />

      {filtered.length === 0 ? (
        <EmptyState message="No products found" />
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>S.No</th>
                <th style={{ width: 100 }}>Image</th>
                <th>Machine Name</th>
                <th>Customer Price</th>
                <th>Dealer Price</th>
                <th>Current Qty</th>
                <th style={{ width: 110 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product, idx) => (
                <tr
                  key={product.id}
                  className={'row-clickable' + (isLowStock(product.quantity) ? ' row-low-stock' : '')}
                  onClick={() => setViewProduct(product)}
                >
                  <td>{idx + 1}</td>
                  <td><ImageCarousel images={product.images} size={64} /></td>
                  <td>
                    <div className="cell-title">{product.name}</div>
                    {isLowStock(product.quantity) && <StatusBadge label="Low Stock" tone="danger" />}
                  </td>
                  <td>{formatCurrency(product.customerPrice)}</td>
                  <td>{formatCurrency(product.dealerPrice)}</td>
                  <td>
                    <span className={isLowStock(product.quantity) ? 'qty-badge qty-low' : 'qty-badge'}>
                      {product.quantity}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions" onClick={(e) => e.stopPropagation()}>
                      <button className="icon-btn" title="Edit" onClick={() => openEdit(product)}>
                        <Pencil size={16} />
                      </button>
                      <button className="icon-btn danger" title="Delete" onClick={() => setDeleteTarget(product)}>
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

      <ProductForm
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditingProduct(null); }}
        onSave={handleSave}
        initialData={editingProduct}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && deleteProduct(deleteTarget.id)}
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
      />

      <ProductDetailModal
        open={!!viewProduct}
        onClose={() => setViewProduct(null)}
        product={viewProduct}
      />
    </div>
  );
};

export default Products;