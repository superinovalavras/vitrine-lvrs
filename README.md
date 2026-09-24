# Vitrine LVRS+

Site institucional do **Pacto Lavras pela Inovação**, da Superintendência de
Inovação da Prefeitura de Lavras/MG. É o site-guarda-chuva: apresenta a cidade
e aponta para os programas, cada um no seu próprio subdomínio.

**Domínio pretendido:** `lvrs.com.br` (apex)

## A ideia

A navegação é por **vertical do Pacto**. A logo LVRS+ ocupa o centro do hero
sobre uma foto, e a régua de abas na base do hero troca de vertical:

| Vertical | Cor | Programas |
|---|---|---|
| Pacto (padrão) | `#FFCD00` | — |
| Tech | `#5282FF` | Launch, Lavras Lab, Observatório |
| Agro | `#009CA3` | — |
| Food | `#D34046` | — |
| SRI | `#0D8049` | — |

Trocar de aba troca a logo, a foto de fundo, o texto e a **cor de destaque da
página inteira**. Isso funciona por um atributo `data-vertical` na raiz que
sobrescreve apenas `--accent`; nenhum componente precisa saber de cor.

As cores não são escolha estética — cada uma vem de uma variação da logo
entregue pela agência UONA.

> **Agro:** a cor da marca é `#003D40`, que sobre o fundo escuro dá 1,29:1 de
> contraste e some. Na tela usamos `#009CA3` (4,66:1), mesma matiz e saturação.
> O `#003D40` continua valendo para fundo claro e impresso.

## Rodando

```bash
npm install
npm run dev     # porta 8080
npm run build
npm test        # dados das verticais e troca de aba
npm run lint
```

## Estrutura

- `src/data/verticais.ts` — as 5 verticais e as iniciativas. É o arquivo de
  conteúdo: mexer aqui muda o site, sem tocar em componente.
- `src/context/VerticalContext.tsx` — qual vertical está ativa. Vive na raiz
  para que a cor desça para todas as seções.
- `src/components/HeroVerticais.tsx` — o hero e a régua de abas.
- `src/components/FaixaProjetos.tsx` — resumo dos 12 projetos e o botão para o
  painel de gestão. É a lista autoritativa: a seção "Projetos Estratégicos"
  herdada do Lovable saiu em 02/09/2026 porque mostrava 6 projetos sob a
  chamada de "doze", com o nome velho "Hub de Inovação Ipêtech".
- `src/components/BarraFina.tsx` — a barra que aparece depois do hero.
- `src/components/IniciativasSection.tsx` — cards dos programas da vertical ativa.
- `src/index.css` — a paleta da marca e os overrides por vertical.

As demais seções vieram do site anterior (`lvrs.govup.io`, feito no Lovable) e
ainda não passaram por revisão de conteúdo. O que veio de lá e não era usado
por ninguém — `HeroSection`, `Navbar`, `NavLink`, `LvrsProjectsSection`, os
blocos `nav`/`hero`/`projects` das traduções e 6,7 MB de fotos — saiu do repo
em 02/09/2026. Está tudo no histórico do git se fizer falta.

## Pendências conhecidas

- **Falta a foto de fundo do Agro.** A vertical cai no verde chapado.
- **A foto do Tech tem 800x533** — pequena demais para fundo de tela cheia.
- **A imagem do SRI é peça gráfica, não foto** — tem logo e textos próprios,
  que competem com a logo LVRS+ por cima.
- **A fonte da marca é desconhecida.** Poppins é substituta; a única referência
  é um raster pequeno dentro do PNG do lockup. Century Gothic foi testada e
  descartada (larga demais).
- **Não há navegação por seção depois do hero.** O topo do hero linka sobre,
  ecossistema e contato; a `BarraFina`, que é o que sobra depois que a pessoa
  rola, só leva ao topo e troca de vertical. As outras 10 seções não têm
  índice nem link. A navbar antiga foi removida por empilhar acima do hero de
  tela cheia.
- **As fotos das seções herdadas ainda pesam:** `field-day` 363 KB,
  `dairy-factory` 336 KB, `coffee-cherries` 243 KB. O `dist` fecha em 7,4 MB,
  quase tudo imagem.
- **As metatags de compartilhamento ainda são da Lovable** (`og:image` e
  `twitter:image` apontam para um PNG no bucket R2 deles, `twitter:site` é
  `@Lovable`). Mantidas de propósito até existir imagem própria — mas o dia em
  que a Lovable limpar o bucket, o link compartilhado fica sem imagem.
- **O card do Observatório aponta para `observatorio.lvrs.com.br`**, domínio
  ainda não configurado. O site está no ar em outro endereço (repo
  `superinovalavras/observatorio-lvrs`), então hoje o link não resolve.
- As logos de Prefeitura e Vale dos Ipês ainda não têm lugar definido.
- Textos das verticais são rascunho e não foram revisados.

## Sites irmãos

- Launch LVRS+ — `launch.lvrs.com.br` · repo `superinovalavras/launch-lvrs`
- Lavras Lab — `lavraslab.lvrs.com.br` · repo `superinovalavras/lavras-lab`
- Observatório VDI — domínio pendente · repo `superinovalavras/observatorio-lvrs`
- Painel de gestão dos 12 projetos — `gestaolvrs.govup.io`
