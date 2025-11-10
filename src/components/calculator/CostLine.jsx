import { normalizeValue } from "./numbers";

export default function CostLine({ name, value }) {
  return (
    <div className="flex items-center w-full font momo">
      <span>{name}</span>
      <span
        className="flex-1 border-b border-dotted border-gray-400 mx-2 text-white select-none"
      >
        .
      </span>
      <span>R$ {normalizeValue(value)}</span>
    </div>
  )
}