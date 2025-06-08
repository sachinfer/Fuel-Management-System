import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

function Layout() {
  return (
    <div className="dashboard-layout">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h3>Fuel Management</h3>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/dashboard" className="sidebar-link">Dashboard</Link></li>
          <h4>Operations</h4>
          <li><Link to="/dashboard/fuel-ordering" className="sidebar-link">Fuel Ordering</Link></li>
          <li><Link to="/dashboard/tank-management" className="sidebar-link">Tank Management</Link></li>
          <li><Link to="/dashboard/point-of-sale" className="sidebar-link">Point of Sale</Link></li>
          <li><Link to="/dashboard/cash-settlement" className="sidebar-link">Cash Settlement</Link></li>
          <h4>Human Resources</h4>
          <li><Link to="/dashboard/staff-management" className="sidebar-link">Staff Management</Link></li>
          <li><Link to="/dashboard/attendance" className="sidebar-link">Attendance</Link></li>
          <h4>Reporting</h4>
          <li><Link to="/dashboard/fuel-reports" className="sidebar-link">Fuel Reports</Link></li>
          <li><Link to="/dashboard/sales-reports" className="sidebar-link">Sales Reports</Link></li>
          <h4>Administration</h4>
          <li><Link to="/dashboard/supplier-management" className="sidebar-link">Supplier Management</Link></li>
          <li><Link to="/dashboard/price-management" className="sidebar-link">Price Management</Link></li>
          <li><Link to="/dashboard/system-settings" className="sidebar-link">System Settings</Link></li>
          <li><Link to="/dashboard/user-management" className="sidebar-link">User Management</Link></li>
        </ul>
      </nav>
      <main className="main-content">
        <Outlet /> {/* This is where nested routes will render */}
      </main>
    </div>
  );
}

export default Layout; 