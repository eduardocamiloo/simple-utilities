export function Table({ children }) {
  return (
    <table className="w-full table-fixed min-w-0 border border-gray-200">
      {children}
    </table>
  )
}

export function THead({ cols }) {
  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        {cols.map((col, index) => (
          <th key={index} className={`px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}>
            {col}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export function TBody({ children }) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {children}
    </tbody>
  )
}

export function BodyRow({ children, ...props }) {
  return (
    <tr
      className={`hover:bg-gray-50 transition-colors`}
      {...props}
    >
      {children}
    </tr>
  )
}

export function Td({ children, otherClasses = '', ...props }) {
  return (
    <td className={`px-3 sm:px-6 py-4 ${otherClasses}`} {...props}>
      {children}
    </td>
  )
}