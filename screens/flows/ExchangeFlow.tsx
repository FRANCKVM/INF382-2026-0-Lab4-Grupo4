import React from 'react';
import { Screen } from '../../types';
import { Header, Button, NumberPad } from '../../components/UI';
import { ArrowUpDown, ChevronDown, RefreshCw, Check, Share, Info, X, Delete } from 'lucide-react';

interface FlowProps {
  navigate: (screen: Screen) => void;
  amount?: string;
  setAmount?: (val: string) => void;
  currency?: 'PEN' | 'USD';
  setCurrency?: (val: 'PEN' | 'USD') => void;
}

// Helper to calculate exchange
const RATES = {
    buy: 3.72,
    sell: 3.75
};

const calculateExchange = (amount: string, fromCurrency: 'PEN' | 'USD') => {
    const val = parseFloat(amount);
    if (isNaN(val)) return '0.00';

    if (fromCurrency === 'PEN') {
        // Selling PEN, Buying USD -> Divide by Sell Rate
        return (val / RATES.sell).toFixed(2);
    } else {
        // Selling USD, Buying PEN -> Multiply by Buy Rate
        return (val * RATES.buy).toFixed(2);
    }
};

// 1. Input Screen
export const ExchangeScreen: React.FC<FlowProps> = ({ navigate, amount = '0', setAmount, currency = 'PEN', setCurrency }) => {
    
    const handlePress = (val: string) => {
        if (!setAmount) return;
        if (amount === '0' && val !== '.') setAmount(val);
        else if (amount.includes('.') && val === '.') return;
        else setAmount(amount + val);
    };

    const handleDelete = () => {
        if (!setAmount) return;
        setAmount(amount.length > 1 ? amount.slice(0, -1) : '0');
    };

    const toggleCurrency = () => {
        if (setCurrency) {
            setCurrency(currency === 'PEN' ? 'USD' : 'PEN');
            // Reset amount or keep it? Keeping it for better UX usually, but strictly speaking balance changes. 
            // We'll keep the number input.
        }
    };

    const receivedAmount = calculateExchange(amount, currency);
    const isPen = currency === 'PEN';

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header title="Cambiar divisas" onBack={() => navigate(Screen.HOME)} rightElement={<div className="bg-slate-900 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold">?</div>} />
            
            <div className="flex justify-center my-4">
                <div className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold flex gap-4">
                    <span>Compra: {RATES.buy}</span>
                    <span className="text-blue-300">•</span>
                    <span>Venta: {RATES.sell}</span>
                </div>
            </div>

            <div className="px-6 relative">
                {/* Input Card (Source) */}
                <div className="bg-white rounded-t-3xl rounded-b-lg p-6 shadow-sm mb-2 relative z-10 border border-gray-100">
                    <div className="flex justify-between text-xs text-gray-400 mb-2 font-medium">
                        <span>Tengo</span>
                        <span>Saldo: {isPen ? 'S/ 12,450.00' : '$ 1,120.00'}</span>
                    </div>
                    <div className="flex justify-between items-center h-12">
                        <button className="flex items-center gap-2 font-bold text-xl hover:bg-gray-50 p-2 -ml-2 rounded-lg transition-colors">
                            <span className="text-2xl">{isPen ? '🇵🇪' : '🇺🇸'}</span> {currency} <ChevronDown size={18} className="text-gray-400" />
                        </button>
                        <span className={`text-4xl font-bold ${amount === '0' ? 'text-gray-300' : 'text-slate-900'}`}>
                            {amount}
                        </span>
                    </div>
                </div>

                {/* Swap Button */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <button 
                        onClick={toggleCurrency}
                        className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white border-4 border-gray-50 shadow-lg active:scale-90 transition-transform"
                    >
                        <ArrowUpDown size={20} />
                    </button>
                </div>

                {/* Output Card (Target) */}
                <div className="bg-white rounded-b-3xl rounded-t-lg p-6 shadow-sm mt-2 border border-gray-100">
                     <div className="flex justify-between text-xs text-gray-400 mb-2 font-medium">
                        <span>Recibo</span>
                    </div>
                    <div className="flex justify-between items-center h-12">
                         <button className="flex items-center gap-2 font-bold text-xl hover:bg-gray-50 p-2 -ml-2 rounded-lg transition-colors">
                            <span className="text-2xl">{!isPen ? '🇵🇪' : '🇺🇸'}</span> {isPen ? 'USD' : 'PEN'} <ChevronDown size={18} className="text-gray-400" />
                        </button>
                        <div className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-3xl font-bold text-slate-900 min-w-[140px] text-right">
                            {receivedAmount}
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6 flex justify-center gap-3 mt-6 mb-4">
                {['25%', '50%', 'MAX'].map(p => (
                    <button key={p} className="px-5 py-2 border border-gray-200 rounded-xl text-xs font-bold text-slate-600 bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-sm">{p}</button>
                ))}
            </div>

            <div className="px-6 mb-4">
                <Button onClick={() => navigate(Screen.EXCHANGE_CONFIRM)} disabled={amount === '0'}>Cambiar ahora &rarr;</Button>
            </div>

            <div className="flex-1 pt-0 pb-8">
                <NumberPad onPress={handlePress} onDelete={handleDelete} />
            </div>
        </div>
    );
};

