// src/routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';


export const AppRoutes = () => {
  return (
    <Routes>
      {/* Define routes */}
      <Route path="/" element={<MainLayout ><div>Home</div></MainLayout>}/>
      <Route path="/blog" element={<MainLayout ><div>Blog</div></MainLayout>}/>
      <Route path="/contact" element={<MainLayout ><div>Contact</div></MainLayout>}/>
    </Routes>
  );
};
