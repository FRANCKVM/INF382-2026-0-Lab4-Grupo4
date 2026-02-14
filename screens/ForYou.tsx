import React from 'react';
import { Screen } from '../types';
import { CURRENT_USER } from '../constants';
import { Bell, Coffee, Plane, ShoppingBag, Heart, Trophy, UtensilsCrossed } from 'lucide-react';

interface ForYouProps {
  navigate: (screen: Screen) => void;
}

export const ForYouScreen: React.FC<ForYouProps> = ({ navigate }) => {
  return (
    <div className="bg-gray-50 min-h-screen pb-24">
       {/* Custom Header for this screen */}
       <div className="px-6 pt-12 pb-2 bg-gray-50 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <img src={CURRENT_USER.avatar} alt="User" className="w-10 h-10 rounded-full object-cover" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-50"></div>
                </div>
                <div>
                    <p className="text-xs text-gray-500 font-medium">Nivel Oro</p>
                    <h3 className="font-bold text-slate-900">{CURRENT_USER.name}</h3>
                </div>
            </div>
            <button 
                onClick={() => navigate(Screen.NOTIFICATIONS)} 
                className="relative p-2 -mr-2 rounded-full hover:bg-gray-200 active:scale-95 transition-all"
            >
                <Bell className="text-gray-600" size={24} />
                <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-gray-50"></div>
            </button>
       </div>

       <div className="px-6 mb-6">
            <h1 className="text-3xl font-bold text-slate-900">Para ti</h1>
            <p className="text-gray-500 text-sm">Beneficios exclusivos pensados en ti</p>
       </div>

       {/* Carousel / Hero Card */}
       <div className="pl-6 overflow-x-auto no-scrollbar flex gap-4 mb-8">
            <div className="min-w-[85%] bg-[#084e3d] rounded-2xl p-6 relative text-white shadow-xl shadow-green-900/10">
                <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                        <Coffee size={24} />
                    </div>
                    <span className="bg-white text-[#084e3d] text-xs font-bold px-3 py-1 rounded-lg">Vence hoy</span>
                </div>
                <h2 className="text-3xl font-bold mb-1">50% desc.</h2>
                <p className="text-sm text-gray-300">En todo Starbucks con tu tarjeta</p>
            </div>
            {/* Peek of next card */}
            <div className="min-w-[85%] bg-blue-600 rounded-2xl p-6 relative text-white shadow-xl shadow-blue-900/10">
                 <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                       <Plane size={24} />
                    </div>
                    <span className="bg-white text-blue-600 text-xs font-bold px-3 py-1 rounded-lg">Nuevo</span>
                </div>
                <h2 className="text-3xl font-bold mb-1">Bebidas</h2>
                <p className="text-sm text-blue-100">Al viajar con LATAM</p>
            </div>
       </div>

       {/* Categories */}
       <div className="px-6 mb-8">
            <h3 className="font-bold text-lg mb-4 text-slate-900">Explorar por categoría</h3>
            <div className="grid grid-cols-2 gap-4">
                <CategoryCard 
                    icon={<UtensilsCrossed size={24} className="text-orange-500" />} 
                    title="Restaurantes" 
                    subtitle="32 ofertas" 
                    bgClass="bg-orange-50" 
                />
                <CategoryCard 
                    icon={<Plane size={24} className="text-blue-500" />} 
                    title="Viajes" 
                    subtitle="15 destinos" 
                    bgClass="bg-blue-50" 
                />
                <CategoryCard 
                    icon={<ShoppingBag size={24} className="text-purple-500" />} 
                    title="Compras" 
                    subtitle="Tecnología y Moda" 
                    bgClass="bg-purple-50" 
                />
                <CategoryCard 
                    icon={<Heart size={24} className="text-teal-500" />} 
                    title="Salud" 
                    subtitle="Clínicas y seguros" 
                    bgClass="bg-teal-50" 
                />
            </div>
       </div>

       {/* Points */}
       <div className="px-6 pb-6">
            <h3 className="font-bold text-lg mb-4 text-slate-900">Tus puntos</h3>
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-6 text-white shadow-lg shadow-orange-500/20">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className="text-sm text-white/90 mb-1 font-medium">Puntos acumulados</p>
                        <h2 className="text-5xl font-bold">12,450</h2>
                    </div>
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center border border-white/30 backdrop-blur-sm">
                        <Trophy size={28} className="text-white" strokeWidth={2.5} />
                    </div>
                </div>
                
                <div className="w-full h-px bg-white/20 mb-6"></div>

                <div className="flex items-center justify-between">
                    <div className="bg-black/10 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider text-black/40">
                        VENCEN EN DIC
                    </div>
                    <button className="bg-white text-orange-600 px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm active:scale-95 transition-transform hover:bg-orange-50">
                        Canjear
                    </button>
                </div>
            </div>
       </div>
    </div>
  );
};

interface CategoryCardProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    bgClass: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, title, subtitle, bgClass }) => (
    <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-4 active:scale-[0.98] transition-transform cursor-pointer hover:shadow-md">
        <div className={`w-14 h-14 rounded-full ${bgClass} flex items-center justify-center`}>
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-slate-900 text-lg">{title}</h4>
            <p className="text-xs text-gray-500 font-medium">{subtitle}</p>
        </div>
    </div>
);
