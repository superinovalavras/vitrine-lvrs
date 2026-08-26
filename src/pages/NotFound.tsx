import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
    <img src="/marca/lvrs-pacto.png" alt="LVRS+" className="w-[min(260px,70vw)]" />

    <p className="mt-12 text-[13px] font-medium uppercase tracking-[0.22em] text-accent">
      Página não encontrada
    </p>
    <h1 className="mt-4 max-w-lg text-[clamp(24px,5vw,34px)] font-medium leading-tight tracking-[-0.02em]">
      Esse endereço não existe por aqui.
    </h1>
    <p className="mt-4 max-w-md text-[15px] font-light leading-relaxed text-white/65">
      Pode ter sido um link antigo ou um erro de digitação.
    </p>

    <Link
      to="/"
      className="mt-10 inline-flex items-center gap-3 rounded-xl bg-accent px-8 py-4 text-[15px] font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
    >
      Voltar para o início
      <span aria-hidden="true">→</span>
    </Link>
  </div>
);

export default NotFound;
