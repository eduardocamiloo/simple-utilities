export function copyToClipboard(value) {
  if (!value) return;
  navigator.clipboard.writeText(value)
    .catch(() => {
      alert("Falha ao copiar para a área de tranferência");
    });
}

export async function getPaste() {
  const text = await navigator.clipboard.readText();
  return text;
}