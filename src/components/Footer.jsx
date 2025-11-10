export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-4 w-full mt-10">
      <div className="w-[90%] mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-2 md:mb-0">
          <p className="text-sm text-gray-600 flex gap-2">
            Feito por
            <a
              className="text-blue-700 hover:underline hover:bg-blue-50 transition rounded-md flex gap-1" target="_blank"
              href="https://github.com/eduardocamiloo"
            >
              <img src="/github.svg" alt="Logo do Github" className="w-5" />
              @eduardocamiloo
            </a>
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500 flex items-center">
            <span className="font-medium mr-1">Versão: </span>
            <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{import.meta.env.VITE_APP_VERSION}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}