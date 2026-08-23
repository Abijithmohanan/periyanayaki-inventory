import React from 'react';
import { Package, AlertTriangle, XCircle, Users, Clock, Truck, IndianRupee } from 'lucide-react';
import DashboardCard from '../../components/cards/DashboardCard';
import PageHeader from '../../components/common/PageHeader';
import StatusBadge from '../../components/common/StatusBadge';
import { useInventory } from '../../context/InventoryContext';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency, formatDate } from '../../utils/helpers';
import mainLogo from '../../assets/main-logo.png';

const Dashboard = () => {
  const { products, buyers, dispatch, getDashboardStats } = useInventory();
  const { user } = useAuth();
  const stats = getDashboardStats();

  const lowStockProducts = products.filter((p) => p.quantity <= 1);
  const recentDispatches = [...dispatch].reverse().slice(0, 5);
  const inventoryValue = products.reduce((sum, p) => sum + p.quantity * p.customerPrice, 0);

  return (
    <div>
      <div className="dashboard-hero">
        <img src={mainLogo} alt="Periyanayaki Kitchen Engineering" className="dashboard-hero-logo" />
        <div>
          <h2>Periyanayaki Kitchen Engineering</h2>
          <p>Crafting reliable commercial kitchen machinery since 1987.</p>
        </div>
      </div>

      <PageHeader
        title="Dashboard"
        subtitle={`Welcome back, ${user?.fullName || 'there'}. Here's your inventory overview.`}
        showLogo={false}
      />

      <div className="stat-grid">
        <DashboardCard title="Total Products" value={stats.totalProducts} icon={Package} color="#2563EB" />
        <DashboardCard title="Available Products" value={stats.availableProducts} icon={Package} color="#22C55E" />
        <DashboardCard title="Low Stock" value={stats.lowStock} icon={AlertTriangle} color="#F59E0B" />
        <DashboardCard title="Out of Stock" value={stats.outOfStock} icon={XCircle} color="#EF4444" />
      </div>

      <div className="stat-grid" style={{ marginTop: 16 }}>
        <DashboardCard title="Total Buyers" value={stats.totalBuyers} icon={Users} color="#8B5CF6" />
        <DashboardCard title="Pending Payments" value={stats.pendingPayments} icon={Clock} color="#F59E0B" />
        <DashboardCard title="Total Dispatches" value={stats.totalDispatches} icon={Truck} color="#06B6D4" />
        <DashboardCard title="Inventory Value" value={formatCurrency(inventoryValue)} icon={IndianRupee} color="#EC4899" />
      </div>

      {lowStockProducts.length > 0 && (
        <div className="panel">
          <h3 className="panel-title">⚠️ Low Stock Alert</h3>
          <div className="chip-row">
            {lowStockProducts.map((p) => (
              <span key={p.id} className="chip chip-danger">
                {p.name} — {p.quantity} left
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="panel">
        <h3 className="panel-title">Recent Dispatches</h3>
        {recentDispatches.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No dispatches recorded yet.</p>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Product</th>
                  <th>Mode</th>
                  <th>Quantity</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {recentDispatches.map((d) => (
                  <tr key={d.id}>
                    <td>{formatDate(d.dispatchDate)}</td>
                    <td>{d.productName}</td>
                    <td><StatusBadge label={d.deliveryMode} tone="info" /></td>
                    <td>{d.quantity}</td>
                    <td>{d.remarks || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
