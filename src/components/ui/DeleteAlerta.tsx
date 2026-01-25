import { AlertTriangle, X } from "lucide-react";

interface DeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export default function DeleteAlert({ isOpen, onClose, onConfirm, title, description }: DeleteAlertProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">

      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} // Si tocan afuera, se cierra
      />

      {/* VENTANA */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 transform transition-all scale-100 border border-gray-100">
        
        {/* Botón cerrar */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        {/* Icono de Advertencia */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>

        {/* Textos */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-900 font-title">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            {description}
          </p>
        </div>

        {/* Botones de Acción */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-xl hover:bg-red-700 shadow-lg shadow-red-500/30 transition-all"
          >
            Sí, borrar
          </button>
        </div>
      </div>
    </div>
  );
}