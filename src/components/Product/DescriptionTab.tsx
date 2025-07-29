import React from "react";

interface DescriptionTabProps {
  description: string;
}

const DescriptionTab: React.FC<DescriptionTabProps> = ({ description }) => (
  <div className="mt-8 p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">
      Product Description
    </h3>
    <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
  </div>
);

export default DescriptionTab;
