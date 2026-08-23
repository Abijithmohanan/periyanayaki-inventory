import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import ImageUploader from '../common/ImageUploader';

const emptyForm = {
  name: '',
  customerPrice: '',
  dealerPrice: '',
  quantity: '',
  images: [],
};

const ProductForm = ({ open, onClose, onSave, initialData }) => {
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
    if (!formData.name.trim()) errs.name = 'Machine name is required';
    if (formData.customerPrice === '' || Number(formData.customerPrice) < 0) errs.customerPrice = 'Enter a valid customer price';
    if (formData.dealerPrice === '' || Number(formData.dealerPrice) < 0) errs.dealerPrice = 'Enter a valid dealer price';
    if (formData.quantity === '' || Number(formData.quantity) < 0) errs.quantity = 'Enter a valid quantity';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      ...formData,
      customerPrice: Number(formData.customerPrice),
      dealerPrice: Number(formData.dealerPrice),
      quantity: Number(formData.quantity),
    });
  };

  return (
    <Modal open={open} onClose={onClose} title={initialData?.id ? 'Edit Product' : 'Add Product'} width={560}>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Machine Name</label>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Diesel Water Pump 5HP" />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Customer Price (₹)</label>
            <input name="customerPrice" type="number" min="0" value={formData.customerPrice} onChange={handleChange} placeholder="0" />
            {errors.customerPrice && <span className="form-error">{errors.customerPrice}</span>}
          </div>
          <div className="form-group">
            <label>Dealer Price (₹)</label>
            <input name="dealerPrice" type="number" min="0" value={formData.dealerPrice} onChange={handleChange} placeholder="0" />
            {errors.dealerPrice && <span className="form-error">{errors.dealerPrice}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Current Quantity</label>
          <input name="quantity" type="number" min="0" value={formData.quantity} onChange={handleChange} placeholder="0" />
          {errors.quantity && <span className="form-error">{errors.quantity}</span>}
        </div>

        <div className="form-group">
          <label>Machine Images</label>
          <ImageUploader images={formData.images} onChange={(imgs) => setFormData((prev) => ({ ...prev, images: imgs }))} />
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">Save Product</button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductForm;
