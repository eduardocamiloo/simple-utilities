import { ErrorMessage, Field } from "formik"

export function Label({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block mt-3 mb-1 text-gray-700 font-medium text-sm"
    >{children}</label>
  )
}

export function Legend({ children }) {
  return (
    <p className="text-xs text-gray-500">{children}</p>
  )
}

export function Input({ name, hasError, ...props }) {
  return (
    <>
      <Field
        name={name}
        className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 ${hasError ? 'border-red-500' : 'border-gray-300'}`}
        {...props}
      />

      <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </>
  )
}

export function RadioOptions({ name, options }) {
  return (
    <Field name={name}>
      {({ field }) => (
        <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden">
          {options.map((opt) => (
            <label
              key={opt.type}
              className={`px-4 py-2 cursor-pointer border-r border-gray-300 last:border-0 ${field.value === opt.type ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
            >
              <input
                type="radio"
                {...field}
                value={opt.type}
                checked={field.value === opt.type}
                className="hidden"
              />
              <span className="flex gap-1 font-semibold">{opt.icon} {opt.name}</span>
            </label>
          ))}
        </div>
      )}
    </Field>
  )
}