"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Search, Bell, User, MessageSquare, Zap, Sparkles, Wrench, Bot, ArrowLeft, Send
} from "lucide-react";

export default function AsistenciaPage() {

  const [activeTab, setActiveTab] = useState<'chat' | 'diagnostico'>('diagnostico');

  return (
    <main className="p-8 w-full h-full overflow-y-auto flex flex-col">
      
      {/* header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
            <Link href="/reportes" className="bg-white p-2 rounded-full hover:shadow-md transition text-gima-navy hover:scale-105 active:scale-95">
                <ArrowLeft size={20} />
            </Link>
            <h1 className="font-microgramma text-4xl text-black">Reportes</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gima-gray" size={18} />
            <input type="text" placeholder="Buscar" className="pl-12 pr-4 py-2.5 bg-white rounded-full w-64 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-gima-blue/20" />
          </div>
          <div className="flex gap-3">
            <button className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md hover:text-gima-blue transition-all"><Bell size={20} className="text-slate-600 hover:text-gima-blue" /></button>
            <button className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md hover:text-gima-blue transition-all"><User size={20} className="text-slate-600 hover:text-gima-blue" /></button>
          </div>
        </div>
      </header>

      {/* container principal */}
      <div className="bg-white rounded-3xl p-2 shadow-sm flex-1 flex flex-col overflow-hidden">
        
        {/* sub-nav */}
        <div className="mx-6 mt-6 mb-8 bg-gima-light rounded-full px-8 py-3 flex items-center justify-between">
            <div className="flex gap-24 text-sm font-medium text-slate-500">
              <Link href="/" className="hover:text-gima-navy hover:bg-white/50 px-4 py-2 rounded-full transition-all">Historial de Reportes</Link>
              <button className="hover:text-gima-navy hover:bg-white/50 px-4 py-2 rounded-full transition-all">Generar Reportes</button>
              <button className="hover:text-gima-navy hover:bg-white/50 px-4 py-2 rounded-full transition-all">Programados</button>
            </div>
            
            <button className="bg-gima-navy text-white px-8 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-gima-navy/20 flex items-center gap-2 transform scale-105 ring-2 ring-offset-2 ring-gima-navy">
              Asistencia IA
            </button>
        </div>

        {/* tabs*/}
        <div className="px-10 flex gap-8 border-b border-slate-100 mb-6">
          <button 
            onClick={() => setActiveTab('chat')}
            className={`pb-3 flex items-center gap-2 transition-all border-b-2 ${
              activeTab === 'chat' 
                ? "text-gima-navy font-bold border-gima-navy scale-105" 
                : "text-slate-400 hover:text-slate-600 border-transparent hover:border-slate-200"
            }`}
          >
            <MessageSquare size={18} /> Chat
          </button>
          
          <button 
             onClick={() => setActiveTab('diagnostico')}
             className={`pb-3 flex items-center gap-2 transition-all border-b-2 ${
              activeTab === 'diagnostico' 
                ? "text-gima-navy font-bold border-gima-navy scale-105" 
                : "text-slate-400 hover:text-slate-600 border-transparent hover:border-slate-200"
            }`}
          >
            <Zap size={18} /> Diagnóstico
          </button>
        </div>

        {/* contenido */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 relative">
           
           {activeTab === 'chat' ? (
             /* chat view */
             <div className="h-full flex flex-col animate-in fade-in slide-in-from-left-4 duration-300">
                
                {/* zona de mensajes */}
                <div className="flex-1 bg-slate-50/50 rounded-2xl p-8 mb-4 border border-slate-100 flex flex-col gap-6 overflow-y-auto">
                    
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 max-w-3xl w-full">
                       {/* header del mensaje (Icono + Nombre) */}
                       <div className="flex items-center gap-3 mb-3 border-b border-slate-50 pb-3">
                          <Bot size={20} className="text-gima-navy" />
                          <span className="font-bold text-gima-navy text-sm uppercase tracking-wider">GIMA bot</span>
                       </div>
                       {/* mensaje default */}
                       <p className="text-slate-600 text-sm leading-relaxed">
                          ¡Hola! Soy GIMA-AI. ¿En qué puedo ayudarte hoy? Puedes preguntarme sobre el estado de equipos o procedimientos de mantenimiento.
                       </p>
                    </div>

                </div>

                {/* input bar */}
                <div className="relative mb-1">
                   <input 
                     type="text" 
                     placeholder="Escribe tu consulta..." 
                     className="w-full bg-gima-light/50 pl-6 pr-14 py-3 rounded-xl text-slate-700 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gima-blue/20 transition-all border border-transparent focus:border-gima-blue/10"
                   />
                   <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gima-blue text-white rounded-lg hover:bg-blue-600 transition active:scale-95 shadow-md shadow-gima-blue/20">
                      <Send size={16} /> {/* Icono un poco más pequeño también */}
                   </button>
                </div>
             </div>

           ) : (
             /* view de diagnostico */
             <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm"><Wrench className="text-red-400" size={32} /></div>
                <h3 className="font-microgramma text-2xl text-black mb-3">Diagnóstico Inteligente</h3>
                <p className="text-slate-500 text-sm mb-8">Describe el problema. Nuestra IA analizará los síntomas.</p>
                <textarea className="w-full h-40 bg-[#E8EEEF] rounded-2xl p-6 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gima-blue/30 resize-none transition-all text-sm mb-6" placeholder="Ej: el aire acondicionado hace ruido metalico..."></textarea>
                <button className="w-full bg-gima-blue text-white py-4 rounded-xl font-bold text-base hover:bg-blue-600 transition shadow-xl shadow-gima-blue/20 flex items-center justify-center gap-2 active:scale-95 duration-200">
                    <Sparkles size={20} /> Analizar Falla
                </button>
             </div>
           )}

        </div>
      </div>
    </main>
  );
}