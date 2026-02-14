import React, { useState, useEffect } from 'react';
import { Screen } from '../../types';
import { Header, Button, NumberPad } from '../../components/UI';
import { 
    Plus, Shield, Plane, Laptop, Home, MoreVertical, 
    GraduationCap, Car, Smartphone, MoreHorizontal, 
    Check, PiggyBank, Calendar, TrendingUp, Settings,
    Target, Clock, DollarSign
} from 'lucide-react';

interface FlowProps {
  navigate: (screen: Screen) => void;
}

// 1. Goals List Screen
export const GoalsList: React.FC<FlowProps> = ({ navigate }) => {
    const goals = [
        { id: 1, title: 'Fondo de Emergencia', category: 'Seguridad Financiera', current: 8000, target: 10000, currency: 'PEN', icon: <Shield size={24} className="text-blue-600" />, bg: 'bg-blue-100', progress: 80 },
        { id: 2, title: 'Viaje a Cusco', category: 'Vacaciones', current: 400, target: 1200, currency: 'USD', icon: <Plane size={24} className="text-cyan-600" />, bg: 'bg-cyan-100', progress: 33 },
        { id: 3, title: 'Nueva Laptop', category: 'Trabajo', current: 1500, target: 4500, currency: 'PEN', icon: <Laptop size={24} className="text-purple-600" />, bg: 'bg-purple-100', progress: 33 },
        { id: 4, title: 'Depa Propio', category: 'Largo Plazo', current: 2500, target: 50000, currency: 'USD', icon: <Home size={24} className="text-red-600" />, bg: 'bg-red-100', progress: 5 },
    ];

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col relative pb-20">
            <Header 
                title="Metas de Ahorro" 
                onBack={() => navigate(Screen.OPERATIONS)} 
                rightElement={<button><MoreVertical size={24} className="text-slate-900" /></button>}
            />

            <div className="px-6 py-4">
                {/* Total Savings Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm mb-8 border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                    <p className="text-gray-500 text-sm mb-2">Ahorro Total</p>
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">S/ 15,400.00</h1>
                    <div className="inline-flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                        <TrendingUp size={16} className="text-green-600" />
                        <span className="text-xs font-bold text-green-600">+12.5%</span>
                        <span className="text-xs text-gray-400">vs. mes anterior</span>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-xl text-slate-900">Mis Objetivos</h3>
                    <button className="text-blue-600 text-sm font-semibold">Ver todo</button>
                </div>

                <div className="space-y-4 mb-8">
                    {goals.map((goal) => (
                        <div 
                            key={goal.id} 
                            onClick={() => navigate(Screen.GOAL_DETAIL)}
                            className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm cursor-pointer active:scale-[0.98] transition-all hover:border-blue-100 hover:shadow-md"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${goal.bg}`}>
                                        {goal.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{goal.title}</h4>
                                        <p className="text-xs text-gray-500">{goal.category}</p>
                                    </div>
                                </div>
                                <span className="bg-gray-50 px-2 py-1 rounded-lg text-xs font-bold text-gray-600">{goal.progress}%</span>
                            </div>
                            
                            <div className="flex justify-between items-end mb-2">
                                <span className="font-bold text-slate-900">
                                    {goal.currency === 'PEN' ? 'S/' : '$'} {goal.current.toLocaleString()}
                                </span>
                                <span className="text-xs text-gray-400">
                                    de {goal.currency === 'PEN' ? 'S/' : '$'} {goal.target.toLocaleString()}
                                </span>
                            </div>

                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full ${goal.id === 1 ? 'bg-blue-600' : goal.id === 2 ? 'bg-cyan-500' : goal.id === 3 ? 'bg-purple-500' : 'bg-red-500'}`} 
                                    style={{ width: `${goal.progress}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}

                    {/* New Goal Button (Inline) */}
                    <button 
                        onClick={() => navigate(Screen.GOALS_CREATE_CATEGORY)}
                        className="w-full py-4 border-2 border-dashed border-blue-200 text-blue-600 rounded-3xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors active:scale-[0.98]"
                    >
                        <Plus size={20} />
                        Crear nueva meta
                    </button>
                </div>
            </div>
        </div>
    );
};

