import React from 'react';
import { Screen } from '../../types';
import { Header, Button, NumberPad, SelectionCard } from '../../components/UI';
import { FAVORITE_CONTACTS } from '../../constants';
import { Search, ChevronDown, Check, Share, Home } from 'lucide-react';

interface FlowProps {
  navigate: (screen: Screen) => void;
  amount?: string;
  setAmount?: (val: string) => void;
}

export const TransferSelect: React.FC<FlowProps> = ({ navigate }) => (
  <div className="bg-white min-h-screen flex flex-col">
    <Header title="Selección de Destinatario" onBack={() => navigate(Screen.OPERATIONS)} />
    
    <div className="px-6 py-4">
        <h2 className="text-2xl font-bold mb-6">¿A quién deseas transferir?</h2>
        
        <div className="relative mb-8">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input type="text" placeholder="Buscar contacto o CCI" className="w-full bg-gray-50 pl-12 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-100" />
        </div>

        <button className="w-full p-4 mb-8 bg-white border border-blue-100 rounded-xl flex items-center justify-between shadow-sm hover:border-blue-300">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-2xl">+</div>
                <div className="text-left">
                    <h4 className="font-bold text-slate-900">Nuevo beneficiario</h4>
                    <p className="text-sm text-gray-500">Transferir a una cuenta nueva</p>
                </div>
            </div>
            <ChevronDown className="-rotate-90 text-gray-400" />
        </button>

        <h3 className="font-bold text-lg mb-4">Favoritos</h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
            {FAVORITE_CONTACTS.map(c => (
                <div key={c.id} onClick={() => navigate(Screen.TRANSFER_AMOUNT)} className="flex flex-col items-center min-w-[70px] cursor-pointer">
                    <img src={c.image} className="w-14 h-14 rounded-full border-2 border-white shadow-md mb-2" alt={c.name} />
                    <span className="text-sm font-medium">{c.name}</span>
                </div>
            ))}
        </div>

        <h3 className="font-bold text-lg mb-4 mt-4">Recientes</h3>
        <div className="space-y-4">
            {[1,2,3].map(i => (
                <div key={i} onClick={() => navigate(Screen.TRANSFER_AMOUNT)} className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">JP</div>
                        <div>
                            <h4 className="font-bold text-slate-900">Juan Perez</h4>
                            <p className="text-xs text-gray-500">BCP Soles • *4521</p>
                        </div>
                    </div>
                    <span className="bg-gray-100 text-xs px-2 py-1 rounded font-bold text-gray-600">S/</span>
                </div>
            ))}
        </div>
    </div>
  </div>
);

export const TransferAmount: React.FC<FlowProps> = ({ navigate, amount = '0', setAmount }) => {
    
    const handlePress = (val: string) => {
        if (!setAmount) return;
        if (amount === '0' && val !== '.') setAmount(val);
        else setAmount(amount + val);
    };

    const handleDelete = () => {
        if (!setAmount) return;
        setAmount(amount.length > 1 ? amount.slice(0, -1) : '0');
    };

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Header title="Transferir" onBack={() => navigate(Screen.TRANSFER_SELECT)} />
            <div className="flex-1 flex flex-col px-6">
                <h2 className="text-xl font-bold mt-4 mb-8">¿Cuánto deseas transferir?</h2>
                
                <div className="flex justify-center items-center gap-2 mb-8">
                    <span className="text-3xl font-bold text-blue-600">S/</span>
                    <span className="text-6xl font-bold text-slate-900">{amount}</span>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl flex justify-between items-center mb-4">
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Desde</p>
                        <p className="font-bold text-slate-900">Cuenta Simple Soles</p>
                        <p className="text-xs text-gray-500">S/ 12,450.00 disponibles</p>
                    </div>
                    <ChevronDown className="text-gray-400" />
                </div>

                <div className="flex-1"></div>
                <NumberPad onPress={handlePress} onDelete={handleDelete} />
                <div className="mt-8 mb-6">
                     <Button onClick={() => navigate(Screen.TRANSFER_CONFIRM)}>Continuar</Button>
                </div>
            </div>
        </div>
    );
};

