import { useState } from 'react';
import listaInicial from './data/regalos.json';
import { GiftCard } from './components/GiftCard';

function App() {
  // Pasamos el JSON al estado de React para poder modificarlo en tiempo real
  const [regalos, setRegalos] = useState(listaInicial);

  // Función para cambiar el estado de un regalo desde la tarjeta
  const actualizarReservaLocal = (id, estaReservado) => {
    setRegalos(prevRegalos => 
      prevRegalos.map(regalo => 
        regalo.id === id ? { ...regalo, reservadoPorUsuario: estaReservado } : regalo
      )
    );
  };

  // Los cálculos ahora tienen en cuenta tanto el JSON estático como los clics del usuario
  const totalRegalos = regalos.length;
  const reservados = regalos.filter(r => r.reservado || r.reservadoPorUsuario).length;
  const disponibles = totalRegalos - reservados;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-indigo-50/30 py-16 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-800">
      
      {/* Cabecera */}
      <header className="max-w-3xl mx-auto text-center mb-20">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100/50 px-4 py-1.5 rounded-full shadow-[0_2px_12px_rgba(99,102,241,0.05)] mb-5">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
          <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest">
            Cumpleaños Sophia 🎂
          </span>
        </div>
        
        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950">
          Lista de Regalos
        </h1>
        
        <p className="mt-4 text-base sm:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed font-medium">
          Elige la idea que más te guste, haz clic en reservar y avísanos por WhatsApp. Si te equivocas, puedes cancelar la reserva en el momento.
        </p>

        {/* Contador Dinámico Sincronizado */}
        <div className="mt-10 max-w-xs mx-auto bg-white border border-slate-100 rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-around text-sm font-medium">
          <div className="text-center">
            <p className="text-3xl font-black text-indigo-600 tracking-tight transition-all">{disponibles}</p>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-0.5">Disponibles</p>
          </div>
          <div className="h-10 w-px bg-slate-100"></div>
          <div className="text-center">
            <p className="text-3xl font-black text-slate-400 tracking-tight transition-all">{reservados}</p>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-0.5">Reservados</p>
          </div>
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {regalos.map((regalo) => (
            <GiftCard 
              key={regalo.id} 
              regalo={regalo} 
              onReservaChange={actualizarReservaLocal}
            />
          ))}
        </div>
      </main>

      <footer className="text-center mt-32 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        Hecho con 💜 • {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;