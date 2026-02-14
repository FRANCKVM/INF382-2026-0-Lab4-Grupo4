import React, { useState } from 'react';
import { Screen } from '../../types';
import { Header, Button } from '../../components/UI';
import { CURRENT_USER } from '../../constants';
import { 
    Search, CreditCard, Lock, Wallet, ChevronRight, MessageCircle, Phone, 
    Camera, Bell, Plane, ShieldAlert, Wifi, MapPin, Sliders
} from 'lucide-react';

interface FlowProps {
  navigate: (screen: Screen) => void;
}

// 1. Help Center (Centro de Ayuda)
export const ProfileHelp: React.FC<FlowProps> = ({ navigate }) => {
    const categories = [
        { icon: <Wallet size={24} className="text-blue-600" />, label: 'Cuentas', bg: 'bg-blue-50' },
        { icon: <CreditCard size={24} className="text-blue-600" />, label: 'Tarjetas', bg: 'bg-blue-50' },
        { icon: <Lock size={24} className="text-blue-600" />, label: 'Claves y Seguridad', bg: 'bg-blue-50' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header title="Centro de Ayuda" onBack={() => navigate(Screen.PROFILE)} />
            
            <div className="px-6 py-4 flex-1">
                <h1 className="text-3xl font-bold text-slate-900 mb-2 leading-tight">¿En qué podemos<br/>ayudarte?</h1>
                
                <div className="relative mb-8 mt-6">
                    <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Buscar preguntas, temas..." 
                        className="w-full bg-white border border-gray-100 pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:border-blue-600 text-sm shadow-sm" 
                    />
                </div>

                <h3 className="font-bold text-lg text-slate-900 mb-4">Categorías</h3>
                <div className="space-y-4 mb-8">
                    {categories.map((cat, idx) => (
                        <button key={idx} className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between active:scale-[0.99] transition-transform">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl ${cat.bg} flex items-center justify-center`}>
                                    {cat.icon}
                                </div>
                                <span className="font-bold text-slate-900">{cat.label}</span>
                            </div>
                            <ChevronRight className="text-gray-300" size={20} />
                        </button>
                    ))}
                </div>

                <h3 className="font-bold text-lg text-slate-900 mb-4">Contacto directo</h3>
                <div className="space-y-4">
                    <button className="w-full bg-blue-600 text-white p-4 rounded-2xl shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 font-bold active:bg-blue-700 transition-colors">
                        <MessageCircle size={20} /> Chat en línea
                    </button>
                    <button className="w-full bg-white text-blue-600 border-2 border-blue-600 p-4 rounded-2xl flex items-center justify-center gap-2 font-bold active:bg-blue-50 transition-colors">
                        <Phone size={20} /> Llamar a banca telefónica
                    </button>
                </div>
            </div>
        </div>
    );
};

// 2. Edit Profile (Editar Perfil)
export const ProfileEdit: React.FC<FlowProps> = ({ navigate }) => {
    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Header title="Editar perfil" onBack={() => navigate(Screen.PROFILE)} />
            
            <div className="flex-1 px-6 pt-4 pb-8 overflow-y-auto">
                <div className="flex justify-center mb-8 relative">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full p-1 border-2 border-blue-100">
                             <img src={CURRENT_USER.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                        </div>
                        <button className="absolute bottom-0 right-0 bg-white p-2.5 rounded-full shadow-md border border-gray-100 text-blue-600 hover:bg-gray-50">
                            <Camera size={18} />
                        </button>
                    </div>
                </div>

                <div className="text-center mb-8">
                    <button className="text-blue-600 font-bold text-sm">Cambiar foto</button>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Nombre completo</label>
                        <input type="text" defaultValue="Alejandro" className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all bg-white" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Correo electrónico</label>
                        <input type="email" defaultValue="alejandro@bancopremium.pe" className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all bg-white" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Número de celular</label>
                        <input type="tel" defaultValue="+51 987 654 321" className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all bg-white" />
                    </div>
                </div>

                <div className="mt-10">
                    <Button onClick={() => navigate(Screen.PROFILE)}>Guardar cambios</Button>
                </div>
            </div>
        </div>
    );
};

// 3. Security (Seguridad)
export const ProfileSecurity: React.FC<FlowProps> = ({ navigate }) => {
    const [toggles, setToggles] = useState({
        biometrics: true,
        alerts: true,
        block: false,
        abroad: false
    });

    const toggle = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header title="Seguridad" onBack={() => navigate(Screen.PROFILE)} />

            <div className="flex justify-center my-6">
                 <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                    <Lock size={32} className="text-blue-600" />
                 </div>
            </div>
            
            <p className="px-10 text-center text-gray-500 text-sm mb-8 leading-relaxed">
                Gestiona la seguridad de tu cuenta y tarjetas para una experiencia protegida.
            </p>

            <div className="flex-1 px-6 pb-6">
                <div className="space-y-6">
                    <div className="pb-2">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pl-1">ACCESO</p>
                        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                    <div className="text-xl">☺</div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Biometría</h4>
                                    <p className="text-xs text-gray-500">Ingresa rápido con Face ID</p>
                                </div>
                            </div>
                            <div 
                                onClick={() => toggle('biometrics')}
                                className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors ${toggles.biometrics ? 'bg-blue-600' : 'bg-gray-200'}`}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${toggles.biometrics ? 'translate-x-5' : ''}`}></div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pl-1">TARJETAS Y CONSUMOS</p>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
                                        <Bell size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Alertas de consumo</h4>
                                        <p className="text-xs text-gray-500">Compras mayores a S/ 50.00</p>
                                    </div>
                                </div>
                                <div 
                                    onClick={() => toggle('alerts')}
                                    className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors ${toggles.alerts ? 'bg-blue-600' : 'bg-gray-200'}`}
                                >
                                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${toggles.alerts ? 'translate-x-5' : ''}`}></div>
                                </div>
                            </div>

                             <div className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
                                        <ShieldAlert size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Bloqueo temporal</h4>
                                        <p className="text-xs text-gray-500">Congela tu tarjeta física y digital</p>
                                    </div>
                                </div>
                                <div 
                                    onClick={() => toggle('block')}
                                    className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors ${toggles.block ? 'bg-blue-600' : 'bg-gray-200'}`}
                                >
                                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${toggles.block ? 'translate-x-5' : ''}`}></div>
                                </div>
                            </div>

                             <div className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-500">
                                        <Plane size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Compras en el exterior</h4>
                                        <p className="text-xs text-gray-500">Habilita el uso fuera de Perú</p>
                                    </div>
                                </div>
                                <div 
                                    onClick={() => toggle('abroad')}
                                    className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors ${toggles.abroad ? 'bg-blue-600' : 'bg-gray-200'}`}
                                >
                                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${toggles.abroad ? 'translate-x-5' : ''}`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-slate-800 rounded-2xl p-6 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="font-bold text-lg mb-1">Seguro contra robos</h3>
                        <p className="text-sm text-gray-300 mb-4">Desde S/ 12.90 al mes</p>
                        <button className="bg-white/20 hover:bg-white/30 text-xs font-bold px-4 py-2 rounded-lg backdrop-blur-sm transition-colors">Ver detalle</button>
                    </div>
                    <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-blue-600/50 to-transparent"></div>
                </div>

                <div className="mt-6 flex justify-center gap-2 text-blue-600 font-bold text-sm cursor-pointer hover:underline">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-xs">?</div>
                    ¿Necesitas ayuda urgente? Contáctanos
                </div>
                 <p className="text-center text-[10px] text-gray-400 mt-2">Versión 4.20.1 • ID de Dispositivo: 8493-AF</p>
            </div>
        </div>
    );
};

