export function PageTitle({ children }) {
  return (
    <h1 className="text-2xl font-semibold">{children}</h1>
  )
}

export function PageSubtitle({ children }) {
  return (
    <p className="text-gray-500 mb-2">{children}</p>
  )
}

export function SectionTitle({ children }) {
  return (
    <h2 className="text-xl font-semibold">{children}</h2>
  )
}

export function Asterisk() {
  return (
    <span className="text-red-500">*</span>
  )
}

export function Hr() {
  return (
    <hr className="my-2 text-gray-200" />
  )
}