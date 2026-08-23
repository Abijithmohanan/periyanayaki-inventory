import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { useInventory } from '../../context/InventoryContext';

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  product: '',
  quantityPurchased: '',
  customerType: 'Retail',
  paymentStatus: 'Pending',
  comments: '',
};

const BuyerForm = ({ open, onClose, onSave, initialData }) => {
  const { products } = useInventory();
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setFormData(initialData ? { ...emptyForm, ...initialData } : emptyForm);
      setErrors({});
    }
  }, [open, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Buyer name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    if (!formData.product) errs.product = 'Product is required';
    const qty = Number(formData.quantityPurchased);
    if (!formData.quantityPurchased || qty <= 0) errs.quantityPurchased = 'Enter a valid quantity';
    else {
      const selected = products.find((p) => p.name === formData.product);
      const baseline = initialData?.product === formData.product ? Number(initialData.quantityPurchased) || 0 : 0;
      if (selected && qty > selected.quantity + baseline) {
        errs.quantityPurchased = `Only ${selected.quantity + baseline} in stock`;
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({ ...formData, quantityPurchased: Number(formData.quantityPurchased) });
  };

  return (
    <Modal open={open} onClose={onClose} title={initialData?.id ? 'Edit Buyer' : 'Add New Buyer'} width={520}>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Buyer Name</label>
          <input name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Phone Number</label>
            <input name="phone" value={formData.phone} onChange={handleChange} />
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Product</label>
            <select name="product" value={formData.product} onChange={handleChange}>
              <option value="">Select product</option>
              {products.map((p) => (
                <option key={p.id} value={p.name}>{p.name} (Stock: {p.quantity})</option>
              ))}
            </select>
            {errors.product && <span className="form-error">{errors.product}</span>}
          </div>
          <div className="form-group">
            <label>Quantity Purchased</label>
            <input name="quantityPurchased" type="number" min="1" value={formData.quantityPurchased} onChange={handleChange} />
            {errors.quantityPurchased && <span className="form-error">{errors.quantityPurchased}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Customer Type</label>
            <select name="customerType" value={formData.customerType} onChange={handleChange}>
              <option value="Retail">Retail</option>
              <option value="Wholesale">Wholesale</option>
            </select>
          </div>
          <div className="form-group">
            <label>Payment Status</label>
            <select name="paymentStatus" value={formData.paymentStatus} onChange={handleChange}>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Partial">Partial</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Comments</label>
          <textarea name="comments" rows={3} value={formData.comments} onChange={handleChange} />
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">Save Buyer</button>
        </div>
      </form>
    </Modal>
  );
};

export default BuyerForm;
