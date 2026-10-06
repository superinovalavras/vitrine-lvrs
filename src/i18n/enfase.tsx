/**
 * Titulo com uma palavra em destaque (a cursiva amarela da marca).
 *
 * A frase e a palavra chegam ja traduzidas e separadas, para que cada idioma
 * escolha o proprio destaque: comEnfase(L("Lugar para crescer...", ...), L("crescer", "grow")).
 * Se a palavra nao estiver na frase traduzida, a frase sai inteira, sem destaque.
 */
export function comEnfase(texto: string, enfase: string) {
  const i = texto.indexOf(enfase);
  if (!enfase || i === -1) return <>{texto}</>;
  return (
    <>
      {texto.slice(0, i)}
      <em className="s">{enfase}</em>
      {texto.slice(i + enfase.length)}
    </>
  );
}
