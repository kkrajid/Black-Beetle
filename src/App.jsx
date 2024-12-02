import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './components/features/admin/layouts/AdminLayout';
import * as AdminComponents from './components/features/admin/AdminComponents';
import { ClientHome } from './pages/client/Home/ClientHome';
import ClientStock from './pages/client/StockDashbord/ClientStockDashbord';
import ClientStockDetails from './pages/client/StockDetail/ClinetStockDetails';
import Login from './components/Auth/client/Login';
// import { AdminLayout } from './components/AdminLayout';
// import { ProtectedRoute } from './components/ProtectedRoute';
// import * as AdminComponents from './components/AdminComponents';
// import * as ClientComponents from './components/features/client/ClientComponents';

// Placeholder auth functions (replace these with your actual auth logic)
const isAuthenticated = () => true; // Replace with actual auth check
const isAdmin = () => true; // Replace with actual admin check

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<ClientHome/>} />
          <Route path="/trades" element={<ClientStock/>} />
          <Route path="/stock/:symbol" element={<ClientStockDetails/>} />


          
          {/* Client routes */}
          {/* <Route element={<ProtectedRoute isAllowed={isAuthenticated()} />}>
            <Route path="/" element={<ClientComponents.ClientHome />} />
            <Route path="/profile" element={<ClientComponents.ClientProfile />} />
            <Route path="/courses" element={<ClientComponents.ClientCourses />} />
          </Route> */}

          {/* Admin routes */}
          <Route 
          
          >
            <Route element={<AdminLayout/>}>
              <Route path="/admin" element={<AdminComponents.AdminDashboard />} />
              <Route path="/admin/users" element={<AdminComponents.AdminUsers />} />
              <Route path="/admin/premium" element={<AdminComponents.AdminPremium />} />
              <Route path="/admin/orders" element={<AdminComponents.AdminOrders />} />
              <Route path="/admin/institute" element={<AdminComponents.AdminInstitute />} />
              <Route path="/admin/students" element={<AdminComponents.AdminStudents />} />
            </Route>
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

