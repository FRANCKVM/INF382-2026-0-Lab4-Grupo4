import React from 'react';
import { Screen } from '../types';
import { Header } from '../components/UI';
import { CURRENT_USER } from '../constants';
import { CreditCard, Lock, MessageCircle, MapPin, LogOut, ChevronRight, Pencil } from 'lucide-react';

interface ProfileProps {
  navigate: (screen: Screen) => void;
}

export const ProfileScreen: React.FC<ProfileProps> = ({ navigate }) => {
  const menuItems = [
    { icon: <CreditCard size={20} />, label: 'Configuración de tarjetas', action: () => navigate(Screen.PROFILE_CARD_SETTINGS) },
    { icon: <Lock size={20} />, label: 'Seguridad y privacidad', action: () => navigate(Screen.PROFILE_SECURITY) },
    { icon: <MessageCircle size={20} />, label: 'Centro de Ayuda', action: () => navigate(Screen.PROFILE_HELP) },
    { icon: <MapPin size={20} />, label: 'Ubícanos', action: () => navigate(Screen.PROFILE_LOCATIONS) },
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header title="Perfil" onBack={() => navigate(Screen.HOME)} />

      <div className="flex flex-col items-center mt-2 mb-10 px-6">
        <div className="relative mb-4">
            <div className="p-1 rounded-full border-2 border-gray-100">
                <img src={CURRENT_USER.avatar} alt="Profile" className="w-28 h-28 rounded-full object-cover" />
            </div>
             <button 
                onClick={() => navigate(Screen.PROFILE_EDIT)}
                className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md border border-gray-100 text-blue-600 hover:bg-gray-50 transition-colors"
             >
                <Pencil size={16} strokeWidth={2.5} />
             </button>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">{CURRENT_USER.name}</h2>
        
        <button 
            onClick={() => navigate(Screen.PROFILE_EDIT)}
            className="bg-blue-600 text-white px-12 py-3.5 rounded-full font-semibold shadow-lg shadow-blue-600/30 active:scale-95 transition-transform hover:bg-blue-700"
        >
            Editar cuenta
        </button>
      </div>

      <div className="flex-1 px-8 space-y-8">
        {menuItems.map((item, index) => (
            <button 
                key={index} 
                onClick={item.action}
                className="w-full flex items-center justify-between group"
            >
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        {item.icon}
                    </div>
                    <span className="font-semibold text-slate-800 text-sm md:text-base text-left">{item.label}</span>
                </div>
                <ChevronRight className="text-gray-300" size={20} />
            </button>
        ))}

        <div className="pt-6">
            <button onClick={() => navigate(Screen.LOGIN)} className="w-full flex items-center gap-5 group">
                 <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 group-hover:bg-red-100 transition-colors">
                    <LogOut size={20} className="ml-1" />
                </div>
                <span className="font-semibold text-red-500 text-sm md:text-base">Cerrar sesión</span>
            </button>
        </div>
      </div>
    </div>
  );
};
