import React from 'react';
import { Screen, Account, Transaction } from '../types';
import { Header } from '../components/UI';
import { Share2, MoreHorizontal } from 'lucide-react';

interface DetailProps {
  navigate: (screen: Screen) => void;
  account: Account;
  transactions: Transaction[];
  onSelectTransaction: (tx: Transaction) => void;
}

export const ProductDetailScreen: React.FC<DetailProps> = ({ navigate, account, transactions, onSelectTransaction }) => {
  const isCredit = account.type === 'CREDIT';
  const bgColor = isCredit ? 'bg-slate-900' : 'bg-blue-600';
  const textColor = isCredit ? 'text-white' : 'text-white';

  const handleTransactionClick = (tx: Transaction) => {
    onSelectTransaction(tx);
    navigate(Screen.TRANSACTION_DETAIL);
  };

  // Filter transactions for this account
  const accountTransactions = transactions.filter(tx => tx.accountId === account.id);
  const todayTransactions = accountTransactions.filter(tx => tx.date === 'Hoy');
  const otherTransactions = accountTransactions.filter(tx => tx.date !== 'Hoy');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header 
        title={isCredit ? "Detalle de Tarjeta" : "Detalle de Cuenta"} 
        onBack={() => navigate(Screen.HOME)} 
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
                    <div className="mt-1">
                         <div className="flex items-center gap-2">
                            <div className="flex flex-col">
                                <p className="text-lg opacity-80 tracking-wider leading-tight">{account.number}</p>
                                {!isCredit && account.cci && (
                                    <p className="text-lg opacity-80 tracking-wider leading-tight">CCI: {account.cci}</p>
                                )}
                            </div>
                            {!isCredit && (
                                <button 
                                    onClick={() => {
                                        if (navigator.share) {
                                            navigator.share({
                                                title: account.name,
                                                text: `Cuenta: ${account.number}\nCCI: ${account.cci || ''}`,
                                            }).catch(() => {});
                                        } else {
                                            navigator.clipboard.writeText(`Cuenta: ${account.number}\nCCI: ${account.cci || ''}`);
                                            alert('Datos de cuenta copiados para compartir');
                                        }
                                    }}
                                    className="opacity-70 hover:opacity-100 p-2"
                                >
                                    <Share2 size={18} />
                                </button>
                            )}
                         </div>
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
                  onClick={() => navigate(isCredit ? Screen.CARD_PAYMENT : Screen.TRANSFER_SELECT)}
                  className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                >
                    {isCredit ? 'Pagar tarjeta' : 'Transferir'}
                </button>
                <button 
                  onClick={() => navigate(Screen.STATEMENT_SELECT_PERIOD)}
                  className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                >
                    Estado de cuenta
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
                    <p className="font-bold text-slate-900">{account.currency === 'PEN' ? 'S/' : '$'} 450.00</p>
                </div>
                <div className="flex-1 px-2 text-center">
                    <p className="text-xs text-gray-500 mb-1">Cierre</p>
                    <p className="font-bold text-slate-900">20 Oct</p>
                </div>
                <div className="flex-1 px-2 text-center">
                    <p className="text-xs text-gray-500 mb-1">Pago Min.</p>
                    <p className="font-bold text-slate-900">{account.currency === 'PEN' ? 'S/' : '$'} 45.00</p>
                </div>
            </div>
        </div>
      )}

      {/* Movements List */}
      <div className="flex-1 bg-white rounded-t-3xl px-6 py-8 shadow-inner">
         <div className="flex justify-between items-end mb-6">
             <h3 className="font-bold text-lg text-slate-900">Movimientos Recientes</h3>
         </div>

         <div className="space-y-2">
             {todayTransactions.length > 0 && (
               <>
                 <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-4">Hoy</div>
                 {todayTransactions.map((tx) => (
                     <TransactionItem key={tx.id} tx={tx} onClick={() => handleTransactionClick(tx)} />
                 ))}
               </>
             )}
             
             {otherTransactions.length > 0 && (
               <>
                 <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6">Anteriores</div>
                 {otherTransactions.map((tx) => (
                     <TransactionItem key={tx.id} tx={tx} onClick={() => handleTransactionClick(tx)} />
                 ))}
               </>
             )}

             {accountTransactions.length === 0 && (
               <p className="text-center text-gray-400 py-10">No hay movimientos registrados para este producto</p>
             )}
         </div>
      </div>
    </div>
  );
};

interface TransactionItemProps {
  tx: Transaction;
  onClick: () => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ tx, onClick }) => (
    <div onClick={onClick} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
        <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-50 text-red-500'}`}>
                <div className="font-bold text-sm">{tx.title[0]}</div>
            </div>
            <div>
                <h4 className="font-bold text-slate-900 text-sm">{tx.title}</h4>
                <p className="text-xs text-gray-500">{tx.subtitle}</p>
            </div>
        </div>
        <div className="text-right">
            <span className={`font-bold block text-sm ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
            {tx.type === 'income' ? '+' : '-'} {tx.currency === 'PEN' ? 'S/' : '$'} {Math.abs(tx.amount).toFixed(2)}
            </span>
        </div>
    </div>
);
