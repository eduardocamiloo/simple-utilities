import { DollarSign, Percent } from 'lucide-react';
import { NumericFormat } from 'react-number-format';

export default function Input({ type = 'money', name, value, setValue }) {
  function getIcon() {
    if (type === 'percent') {
      return <Percent />;
    } else {
      return <DollarSign />;
    }
  }

  return (
    <div className='flex items-center border border-gray-300 rounded-lg overflow-hidden w-full p-0 h-10 my-1'>
      <div className="text-gray-800 p-2">
        {getIcon()}
      </div>

      <NumericFormat
        name={name}
        value={value}
        onValueChange={(values) => { setValue(values.value) }}
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={2}
        fixedDecimalScale={false}
        allowNegative={false}
        className="h-full w-full outline-none text-lg font-medium"
        placeholder="0,00"
      />
    </div>
  )
}