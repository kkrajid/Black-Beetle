import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../Sidebar/AdminSidebar';


export function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar/>
      <main className="flex-1  md:ml-64 transition-margin duration-300 ease-in-out">
        <Outlet />
      </main>
    </div>
  );
}
