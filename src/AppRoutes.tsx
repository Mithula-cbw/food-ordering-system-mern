// src/routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import TestComponent from './components/Tests/TestComponent';
import Blog from './pages/Blog';


export const AppRoutes = () => {
  return (
    <Routes>
      {/* Define routes */}
      <Route path="/" element={<MainLayout ><div><TestComponent /></div></MainLayout>}/>
      <Route path="/blog" element={<MainLayout ><Blog /></MainLayout>}/>
      <Route path="/contact" element={<MainLayout ><div>Contact</div></MainLayout>}/>
    </Routes>
  );
};
