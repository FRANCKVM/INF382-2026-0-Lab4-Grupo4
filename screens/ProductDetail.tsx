import React from 'react';
import { Screen, Account } from '../types';
import { Header } from '../components/UI';
import { RECENT_TRANSACTIONS } from '../constants';
import { Copy, MoreHorizontal, ArrowDownCircle, ArrowUpCircle, Settings } from 'lucide-react';

interface DetailProps {
  navigate: (screen: Screen) => void;
  account: Account;
}

export const ProductDetailScreen: React.FC<DetailProps> = ({ navigate, account }) => {
  const isCredit = account.type === 'CREDIT';
  const bgColor = isCredit ? 'bg-slate-900' : 'bg-blue-600';
  const textColor = isCredit ? 'text-white' : 'text-white';

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header 
        title={isCredit ? "Detalle de Tarjeta" : "Detalle de Cuenta"} 
        onBack={() => navigate(Screen.HOME)} 
        rightElement={<button><Settings size={24} className="text-slate-900" /></button>}
      />

      <div className="px-6 pb-6">
        {/* Detail Card */}
        <div className={`${bgColor} rounded-2xl p-6 ${textColor} shadow-xl relative overflow-hidden transition-all duration-300`}>
             <div className="absolute top-0 right-0 p-4 opacity-10">
                 <div className="w-40 h-40 rounded-full border-8 border-white"></div>
            </div>

            <div className="flex justify-between items-start mb-6">
                <div>
                    <span className="text-sm font-medium opacity-90">{account.name}</span>
                    <div className="flex items-center gap-2 mt-1">
                         <p className="text-lg opacity-80 tracking-wider">{account.number}</p>
                         <button className="opacity-70 hover:opacity-100"><Copy size={14} /></button>
                    </div>
                </div>
                {isCredit && <span className="font-bold italic text-lg opacity-80">VISA</span>}
            </div>

            <div className="mb-4">
                <p className="text-xs opacity-70 mb-1">{isCredit ? 'Línea Disponible' : 'Saldo Disponible'}</p>
                <h1 className="text-4xl font-bold">
                    {account.currency === 'PEN' ? 'S/' : '$'} {account.balance.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                </h1>
            </div>

            <div className="flex gap-4 mt-6">
                <button 
                  onClick={() => isCredit ? navigate(Screen.CARD_PAYMENT_AMOUNT) : navigate(Screen.TRANSFER_SELECT)}
                  className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                    {isCredit ? 'Pagar Tarjeta' : 'Transferir'}
                </button>
                <button className="w-10 flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors">
                    <MoreHorizontal size={20} />
                </button>
            </div>
        </div>
      </div>

      {/* Info Stats */}
      {isCredit && (
        <div className="px-6 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm flex justify-between divide-x divide-gray-100">
                <div className="flex-1 px-2 text-center">
                    <p className="text-xs text-gray-500 mb-1">Deuda Total</p>
                    <p className="font-bold text-slate-900">$ 450.00</p>
                </div>
                <div className="flex-1 px-2 text-center">
                    <p className="text-xs text-gray-500 mb-1">Cierre</p>
                    <p className="font-bold text-slate-900">20 Oct</p>
                </div>
                <div className="flex-1 px-2 text-center">
                    <p className="text-xs text-gray-500 mb-1">Pago Min.</p>
                    <p className="font-bold text-slate-900">$ 45.00</p>
                </div>
            </div>
        </div>
      )}

      {/* Movements List */}
      <div className="flex-1 bg-white rounded-t-3xl px-6 py-8 shadow-inner">
         <div className="flex justify-between items-end mb-6">
             <h3 className="font-bold text-lg text-slate-900">Movimientos de Octubre</h3>
             <button className="text-blue-600 text-sm font-semibold">Filtrar</button>
         </div>

         <div className="space-y-2">
             <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-4">Hoy</div>
             {RECENT_TRANSACTIONS.slice(0, 2).map((tx) => (
                 <TransactionItem key={tx.id} tx={tx} />
             ))}
             
             <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6">Ayer</div>
             {RECENT_TRANSACTIONS.slice(2).map((tx) => (
                 <TransactionItem key={tx.id} tx={tx} />
             ))}
         </div>
      </div>
    </div>
  );
};

const TransactionItem = ({ tx }: { tx: any }) => (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
        <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100' : 'bg-gray-100'}`}>
                {tx.type === 'income' ? <ArrowDownCircle size={20} className="text-green-600" /> : <ArrowUpCircle size={20} className="text-slate-600" />}
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
        </div>
    </div>
);
