import { Link } from "react-router";

export default function Tool({ tool }) {
  return (
    <Link
      to={tool.link}
      className="border border-gray-300 rounded-lg p-5 space-y-1 shadow-sm hover:bg-gray-100"
    >
      <span className="text-blue-700 block">{tool.icon}</span>
      <h4 className="text-lg font-semibold">{tool.name}</h4>
      <p className="text-gray-400">{tool.description}</p>
    </Link>
  )

}