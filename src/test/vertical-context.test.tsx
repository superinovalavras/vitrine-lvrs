import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { VerticalProvider, useVertical } from "@/context/VerticalContext";
import { VERTICAIS, VERTICAL_PADRAO } from "@/data/verticais";

/**
 * A troca de vertical e o mecanismo central do site: o atributo data-vertical
 * na raiz sobrescreve --accent e a pagina inteira acompanha a aba. Se o
 * atributo parar de mudar, nada quebra visivelmente no teste de tipo — a cor
 * simplesmente congela. Daí este teste.
 */
const Sonda = () => {
  const { ativa, setAtiva, vertical } = useVertical();
  return (
    <div data-vertical={ativa}>
      <span data-testid="cor">{vertical.cor}</span>
      {VERTICAIS.map((v) => (
        <button key={v.id} onClick={() => setAtiva(v.id)}>
          {v.rotulo}
        </button>
      ))}
    </div>
  );
};

describe("VerticalContext", () => {
  it("abre na vertical padrao", () => {
    const { container } = render(
      <VerticalProvider>
        <Sonda />
      </VerticalProvider>,
    );
    expect(container.querySelector(`[data-vertical="${VERTICAL_PADRAO}"]`)).not.toBeNull();
  });

  it("trocar de aba troca o data-vertical e a cor de destaque", () => {
    const tech = VERTICAIS.find((v) => v.id === "tech")!;
    const { container } = render(
      <VerticalProvider>
        <Sonda />
      </VerticalProvider>,
    );

    fireEvent.click(screen.getByText(tech.rotulo));

    expect(container.querySelector('[data-vertical="tech"]')).not.toBeNull();
    expect(screen.getByTestId("cor").textContent).toBe(tech.cor);
  });
});
