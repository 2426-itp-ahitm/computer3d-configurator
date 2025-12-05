import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';

export function Summary() {
    return (
        <div className="p-6 bg-white rounded-xl shadow-md">
            <Breadcrumbs />
            <h2 className="text-2xl font-bold mb-4">Übersicht deiner Konfiguration</h2>
            <p>Hier findest du eine Zusammenfassung deiner ausgewählten Komponenten.</p>
        </div>
    );
}