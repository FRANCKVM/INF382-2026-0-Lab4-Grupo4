import React from 'react';
import { Screen } from '../types';
import { Header } from '../components/UI';
import { RECENT_TRANSACTIONS } from '../constants';
import { ArrowDownCircle, ArrowUpCircle, Search, Filter } from 'lucide-react';

interface Props {
  navigate: (screen: Screen) => void;
}

export const AllTransactionsScreen: React.FC<Props> = ({ navigate }) => {
  // Simulating more transactions by duplicating the constants
  const history = [
    { label: 'Hoy', data: RECENT_TRANSACTIONS.slice(0, 1) },
    { label: 'Ayer', data: RECENT_TRANSACTIONS.slice(1, 3) },
    { label: 'Semana Pasada', data: [...RECENT_TRANSACTIONS, ...RECENT_TRANSACTIONS] }, // Demo data
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header title="Movimientos" onBack={() => navigate(Screen.HOME)} rightElement={<button><Filter size={20} className="text-slate-900" /></button>} />
      
      <div className="px-6 py-2 pb-4">
        <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input 
                type="text" 
                placeholder="Buscar por nombre o monto" 
                className="w-full bg-white border border-gray-200 pl-12 pr-4 py-3 rounded-xl outline-none focus:border-blue-600 text-sm shadow-sm" 
            />
        </div>
      </div>

      <div className="flex-1 px-6 overflow-y-auto pb-6">
        {history.map((section, idx) => (
            <div key={idx} className="mb-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{section.label}</h3>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {section.data.map((tx, i) => (
                        <div key={`${idx}-${i}`} className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer ${i !== section.data.length - 1 ? 'border-b border-gray-50' : ''}`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100' : 'bg-red-50'}`}>
                                    {tx.type === 'income' ? <ArrowDownCircle size={20} className="text-green-600" /> : <ArrowUpCircle size={20} className="text-red-500" />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">{tx.title}</h4>
                                    <p className="text-xs text-gray-500">{tx.subtitle}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`font-bold block text-sm ${tx.type === 'income' ? 'text-green-600' : 'text-slate-900'}`}>
                                    {tx.type === 'income' ? '+' : '-'} {tx.currency === 'PEN' ? 'S/' : '$'} {Math.abs(tx.amount).toFixed(2)}
                                </span>
                                <span className="text-[10px] text-gray-400">{tx.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
        
        <div className="text-center mt-4">
            <button className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">Cargar más movimientos</button>
        </div>
      </div>
    </div>
  );
};
