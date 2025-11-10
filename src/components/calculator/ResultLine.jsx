import { normalizeValue } from "./numbers";

export default function ResultLine({ name, value }) {
  return (
    <p className="my-1 flex space-x-2">
      <span>{name}:</span>
      <span className={`${value > 0 ? 'text-blue-700' : 'text-red-500'} font-semibold`}>R$ {normalizeValue(value)}</span>
    </p>
  )
}