'use client';

import React from 'react';
import { Users, Info } from 'lucide-react';

export interface TableInfo {
  number: string;
  seats: number;
  type: string;
  status: 'AVAILABLE' | 'RESERVED' | 'OCCUPIED';
}

interface TableSelectorProps {
  tables: TableInfo[];
  selectedTable: string;
  onSelectTable: (tableNumber: string) => void;
}

export default function TableSelector({
  tables,
  selectedTable,
  onSelectTable,
}: TableSelectorProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return <span className="text-emerald-400 flex items-center gap-1 font-bold">🟢 Available</span>;
      case 'RESERVED':
        return <span className="text-amber-400 flex items-center gap-1 font-bold">🟡 Reserved</span>;
      case 'OCCUPIED':
        return <span className="text-red-400 flex items-center gap-1 font-bold">🔴 Occupied</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-charcoal-950 border border-charcoal-800 text-xs">
        <span className="font-mono text-saffron-400 uppercase tracking-widest font-bold">
          Floor Layout & Table Map
        </span>
        <div className="flex items-center gap-4 text-charcoal-300">
          <span className="flex items-center gap-1">🟢 Available</span>
          <span className="flex items-center gap-1">🟡 Reserved</span>
          <span className="flex items-center gap-1">🔴 Occupied</span>
        </div>
      </div>

      {/* Grid of Tables (T1 to T8) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {tables.map((tbl) => {
          const isSelected = selectedTable === tbl.number;
          const isAvailable = tbl.status === 'AVAILABLE';

          return (
            <button
              key={tbl.number}
              type="button"
              disabled={!isAvailable}
              onClick={() => isAvailable && onSelectTable(tbl.number)}
              className={`p-5 rounded-2xl border transition-all flex flex-col items-center justify-between gap-3 text-center ${
                isSelected
                  ? 'bg-saffron-500/20 border-saffron-500 shadow-xl shadow-saffron-500/10 scale-105'
                  : isAvailable
                  ? 'bg-charcoal-900 border-charcoal-800 hover:border-saffron-500/50 cursor-pointer'
                  : 'bg-charcoal-950 border-charcoal-900 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-serif text-lg font-bold text-cream-100">{tbl.number}</span>
                <span className="text-[10px] font-mono text-charcoal-400 flex items-center gap-1">
                  <Users className="w-3 h-3 text-saffron-400" /> {tbl.seats} seats
                </span>
              </div>

              <div className="w-12 h-12 rounded-xl bg-charcoal-950 border border-charcoal-800 flex items-center justify-center text-xs font-mono">
                {tbl.type}
              </div>

              <div className="text-[10px] mt-1">
                {getStatusBadge(tbl.status)}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
