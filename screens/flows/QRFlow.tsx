import React, { useState } from 'react';
import { Screen } from '../../types';
import { Header, Button, NumberPad } from '../../components/UI';
import { 
    ArrowLeft, Image, Zap, Grid3X3, ChevronDown, Store, 
    Wallet, QrCode, Lock, Share, X, Check, ArrowRight 
} from 'lucide-react';

interface FlowProps {
  navigate: (screen: Screen) => void;
}

// 1. QR Scanner Screen
export const QRScan: React.FC<FlowProps> = ({ navigate }) => {
    return (
        <div className="bg-slate-900 min-h-screen flex flex-col relative text-white">
            {/* Header overlay */}
            <div className="absolute top-0 left-0 right-0 z-10 px-6 pt-6">
                <button 
                    onClick={() => navigate(Screen.HOME)}
                    className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
            </div>

            {/* Camera View Area (Simulated) */}
            <div className="flex-1 flex flex-col items-center justify-center relative bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center">
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
                
                <h2 className="relative z-10 text-xl font-medium mb-12 text-center">Escanea el código QR para pagar</h2>

                {/* Scan Frame */}
                <div 
                    onClick={() => navigate(Screen.QR_AMOUNT)} // Click anywhere to simulate scan
                    className="relative z-10 w-72 h-72 border-2 border-transparent cursor-pointer"
                >
                    {/* Corners */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-2xl"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-2xl"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-2xl"></div>
                    
                    {/* Scan Grid Animation */}
                    <div className="w-full h-full bg-gradient-to-b from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-50 animate-pulse grid grid-cols-6 grid-rows-6 gap-px">
                        {Array.from({ length: 36 }).map((_, i) => (
                            <div key={i} className="border-[0.5px] border-white/5"></div>
                        ))}
                    </div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-[scan_2s_infinite]"></div>
                </div>

                {/* Bottom Tools */}
                <div className="relative z-10 mt-16 flex gap-12">
                    <button className="flex flex-col items-center gap-2 group">
                        <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-active:scale-95 transition-all border border-white/10">
                            <Image size={24} />
                        </div>
                        <span className="text-sm font-medium">Galería</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 group">
                        <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-active:scale-95 transition-all border border-white/10">
                            <Zap size={24} />
                        </div>
                        <span className="text-sm font-medium">Linterna</span>
                    </button>
                </div>

                {/* Footer Link */}
                <button className="absolute bottom-10 flex items-center gap-2 text-white font-semibold border-b border-transparent hover:border-white transition-all pb-0.5">
                    <Grid3X3 size={20} />
                    Pagar con número
                </button>
            </div>
            
            <style>{`
                @keyframes scan {
                    0% { top: 0; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}</style>
        </div>
    );
};

// 2. Amount Input Screen
export const QRAmount: React.FC<FlowProps> = ({ navigate }) => {
    const [amount, setAmount] = useState('25.50');

    const handlePress = (val: string) => {
        if (amount === '0.00') setAmount(val);
        else setAmount(prev => prev + val);
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header title="Detalle de Monto" onBack={() => navigate(Screen.QR_SCAN)} />
            
            <div className="flex-1 flex flex-col px-6 pt-4">
                {/* Recipient Info */}
                <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                        <img src="https://i.pravatar.cc/150?u=5" alt="Store" className="w-20 h-20 rounded-full border-4 border-white shadow-sm" />
                        <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1 border-2 border-white">
                            <Check size={12} className="text-white" strokeWidth={4} />
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm mt-3 mb-1">Pagar a</p>
                    <h2 className="text-xl font-bold text-slate-900">Bodega Doña Juana</h2>
                </div>

                {/* Amount Display */}
                <div className="text-center mb-2">
                    <div className="flex items-center justify-center gap-1">
                        <span className="text-4xl font-bold text-blue-600">S/</span>
                        <span className="text-6xl font-bold text-blue-600">{amount}</span>
                        <span className="w-[2px] h-12 bg-blue-600 animate-pulse ml-1"></span>
                    </div>
                    <p className="text-gray-400 text-sm font-medium mt-2">Sin comisión</p>
                </div>

                {/* Account Selector */}
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between mb-4 mt-6 cursor-pointer hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                            <Wallet size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">DESDE</p>
                            <h4 className="font-bold text-slate-900">Cuenta Simple Soles</h4>
                            <p className="text-xs text-gray-500">Saldo: S/ 1,200.00</p>
                        </div>
                    </div>
                    <ChevronDown className="text-gray-400" />
                </div>

                {/* Continue Button */}
                <Button onClick={() => navigate(Screen.QR_CONFIRM)}>Continuar</Button>

                <div className="flex-1"></div>
                
                {/* Number Pad */}
                <div className="mb-4">
                     <NumberPad onPress={handlePress} onDelete={() => setAmount(prev => prev.slice(0, -1))} />
                </div>
            </div>
        </div>
    );
};

// 3. Confirm Payment Screen
export const QRConfirm: React.FC<FlowProps> = ({ navigate }) => {
    return (
        <div className="bg-white min-h-screen flex flex-col">
            <div className="px-6 py-4 flex items-center justify-between">
                <button onClick={() => navigate(Screen.QR_AMOUNT)}><X size={24} className="text-slate-900" /></button>
                <h1 className="text-lg font-bold text-slate-900">Confirma tu pago</h1>
                <div className="w-6"></div>
            </div>

            <div className="px-6 pt-4 flex-1 flex flex-col pb-8">
                <div className="text-center mb-8">
                    <p className="text-gray-500 text-sm mb-1">Monto total a pagar</p>
                    <div className="flex justify-center items-end gap-1 text-blue-600">
                        <span className="text-2xl font-bold mb-1">S/</span>
                        <span className="text-5xl font-bold">25.00</span>
                    </div>
                </div>

                {/* Receipt Card */}
                <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden mb-6">
                    <div className="p-6 flex flex-col items-center border-b border-gray-50">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 mb-3">
                            <Store size={28} />
                        </div>
                        <h3 className="font-bold text-xl text-slate-900">Café Central</h3>
                        <p className="text-sm text-gray-400">ID: 89439201</p>
                    </div>

                    <div className="p-6 space-y-5">
                         <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                                <Wallet size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">DESDE</p>
                                <h4 className="font-bold text-slate-900">Cuenta Simple Soles</h4>
                                <p className="text-xs text-gray-500 font-mono">**** 4582 • Saldo: S/ 1,240.50</p>
                            </div>
                        </div>

                         <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 shrink-0">
                                <QrCode size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">MÉTODO</p>
                                <h4 className="font-bold text-slate-900">Pago con QR</h4>
                                <p className="text-xs text-gray-500">Sin comisiones adicionales</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1"></div>

                <div className="flex items-center justify-center gap-2 text-gray-400 mb-6">
                    <Lock size={12} />
                    <span className="text-xs font-medium">Transacción protegida y encriptada</span>
                </div>

                <Button onClick={() => navigate(Screen.QR_SUCCESS)} icon={<ArrowRight size={20} className="order-last" />}>
                    Confirmar y pagar
                </Button>
            </div>
        </div>
    );
};

// 4. Success Screen
export const QRSuccess: React.FC<FlowProps> = ({ navigate }) => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col p-6 pt-12 items-center relative">
            <div className="w-full flex items-center justify-between mb-8">
                 <button onClick={() => navigate(Screen.HOME)}><X size={24} className="text-slate-900" /></button>
                 <button className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                     <Share size={18} /> Compartir
                 </button>
            </div>

            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6 mt-4">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
                    <Check className="text-white w-8 h-8" strokeWidth={3} />
                </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">¡Pago exitoso!</h2>
            <h1 className="text-4xl font-bold text-slate-900 mb-8">S/ 25.00</h1>

            <div className="w-full bg-white rounded-3xl p-6 shadow-sm mb-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                         <p className="text-xs text-gray-500 mb-1">Destinatario</p>
                         <h3 className="font-bold text-lg text-slate-900">Café Central</h3>
                    </div>
                    <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
                        <Store size={24} />
                    </div>
                </div>

                <div className="h-px bg-gray-100 mb-6"></div>

                <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Nro. de operación</span>
                        <span className="font-bold text-slate-900">12345678</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Fecha y hora</span>
                        <span className="font-bold text-slate-900">24 Oct 2023 - 10:30 am</span>
                    </div>
                     <div className="flex justify-between text-sm items-center">
                        <span className="text-gray-500">Método de pago</span>
                        <div className="flex items-center gap-2">
                             <div className="w-6 h-4 bg-slate-800 rounded-sm"></div>
                             <span className="font-bold text-slate-900">...4321</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 text-blue-600/80 mb-auto">
                <div className="p-0.5 bg-blue-600 rounded-full">
                     <Check size={10} className="text-white" strokeWidth={4} />
                </div>
                <span className="text-xs font-semibold">Transferencia segura y encriptada</span>
            </div>

            <div className="w-full mt-6">
                <Button onClick={() => navigate(Screen.HOME)}>Volver al inicio</Button>
            </div>
        </div>
    );
};
