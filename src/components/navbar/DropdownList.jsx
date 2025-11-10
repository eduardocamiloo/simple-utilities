import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router";

export default function DropdownList({ name, items }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li className="relative list-none">
            <div className="flex items-center justify-between w-full" onClick={() => setIsOpen(!isOpen)}>
                <span
                    className="block text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-blue-50 flex-1 py-1 lg:px-0 lg:bg-transparent lg:hover:bg-transparent lg:relative lg:after:absolute lg:after:bottom-0 lg:after:left-0 lg:after:bg-blue-500 lg:after:h-0.5 lg:after:w-0 lg:hover:after:w-full lg:after:transition-all lg:whitespace-nowrap cursor-pointer"
                >
                    {name}
                </span>
                <button
                    className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer p-3 rounded-lg hover:bg-blue-50 lg:p-1 lg:bg-transparent lg:hover:bg-transparent"
                >
                    <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {isOpen && (
                <div className="mt-2 lg:absolute lg:top-full lg:left-0 lg:mt-2 lg:w-48 lg:bg-white lg:rounded-md lg:shadow-lg lg:border lg:border-gray-100 lg:py-1 lg:z-50">
                    {items.map((item, index) => (
                        <Link
                            onClick={() => setIsOpen(false)}
                            key={index}
                            to={item.link}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-md"
                        >
                            {item.icon} {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </li>
    );
}