// 2. Confirmation Screen
export const ExchangeConfirm: React.FC<FlowProps> = ({ navigate, amount = '0', currency = 'PEN' }) => {
    const receivedAmount = calculateExchange(amount, currency);
    const isPen = currency === 'PEN';
    const sourceSymbol = isPen ? 'S/' : '$';
    const targetSymbol = isPen ? '$' : 'S/';
    const exchangeRateUsed = isPen ? RATES.sell : RATES.buy;

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Header title="Confirmación" onBack={() => navigate(Screen.EXCHANGE)} />
            
            <div className="flex-1 px-6 pt-4 pb-6 overflow-y-auto">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
                        <RefreshCw size={32} />
                    </div>
                    <h2 className="text-lg text-slate-500 mb-1">Resumen de operación</h2>
                    <p className="text-xs text-gray-400">Tipo de cambio: {exchangeRateUsed}</p>
                </div>

                <div className="bg-gray-50 rounded-3xl p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">VAS A CAMBIAR</p>
                            <h3 className="text-2xl font-bold text-slate-900">{sourceSymbol} {Number(amount).toFixed(2)}</h3>
                        </div>
                        <span className="text-3xl">{isPen ? '🇵🇪' : '🇺🇸'}</span>
                    </div>

                    <div className="flex justify-center my-2">
                         <div className="bg-blue-600 rounded-full p-1">
                             <ChevronDown className="text-white w-4 h-4" />
                         </div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                        <div>
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">VAS A RECIBIR</p>
                            <h3 className="text-2xl font-bold text-blue-600">{targetSymbol} {receivedAmount}</h3>
                        </div>
                        <span className="text-3xl">{!isPen ? '🇵🇪' : '🇺🇸'}</span>
                    </div>
                </div>

                <div className="space-y-4 px-2 mb-8">
                    <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                        <span className="text-gray-500 text-sm">Cuenta de origen</span>
                        <div className="text-right">
                            <p className="font-bold text-slate-900 text-sm">Cuenta {isPen ? 'Simple Soles' : 'Dólares'}</p>
                            <p className="text-xs text-gray-400">** {isPen ? '4567' : '8912'}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                        <span className="text-gray-500 text-sm">Cuenta de destino</span>
                        <div className="text-right">
                            <p className="font-bold text-slate-900 text-sm">Cuenta {!isPen ? 'Simple Soles' : 'Dólares'}</p>
                            <p className="text-xs text-gray-400">** {!isPen ? '4567' : '8912'}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Comisión</span>
                        <span className="font-bold text-green-600 text-sm">S/ 0.00</span>
                    </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl flex gap-3 mb-8">
                    <Info className="text-blue-600 w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-800 leading-relaxed">
                        Esta operación tiene un tiempo de validez de 2 minutos antes de que el tipo de cambio sea actualizado.
                    </p>
                </div>

                <Button onClick={() => navigate(Screen.EXCHANGE_SUCCESS)}>Confirmar cambio</Button>
            </div>
        </div>
    );
};

// 3. Success Screen
export const ExchangeSuccess: React.FC<FlowProps> = ({ navigate, amount = '0', currency = 'PEN' }) => {
    const receivedAmount = calculateExchange(amount, currency);
    const isPen = currency === 'PEN';
    const sourceSymbol = isPen ? 'S/' : '$';
    const targetSymbol = isPen ? '$' : 'S/';
    const exchangeRateUsed = isPen ? RATES.sell : RATES.buy;

    return (
        <div className="bg-white min-h-screen flex flex-col p-6 items-center pt-8 relative">
            <div className="w-full flex items-center justify-between mb-8">
                 <h1 className="text-lg font-bold mx-auto">Constancia</h1>
                 <button onClick={() => navigate(Screen.HOME)} className="absolute right-6 top-8 p-1 hover:bg-gray-100 rounded-full">
                     <X size={24} className="text-slate-900" />
                 </button>
            </div>

            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 mt-4">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
                    <Check className="text-white w-8 h-8" strokeWidth={3} />
                </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">¡Cambio exitoso!</h2>
            <div className="flex items-center gap-2 mb-8">
                <span className="text-gray-500 text-lg">Has recibido</span>
                <span className="text-blue-600 text-xl font-bold">{targetSymbol} {receivedAmount}</span>
            </div>

            <div className="w-full bg-gray-50 rounded-[32px] p-8 mb-8">
                <div className="space-y-5">
                    <div className="flex justify-between text-sm items-center border-b border-gray-200 pb-4">
                        <span className="text-gray-500">Desde</span>
                        <span className="font-bold text-slate-900">{sourceSymbol} {Number(amount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm items-center border-b border-gray-200 pb-4">
                        <span className="text-gray-500">Tipo de cambio</span>
                        <span className="font-bold text-slate-900">{exchangeRateUsed}</span>
                    </div>
                    <div className="flex justify-between text-sm items-center border-b border-gray-200 pb-4">
                        <span className="text-gray-500">Nro. de operación</span>
                        <span className="font-bold text-slate-900">002341</span>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                        <span className="text-gray-500">Fecha</span>
                        <span className="font-bold text-slate-900">24 Oct 2023</span>
                    </div>
                </div>
            </div>

            <div className="text-center px-6 mb-8">
                <p className="text-[10px] text-gray-400 leading-relaxed">
                    Esta operación ha sido procesada de acuerdo a los términos y condiciones vigentes.
                </p>
            </div>

            <div className="w-full space-y-4 mt-auto">
                <Button icon={<Share size={20} />} className="flex items-center justify-center gap-2">Compartir constancia</Button>
                <button onClick={() => navigate(Screen.HOME)} className="w-full py-4 text-blue-600 font-semibold text-sm">Volver al inicio</button>
            </div>
            
            {/* iOS Home Indicator Area */}
            <div className="w-32 h-1 bg-gray-200 rounded-full mt-2 mx-auto"></div>
        </div>
    );
};