// 4. Card Settings (Configuración de Tarjetas)
export const ProfileCardSettings: React.FC<FlowProps> = ({ navigate }) => {
    const [limit, setLimit] = useState(2500);
    const [toggles, setToggles] = useState({
        internet: true,
        abroad: false,
        atm: true
    });

    const toggle = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Header title="Configuración de Tarjeta" onBack={() => navigate(Screen.PROFILE)} />
            
            <div className="px-6 pb-6 flex-1 overflow-y-auto">
                {/* Card Visual */}
                <div className="mt-4 mb-10 mx-auto w-full max-w-[320px] aspect-[1.58] bg-blue-700 rounded-2xl shadow-xl shadow-blue-700/30 p-6 text-white relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-8 bg-white/5 rounded-full blur-2xl"></div>
                    <div className="flex justify-between items-start z-10">
                        <span className="font-bold tracking-widest text-lg">PREMIUM</span>
                        <Wifi className="rotate-90 opacity-80" />
                    </div>
                    <div className="z-10">
                        <div className="flex gap-1.5 mb-4 opacity-80 text-xs">
                             <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                             <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                             <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                             <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                             <span className="ml-1">••••</span>
                             <span className="ml-1">••••</span>
                             <span className="ml-2 text-base font-mono">4829</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <span className="text-sm font-medium tracking-wide">Alejandro G.</span>
                            <span className="text-[10px] opacity-70">VENCE 09/28</span>
                        </div>
                    </div>
                </div>

                {/* Settings Toggles */}
                <div className="space-y-6 mb-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                <Wifi size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Compras por internet</h4>
                                <p className="text-xs text-gray-500">Habilita pagos online</p>
                            </div>
                        </div>
                         <div 
                            onClick={() => toggle('internet')}
                            className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors ${toggles.internet ? 'bg-blue-600' : 'bg-gray-200'}`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${toggles.internet ? 'translate-x-5' : ''}`}></div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                <Plane size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Compras en el extranjero</h4>
                                <p className="text-xs text-gray-500">Uso internacional</p>
                            </div>
                        </div>
                         <div 
                            onClick={() => toggle('abroad')}
                            className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors ${toggles.abroad ? 'bg-blue-600' : 'bg-gray-200'}`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${toggles.abroad ? 'translate-x-5' : ''}`}></div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                <div className="font-bold text-sm">$</div>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Retiros en cajeros</h4>
                                <p className="text-xs text-gray-500">Disposición de efectivo</p>
                            </div>
                        </div>
                         <div 
                            onClick={() => toggle('atm')}
                            className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors ${toggles.atm ? 'bg-blue-600' : 'bg-gray-200'}`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${toggles.atm ? 'translate-x-5' : ''}`}></div>
                        </div>
                    </div>
                </div>

                {/* Slider Limits */}
                <h3 className="font-bold text-slate-900 text-lg mb-6">Límites diarios</h3>
                
                <div className="border border-gray-100 rounded-3xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-500 text-sm">Monto máximo</span>
                        <span className="font-bold text-2xl text-blue-600">S/ {limit.toLocaleString()}.00</span>
                    </div>

                    <input 
                        type="range" 
                        min="0" 
                        max="10000" 
                        step="100"
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                        className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-2"
                    />

                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>S/ 0</span>
                        <span>S/ 10,000</span>
                    </div>
                </div>
                
                <p className="text-center text-[10px] text-blue-400 mt-6 px-8 leading-relaxed">
                    Puedes modificar estos límites en cualquier momento para mayor seguridad de tus operaciones.
                </p>
            </div>
        </div>
    );
};

