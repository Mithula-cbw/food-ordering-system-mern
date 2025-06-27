import React from 'react';
import { TabProps } from './types';

const Tab: React.FC<TabProps> = ({ label, isActive, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 text-lg font-medium border-b-2 transition-colors ${
      isActive
        ? 'border-blue-500 text-blue-600'
        : 'border-transparent text-gray-600 hover:text-gray-800'
    } ${className}`}
  >
    {label}
  </button>
);

export default Tab;