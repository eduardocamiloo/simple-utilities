import { useEffect, useState } from "react";
import Input from "../components/calculator/Input";
import { Label, Legend } from "../components/shared/forms";
import { Section } from "../components/shared/sections";
import { Asterisk, PageSubtitle, PageTitle, SectionTitle } from "../components/shared/texts";
import { v4 as uuidv4 } from 'uuid';
import { Button } from "../components/shared/buttons";
import { Edit, Plus, Trash2 } from "lucide-react";
import CostPopup from "../components/calculator/CostPopup";
import CostLine from "../components/calculator/CostLine";
import ResultLine from "../components/calculator/ResultLine";
import Decimal from "decimal.js";
import { safeDecimal } from "../components/calculator/numbers";

const initialOthersCosts = [
  {
    id: uuidv4(),
    type: 'percent',
    name: 'Comissão do Marketplace',
    value: ''
  },
  {
    id: uuidv4(),
    type: 'percent',
    name: 'Impostos e Tributações',
    value: ''
  },
  {
    id: uuidv4(),
    type: 'money',
    name: 'Taxa fixa',
    value: ''
  },
]

export default function Calculator() {
  const [cost, setCost] = useState('');
  const [markup, setMarkup] = useState('');
  const [othersCosts, setOthersCosts] = useState(initialOthersCosts);

  const [costPopupIsOpen, setCostPopupIsOpen] = useState(false);
  const [currentCost, setCurrentCost] = useState({});

  const [results, setResults] = useState({
    salePrice: 0.00,
    profit: 0.00,
    totalCosts: 0.00,
  });

  function modifyCost(cost) {
    setOthersCosts(prev => {
      if (cost.id !== undefined) {
        console.log('edit');
        return prev.map(item =>
          item.id === cost.id
            ? { ...item, ...cost }
            : item
        );
      }

      return [
        ...prev,
        { id: uuidv4(), type: cost.type, name: cost.name }
      ];
    });
  }

  useEffect(() => {
    const othersMoneyCosts = othersCosts.filter(
      cost => cost.type === 'money' && cost.value !== ''
    );
    const othersPercentCosts = othersCosts.filter(
      cost => cost.type === 'percent'
    );

    const totalMoneyCosts = othersMoneyCosts.reduce(
      (total, item) => total.plus(safeDecimal(item.value)),
      safeDecimal(cost)
    );

    const totalPercents = othersPercentCosts.reduce(
      (total, item) => total.plus(safeDecimal(item.value)),
      new Decimal(0)
    );

    const m = safeDecimal(markup).div(100);
    const p = totalPercents.div(100);

    const divisor = new Decimal(1).minus(p.plus(m));
    const salePrice = totalMoneyCosts.div(divisor);

    const profit = salePrice.mul(m);

    const percentCostsValue = salePrice.mul(p);

    const totalCosts = totalMoneyCosts.plus(percentCostsValue);

    setResults({
      salePrice: Number(salePrice.toFixed(2)),
      profit: Number(profit.toFixed(2)),
      totalCosts: Number(totalCosts.toFixed(2)),
    });
  }, [cost, markup, othersCosts]);

  return (
    <>
      <PageTitle>Calculadora de preços</PageTitle>
      <PageSubtitle>Descubra o quanto você vai ganhar para nunca mais ficar no prejuízo!</PageSubtitle>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="col-span-7 space-y-6">
          <Section>
            <SectionTitle>Informações principais</SectionTitle>

            <form className="space-y-6">
              <div>
                <Label htmlFor='cost'>Preço de custo <Asterisk /></Label>

                <Input type="money" name='cost' value={cost} setValue={setCost} />

                <Legend>O quanto você pagou pelo produto</Legend>
              </div>
              <div>
                <Label htmlFor='markup'>Margem de Lucro <Asterisk /></Label>

                <Input type="percent" name='markup' value={markup} setValue={setMarkup} />

                <Legend>Qual porcentagem de lucro que você deseja ter sobre o preço final</Legend>
              </div>
            </form>
          </Section>

          <Section>
            <div className="flex justify-between flex-col md:flex-row items-center">
              <SectionTitle>Custos da venda</SectionTitle>

              <Button
                onClick={() => {
                  setCurrentCost({});
                  setCostPopupIsOpen(true);
                }}
              >
                <Plus size={16} /> Adicionar custo
              </Button>
            </div>

            <form className="space-y-6">
              {othersCosts.map(otherCost => (
                <div key={otherCost.id}>
                  <Label htmlFor={'other_' + otherCost.id}>{otherCost.name}</Label>

                  <div className="flex gap-2">
                    <Input
                      type={otherCost.type}
                      name={'other_' + otherCost.id}
                      value={otherCost.value}
                      setValue={(newValue) =>
                        setOthersCosts(prev =>
                          prev.map(cost =>
                            cost.id === otherCost.id
                              ? { ...cost, value: newValue }
                              : cost
                          )
                        )
                      }
                    />
                    <button
                      type="button"
                      className="w-10 h-10 flex justify-center items-center border border-gray-300 my-1 rounded-lg text-blue-700 cursor-pointer hover:text-blue-800 hover:bg-gray-50 transition"
                      title="Editar custo"
                      onClick={() => {
                        setCurrentCost(otherCost);
                        setCostPopupIsOpen(true);
                      }}
                    >
                      <Edit />
                    </button>
                    <button
                      type="button"
                      className="w-10 h-10 flex justify-center items-center border border-gray-300 my-1 rounded-lg text-red-700 cursor-pointer hover:text-red-800 hover:bg-gray-50 transition"
                      title="Remover custo"
                      onClick={() => {
                        setOthersCosts(prev => {
                          return prev.filter(cost => cost.id !== otherCost.id)
                        })
                      }}
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              ))}
            </form>
          </Section>
        </div>
        <div className="col-span-5">
          <Section>
            <SectionTitle>Resumo</SectionTitle>

            {cost !== '' || othersCosts.filter(cost => cost.value !== '').length > 0 ? (
              <>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mt-3">Custos</h3>
                    <div className="space-y-1 mt-2">
                      {cost !== '' && (
                        <CostLine name='Custo do produto' value={cost ?? 0.00} />
                      )}
                      {othersCosts.filter(cost => cost.value !== '').map(cost => (
                        <>
                          {cost.type === 'money' ? (
                            <CostLine name={cost.name} value={cost.value} />
                          ) : (
                            <CostLine name={cost.name} value={results.salePrice * (cost.value / 100)} />
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mt-3">Resultado</h3>

                    <ResultLine name='Preço de venda' value={results.salePrice} />
                    <ResultLine name='Total de custos' value={results.totalCosts} />
                    <ResultLine name='Lucro' value={results.profit} />
                  </div>

                </div>
              </>
            ) : (
              <p className="text-gray-500">Nenhum custo definido</p>
            )}

          </Section>
        </div>
      </div>

      {costPopupIsOpen && (
        <CostPopup
          isOpen={costPopupIsOpen}
          setIsOpen={setCostPopupIsOpen}
          cost={currentCost}
          modifyCost={modifyCost}
        />
      )}
    </>
  )
}