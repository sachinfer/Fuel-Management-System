import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Import Link and NavLink
import './Dashboard.css'; // We can add some basic styling later if needed

function Dashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Fuel Management System Dashboard</h1>
        <p>Your central hub for all operations.</p>
      </header>

      <main className="dashboard-main-content">
        <section className="category-section">
          <h2>Operations</h2>
          <div className="category-links">
            <NavLink to="/dashboard/fuel-ordering" className={({ isActive }) => isActive ? 'dashboard-nav-item active' : 'dashboard-nav-item'}>Fuel Ordering</NavLink>
            <NavLink to="/dashboard/tank-management" className={({ isActive }) => isActive ? 'dashboard-nav-item active' : 'dashboard-nav-item'}>Tank Management</NavLink>
            <NavLink to="/dashboard/point-of-sale" className={({ isActive }) => isActive ? 'dashboard-nav-item active' : 'dashboard-nav-item'}>Point of Sale</NavLink>
            <NavLink to="/dashboard/cash-settlement" className={({ isActive }) => isActive ? 'dashboard-nav-item active' : 'dashboard-nav-item'}>Cash Settlement</NavLink>
          </div>
        </section>

        <section className="category-section">
          <h2>Human Resources</h2>
          <div className="category-links">
            <NavLink to="/dashboard/staff-management" className={({ isActive }) => isActive ? 'dashboard-nav-item active' : 'dashboard-nav-item'}>Staff Management</NavLink>
            <NavLink to="/dashboard/attendance" className={({ isActive }) => isActive ? 'dashboard-nav-item active' : 'dashboard-nav-item'}>Attendance</NavLink>
          </div>
        </section>

        <section className="category-section">
          <h2>Reporting</h2>
          <div className="category-links">
            <NavLink to="/dashboard/fuel-reports" className={({ isActive }) => isActive ? 'dashboard-nav-item active' : 'dashboard-nav-item'}>Fuel Reports</NavLink>
            <NavLink to="/dashboard/sales-reports" className={({ isActive }) => isActive ? 'dashboard-nav-item active' : 'dashboard-nav-item'}>Sales Reports</NavLink>
          </div>
        </section>

        <section className="category-section">
          <h2>Administration</h2>
          <div className="category-links">
            <NavLink to="/dashboard/supplier-management" className={({ isActive }) => isActive ? 'dashboard-nav-item active' : 'dashboard-nav-item'}>Supplier Management</NavLink>
            <NavLink to="/dashboard/price-management" className={({ isActive }) => isActive ? 'dashboard-nav-item active' : 'dashboard-nav-item'}>Price Management</NavLink>
            <NavLink to="/dashboard/system-settings" className={({ isActive }) => isActive ? 'dashboard-nav-item active' : 'dashboard-nav-item'}>System Settings</NavLink>
            <NavLink to="/dashboard/user-management" className={({ isActive }) => isActive ? 'dashboard-nav-item active' : 'dashboard-nav-item'}>User Management</NavLink>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard; 