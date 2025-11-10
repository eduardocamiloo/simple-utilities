import { Form, Formik } from "formik";
import Popup from "../Popup";
import * as Yup from 'yup';
import { Input, Label, RadioOptions } from "../shared/forms";
import { Asterisk, Hr } from "../shared/texts";
import { DollarSign, Percent, Plus, Save, X } from "lucide-react";
import { GrayButton } from "../shared/buttons";

const options = [
  {
    type: 'percent',
    name: 'Porcentagem',
    icon: <Percent />,
  },
  {
    type: 'money',
    name: 'Dinheiro',
    icon: <DollarSign />,
  },
];


export default function CostPopup({ isOpen, setIsOpen, cost = {}, modifyCost }) {
  const schema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'O nome do custo deve ter pelo menos 2 caracteres')
      .max(100, 'O nome do custo deve ter no máximo 100 caracteres')
      .required('O nome do custo deve ser preenchido'),
    type: Yup.string()
      .oneOf(['percent', 'money'], 'O tipo de custo é inválido')
      .required('Selecione um tipo de custo')
  })

  function onSubmit(values) {
    if (cost.id === undefined) {
      modifyCost(values);
    } else {
      const editedCost = {
        id: cost.id,
        value: cost.value,
        name: values.name,
        type: values.type,
      }

      modifyCost(editedCost);
    }

    setIsOpen(false);
  }

  return (
    <Popup
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={cost.id === undefined ? 'Adicionar um custo ao cálculo' : 'Editar custo'}
    >
      <Formik
        initialValues={cost}
        validationSchema={schema}
        enableReinitialize={false}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form className="p-6 space-y-6">
            <div>
              <Label htmlFor='name'>Nome do custo <Asterisk /></Label>

              <Input
                name='name'
                hasError={errors.name && touched.name}
                placeholder='Ex: embalagem, comissão do vendedor'
              />
            </div>
            <div>
              <Label htmlFor='type'>Tipo de custo <Asterisk /></Label>

              <RadioOptions name='type' options={options} />
            </div>

            <Hr />

            <div className="flex gap-3 justify-end w-full">
              <GrayButton
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <X />  Cancelar
              </GrayButton>
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-700 text-white hover:bg-blue-800 border border-blue-700 hover:border-blue-800 px-5 py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm font-medium"
              >
                {cost.id === undefined ? (
                  <>
                    <Plus /> Criar custo
                  </>
                ) : (
                  <>
                    <Save /> Salvar custo
                  </>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Popup>
  )
}