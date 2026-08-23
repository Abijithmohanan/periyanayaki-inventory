export const formatCurrency = (amount) => {
  const value = Number(amount) || 0;
  return '₹' + value.toLocaleString('en-IN', { maximumFractionDigits: 0 });
};

export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const isLowStock = (quantity) => Number(quantity) <= 1;

export const getStockStatus = (quantity) => {
  if (Number(quantity) === 0) return 'Out of Stock';
  if (Number(quantity) <= 1) return 'Low Stock';
  return 'In Stock';
};

export const truncateText = (text, length) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
