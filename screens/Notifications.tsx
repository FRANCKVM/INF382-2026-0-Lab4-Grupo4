import React from 'react';
import { Screen } from '../types';
import { Header } from '../components/UI';
import { Bell, CreditCard, ShieldAlert, Tag, FileText, CheckCircle, Clock } from 'lucide-react';

interface Props {
    navigate: (screen: Screen) => void;
}

export const NotificationsScreen: React.FC<Props> = ({ navigate }) => {
    const notifications = [
        {
            id: 1,
            type: 'security',
            title: 'Inicio de sesión detectado',
            message: 'Se detectó un acceso desde un nuevo dispositivo iPhone 14.',
            time: 'Hace 2 min',
            read: false,
            icon: <ShieldAlert size={20} />,
            color: 'bg-orange-100 text-orange-600'
        },
        {
            id: 2,
            type: 'payment',
            title: 'Pago realizado con éxito',
            message: 'Tu pago a Luz del Sur por S/ 142.50 fue procesado.',
            time: 'Hace 2 horas',
            read: false,
            icon: <CheckCircle size={20} />,
            color: 'bg-green-100 text-green-600'
        },
        {
            id: 3,
            type: 'promo',
            title: '50% dscto. en Starbucks',
            message: 'Aprovecha hoy el descuento pagando con tu Visa Signature.',
            time: 'Ayer',
            read: true,
            icon: <Tag size={20} />,
            color: 'bg-purple-100 text-purple-600'
        },
        {
            id: 4,
            type: 'info',
            title: 'Estado de cuenta disponible',
            message: 'Ya puedes revisar tu estado de cuenta de Octubre.',
            time: '24 Oct',
            read: true,
            icon: <FileText size={20} />,
            color: 'bg-blue-100 text-blue-600'
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header title="Notificaciones" onBack={() => navigate(Screen.HOME)} rightElement={<button className="text-xs text-blue-600 font-bold bg-blue-50 px-3 py-1.5 rounded-full">Marcar leído</button>} />
            
            <div className="px-6 py-4 flex-1">
                {notifications.length > 0 ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">HOY</span>
                        </div>
                        
                        {notifications.slice(0, 2).map((notif) => (
                            <NotificationItem key={notif.id} notif={notif} />
                        ))}

                        <div className="flex items-center gap-2 mb-2 mt-6">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">ANTERIORES</span>
                        </div>

                         {notifications.slice(2).map((notif) => (
                            <NotificationItem key={notif.id} notif={notif} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                            <Bell size={32} className="text-gray-400" />
                        </div>
                        <h3 className="font-bold text-slate-900">Estás al día</h3>
                        <p className="text-sm text-gray-500">No tienes notificaciones nuevas</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const NotificationItem = ({ notif }: { notif: any }) => (
    <div 
        className={`p-4 rounded-2xl border transition-all flex gap-4 ${notif.read ? 'bg-white border-transparent shadow-sm' : 'bg-white border-blue-200 shadow-md shadow-blue-100'}`}
    >
        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${notif.color}`}>
            {notif.icon}
        </div>
        <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
                <h4 className={`text-sm font-bold ${notif.read ? 'text-slate-900' : 'text-slate-900'}`}>{notif.title}</h4>
                {!notif.read && <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 shadow-sm shadow-blue-300"></div>}
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-2">{notif.message}</p>
            <div className="flex items-center gap-1 text-gray-400">
                <Clock size={10} />
                <span className="text-[10px] font-medium">{notif.time}</span>
            </div>
        </div>
    </div>
);
