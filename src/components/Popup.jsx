import { X } from "lucide-react";

export default function Popup({
   width = 'max-w-2xl w-full',
   height = 'max-h-[90vh]',
   title = 'Título do Popup',
   isOpen,
   setIsOpen,
   children
}) {
   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4">
         <div className={`bg-white rounded-lg shadow-xl ${width} ${height} overflow-y-auto`}>
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
               <h2 className="text-xl font-semibold text-gray-900">
                  {title}
               </h2>
               <button
                  onClick={() => { setIsOpen(false) }}
                  className="text-red-400 hover:text-red-600 transition-colors"
               >
                  <X size={24} className="cursor-pointer" />
               </button>
            </div>

            <div className="overflow-y-auto">
               {children}
            </div>
         </div>

      </div>
   )
}