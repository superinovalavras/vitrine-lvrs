import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { PROJETOS, urlProjeto } from "@/data/projetos";
import { MARCOS } from "@/data/milestones";

describe("projetos do Pacto", () => {
  it("sao 12, numerados de 1 a 12", () => {
    expect(PROJETOS.map((p) => p.numero)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });

  it("cada um aponta para a propria pagina no painel", () => {
    const urls = PROJETOS.map(urlProjeto);
    expect(new Set(urls).size).toBe(12);
    urls.forEach((u) => expect(u).toMatch(/^https:\/\/gestaolvrs\.govup\.io\/projeto\/[0-9a-f-]{36}$/));
  });

  it("tem resumo nas duas linguas", () => {
    PROJETOS.forEach((p) => {
      expect(p.resumo.pt.length).toBeGreaterThan(40);
      expect(p.resumo.en.length).toBeGreaterThan(40);
    });
  });
});

describe("milestones", () => {
  it("estao em ordem cronologica", () => {
    const anos = MARCOS.map((m) => parseInt(m.ano, 10));
    expect([...anos].sort((a, b) => a - b)).toEqual(anos);
  });

  it("toda imagem citada existe em public/", () => {
    MARCOS.filter((m) => m.img).forEach((m) => {
      expect(existsSync(resolve(__dirname, "../../public", m.img!.slice(1))), m.img).toBe(true);
    });
  });
});
