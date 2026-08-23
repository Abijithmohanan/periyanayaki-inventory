import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import ImageUploader from '../common/ImageUploader';
import { useInventory } from '../../context/InventoryContext';

const DELIVERY_MODES = ['Booking', 'Direct'];

const emptyForm = () => ({
  dispatchDate: new Date().toISOString().split('T')[0],
  productName: '',
  deliveryMode: 'Booking',
  customDeliveryMode: '',
  photos: [],
  quantity: '',
  remarks: '',
});

const DispatchForm = ({ open, onClose, onSave, initialData }) => {
  const { products } = useInventory();
  const [formData, setFormData] = useState(emptyForm());
  const [useCustomMode, setUseCustomMode] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      if (initialData) {
        const isPreset = DELIVERY_MODES.includes(initialData.deliveryMode);
        setUseCustomMode(!isPreset);
        setFormData({
          ...emptyForm(),
          ...initialData,
          customDeliveryMode: isPreset ? '' : initialData.deliveryMode,
          deliveryMode: isPreset ? initialData.deliveryMode : 'Other',
        });
      } else {
        setFormData(emptyForm());
        setUseCustomMode(false);
      }
      setErrors({});
    }
  }, [open, initialData]);

  const selectedProduct = products.find((p) => p.name === formData.productName);
  const availableStock = selectedProduct
    ? selectedProduct.quantity + (initialData?.productName === formData.productName ? Number(initialData.quantity) || 0 : 0)
    : 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'deliveryMode') {
      setUseCustomMode(value === 'Other');
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.dispatchDate) errs.dispatchDate = 'Dispatch date is required';
    if (!formData.productName) errs.productName = 'Select a product';
    const finalMode = useCustomMode ? formData.customDeliveryMode.trim() : formData.deliveryMode;
    if (!finalMode) errs.deliveryMode = 'Delivery mode is required';
    const qty = Number(formData.quantity);
    if (!formData.quantity || qty <= 0) errs.quantity = 'Enter a valid quantity';
    else if (selectedProduct && qty > availableStock) errs.quantity = `Only ${availableStock} in stock`;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const finalMode = useCustomMode ? formData.customDeliveryMode.trim() : formData.deliveryMode;
    onSave({
      dispatchDate: formData.dispatchDate,
      productName: formData.productName,
      deliveryMode: finalMode,
      photos: formData.photos,
      quantity: Number(formData.quantity),
      remarks: formData.remarks,
    });
  };

  return (
    <Modal open={open} onClose={onClose} title={initialData?.id ? 'Edit Dispatch' : 'New Dispatch'} width={580}>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <div className="form-group">
            <label>Dispatch Date</label>
            <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} />
            {errors.dispatchDate && <span className="form-error">{errors.dispatchDate}</span>}
          </div>
          <div className="form-group">
            <label>Product</label>
            <select name="productName" value={formData.productName} onChange={handleChange}>
              <option value="">Select product</option>
              {products.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name} (Stock: {p.quantity})
                </option>
              ))}
            </select>
            {errors.productName && <span className="form-error">{errors.productName}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Delivery Mode</label>
            <select name="deliveryMode" value={useCustomMode ? 'Other' : formData.deliveryMode} onChange={handleChange}>
              {DELIVERY_MODES.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
              <option value="Other">Other (custom)</option>
            </select>
            {useCustomMode && (
              <input
                style={{ marginTop: 8 }}
                name="customDeliveryMode"
                value={formData.customDeliveryMode}
                onChange={handleChange}
                placeholder="Enter delivery mode"
              />
            )}
            {errors.deliveryMode && <span className="form-error">{errors.deliveryMode}</span>}
          </div>
          <div className="form-group">
            <label>Quantity Dispatched</label>
            <input name="quantity" type="number" min="1" value={formData.quantity} onChange={handleChange} placeholder="0" />
            {selectedProduct && <span className="form-hint">Available stock: {availableStock}</span>}
            {errors.quantity && <span className="form-error">{errors.quantity}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Dispatch Photo / Proof</label>
          <ImageUploader images={formData.photos} onChange={(imgs) => setFormData((prev) => ({ ...prev, photos: imgs }))} />
        </div>

        <div className="form-group">
          <label>Remarks / Notes</label>
          <textarea name="remarks" rows={3} value={formData.remarks} onChange={handleChange} placeholder="Tracking ID, driver details, delivery notes..." />
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">Save Dispatch</button>
        </div>
      </form>
    </Modal>
  );
};

export default DispatchForm;
