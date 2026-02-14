import React, { useState } from 'react';
import { Screen } from '../../types';
import { ACCOUNTS } from '../../constants';
import { Header, Button } from '../../components/UI';
import { ChevronDown, CreditCard, Wallet, Check, Share, Info, ArrowDown, ChevronRight } from 'lucide-react';

interface FlowProps {
  navigate: (screen: Screen) => void;
}

// 1. Select Card Screen (NEW)
export const CardPaymentSelect: React.FC<FlowProps> = ({ navigate }) => {
    // Filter only credit cards
    const creditCards = ACCOUNTS.filter(acc => acc.type === 'CREDIT');

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header title="Elegir Tarjeta" onBack={() => navigate(Screen.OPERATIONS)} />
            
            <div className="px-6 py-6 flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">¿Qué tarjeta deseas pagar?</h2>
                <p className="text-gray-500 text-sm mb-8">Selecciona la tarjeta de crédito para continuar.</p>

                <div className="space-y-4">
                    {creditCards.length > 0 ? (
                        creditCards.map(card => (
                            <div 
                                key={card.id}
                                onClick={() => navigate(Screen.CARD_PAYMENT_AMOUNT)}
                                className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:border-blue-200 hover:shadow-md transition-all active:scale-[0.98]"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                                        <CreditCard size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{card.name}</h4>
                                        <p className="text-sm text-gray-500">{card.number}</p>
                                        <p className="text-xs text-blue-600 font-semibold mt-1">Deuda: $ 450.00</p>
                                    </div>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                                    <ChevronRight className="text-gray-400" size={20} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-gray-500">No tienes tarjetas de crédito registradas.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// 2. Amount Selection Screen
export const CardPaymentAmount: React.FC<FlowProps> = ({ navigate }) => {
  const [selectedOption, setSelectedOption] = useState<'month' | 'min' | 'total' | 'other'>('month');

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header title="Pagar tarjeta" onBack={() => navigate(Screen.CARD_PAYMENT_SELECT)} />
      
      <div className="px-6 mt-4 flex-1 flex flex-col">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">¿Cuánto quieres pagar?</h2>
        <p className="text-gray-500 text-sm mb-8">Selecciona una de las opciones para continuar con el pago de tu Visa Signature.</p>

        <div className="space-y-4">
            {/* Payment Options */}
            <div 
                onClick={() => setSelectedOption('month')}
                className={`p-5 rounded-2xl border-2 cursor-pointer flex justify-between items-center transition-all ${selectedOption === 'month' ? 'border-blue-600 bg-blue-50/30' : 'border-gray-100'}`}
            >
                <div>
                    <p className="text-gray-500 text-xs mb-1">Pago del mes</p>
                    <p className="text-slate-900 font-bold text-lg">S/ 450.00</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedOption === 'month' ? 'border-blue-600' : 'border-gray-300'}`}>
                    {selectedOption === 'month' && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
                </div>
            </div>

            <div 
                onClick={() => setSelectedOption('min')}
                className={`p-5 rounded-2xl border-2 cursor-pointer flex justify-between items-center transition-all ${selectedOption === 'min' ? 'border-blue-600 bg-blue-50/30' : 'border-gray-100'}`}
            >
                <div>
                    <p className="text-gray-500 text-xs mb-1">Pago mínimo</p>
                    <p className="text-slate-900 font-bold text-lg">S/ 85.00</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedOption === 'min' ? 'border-blue-600' : 'border-gray-300'}`}>
                    {selectedOption === 'min' && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
                </div>
            </div>

            <div 
                onClick={() => setSelectedOption('total')}
                className={`p-5 rounded-2xl border-2 cursor-pointer flex justify-between items-center transition-all ${selectedOption === 'total' ? 'border-blue-600 bg-blue-50/30' : 'border-gray-100'}`}
            >
                <div>
                    <p className="text-gray-500 text-xs mb-1">Deuda total</p>
                    <p className="text-slate-900 font-bold text-lg">S/ 1,240.00</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedOption === 'total' ? 'border-blue-600' : 'border-gray-300'}`}>
                    {selectedOption === 'total' && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
                </div>
            </div>

            <div 
                onClick={() => setSelectedOption('other')}
                className={`p-5 rounded-2xl border-2 cursor-pointer flex justify-between items-center transition-all ${selectedOption === 'other' ? 'border-blue-600 bg-blue-50/30' : 'border-gray-100'}`}
            >
                <div>
                    <p className="text-gray-500 text-xs mb-1">Otro monto</p>
                    <input type="text" placeholder="S/ 0.00" disabled={selectedOption !== 'other'} className="bg-transparent text-slate-900 font-bold text-lg outline-none placeholder:text-gray-300" />
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedOption === 'other' ? 'border-blue-600' : 'border-gray-300'}`}>
                    {selectedOption === 'other' && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
                </div>
            </div>
        </div>

        <div className="flex-1"></div>
        <div className="py-6 border-t border-gray-50">
             <Button onClick={() => navigate(Screen.CARD_PAYMENT_SOURCE)}>Continuar</Button>
        </div>
      </div>
    </div>
  );
};

// 3. Source Account Selection Screen
export const CardPaymentSource: React.FC<FlowProps> = ({ navigate }) => {
    const [selectedAccount, setSelectedAccount] = useState('1');

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
             <Header title="Pagar Tarjeta" onBack={() => navigate(Screen.CARD_PAYMENT_AMOUNT)} />
             
             <div className="px-6 py-2">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-4">Paso 2 de 3</p>
                <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden mb-6">
                    <div className="bg-blue-600 w-2/3 h-full rounded-full"></div>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-2">¿Desde qué cuenta?</h2>
                <p className="text-gray-500 text-sm mb-6">Selecciona la cuenta de la cual se debitará el pago.</p>

                <div className="space-y-4">
                    <div 
                        onClick={() => setSelectedAccount('1')}
                        className={`bg-white p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between shadow-sm ${selectedAccount === '1' ? 'border-blue-600' : 'border-transparent'}`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                <Wallet size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Cuenta Simple Soles</h4>
                                <p className="text-sm text-gray-500">Saldo: S/ 4,250.80</p>
                            </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAccount === '1' ? 'border-blue-600' : 'border-gray-300'}`}>
                            {selectedAccount === '1' && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
                        </div>
                    </div>

                    <div 
                        onClick={() => setSelectedAccount('2')}
                        className={`bg-white p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between shadow-sm ${selectedAccount === '2' ? 'border-blue-600' : 'border-transparent'}`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
                                <span className="font-bold text-lg">$</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Cuenta Dólares</h4>
                                <p className="text-sm text-gray-500">Saldo: $ 1,120.00</p>
                            </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAccount === '2' ? 'border-blue-600' : 'border-gray-300'}`}>
                            {selectedAccount === '2' && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
                        </div>
                    </div>

                    <div 
                        onClick={() => setSelectedAccount('3')}
                        className={`bg-white p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between shadow-sm ${selectedAccount === '3' ? 'border-blue-600' : 'border-transparent'}`}
                    >
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
                                <Wallet size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Cuenta de Ahorros</h4>
                                <p className="text-sm text-gray-500">Saldo: S/ 15,000.00</p>
                            </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAccount === '3' ? 'border-blue-600' : 'border-gray-300'}`}>
                            {selectedAccount === '3' && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-blue-50 p-4 rounded-xl flex gap-3">
                    <Info className="text-blue-600 w-5 h-5 flex-shrink-0" />
                    <p className="text-xs text-blue-800 leading-relaxed">
                        Recuerda que si pagas desde una cuenta en moneda distinta, se aplicará el tipo de cambio del día.
                    </p>
                </div>
             </div>

             <div className="flex-1"></div>
             <div className="p-6 bg-white border-t border-gray-100">
                 <Button onClick={() => navigate(Screen.CARD_PAYMENT_CONFIRM)}>Continuar</Button>
             </div>
        </div>
    );
};

// 4. Confirmation Screen
export const CardPaymentConfirm: React.FC<FlowProps> = ({ navigate }) => {
    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Header title="Confirma tu pago" onBack={() => navigate(Screen.CARD_PAYMENT_SOURCE)} />
            
            <div className="px-6 flex flex-col flex-1 pb-6">
                <div className="flex justify-center gap-2 mb-8 mt-2">
                     <div className="w-8 h-1 bg-blue-200 rounded-full"></div>
                     <div className="w-8 h-1 bg-blue-200 rounded-full"></div>
                     <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
                </div>

                <div className="text-center mb-8">
                    <p className="text-gray-500 text-sm mb-1">Pagarás</p>
                    <h1 className="text-4xl font-bold text-slate-900">S/ 450.00</h1>
                </div>

                <div className="bg-gray-50 rounded-3xl p-6 mb-8 relative">
                    <div className="flex gap-4 mb-6">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                            <Wallet size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">DESDE</p>
                            <h4 className="font-bold text-slate-900">Cuenta Simple Soles</h4>
                            <p className="text-sm text-gray-500">S/ 12,450.00 disponible</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center w-full my-4 opacity-20">
                         <div className="h-px bg-slate-900 flex-1 border-dashed border-t border-slate-900"></div>
                         <ChevronDown size={16} className="mx-2" />
                         <div className="h-px bg-slate-900 flex-1 border-dashed border-t border-slate-900"></div>
                    </div>

                    <div className="flex gap-4 mt-6">
                        <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white shrink-0">
                            <CreditCard size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">PARA</p>
                            <h4 className="font-bold text-slate-900">Visa Signature ...4582</h4>
                            <p className="text-sm text-gray-500">Pago de tarjeta</p>
                        </div>
                    </div>
                </div>

                <h3 className="font-bold text-slate-900 mb-4">Detalle del pago</h3>
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Pago de mes (Capital)</span>
                        <span className="font-semibold text-slate-900">S/ 450.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Intereses y comisiones</span>
                        <span className="font-semibold text-green-600">S/ 0.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">ITF (0.005%)</span>
                        <span className="font-semibold text-slate-900">S/ 0.00</span>
                    </div>
                </div>

                <div className="border-t border-gray-100 py-4 flex justify-between items-center mb-6">
                    <span className="font-bold text-slate-900 text-lg">Total a confirmar</span>
                    <span className="font-bold text-blue-600 text-xl">S/ 450.00</span>
                </div>

                <div className="bg-blue-50 p-3 rounded-xl flex gap-3 mb-6">
                    <Info className="text-blue-600 w-4 h-4 mt-0.5 shrink-0" />
                    <p className="text-xs text-blue-800 leading-relaxed">
                        Este pago se procesará de forma inmediata. No se aplican cargos adicionales por pagos anticipados.
                    </p>
                </div>

                <div className="flex-1"></div>
                
                <div className="space-y-4 text-center">
                    <Button onClick={() => navigate(Screen.CARD_PAYMENT_SUCCESS)}>Confirmar pago</Button>
                    <button onClick={() => navigate(Screen.HOME)} className="text-gray-400 text-sm font-medium">Cancelar operación</button>
                </div>
            </div>
        </div>
    );
};

// 5. Success Screen
export const CardPaymentSuccess: React.FC<FlowProps> = ({ navigate }) => {
    return (
        <div className="bg-white min-h-screen flex flex-col p-6 pt-12 items-center relative">
            <button onClick={() => navigate(Screen.HOME)} className="absolute top-6 right-6 p-2 bg-gray-50 rounded-full hover:bg-gray-100">
                <div className="w-5 h-5 flex items-center justify-center text-slate-900">✕</div>
            </button>

            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 mt-8">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
                    <Check className="text-white w-8 h-8" strokeWidth={3} />
                </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">¡Pago realizado!</h2>
            <p className="text-gray-500 text-sm mb-8">Tu pago ha sido procesado con éxito</p>

            <div className="text-center mb-8">
                 <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">MONTO PAGADO</p>
                 <h1 className="text-4xl font-bold text-slate-900">S/ 450.00</h1>
            </div>

            <div className="w-full bg-gray-50 rounded-2xl p-6 mb-6">
                <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Fecha y hora</span>
                        <span className="font-semibold text-slate-900">15 Oct 2023, 10:45 AM</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Número de operación</span>
                        <span className="font-semibold text-slate-900">00482934812</span>
                    </div>
                    <div className="h-px bg-gray-200 my-2"></div>
                    <div className="flex justify-between text-sm items-center">
                        <span className="text-gray-500">Tarjeta pagada</span>
                        <div className="flex items-center gap-2">
                             <div className="w-6 h-4 bg-slate-800 rounded-sm"></div>
                             <span className="font-semibold text-slate-900">Visa Signature • 4582</span>
                        </div>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Método de pago</span>
                        <span className="font-semibold text-slate-900">Cuenta Corriente • 9231</span>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 w-full p-4 rounded-xl flex items-center gap-3 mb-8">
                 <Info className="text-blue-600 w-5 h-5 shrink-0" />
                 <p className="text-sm text-blue-700 font-medium">Tu saldo se actualizará en unos minutos.</p>
            </div>

            <div className="w-full space-y-4 mt-auto">
                <Button icon={<Share size={20} />} className="flex items-center justify-center gap-2">Compartir constancia</Button>
                <Button variant="secondary" onClick={() => navigate(Screen.HOME)}>Volver al inicio</Button>
            </div>
        </div>
    );
};
