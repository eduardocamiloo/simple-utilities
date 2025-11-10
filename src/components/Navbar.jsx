import { Barcode, Calculator, Wrench } from "lucide-react";
import DropdownList from "./navbar/DropdownList";

const menu = [
  {
    name: 'E-commerce',
    items: [
      {
        name: 'Calculadora de Preço',
        icon: <Calculator />,
        link: '/calculadora'
      },
      {
        name: 'Gerador de EAN-13',
        icon: <Barcode />,
        link: '/gerador-ean-13'
      }
    ]
  }
]

export default function Navbar() {
  return (
    <header className="md:flex md:justify-between flex-col md:flex-row shadow-sm bg-white w-full">
      <div className="md:relative flex items-center w-[90%] mx-auto py-3">
        <a
          className="flex items-center gap-2"
          href="/"
        >
          <span className="bg-blue-600 rounded-md text-white p-1">
            <Wrench />
          </span>
          <span className="font-bold">Utilitários Simples</span>
        </a>

        <nav className="md:absolute md:left-1/2 md:-translate-x-1/2 flex gap-6 space-x-8">
          {menu.map(category => (
            <DropdownList
              key={category.name}
              name={category.name}
              items={category.items}
            />
          ))}
        </nav>
      </div>
    </header>
  )
}