import { Barcode, Calculator } from "lucide-react"
import Tool from "../components/home/Tool"

const tools = [
  {
    name: 'Calculadora de Preço',
    link: '/calculadora',
    icon: <Calculator size={30} />,
    description: 'Calcule o preço de venda do seu produto para nunca mais ficar no prejuízo',
  },
  {
    name: 'Gerador de EAN-13',
    link: '/gerador-ean-13',
    icon: <Barcode size={30} />,
    description: 'Precisa de códigos para seu anúncio? Gere aqui!',
  },
]

export default function Home() {
  return (
    <>
      <h1 className="text-3xl text-center font-bold w-[80%] mx-auto">Aumente a produtividade do seu dia com ferramentas simples, mas que vão acelerar seu trabalho!</h1>

      <div className="grid grid-cols-2 gap-3 mt-5">
        {tools.map((tool, index) => (
          <Tool tool={tool} key={index} />
        ))}
      </div>
      <p className="mt-8 text-gray-500">Mais ferramentas em breve!</p>
    </>
  )
}