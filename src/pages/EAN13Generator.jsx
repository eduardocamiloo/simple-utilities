import { useEffect, useState } from "react";
import { CompleteButton, CopyButton, PasteButton, QuestionButton } from "../components/shared/buttons";
import { Section } from "../components/shared/sections";
import { PageSubtitle, PageTitle, SectionTitle } from "../components/shared/texts";
import dayjs from "dayjs";
import { check, generate } from "../components/ean-generator/functions";
import { v4 as uuidv4 } from "uuid";
import { BodyRow, Table, TBody, Td, THead } from "../components/shared/tables";

export default function EAN13Generator() {
  const [codes, setCodes] = useState([]);

  const [codeToCheck, setCodeToCheck] = useState('');
  const [errorInCodeToPaste, setErrorInCodeToPaste] = useState('');
  const [codeIsValid, setCodeIsValid] = useState(null);

  function generateCode() {
    const base = "789" + Math.floor(Math.random() * 1_000_000_000).toString().padStart(9, "0");
    const newCode = generate(base);

    setCodes(prev => { return [{ id: uuidv4(), value: newCode, created_at: dayjs() }, ...prev] })
  }

  useEffect(() => {
    if (codeToCheck === '') return;

    if (codeToCheck.length !== 13) {
      setErrorInCodeToPaste('O código EAN-13 deve ter exatamente 13 caracteres');
      return;
    } else {
      setErrorInCodeToPaste('');
    }

    setCodeIsValid(check(codeToCheck));
  }, [codeToCheck]);

  return (
    <>
      <PageTitle>Gerador de códigos EAN-13</PageTitle>
      <PageSubtitle>Precisa de códigos de barra para seu anúncio? Crie aqui!</PageSubtitle>

      <div className="space-y-6">
        <Section>
          <div className="flex justify-between items-center mb-2 flex-col sm:flex-row">
            <SectionTitle>Gerar códigos</SectionTitle>
            <CompleteButton onClick={generateCode}>Gerar código</CompleteButton>
          </div>
          <div>
            {codes.length > 0 ? (
              <div className="space-y-6">
                <div className="w-full">
                  <input className="w-full px-3 py-3 border rounded-md outline-none border-blue-200" readOnly value={codes[0].value} />
                  <CopyButton
                    otherClasses='absolute right-5 top-1/2 -translate-y-1/2'
                    otherModalClasses="-right-10"
                    value={codes[0].value}
                  />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Códigos gerados</h3>
                  <Table>
                    <THead cols={['Código', 'Horário de criação']} />
                    <TBody className="bg-white divide-y divide-gray-200">
                      {codes.map((code) => (
                        <BodyRow key={code.id}>
                          <Td otherClasses="flex gap-3 items-center">
                            <span>{code.value}</span>
                            <CopyButton value={code.value} />
                          </Td>
                          <Td>{code.created_at.format('HH:mm')}</Td>
                        </BodyRow>
                      ))}
                    </TBody>
                  </Table>
                  <p className="text-xs text-gray-500 mt-2"><span className="font-semibold">Obs: </span>Os códigos não são salvos e só serão apresentados agora. Quando a página for recarregada, não estarão mais disponíveis.</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">Nehum código gerado, clique no botão para começar!</p>
            )}
          </div>
        </Section>

        <Section>
          <div className="space-y-4">
            <div>
              <SectionTitle>Conferir código</SectionTitle>
              <p className="text-sm text-gray-400 mt-1">Quer saber se o código que você tem é realmente um EAN-13 verdadeiro? É só colar ele aqui!</p>
            </div>
            <div>
              <div className="w-full mb-2">
                <input className="w-full px-3 py-3 border rounded-md outline-none border-blue-200" value={codeToCheck} onChange={(e) => setCodeToCheck(e.target.value)} />
                <PasteButton
                  otherClasses='absolute right-5 top-1/2 -translate-y-1/2'
                  otherModalClasses="-right-10"
                  setValue={setCodeToCheck}
                />
              </div>
              {errorInCodeToPaste !== '' && codeToCheck.length > 0 && (
                <p className="text-red-500 text-sm">{errorInCodeToPaste}</p>
              )}
              {!errorInCodeToPaste && codeIsValid !== null && codeToCheck !== '' && (
                <>
                  {codeIsValid ? (
                    <p className="text-green-600 text-sm">Código é válido :)</p>
                  ) : (
                    <p className="text-red-500 text-sm">Código não é válido :(</p>
                  )}
                </>
              )}
            </div>
          </div>
        </Section>
      </div>
    </>
  )
}