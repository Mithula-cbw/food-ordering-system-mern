// src/routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Blog from './pages/Blog';
import Home from './pages/Home';


export const AppRoutes = () => {
  return (
    <Routes>
      {/* Define routes */}
      <Route path="/" element={<MainLayout ><Home /></MainLayout>}/>
      <Route path="/blog" element={<MainLayout ><Blog /></MainLayout>}/>
      <Route path="/contact" element={<MainLayout ><div>Contact</div></MainLayout>}/>
    </Routes>
  );
};
