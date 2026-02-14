import React, { useState } from 'react';
import { Screen } from '../../types';
import { Header, Button } from '../../components/UI';
import { ACCOUNTS } from '../../constants';
import { Wallet, CreditCard, Calendar, Check, Download, Mail, Info, ChevronRight, X } from 'lucide-react';

interface FlowProps {
  navigate: (screen: Screen) => void;
}

// 1. Product Selection
export const StatementSelectProduct: React.FC<FlowProps> = ({ navigate }) => {
    const [selectedAccount, setSelectedAccount] = useState<string>(ACCOUNTS[0].id);

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header title="¿De qué cuenta o tarjeta?" onBack={() => navigate(Screen.OPERATIONS)} />
            
            <div className="px-6 pt-2 pb-6 flex-1 flex flex-col">
                <p className="text-gray-500 mb-6">Elige el producto para consultar el estado de cuenta</p>

                <div className="space-y-4">
                    {ACCOUNTS.map((acc) => {
                        const isSelected = selectedAccount === acc.id;
                        return (
                            <div 
                                key={acc.id}
                                onClick={() => setSelectedAccount(acc.id)}
                                className={`bg-white p-6 rounded-2xl border-2 cursor-pointer transition-all shadow-sm ${isSelected ? 'border-blue-600' : 'border-transparent'}`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${acc.type === 'CREDIT' ? 'bg-slate-900 text-white' : 'bg-blue-50 text-blue-600'}`}>
                                            {acc.type === 'CREDIT' ? <CreditCard size={24} /> : <Wallet size={24} />}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-lg">{acc.name}</h4>
                                            <p className="text-gray-400 text-sm font-medium">{acc.number}</p>
                                        </div>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-200'}`}>
                                        {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                                    </div>
                                </div>

                                <div className="flex justify-between items-end">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        {acc.type === 'CREDIT' ? 'DEUDA TOTAL' : 'SALDO DISPONIBLE'}
                                    </span>
                                    <span className="font-bold text-xl text-slate-900">
                                        {acc.currency === 'PEN' ? 'S/' : '$'} {acc.balance.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-auto">
                    <Button onClick={() => navigate(Screen.STATEMENT_SELECT_PERIOD)}>Continuar</Button>
                </div>
            </div>
        </div>
    );
};

// 2. Period Selection
export const StatementSelectPeriod: React.FC<FlowProps> = ({ navigate }) => {
    const [selectedPeriod, setSelectedPeriod] = useState<string>('current');

    const periods = [
        { id: 'current', label: 'Mes actual', sub: 'Octubre' },
        { id: 'prev1', label: 'Septiembre 2023' },
        { id: 'prev2', label: 'Agosto 2023' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header title="Solicitar estado de cuenta" onBack={() => navigate(Screen.STATEMENT_SELECT_PRODUCT)} />
            
            <div className="px-6 pt-2 pb-6 flex-1 flex flex-col">
                <p className="text-gray-500 mb-6">Selecciona el periodo que deseas consultar</p>

                <div className="space-y-4 mb-4">
                    {periods.map((p) => {
                         const isSelected = selectedPeriod === p.id;
                         return (
                            <div 
                                key={p.id}
                                onClick={() => setSelectedPeriod(p.id)}
                                className={`bg-white p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between shadow-sm transition-all ${isSelected ? 'border-blue-600' : 'border-transparent'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                        <Calendar size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{p.label}</h4>
                                        {p.sub && <p className="text-sm text-gray-400">{p.sub}</p>}
                                    </div>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                                    {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                                </div>
                            </div>
                         );
                    })}

                    {/* Date Range Option */}
                    <div className="bg-white p-4 rounded-2xl border border-transparent shadow-sm flex items-center justify-between cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
                                <Calendar size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Rango de fechas</h4>
                                <p className="text-sm text-gray-400">Personalizado</p>
                            </div>
                        </div>
                        <ChevronRight className="text-gray-300" />
                    </div>
                </div>

                <div className="mt-auto">
                    <Button onClick={() => navigate(Screen.STATEMENT_DELIVERY_METHOD)}>Continuar</Button>
                </div>
            </div>
        </div>
    );
};

// 3. Delivery Method
export const StatementDeliveryMethod: React.FC<FlowProps> = ({ navigate }) => {
    const [method, setMethod] = useState<'email' | 'download'>('email');

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <div className="relative px-6 py-4 flex items-center justify-center border-b border-gray-50">
                <button onClick={() => navigate(Screen.STATEMENT_SELECT_PERIOD)} className="absolute left-6 p-2 -ml-2 hover:bg-gray-50 rounded-full">
                    <ChevronRight className="rotate-180 text-slate-900" size={24} />
                </button>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">PASO 2 DE 3</span>
            </div>
            
            <div className="px-6 pt-8 pb-6 flex-1 flex flex-col">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">¿Cómo deseas recibirlo?</h2>

                <div className="space-y-4 mb-8">
                     {/* Download Option */}
                     <div 
                        onClick={() => setMethod('download')}
                        className={`p-5 rounded-2xl border-2 cursor-pointer flex items-start gap-4 transition-all ${method === 'download' ? 'border-blue-600' : 'border-gray-100'}`}
                     >
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 shrink-0 ${method === 'download' ? 'border-blue-600' : 'border-gray-300'}`}>
                            {method === 'download' && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Download size={18} className="text-gray-500" />
                                <h4 className="font-bold text-slate-900">Descargar PDF</h4>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Guarda el documento directamente en tu dispositivo.
                            </p>
                        </div>
                     </div>

                     {/* Email Option */}
                     <div 
                        onClick={() => setMethod('email')}
                        className={`p-5 rounded-2xl border-2 cursor-pointer flex items-start gap-4 transition-all ${method === 'email' ? 'border-blue-600' : 'border-gray-100'}`}
                     >
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 shrink-0 ${method === 'email' ? 'border-blue-600' : 'border-gray-300'}`}>
                            {method === 'email' && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Mail size={18} className="text-gray-500" />
                                <h4 className="font-bold text-slate-900">Enviar por correo electrónico</h4>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">juan.perez@email.com</p>
                        </div>
                     </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-4 flex gap-3 mb-6">
                    <Info className="text-blue-600 w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-800 leading-relaxed">
                        El envío del estado de cuenta no tiene costo adicional y se realizará de forma inmediata tras la confirmación.
                    </p>
                </div>

                <div className="mt-auto">
                    <Button onClick={() => navigate(Screen.STATEMENT_SUCCESS)}>Confirmar</Button>
                </div>
            </div>
        </div>
    );
};

// 4. Success Screen
export const StatementSuccess: React.FC<FlowProps> = ({ navigate }) => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col p-6 items-center pt-24 relative">
             <button onClick={() => navigate(Screen.HOME)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full">
                <X size={24} className="text-slate-900" />
            </button>

            <div className="w-40 h-40 bg-blue-50 rounded-full flex items-center justify-center mb-8 relative">
                 <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-blue-200">
                        <Check className="text-white w-8 h-8" strokeWidth={3} />
                    </div>
                 </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-3 text-center">¡Solicitud enviada!</h2>
            <p className="text-gray-500 text-center max-w-xs mb-10 leading-relaxed">
                Tu estado de cuenta de Octubre ha sido enviado a tu correo.
            </p>

            <div className="w-full bg-white rounded-3xl p-6 shadow-sm mb-6">
                <div className="space-y-4">
                    <div className="flex justify-between text-sm items-center border-b border-gray-50 pb-4">
                        <span className="text-gray-500">Fecha de solicitud</span>
                        <span className="font-bold text-slate-900">24 Oct, 2023</span>
                    </div>
                    <div className="flex justify-between text-sm items-center border-b border-gray-50 pb-4">
                        <span className="text-gray-500">Hora</span>
                        <span className="font-bold text-slate-900">14:30 PM</span>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                        <span className="text-gray-500">Nro. de operación</span>
                        <span className="font-bold text-slate-900">08921-XJ</span>
                    </div>
                </div>
            </div>

            <div className="w-full mt-auto">
                <Button onClick={() => navigate(Screen.HOME)}>Volver al inicio</Button>
            </div>
        </div>
    );
};
