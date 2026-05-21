export const GiftCard = ({ regalo, onReservaChange }) => {
  const { id, nombre, descripcion, precio, imagen, url, reservado, reservadoPorUsuario } = regalo;

  const miTelefono = "34600000000"; // Pon tu número real aquí

  // Un regalo está bloqueado si ya venía reservado en el JSON o si el usuario lo acaba de pedir
  const yaEstaReservado = reservado || reservadoPorUsuario;

  // ACCIÓN 1: Reservar el regalo
  const handleReserva = () => {
    onReservaChange(id, true); // Notifica al padre (App.jsx)
    
    const mensajeWhatsapp = encodeURIComponent(
      `¡Hola! Me pido el siguiente regalo para el cumple: "${nombre}" (${precio}€). ¡Apúntamelo!`
    );
    const urlWhatsapp = `https://wa.me/${miTelefono}?text=${mensajeWhatsapp}`;
    window.open(urlWhatsapp, '_blank', 'noopener,noreferrer');
  };

  // ACCIÓN 2: Cancelar la reserva hecha en esta sesión
  const handleCancelarReserva = () => {
    onReservaChange(id, false); // Notifica al padre para volver a liberarlo
    
    const mensajeWhatsapp = encodeURIComponent(
      `¡Hola! Al final he cambiado de opinión. NO me voy a pedir el regalo: "${nombre}". Vuelve a ponerlo libre para los demás, porfa.`
    );
    const urlWhatsapp = `https://wa.me/${miTelefono}?text=${mensajeWhatsapp}`;
    window.open(urlWhatsapp, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className={`group relative w-full bg-white rounded-[2rem] p-5 flex flex-col justify-between border transition-all duration-500 h-[440px]
        ${yaEstaReservado 
          ? 'border-slate-100 bg-slate-50/40' 
          : 'border-slate-100 hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(99,102,241,0.1)] hover:border-indigo-100'
        } ${reservadoPorUsuario ? 'opacity-90' : yaEstaReservado ? 'opacity-60' : ''}`}
    >
      <div>
        {/* Contenedor de la Imagen */}
        <div className="relative w-full h-48 overflow-hidden rounded-2xl bg-slate-50">
          <img 
            className={`w-full h-full object-cover transition-transform duration-700 ease-out 
              ${yaEstaReservado ? 'filter grayscale-[40%] blur-[1px]' : 'group-hover:scale-105'}`} 
            src={imagen} 
            alt={nombre} 
          />
          
          {/* Precio Flotante */}
          {!yaEstaReservado && (
            <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md border border-white/40 px-3 py-1 rounded-full shadow-sm">
              <span className="text-sm font-black text-slate-800 tracking-tight">{precio}€</span>
            </div>
          )}

          {/* Badge de Bloqueo / Estado */}
          {yaEstaReservado && (
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
              <span className={`font-extrabold text-xs uppercase tracking-wider px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border 
                ${reservadoPorUsuario 
                  ? 'bg-indigo-600 text-white border-indigo-500 animate-bounce' 
                  : 'bg-white text-slate-800 border-slate-100'
                }`}
              >
                {reservadoPorUsuario ? '🎁 Apartado por ti' : '🔒 Ya Reservado'}
              </span>
            </div>
          )}
        </div>
        
        {/* Textos */}
        <div className="pt-5 px-1">
          <h3 className={`font-extrabold text-xl tracking-tight mb-2 transition-colors duration-300 line-clamp-1
            ${yaEstaReservado ? 'text-slate-400 line-through' : 'text-slate-800 group-hover:text-indigo-600'}`}>
            {nombre}
          </h3>
          <p className={`text-sm leading-relaxed line-clamp-3 ${yaEstaReservado ? 'text-slate-400' : 'text-slate-500'}`}>
            {descripcion}
          </p>
        </div>
      </div>

      {/* Botones de Acción Dinámicos */}
      <div className="pt-4 px-1 mt-auto">
        <div className="flex gap-2.5 w-full">
          {/* Enlace a la tienda (se deshabilita si está reservado por OTRA persona) */}
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`w-1/3 font-bold py-3 rounded-xl text-center text-xs transition-all duration-300 border flex items-center justify-center gap-1
              ${reservado && !reservadoPorUsuario
                ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed pointer-events-none' 
                : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100 active:scale-95'
              }`}
          >
            Ver 🔗
          </a>
          
          {/* Botón Principal Inteligente */}
          {reservadoPorUsuario ? (
            // Si lo reservó el usuario actual, le damos la opción de CANCELAR en Rojo
            <button 
              onClick={handleCancelarReserva}
              className="w-2/3 font-extrabold py-3 rounded-xl text-center text-xs transition-all duration-300 bg-rose-500 hover:bg-rose-600 text-white shadow-sm active:scale-95"
            >
              Cancelar reserva ↩️
            </button>
          ) : (
            // Botón normal de reserva / o deshabilitado si ya estaba en el JSON
            <button 
              onClick={handleReserva}
              disabled={reservado}
              className={`w-2/3 font-extrabold py-3 rounded-xl text-center text-xs transition-all duration-300 shadow-sm
                ${reservado 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-slate-900 text-white hover:bg-indigo-600 active:scale-95'
                }`}
          >
            {reservado ? 'No disponible' : '¡Me lo pido! 🎁'}
          </button>
          )}
        </div>
      </div>
    </div>
  );
};