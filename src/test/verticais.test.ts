import { describe, it, expect } from "vitest";
import { VERTICAIS, ORDEM_ABAS, VERTICAL_PADRAO, type Iniciativa } from "@/data/verticais";

/**
 * verticais.ts e o arquivo de conteudo do site: mexer nele muda a pagina sem
 * tocar em componente. O preco disso e que um erro de digitacao ali quebra a
 * pagina em silencio — a regua de abas usa `find(...)!`, entao um id fora do
 * lugar vira tela branca. Estes testes cobrem exatamente esse risco.
 */
describe("verticais", () => {
  it("a regua de abas cobre todas as verticais, sem sobra nem falta", () => {
    expect([...ORDEM_ABAS].sort()).toEqual(VERTICAIS.map((v) => v.id).sort());
  });

  it("a vertical padrao existe", () => {
    expect(VERTICAIS.some((v) => v.id === VERTICAL_PADRAO)).toBe(true);
  });

  it("nao ha id repetido", () => {
    const ids = VERTICAIS.map((v) => v.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("toda vertical tem cor hex de 6 digitos", () => {
    for (const v of VERTICAIS) {
      expect(v.cor, v.id).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });

  it("toda vertical tem logo e texto nas duas linguas", () => {
    for (const v of VERTICAIS) {
      expect(v.logo, v.id).toMatch(/^\//);
      for (const campo of ["titulo", "enfase", "descricao"] as const) {
        expect(v[campo].pt, `${v.id}.${campo}.pt`).not.toHaveLength(0);
        expect(v[campo].en, `${v.id}.${campo}.en`).not.toHaveLength(0);
      }
    }
  });

  it("a enfase e um trecho literal do titulo, nas duas linguas", () => {
    // O hero destaca a enfase dentro do titulo por substituicao de texto. Se
    // ela nao aparecer no titulo, o destaque some sem erro nenhum.
    for (const v of VERTICAIS) {
      expect(v.titulo.pt, v.id).toContain(v.enfase.pt);
      expect(v.titulo.en, v.id).toContain(v.enfase.en);
    }
  });
});

describe("iniciativas", () => {
  const todas: Iniciativa[] = VERTICAIS.flatMap((v) => v.iniciativas);

  it("existe pelo menos uma", () => {
    expect(todas.length).toBeGreaterThan(0);
  });

  it("cada card aponta para fora por https", () => {
    for (const i of todas) {
      expect(i.url, i.id).toMatch(/^https:\/\//);
    }
  });

  it("cada card tem tema completo em hex", () => {
    for (const i of todas) {
      for (const campo of ["fundo", "texto", "apoio", "destaque"] as const) {
        expect(i.tema[campo], `${i.id}.${campo}`).toMatch(/^#[0-9A-Fa-f]{6}$/);
      }
    }
  });

  it("marca d'agua so existe com opacidade definida", () => {
    for (const i of todas) {
      if (i.elemento) expect(i.elementoOpacidade, i.id).toBeGreaterThan(0);
    }
  });
});
