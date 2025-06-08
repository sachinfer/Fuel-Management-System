import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import SupplierManagement from './components/SupplierManagement';
import FuelOrdering from './components/FuelOrdering';
import TankManagement from './components/TankManagement';
import StaffManagement from './components/StaffManagement';
import Attendance from './components/Attendance';
import PriceManagement from './components/PriceManagement';
import CashSettlement from './components/CashSettlement';
import PointOfSale from './components/PointOfSale';
import FuelReports from './components/FuelReports';
import SalesReports from './components/SalesReports';
import SystemSettings from './components/SystemSettings';
import UserManagement from './components/UserManagement';
import Layout from './components/Layout';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="suppliers" element={<SupplierManagement />} />
          <Route path="fuel-ordering" element={<FuelOrdering />} />
          <Route path="tank-management" element={<TankManagement />} />
          <Route path="staff-management" element={<StaffManagement />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="price-management" element={<PriceManagement />} />
          <Route path="cash-settlement" element={<CashSettlement />} />
          <Route path="point-of-sale" element={<PointOfSale />} />
          <Route path="fuel-reports" element={<FuelReports />} />
          <Route path="sales-reports" element={<SalesReports />} />
          <Route path="system-settings" element={<SystemSettings />} />
          <Route path="user-management" element={<UserManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
