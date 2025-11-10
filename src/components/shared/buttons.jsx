import { useState } from "react";
import { copyToClipboard, getPaste } from "./functions";
import { Check, CircleQuestionMark, ClipboardCopy, ClipboardPaste } from "lucide-react";

export function Button({ children, as = 'button', ...props }) {
  const Tag = as;

  return (
    <Tag
      className={`w-full sm:w-auto bg-white text-blue-700 hover:bg-blue-50 border border-blue-200 hover:border-blue-200 px-5 py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm font-medium`}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function GrayButton({ children, as = 'button', ...props }) {
  const Tag = as;

  return (
    <Tag
      className={`w-full sm:w-auto bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-200 px-5 py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm font-medium`}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function CompleteButton({ children, as = 'button', ...props }) {
  const Tag = as;

  return (
    <Tag
      className={`w-full sm:w-auto bg-blue-700 text-white hover:bg-blue-800 border border-blue-700 hover:border-blue-800 px-5 py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm font-medium`}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function CopyButton({ otherClasses = '', value, otherModalClasses = '-right-16 top-2 -translate-y-1/2' }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (!value) return;
    copyToClipboard(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }

  return (
    <span className="relative">
      <button
        type="button"
        title="Copiar texto"
        onClick={handleCopy}
        className={`text-gray-300 hover:text-blue-700 transition cursor-pointer hover:bg-blue-50 p-2 rounded-full ${otherClasses}`}
      >
        {copied ? <Check size={18} className="text-blue-500" /> : <ClipboardCopy size={18} />}
      </button>

      {copied && (
        <span className={`absolute text-sm text-blue-600 transition-opacity ${otherModalClasses}`}>
          Copiado!
        </span>
      )}
    </span>
  )
}

export function PasteButton({ otherClasses = '', otherModalClasses = '-right-16 top-2 -translate-y-1/2', setValue }) {
  const [pasted, setPasted] = useState(false);

  async function handlePaste() {
    setValue(await getPaste());
    setPasted(true);
    setTimeout(() => setPasted(false), 1000);
  }

  return (
    <span className="relative">
      <button
        type="button"
        title="Colar texto"
        onClick={handlePaste}
        className={`text-gray-300 hover:text-blue-700 transition cursor-pointer hover:bg-blue-50 p-2 rounded-full ${otherClasses}`}
      >
        {pasted ? <Check size={18} className="text-blue-500" /> : <ClipboardPaste size={18} />}
      </button>

      {pasted && (
        <span className={`absolute text-sm text-blue-600 transition-opacity ${otherModalClasses}`}>
          Colado!
        </span>
      )}
    </span>
  )
}

export function QuestionButton({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseLeave={() => setOpen(false)}
      onMouseEnter={() => setOpen(true)}
      className="w-12 h-12 flex items-center text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 justify-center p-2 rounded-full cursor-pointer relative"
    >
      <CircleQuestionMark size={25} />
      {open && (
        <div className="absolute left-14 -top-3 shadow-sm bg-gray-50 rounded-lg p-2 text-xs w-30 text-black">
          {children}
        </div>
      )}
    </div>
  )
}
