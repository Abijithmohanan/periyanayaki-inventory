import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [dispatch, setDispatch] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------- Fetch All Data ----------
  const fetchAllData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error('Fetch Error:', error);
      } else if (data) {
        setProducts(
          data.map((p) => ({
            id: p.id,
            name: p.name,
            customerPrice: Number(p.customer_price) || 0,
            dealerPrice: Number(p.dealer_price) || 0,
            quantity: Number(p.quantity) || 0,
            images: Array.isArray(p.images) ? p.images : [],
            createdAt: p.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
          }))
        );
      }

      const { data: dispData } = await supabase
        .from('dispatches')
        .select('*')
        .order('created_at', { ascending: false });

      if (dispData) {
        setDispatch(
          dispData.map((d) => ({
            id: d.id,
            dispatchDate: d.dispatch_date,
            productName: d.product_name,
            deliveryMode: d.delivery_mode,
            photos: Array.isArray(d.images) ? d.images : [],
            quantity: Number(d.quantity) || 1,
            remarks: d.remarks || '',
          }))
        );
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // ---------- Products ----------
  const addProduct = async (product) => {
    try {
      const payload = {
        name: product.name || 'Unnamed Product',
        customer_price: Number(product.customerPrice || product.customer_price || 0),
        dealer_price: Number(product.dealerPrice || product.dealer_price || 0),
        quantity: Number(product.quantity || 0),
        images: Array.isArray(product.images) ? product.images : [],
      };

      const { data, error } = await supabase.from('products').insert([payload]).select();

      if (error) {
        console.error('Insert error details:', error);
        alert('Supabase Insert Error: ' + (error.message || JSON.stringify(error)));
        return null;
      }

      if (data && data.length > 0) {
        const created = {
          id: data[0].id,
          name: data[0].name,
          customerPrice: Number(data[0].customer_price),
          dealerPrice: Number(data[0].dealer_price),
          quantity: Number(data[0].quantity),
          images: data[0].images || [],
          createdAt: data[0].created_at?.split('T')[0],
        };
        setProducts((prev) => [...prev, created]);
        return created;
      }
    } catch (e) {
      console.error('Unexpected error:', e);
      alert('Error: ' + e.message);
    }
  };

  const updateProduct = async (id, updates) => {
    const payload = {};
    if (updates.name !== undefined) payload.name = updates.name;
    if (updates.customerPrice !== undefined) payload.customer_price = Number(updates.customerPrice);
    if (updates.dealerPrice !== undefined) payload.dealer_price = Number(updates.dealerPrice);
    if (updates.quantity !== undefined) payload.quantity = Number(updates.quantity);
    if (updates.images !== undefined) payload.images = updates.images;

    const { error } = await supabase.from('products').update(payload).eq('id', id);
    if (!error) {
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    }
  };

  const deleteProduct = async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const restockProduct = async (id, amount) => {
    const qty = Number(amount);
    if (!qty || qty <= 0) return;

    const current = products.find((p) => p.id === id);
    if (!current) return;

    const newQty = current.quantity + qty;
    const { error } = await supabase.from('products').update({ quantity: newQty }).eq('id', id);
    if (!error) {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, quantity: newQty } : p))
      );
    }
  };

  // ---------- Buyers ----------
  const addBuyer = (buyer) => {
    const newBuyer = {
      ...buyer,
      id: Date.now(),
      bookingDate: new Date().toISOString().split('T')[0],
    };
    setBuyers((prev) => [...prev, newBuyer]);
    return newBuyer;
  };

  const updateBuyer = (id, updates) => {
    setBuyers((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  };

  const deleteBuyer = (id) => {
    setBuyers((prev) => prev.filter((b) => b.id !== id));
  };

  // ---------- Dispatch ----------
  const addDispatchRecord = async (record) => {
    const qty = Number(record.quantity) || 0;
    const payload = {
      dispatch_date: record.dispatchDate || new Date().toISOString().split('T')[0],
      product_name: record.productName,
      delivery_mode: record.deliveryMode,
      images: Array.isArray(record.photos) ? record.photos : [],
      quantity: qty,
      remarks: record.remarks || '',
    };

    const { data, error } = await supabase.from('dispatches').insert([payload]).select();
    if (error) {
      alert('Error saving dispatch: ' + error.message);
      return null;
    }

    if (data && data.length > 0) {
      const created = {
        id: data[0].id,
        dispatchDate: data[0].dispatch_date,
        productName: data[0].product_name,
        deliveryMode: data[0].delivery_mode,
        photos: data[0].images || [],
        quantity: Number(data[0].quantity),
        remarks: data[0].remarks || '',
      };

      setDispatch((prev) => [created, ...prev]);

      const matched = products.find((p) => p.name === record.productName);
      if (matched) {
        const remaining = Math.max(0, matched.quantity - qty);
        await updateProduct(matched.id, { quantity: remaining });
      }
      return created;
    }
  };

  const updateDispatchRecord = async (id, updates) => {
    const payload = {};
    if (updates.dispatchDate !== undefined) payload.dispatch_date = updates.dispatchDate;
    if (updates.productName !== undefined) payload.product_name = updates.productName;
    if (updates.deliveryMode !== undefined) payload.delivery_mode = updates.deliveryMode;
    if (updates.quantity !== undefined) payload.quantity = Number(updates.quantity);
    if (updates.remarks !== undefined) payload.remarks = updates.remarks;
    if (updates.photos !== undefined) payload.images = updates.photos;

    const { error } = await supabase.from('dispatches').update(payload).eq('id', id);
    if (!error) {
      setDispatch((prev) => prev.map((d) => (d.id === id ? { ...d, ...updates } : d)));
    }
  };

  const deleteDispatchRecord = async (id) => {
    const { error } = await supabase.from('dispatches').delete().eq('id', id);
    if (!error) {
      setDispatch((prev) => prev.filter((d) => d.id !== id));
    }
  };

  // ---------- Dashboard Stats ----------
  const getDashboardStats = () => {
    const totalProducts = products.length;
    const availableProducts = products.filter((p) => p.quantity > 0).length;
    const lowStock = products.filter((p) => p.quantity > 0 && p.quantity <= 1).length;
    const outOfStock = products.filter((p) => p.quantity === 0).length;
    const totalBuyers = buyers.length;
    const pendingPayments = buyers.filter((b) => b.paymentStatus === 'Pending' || b.paymentStatus === 'Partial').length;
    const totalDispatches = dispatch.length;

    return { totalProducts, availableProducts, lowStock, outOfStock, totalBuyers, pendingPayments, totalDispatches };
  };

  return (
    <InventoryContext.Provider
      value={{
        products,
        buyers,
        dispatch,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        restockProduct,
        addBuyer,
        updateBuyer,
        deleteBuyer,
        addDispatchRecord,
        updateDispatchRecord,
        deleteDispatchRecord,
        getDashboardStats,
        refreshData: fetchAllData,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) throw new Error('useInventory must be used within InventoryProvider');
  return context;
};