// 2. Goal Detail & Contribution Edit Screen
export const GoalDetail: React.FC<FlowProps> = ({ navigate }) => {
    // Mock data for a specific goal
    const goal = { 
        title: 'Viaje a Cusco', 
        category: 'Vacaciones', 
        current: 400, 
        target: 1200, 
        currency: 'USD',
        bg: 'bg-cyan-100',
        color: 'text-cyan-600'
    };

    const [contribution, setContribution] = useState(100);
    const [monthsLeft, setMonthsLeft] = useState(0);

    // Calculate months left based on remaining amount and contribution
    useEffect(() => {
        const remaining = goal.target - goal.current;
        const months = Math.ceil(remaining / (contribution || 1));
        setMonthsLeft(months);
    }, [contribution]);

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header 
                title="Detalle de Meta" 
                onBack={() => navigate(Screen.GOALS_LIST)} 
                rightElement={<Settings size={22} className="text-slate-900" />}
            />

            <div className="px-6 flex-1 pt-2 pb-6">
                
                {/* Hero Card */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 mb-6 text-center">
                    <div className={`w-20 h-20 ${goal.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Plane size={36} className={goal.color} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">{goal.title}</h2>
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{goal.category}</span>

                    <div className="mt-8 flex justify-center items-end gap-1">
                        <span className="text-sm text-gray-400 font-medium mb-1.5">$</span>
                        <span className="text-5xl font-bold text-slate-900">{goal.current}</span>
                        <span className="text-sm text-gray-400 font-medium mb-1.5">/ {goal.target}</span>
                    </div>

                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mt-6 mb-2">
                        <div className="h-full bg-cyan-500 rounded-full w-1/3"></div>
                    </div>
                    <p className="text-xs text-cyan-600 font-bold">33% completado</p>
                </div>

                {/* Contribution Editor */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 mb-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <Target size={20} />
                        </div>
                        <h3 className="font-bold text-slate-900">Plan de Ahorro</h3>
                    </div>

                    <div className="mb-8">
                        <p className="text-sm text-gray-500 mb-4">Aporte mensual programado</p>
                        <div className="flex justify-between items-center mb-6">
                            <button 
                                onClick={() => setContribution(c => Math.max(10, c - 10))}
                                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-slate-500 active:bg-gray-100"
                            >
                                -
                            </button>
                            <div className="text-center">
                                <span className="text-3xl font-bold text-blue-600">$ {contribution}</span>
                            </div>
                            <button 
                                onClick={() => setContribution(c => c + 10)}
                                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-slate-500 active:bg-gray-100"
                            >
                                +
                            </button>
                        </div>

                        <input 
                            type="range" 
                            min="10" 
                            max="500" 
                            step="10" 
                            value={contribution}
                            onChange={(e) => setContribution(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-600">
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium uppercase">Tiempo estimado</p>
                            <p className="text-sm text-slate-900">Lograrás tu meta en <span className="font-bold text-blue-600">{monthsLeft} meses</span></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-white border-t border-gray-50">
                <Button onClick={() => navigate(Screen.GOALS_LIST)}>Guardar cambios</Button>
            </div>
        </div>
    );
};

// 3. Category Selection Screen
export const GoalsCreateCategory: React.FC<FlowProps> = ({ navigate }) => {
    const categories = [
        { id: 'viajes', label: 'Viajes', icon: <Plane size={24} className="text-blue-500" />, bg: 'bg-blue-50' },
        { id: 'educacion', label: 'Educación', icon: <GraduationCap size={24} className="text-purple-500" />, bg: 'bg-purple-50' },
        { id: 'hogar', label: 'Hogar', icon: <Home size={24} className="text-red-500" />, bg: 'bg-red-50' },
        { id: 'vehiculo', label: 'Vehículo', icon: <Car size={24} className="text-orange-500" />, bg: 'bg-orange-50' },
        { id: 'tecnologia', label: 'Tecnología', icon: <Smartphone size={24} className="text-cyan-500" />, bg: 'bg-cyan-50' },
        { id: 'otros', label: 'Otros', icon: <MoreHorizontal size={24} className="text-gray-500" />, bg: 'bg-gray-100' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header title="" onBack={() => navigate(Screen.GOALS_LIST)} 
                rightElement={<span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Paso 1 de 2</span>} 
            />
            
            <div className="flex justify-center mb-6">
                <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
                <div className="w-12 h-1 bg-gray-200 rounded-full ml-2"></div>
            </div>

            <div className="px-6 flex-1">
                <h2 className="text-3xl font-bold text-slate-900 mb-3 leading-tight">¿Qué quieres lograr?</h2>
                <p className="text-gray-500 mb-8">Elige la categoría que mejor describa tu próximo objetivo.</p>

                <div className="grid grid-cols-2 gap-4">
                    {categories.map((cat) => (
                        <button 
                            key={cat.id}
                            onClick={() => navigate(Screen.GOALS_CREATE_DETAILS)}
                            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center gap-4 hover:border-blue-200 hover:shadow-md transition-all active:scale-[0.98]"
                        >
                            <div className={`w-14 h-14 rounded-full ${cat.bg} flex items-center justify-center`}>
                                {cat.icon}
                            </div>
                            <span className="font-bold text-slate-900">{cat.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 4. Details Screen
export const GoalsCreateDetails: React.FC<FlowProps> = ({ navigate }) => {
    const [amount, setAmount] = useState('0.00');

    const handlePress = (val: string) => {
        // Simple logic for the demo visual
        if (amount === '0.00') setAmount(val);
        else setAmount(prev => prev.replace('.00', '') + val);
    };

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Header title="Configurar Meta" onBack={() => navigate(Screen.GOALS_CREATE_CATEGORY)} 
                rightElement={<span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Paso 2 de 2</span>} 
            />
            
            <div className="flex justify-center mb-6">
                <div className="w-12 h-1 bg-blue-200 rounded-full"></div>
                <div className="w-12 h-1 bg-blue-600 rounded-full ml-2"></div>
            </div>

            <div className="px-6 flex-1 flex flex-col">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Personaliza tu meta</h2>
                <p className="text-gray-500 mb-8">Define los detalles de tu nuevo ahorro.</p>

                <div className="space-y-6">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Nombre de la meta</label>
                        <input type="text" placeholder="Ej. Ahorro para auto" className="w-full text-lg border-b-2 border-gray-200 py-2 outline-none focus:border-blue-600 transition-colors placeholder:text-gray-300 font-medium text-slate-900" />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Monto Objetivo</label>
                        <div className="flex items-center gap-2">
                             <span className="text-4xl font-bold text-blue-600">S/</span>
                             <input type="text" value={amount} readOnly className="w-full text-4xl font-bold text-slate-900 py-2 outline-none bg-transparent placeholder:text-gray-200" />
                        </div>
                    </div>

                    <div>
                         <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Fecha estimada (Opcional)</label>
                         <div className="relative">
                            <input type="text" placeholder="Seleccionar fecha" className="w-full text-lg border-b-2 border-gray-200 py-2 outline-none focus:border-blue-600 transition-colors placeholder:text-gray-300 font-medium text-slate-900" />
                            <Calendar className="absolute right-0 top-2 text-gray-400" size={20} />
                         </div>
                    </div>
                </div>

                <div className="flex-1"></div>
                
                {/* Visual Number Pad for demo purposes */}
                <div className="grid grid-cols-3 gap-y-4 gap-x-8 px-4 mt-4 mb-4">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'].map(k => (
                        <button key={k} onClick={() => handlePress(k)} className="h-14 text-2xl font-medium text-slate-900 rounded-full hover:bg-gray-50">{k}</button>
                    ))}
                    <button className="h-14 flex items-center justify-center text-slate-900"><span className="text-lg">⌫</span></button>
                </div>

                <div className="py-4">
                    <Button onClick={() => navigate(Screen.GOALS_SUCCESS)}>Crear meta</Button>
                </div>
            </div>
        </div>
    );
};

// 5. Success Screen
export const GoalsSuccess: React.FC<FlowProps> = ({ navigate }) => {
    return (
        <div className="bg-white min-h-screen flex flex-col p-6 items-center pt-16 relative">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
                    <Check className="text-white w-8 h-8" strokeWidth={3} />
                </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">¡Meta creada!</h2>
            <p className="text-gray-500 text-center mb-8">Empieza hoy mismo a cumplir tus sueños</p>

            <div className="w-full bg-gray-50 rounded-3xl p-6 mb-8 border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600">
                        <PiggyBank size={28} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">NUEVO OBJETIVO</p>
                        <h3 className="font-bold text-xl text-slate-900">Viaje de Graduación</h3>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex justify-between items-end mb-2">
                        <p className="text-sm text-gray-500">Monto objetivo</p>
                        <p className="font-bold text-slate-900 text-xl">S/ 5,000.00</p>
                    </div>
                    
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex-1 bg-gray-200 h-2 rounded-full mr-4">
                            <div className="w-0 h-full bg-blue-600 rounded-full"></div>
                        </div>
                        <span className="text-xs font-bold text-blue-600">0%</span>
                    </div>
                </div>
                
                <p className="text-xs text-gray-400 italic text-center mt-6">
                    Aún no has realizado aportes a esta meta.
                </p>
            </div>

            <div className="w-full space-y-4 mt-auto">
                <Button onClick={() => navigate(Screen.GOALS_LIST)}>Hacer mi primer aporte</Button>
                <button onClick={() => navigate(Screen.GOALS_LIST)} className="w-full py-4 text-blue-600 font-bold text-sm hover:bg-gray-50 rounded-xl transition-colors">Volver a mis objetivos</button>
            </div>
        </div>
    );
};
