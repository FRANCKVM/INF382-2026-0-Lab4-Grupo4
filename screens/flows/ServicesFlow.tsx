import React, { useState } from 'react';
import { Screen } from '../../types';
import { Header, Button } from '../../components/UI';
import { 
    Search, Lightbulb, Droplets, Wifi, GraduationCap, Shield, 
    ChevronRight, Zap, Check, HelpCircle, AlertCircle, Wallet, Share, X,
    FileText, Lock
} from 'lucide-react';

interface FlowProps {
  navigate: (screen: Screen) => void;
}

// 1. Service Selection Screen
export const ServicesSelect: React.FC<FlowProps> = ({ navigate }) => {
    const categories = [
        { id: 1, name: 'Luz', icon: <Lightbulb size={24} className="text-blue-600" />, bg: 'bg-blue-50' },
        { id: 2, name: 'Agua', icon: <Droplets size={24} className="text-blue-600" />, bg: 'bg-blue-50' },
        { id: 3, name: 'Internet y TV', icon: <Wifi size={24} className="text-blue-600" />, bg: 'bg-blue-50' },
        { id: 4, name: 'Educación', icon: <GraduationCap size={24} className="text-blue-600" />, bg: 'bg-blue-50' },
        { id: 5, name: 'Seguros', icon: <Shield size={24} className="text-blue-600" />, bg: 'bg-blue-50' },
    ];

    const favorites = [
        { id: 1, name: 'Sedapal', detail: 'Departamento Lima', icon: 'S', color: 'bg-blue-500' },
        { id: 2, name: 'Luz del Sur', detail: 'Casa Playa', icon: 'L', color: 'bg-amber-400' },
        { id: 3, name: 'Claro', detail: 'Internet Hogar', icon: 'C', color: 'bg-red-500' },
        { id: 4, name: 'Pacífico Seguros', detail: 'Seguro Vehicular', icon: 'P', color: 'bg-cyan-400' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header 
                title="Pagar servicios" 
                onBack={() => navigate(Screen.OPERATIONS)} 
                rightElement={<HelpCircle className="text-slate-900" size={24} />}
            />
            
            <div className="px-6 py-4 flex-1 overflow-y-auto">
                {/* Search Bar */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-3.5 text-blue-600" size={20} />
                    <input 
                        type="text" 
                        placeholder="Busca una empresa o servicio" 
                        className="w-full bg-white border border-gray-200 pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:border-blue-600 text-sm shadow-sm" 
                    />
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    {categories.map((cat) => (
                        <button 
                            key={cat.id}
                            onClick={() => navigate(Screen.SERVICES_DETAILS)} // For demo, any category goes to details
                            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start gap-3 hover:border-blue-200 active:scale-[0.98] transition-all"
                        >
                            <div className={`w-10 h-10 rounded-full ${cat.bg} flex items-center justify-center`}>
                                {cat.icon}
                            </div>
                            <span className="font-semibold text-slate-900">{cat.name}</span>
                        </button>
                    ))}
                </div>

                {/* Favorites List */}
                <h3 className="font-bold text-lg text-slate-900 mb-4">Favoritos</h3>
                <div className="space-y-4 pb-6">
                    {favorites.map((fav) => (
                        <button 
                            key={fav.id}
                            onClick={() => navigate(Screen.SERVICES_DETAILS)}
                            className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between active:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl ${fav.color} flex items-center justify-center text-white font-bold text-xl`}>
                                    {fav.icon}
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-slate-900">{fav.name}</h4>
                                    <p className="text-sm text-gray-500">{fav.detail}</p>
                                </div>
                            </div>
                            <ChevronRight className="text-gray-300" size={20} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 2. Service Details (Input Supply)
export const ServicesDetails: React.FC<FlowProps> = ({ navigate }) => {
    const [supply, setSupply] = useState('');

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header title="" onBack={() => navigate(Screen.SERVICES_SELECT)} />
            
            <div className="px-6">
                 <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-2">PASO 2 DE 3</p>
                 <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden mb-6">
                    <div className="bg-blue-600 w-2/3 h-full rounded-full"></div>
                </div>

                <h1 className="text-3xl font-bold text-slate-900 mb-6">Detalles del servicio</h1>

                {/* Selected Company */}
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                            <Zap className="text-amber-500 fill-amber-500" size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-0.5">EMPRESA</p>
                            <h4 className="font-bold text-slate-900 text-lg">Luz del Sur</h4>
                        </div>
                    </div>
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check size={14} className="text-white" strokeWidth={3} />
                    </div>
                </div>

                {/* Input */}
                <label className="block text-slate-900 font-medium text-lg mb-3">Número de suministro</label>
                <div className="relative mb-3">
                    <input 
                        type="number" 
                        value={supply}
                        onChange={(e) => setSupply(e.target.value)}
                        placeholder="Ej. 1234567"
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-4 text-lg outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                    />
                    <div className="absolute right-4 top-4 bg-blue-600 rounded-full p-0.5">
                        <HelpCircle className="text-white" size={16} />
                    </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    Ingresa el código que aparece en la parte superior derecha de tu recibo.
                </p>

                {/* Save Favorite */}
                <div className="flex items-center gap-3 mb-8">
                     <div className="relative flex items-center">
                        <input type="checkbox" className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-gray-300 transition-all checked:border-blue-600 checked:bg-blue-600" />
                        <Check size={14} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" strokeWidth={4} />
                    </div>
                    <div>
                        <p className="text-slate-900 font-medium">Guardar en mis favoritos</p>
                        <p className="text-xs text-gray-500">Para futuros pagos rápidos</p>
                    </div>
                </div>

                <div className="mt-auto pb-6">
                    <Button onClick={() => navigate(Screen.SERVICES_DEBT)}>Continuar</Button>
                </div>
            </div>
        </div>
    );
};

// 3. Debt Selection (Pending Bills)
export const ServicesDebt: React.FC<FlowProps> = ({ navigate }) => {
    // Mock state for checkboxes
    const [selected, setSelected] = useState([true, true, false]);
    
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header title="Recibos pendientes" onBack={() => navigate(Screen.SERVICES_DETAILS)} />

            <div className="px-6 py-4 flex-1 flex flex-col">
                {/* Header Info */}
                <div className="flex items-center gap-4 mb-6">
                     <div className="w-14 h-14 rounded-2xl bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-400/20">
                        <Zap className="text-white fill-white" size={28} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Luz del Sur</h2>
                        <p className="text-sm text-gray-500">Suministro 1234567</p>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">SELECCIONAR DEUDA</span>
                    <button className="text-blue-600 font-bold text-sm">Seleccionar todo</button>
                </div>

                <div className="space-y-4">
                    {/* Bill 1 */}
                    <div className={`bg-white p-4 rounded-2xl border-2 transition-all ${selected[0] ? 'border-blue-600 shadow-md' : 'border-transparent shadow-sm'}`}>
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-slate-900">Octubre 2023</h4>
                                <div className="flex items-center gap-1 text-red-500 mt-1">
                                    <AlertCircle size={12} />
                                    <span className="text-xs font-bold">Vencido 15 Oct</span>
                                </div>
                            </div>
                            <div 
                                onClick={() => setSelected([!selected[0], selected[1], selected[2]])}
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${selected[0] ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}
                            >
                                {selected[0] && <Check size={14} className="text-white" strokeWidth={3} />}
                            </div>
                        </div>
                        <p className="text-right text-lg font-bold text-slate-900">S/ 142.50</p>
                    </div>

                    {/* Bill 2 */}
                    <div className={`bg-white p-4 rounded-2xl border-2 transition-all ${selected[1] ? 'border-blue-600 shadow-md' : 'border-transparent shadow-sm'}`}>
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-slate-900">Noviembre 2023</h4>
                                <div className="flex items-center gap-1 text-orange-500 mt-1">
                                    <AlertCircle size={12} />
                                    <span className="text-xs font-bold">Vence 15 Nov</span>
                                </div>
                            </div>
                            <div 
                                onClick={() => setSelected([selected[0], !selected[1], selected[2]])}
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${selected[1] ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}
                            >
                                {selected[1] && <Check size={14} className="text-white" strokeWidth={3} />}
                            </div>
                        </div>
                        <p className="text-right text-lg font-bold text-slate-900">S/ 135.00</p>
                    </div>

                    {/* Bill 3 */}
                    <div className={`bg-white p-4 rounded-2xl border-2 transition-all ${selected[2] ? 'border-blue-600 shadow-md' : 'border-transparent shadow-sm'}`}>
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-slate-900">Diciembre 2023</h4>
                                <div className="flex items-center gap-1 text-gray-400 mt-1">
                                    <span className="text-xs">Vence 15 Dic</span>
                                </div>
                            </div>
                            <div 
                                onClick={() => setSelected([selected[0], selected[1], !selected[2]])}
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${selected[2] ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}
                            >
                                {selected[2] && <Check size={14} className="text-white" strokeWidth={3} />}
                            </div>
                        </div>
                        <p className="text-right text-lg font-bold text-slate-500">S/ 120.00</p>
                    </div>
                </div>

                <div className="flex-1"></div>

                {/* Bottom Card Summary */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mt-8 mb-4">
                    <div className="flex justify-between items-center mb-4 border-b border-gray-50 pb-4">
                        <span className="text-gray-500 font-medium">Total a pagar</span>
                        <div className="flex items-end gap-1">
                            <span className="text-sm font-bold text-gray-400 mb-1">S/</span>
                            <span className="text-3xl font-bold text-slate-900">277.50</span>
                        </div>
                    </div>
                    <Button onClick={() => navigate(Screen.SERVICES_CONFIRM)} icon={<ChevronRight className="order-last" />}>
                        Continuar
                    </Button>
                </div>
            </div>
        </div>
    );
};

// 4. Payment Confirmation
export const ServicesConfirm: React.FC<FlowProps> = ({ navigate }) => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header title="Confirma tu pago" onBack={() => navigate(Screen.SERVICES_DEBT)} />

            <div className="px-6 py-2 flex justify-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 bg-blue-200 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-blue-200 rounded-full"></div>
                <div className="w-8 h-1.5 bg-blue-600 rounded-full"></div>
            </div>

            <div className="px-4 flex-1 pb-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
                    <div className="text-center mb-8 border-b border-gray-50 pb-6">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">TOTAL A PAGAR</p>
                        <h1 className="text-4xl font-bold text-slate-900">S/ 142.50</h1>
                    </div>

                    <div className="space-y-6">
                        {/* Service Item */}
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                                <Zap className="text-blue-600 fill-blue-600" size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium mb-0.5">Servicio</p>
                                <h4 className="font-bold text-slate-900">Luz del Sur</h4>
                            </div>
                        </div>

                         {/* Supply Item */}
                         <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                                <FileText className="text-slate-600" size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium mb-0.5">Suministro</p>
                                <h4 className="font-bold text-slate-900">1234567</h4>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100"></div>

                        {/* From Account */}
                        <div className="flex items-start gap-4">
                             <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                                <Wallet className="text-slate-600" size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium mb-0.5">Desde</p>
                                <h4 className="font-bold text-slate-900">Cuenta Simple Soles</h4>
                                <p className="text-xs text-gray-400 mt-0.5">Saldo disponible: S/ 2,405.00</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-gray-400 mb-8">
                    <Lock size={14} />
                    <span className="text-xs font-medium">Pagos 100% seguros y encriptados</span>
                </div>

                <div className="mt-auto">
                    <Button onClick={() => navigate(Screen.SERVICES_SUCCESS)} icon={<Check size={18} className="order-last" />}>Confirmar pago</Button>
                    <button onClick={() => navigate(Screen.HOME)} className="w-full py-4 text-gray-400 font-medium text-sm mt-2">Cancelar operación</button>
                </div>
            </div>
        </div>
    );
};

// 5. Success Screen
export const ServicesSuccess: React.FC<FlowProps> = ({ navigate }) => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col p-6 pt-12 items-center relative">
            <div className="w-full flex items-center justify-between mb-10">
                <span className="text-lg font-bold text-slate-900 mx-auto">Comprobante</span>
                <button className="absolute right-0 top-12 p-2">
                     <Share size={24} className="text-slate-900" />
                </button>
            </div>

            <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                 <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-blue-200">
                    <Check className="text-white w-10 h-10" strokeWidth={3} />
                </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">¡Pago exitoso!</h2>
            <h1 className="text-4xl font-bold text-slate-900 mb-10">S/ 142.50</h1>

            <div className="w-full bg-white rounded-3xl p-6 shadow-sm mb-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                        <Zap className="text-amber-500 fill-amber-500" size={24} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">SERVICIO</p>
                        <h3 className="font-bold text-lg text-slate-900">Luz del Sur</h3>
                    </div>
                </div>

                <div className="h-px bg-gray-100 border-t border-dashed border-gray-300 mb-6"></div>

                <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Nro. Operación</span>
                        <span className="font-bold text-slate-900">00928374</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Fecha</span>
                        <div className="text-right">
                             <p className="font-bold text-slate-900">24 Oct, 2023</p>
                             <p className="text-xs text-gray-400">10:30 AM</p>
                        </div>
                    </div>
                     <div className="flex justify-between text-sm items-center">
                        <span className="text-gray-500">Cuenta de cargo</span>
                        <div className="flex items-center gap-2">
                             <div className="w-6 h-4 bg-gray-300 rounded-sm"></div>
                             <span className="font-bold text-slate-900">**** 4521</span>
                        </div>
                    </div>
                </div>
            </div>

            <button className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-auto">
                <Share size={18} />
                Guardar constancia
            </button>

            <div className="w-full mt-8">
                <Button onClick={() => navigate(Screen.HOME)}>Volver al inicio</Button>
            </div>
            
             <div className="w-32 h-1 bg-gray-300 rounded-full mt-6 mx-auto"></div>
        </div>
    );
};
