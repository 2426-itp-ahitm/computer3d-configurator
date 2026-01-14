import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';

export function Summary() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 text-gray-900 flex flex-col items-center p-6 pt-8">
      <div className="max-w-6xl w-full">
        <Breadcrumbs />
        <div className="mb-6 p-4 bg-white rounded-xl flex justify-between items-center border border-gray-100">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Zusammenfassung deiner Konfiguration</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