export const TransferConfirm: React.FC<FlowProps> = ({ navigate, amount = '0' }) => {
    const formattedAmount = Number(amount).toFixed(2);

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header title="Transferencia" onBack={() => navigate(Screen.TRANSFER_AMOUNT)} onClose={() => navigate(Screen.HOME)} />
            
            <div className="flex-1 px-6 pt-4 pb-8">
                <h2 className="text-2xl font-bold mb-2">Confirma tu transferencia</h2>
                <p className="text-gray-500 mb-8">Revisa los detalles antes de confirmar.</p>

                <div className="bg-white rounded-3xl p-6 shadow-sm mb-6 text-center">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Monto a enviar</p>
                    <h3 className="text-4xl font-bold text-blue-600">S/ {formattedAmount}</h3>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <img src="https://i.pravatar.cc/150?u=3" className="w-12 h-12 rounded-full" alt="User" />
                        <div>
                            <p className="text-xs text-gray-500 uppercase">Destinatario</p>
                            <h4 className="font-bold text-lg">Juan Perez</h4>
                            <p className="text-sm text-gray-500">BCP Soles • *4521</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center"><Home className="text-gray-600" size={20} /></div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase">Desde mi cuenta</p>
                            <h4 className="font-bold text-lg">Cuenta Premium Soles</h4>
                            <p className="text-sm text-gray-500">Saldo: S/ 12,450.00</p>
                        </div>
                    </div>
                    
                     <div className="flex items-center gap-4 justify-between">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center"><Check className="text-gray-600" size={20} /></div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Concepto</p>
                                <h4 className="font-bold text-lg italic">"Almuerzo"</h4>
                            </div>
                        </div>
                        <button className="text-blue-600 font-bold text-sm">Editar</button>
                    </div>
                </div>

                <div className="flex-1"></div>
                
                <div className="mt-8">
                    <div className="flex justify-between text-xs text-gray-500 mb-4 px-2">
                        <span>Comisión de transferencia</span>
                        <span className="text-green-600 font-bold">S/ 0.00</span>
                    </div>
                    <Button onClick={() => navigate(Screen.TRANSFER_SUCCESS)}>Confirmar transferencia</Button>
                </div>
            </div>
        </div>
    );
};

export const TransferSuccess: React.FC<FlowProps> = ({ navigate, amount = '0' }) => {
    const formattedAmount = Number(amount).toFixed(2);
    
    return (
        <div className="bg-white min-h-screen flex flex-col p-6 items-center pt-20">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
                    <Check className="text-white w-8 h-8" strokeWidth={3} />
                </div>
            </div>

            <h2 className="text-xl text-gray-600 mb-2">¡Transferencia enviada!</h2>
            <h1 className="text-4xl font-bold text-slate-900 mb-10">S/ {formattedAmount}</h1>

            <div className="w-full bg-gray-50 rounded-3xl p-6 mb-8">
                <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-6">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">DESTINATARIO</p>
                        <h3 className="font-bold">Juan Perez</h3>
                        <p className="text-xs text-gray-500">BCP • *4521</p>
                    </div>
                    <img src="https://i.pravatar.cc/150?u=3" className="w-12 h-12 rounded-full" alt="User" />
                </div>

                <div className="flex justify-between mb-4">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">FECHA</p>
                        <p className="font-bold text-sm">24 May, 2024</p>
                        <p className="text-xs text-gray-400">14:32 PM</p>
                    </div>
                    <div className="text-right">
                         <p className="text-xs text-gray-500 mb-1">OPERACIÓN</p>
                         <p className="font-bold text-sm">#98234105</p>
                    </div>
                </div>
                
                 <div>
                    <p className="text-xs text-gray-500 mb-1">CONCEPTO</p>
                    <p className="font-medium text-sm">Pago de servicios varios</p>
                </div>
            </div>

            <div className="flex items-start gap-3 w-full px-4 mb-8">
                <div className="mt-0.5"><div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"><Check className="text-white w-2.5 h-2.5" /></div></div>
                <p className="text-xs text-gray-500 leading-relaxed">Tu transferencia está protegida y ha sido procesada de forma segura.</p>
            </div>

            <div className="w-full space-y-4">
                <Button icon={<Share size={20} />} className="flex items-center justify-center gap-2">Compartir constancia</Button>
                <Button variant="ghost" onClick={() => navigate(Screen.HOME)}>Volver al inicio</Button>
            </div>
        </div>
    );
};
