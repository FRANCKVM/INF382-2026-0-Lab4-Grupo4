import React, { useState } from 'react';
import { Screen } from '../../types';
import { Header, Button } from '../../components/UI';
import { Pencil, ArrowRight, Check, Share, Plus, Calendar, Percent } from 'lucide-react';

interface FlowProps {
  navigate: (screen: Screen) => void;
}

// 1. Simulator Screen
export const LoanSimulator: React.FC<FlowProps> = ({ navigate }) => {
    const [amount, setAmount] = useState(15000);
    const [months, setMonths] = useState(24);
    const [currency, setCurrency] = useState<'PEN' | 'USD'>('PEN');

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header title="Simulador" onBack={() => navigate(Screen.OPERATIONS)} />
            
            <div className="px-6 py-4">
                {/* Currency Toggle */}
                <div className="bg-gray-200 p-1 rounded-xl flex mb-8">
                    <button 
                        onClick={() => setCurrency('PEN')}
                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${currency === 'PEN' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-500'}`}
                    >
                        S/ PEN
                    </button>
                    <button 
                        onClick={() => setCurrency('USD')}
                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${currency === 'USD' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-500'}`}
                    >
                        $ USD
                    </button>
                </div>

                {/* Amount Slider */}
                <div className="mb-8">
                    <p className="text-gray-500 text-sm mb-2">¿Cuánto necesitas?</p>
                    <div className="flex items-center gap-2 mb-4">
                        <h1 className="text-4xl font-bold text-slate-900">S/ {amount.toLocaleString()}</h1>
                        <span className="text-2xl font-bold text-gray-400">.00</span>
                        <Pencil size={20} className="text-gray-400 ml-2" />
                    </div>
                    <input 
                        type="range" 
                        min="1000" 
                        max="50000" 
                        step="500"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>S/ 1,000</span>
                        <span>S/ 50,000</span>
                    </div>
                </div>

                {/* Months Slider */}
                <div className="mb-10">
                     <p className="text-gray-500 text-sm mb-2">¿En cuántas cuotas?</p>
                     <div className="flex items-center gap-2 mb-4">
                        <h1 className="text-4xl font-bold text-slate-900">{months}</h1>
                        <span className="text-2xl font-bold text-gray-400">meses</span>
                    </div>
                     <input 
                        type="range" 
                        min="6" 
                        max="60" 
                        step="1"
                        value={months}
                        onChange={(e) => setMonths(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                     <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>6 meses</span>
                        <span>60 meses</span>
                    </div>
                </div>

                {/* Result Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
                    <p className="text-center text-gray-500 text-sm mb-1">Tu cuota mensual aproximada</p>
                    <h2 className="text-center text-4xl font-bold text-blue-600 mb-6">S/ 745.50</h2>
                    
                    <div className="space-y-3 pt-6 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <Percent size={16} />
                                <span>TEA Referencial</span>
                            </div>
                            <span className="font-bold text-slate-900">14.5%</span>
                        </div>
                        <div className="flex justify-between items-center">
                             <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <Calendar size={16} />
                                <span>Primera cuota</span>
                            </div>
                            <span className="font-bold text-slate-900">05 May 2024</span>
                        </div>
                    </div>
                </div>

                <Button 
                    onClick={() => navigate(Screen.LOAN_REVIEW)} 
                    icon={<ArrowRight size={20} className="order-last" />}
                >
                    Solicitar préstamo
                </Button>
            </div>
        </div>
    );
};

// 2. Review Screen
export const LoanReview: React.FC<FlowProps> = ({ navigate }) => {
    const [selectedAccount, setSelectedAccount] = useState('1');

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header title="Revisa tu préstamo" onBack={() => navigate(Screen.LOAN_SIMULATOR)} />
            
            <div className="px-6 pb-6">
                {/* Stepper */}
                <div className="flex justify-center gap-2 mb-6 mt-2">
                     <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
                     <div className="w-8 h-1 bg-blue-200 rounded-full"></div>
                     <div className="w-8 h-1 bg-blue-200 rounded-full"></div>
                </div>

                {/* Summary Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm mb-8">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">RESUMEN DE SOLICITUD</p>
                    
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 text-sm">Monto</span>
                            <span className="font-bold text-slate-900 text-lg">S/ 15,000.00</span>
                        </div>
                         <div className="flex justify-between items-center">
                            <span className="text-gray-500 text-sm">Cuota</span>
                            <span className="font-bold text-slate-900 text-lg">S/ 745.50</span>
                        </div>
                         <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                            <span className="text-gray-500 text-sm">Plazo</span>
                            <span className="font-bold text-slate-900 text-lg">24 meses</span>
                        </div>
                         <div className="flex justify-between items-center pt-2">
                            <span className="text-gray-500 text-sm">TEA Referencial</span>
                            <span className="font-bold text-slate-900 text-sm">14.50%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 text-sm">Fecha de pago</span>
                            <span className="font-bold text-slate-900 text-sm">Día 05 de cada mes</span>
                        </div>
                    </div>
                </div>

                <h3 className="font-bold text-slate-900 text-lg mb-4">¿Dónde recibes el dinero?</h3>

                <div className="space-y-4 mb-6">
                    <div 
                        onClick={() => setSelectedAccount('1')}
                        className={`bg-white p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between shadow-sm transition-all ${selectedAccount === '1' ? 'border-blue-600 ring-1 ring-blue-600' : 'border-transparent'}`}
                    >
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm">Cuenta Simple Soles</h4>
                            <p className="text-xs text-gray-500 mt-1">191-****4567-0-12</p>
                            <p className="text-sm text-blue-600 font-medium mt-1">Saldo: S/ 2,450.00</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAccount === '1' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                            {selectedAccount === '1' && <Check size={14} className="text-white" strokeWidth={3} />}
                        </div>
                    </div>

                    <div 
                        onClick={() => setSelectedAccount('2')}
                        className={`bg-white p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between shadow-sm transition-all ${selectedAccount === '2' ? 'border-blue-600 ring-1 ring-blue-600' : 'border-transparent'}`}
                    >
                         <div>
                            <h4 className="font-bold text-slate-900 text-sm">Cuenta Sueldo Soles</h4>
                            <p className="text-xs text-gray-500 mt-1">191-****8912-0-44</p>
                            <p className="text-sm text-gray-400 font-medium mt-1">Saldo: S/ 850.20</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAccount === '2' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                            {selectedAccount === '2' && <Check size={14} className="text-white" strokeWidth={3} />}
                        </div>
                    </div>
                </div>

                <button className="w-full py-4 border-2 border-dashed border-blue-200 rounded-2xl text-slate-500 font-medium text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors mb-8">
                    <Plus size={20} className="text-slate-400" />
                    Usar otra cuenta
                </button>

                <Button onClick={() => navigate(Screen.LOAN_TERMS)} icon={<ArrowRight size={20} className="order-last" />}>Continuar</Button>
            </div>
        </div>
    );
};

// 3. Terms Screen
export const LoanTerms: React.FC<FlowProps> = ({ navigate }) => {
    const [accepted, setAccepted] = useState(false);

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Header title="Términos y condiciones" onBack={() => navigate(Screen.LOAN_REVIEW)} />
            
             <div className="px-6 pt-2 pb-6 flex-1 flex flex-col">
                 <div className="flex justify-between items-center text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                    <span>Paso 3 de 4</span>
                 </div>
                 <div className="flex gap-2 mb-6">
                     <div className="h-1 bg-blue-600 flex-1 rounded-full"></div>
                     <div className="h-1 bg-blue-600 flex-1 rounded-full"></div>
                     <div className="h-1 bg-blue-600 flex-1 rounded-full"></div>
                     <div className="h-1 bg-gray-200 flex-1 rounded-full"></div>
                </div>

                <h1 className="text-2xl font-bold text-slate-900 mb-6">Revisa tu contrato</h1>

                <div className="bg-gray-50 rounded-2xl p-6 flex-1 overflow-y-auto mb-6 text-sm text-slate-600 leading-relaxed border border-gray-100">
                    <h3 className="font-bold text-slate-900 mb-4">Resumen del Contrato de Préstamo</h3>
                    <p className="mb-4">
                        El presente documento establece las condiciones generales y específicas del préstamo personal solicitado. Al aceptar, el cliente declara haber recibido toda la información necesaria sobre tasas, comisiones y gastos.
                    </p>
                    
                    <h4 className="font-bold text-slate-900 mb-2">1. Objeto del Contrato</h4>
                    <p className="mb-4">
                        La entidad financiera otorga un préstamo bajo la modalidad de cuotas fijas mensuales, cuyo monto y plazo han sido seleccionados por el cliente en el simulador previo.
                    </p>

                    <h4 className="font-bold text-slate-900 mb-2">2. Tasas y Comisiones</h4>
                    <p className="mb-4">
                        La Tasa Efectiva Anual (TEA) aplicada es la informada en el resumen de condiciones. En caso de incumplimiento, se aplicarán penalidades por mora de acuerdo al tarifario vigente disponible en nuestra web.
                    </p>

                    <h4 className="font-bold text-slate-900 mb-2">3. Pagos Anticipados</h4>
                    <p className="mb-4">
                        El cliente tiene derecho a realizar pagos anticipados totales o parciales en cualquier momento, lo cual reducirá los intereses compensatorios generados al día del pago, sin penalidades adicionales.
                    </p>

                    <h4 className="font-bold text-slate-900 mb-2">4. Seguro de Desgravamen</h4>
                    <p className="mb-4">
                        El préstamo incluye un seguro de desgravamen que cubre el saldo deudor en caso de fallecimiento o invalidez total y permanente del titular, según las exclusiones detalladas en la póliza.
                    </p>

                    <div className="border-t border-gray-200 my-4"></div>
                    
                    <p className="text-xs text-gray-400 italic">
                        Documento generado electrónicamente el 24 de mayo de 2024. Este contrato tiene validez legal bajo la normativa de firmas digitales vigente en el Perú.
                    </p>
                </div>

                <div className="flex gap-3 mb-6 items-start">
                    <div className="relative flex items-center">
                        <input 
                            type="checkbox" 
                            id="terms" 
                            checked={accepted}
                            onChange={(e) => setAccepted(e.target.checked)}
                            className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-gray-300 transition-all checked:border-blue-600 checked:bg-blue-600 hover:border-blue-400"
                        />
                        <Check size={14} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" strokeWidth={4} />
                    </div>
                    <label htmlFor="terms" className="text-sm text-slate-600 cursor-pointer select-none">
                        He leído y acepto los <span className="text-blue-600 font-bold">términos del contrato</span> y la <span className="text-blue-600 font-bold">hoja informativa</span>.
                    </label>
                </div>

                <Button disabled={!accepted} onClick={() => navigate(Screen.LOAN_SUCCESS)}>Confirmar préstamo</Button>
             </div>
        </div>
    );
};

// 4. Success Screen
export const LoanSuccess: React.FC<FlowProps> = ({ navigate }) => {
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

            <h2 className="text-2xl font-bold text-slate-900 mb-2">¡Préstamo aprobado!</h2>
            <p className="text-gray-500 text-sm mb-8">El dinero ya se encuentra en tu cuenta</p>

            <div className="w-full bg-gray-50 rounded-3xl p-8 mb-6">
                <div className="text-center mb-8">
                     <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-2">MONTO DESEMBOLSADO</p>
                     <h1 className="text-4xl font-bold text-slate-900">S/ 15,000<span className="text-2xl text-gray-400">.00</span></h1>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Número de operación</span>
                        <span className="font-semibold text-slate-900">00429184</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Cuenta de destino</span>
                        <span className="font-semibold text-slate-900">Ahorro Simple • 4512</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Fecha de primera cuota</span>
                        <span className="font-semibold text-slate-900">05 May 2024</span>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <button className="flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-700">
                        <Share size={18} />
                        Compartir constancia
                    </button>
                </div>
            </div>

            <div className="w-full space-y-4 mt-auto">
                <Button variant="outline" onClick={() => navigate(Screen.HOME)}>Ver cronograma de pagos</Button>
                <Button onClick={() => navigate(Screen.HOME)}>Ir al inicio</Button>
            </div>
        </div>
    );
};