// 5. Locations (Ubícanos)
export const ProfileLocations: React.FC<FlowProps> = ({ navigate }) => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col relative">
             <div className="absolute top-0 left-0 right-0 z-20 bg-white/80 backdrop-blur-md">
                 <Header title="Ubícanos" onBack={() => navigate(Screen.PROFILE)} />
                 <div className="px-6 pb-4">
                     <div className="relative">
                        <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Busca una agencia o cajero" 
                            className="w-full bg-white border border-gray-200 pl-12 pr-12 py-3.5 rounded-2xl outline-none focus:border-blue-600 text-sm shadow-sm" 
                        />
                        <button className="absolute right-3 top-2.5 p-1 bg-gray-100 rounded-lg text-gray-600">
                             <Sliders size={18} />
                        </button>
                    </div>
                 </div>
             </div>

             {/* Map Simulation */}
             <div className="flex-1 bg-gray-200 relative overflow-hidden">
                 {/* Map Grid/Streets Pattern */}
                 <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#9ca3af 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                 
                 {/* Streets */}
                 <div className="absolute top-1/4 left-0 w-full h-8 bg-white rotate-3"></div>
                 <div className="absolute top-0 left-1/3 w-16 h-full bg-white rotate-12"></div>
                 <div className="absolute bottom-1/4 left-0 w-full h-6 bg-white -rotate-6"></div>

                 {/* Pin 1 (Selected) */}
                 <div className="absolute top-[35%] left-[45%] flex flex-col items-center">
                     <div className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md mb-1 whitespace-nowrap">Agencia San Isidro</div>
                     <MapPin size={40} className="text-blue-600 fill-blue-600 drop-shadow-xl" />
                 </div>

                 {/* Pin 2 */}
                 <div className="absolute top-[30%] left-[70%]">
                     <MapPin size={32} className="text-gray-400 fill-gray-400 drop-shadow-md" />
                 </div>

                 {/* Pin 3 */}
                 <div className="absolute bottom-[40%] left-[20%]">
                     <MapPin size={32} className="text-gray-400 fill-gray-400 drop-shadow-md" />
                 </div>
             </div>

             {/* Bottom Sheet */}
             <div className="bg-white rounded-t-3xl shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] p-6 z-20">
                 <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>
                 
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">MÁS CERCANOS</p>

                 <div className="border border-blue-100 bg-blue-50/30 rounded-2xl p-4 mb-4">
                     <div className="flex justify-between items-start mb-1">
                         <h3 className="font-bold text-slate-900 text-lg">Agencia San Isidro</h3>
                         <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full">500m</span>
                     </div>
                     <p className="text-xs text-gray-500 mb-3">Av. Javier Prado Oeste 1234</p>
                     
                     <div className="flex items-center gap-2 mb-4">
                         <div className="w-2 h-2 rounded-full bg-green-500"></div>
                         <span className="text-xs font-bold text-green-600">Abierto ahora</span>
                         <span className="text-xs text-gray-400">• Cierra 6:00 PM</span>
                     </div>

                     <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
                        <MapPin size={18} /> Ver ruta
                     </button>
                 </div>

                 <div className="bg-gray-50 rounded-2xl p-4 flex items-start gap-4 opacity-70">
                     <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">ATM</div>
                     <div className="flex-1">
                         <div className="flex justify-between items-start">
                             <h4 className="font-bold text-slate-900">Cajero Plaza Vea</h4>
                             <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-full">1.2km</span>
                         </div>
                         <p className="text-xs text-gray-500 mb-1">Av. Arequipa 4500</p>
                         <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-red-500"></div>
                             <span className="text-xs font-bold text-red-500">Cerrado</span>
                             <span className="text-xs text-gray-400">• Mantenimiento</span>
                         </div>
                     </div>
                 </div>
             </div>
        </div>
    );
};