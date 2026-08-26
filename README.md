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
```

## Estrutura

- `src/data/verticais.ts` — as 5 verticais e as iniciativas. É o arquivo de
  conteúdo: mexer aqui muda o site, sem tocar em componente.
- `src/context/VerticalContext.tsx` — qual vertical está ativa. Vive na raiz
  para que a cor desça para todas as seções.
- `src/components/HeroVerticais.tsx` — o hero e a régua de abas.
- `src/components/FaixaProjetos.tsx` — resumo dos 12 projetos e o botão para o
  painel de gestão.
- `src/components/IniciativasSection.tsx` — cards dos programas da vertical ativa.
- `src/index.css` — a paleta da marca e os overrides por vertical.

As demais seções vieram do site anterior (`lvrs.govup.io`, feito no Lovable) e
ainda não passaram por revisão de conteúdo.

## Pendências conhecidas

- **Falta a foto de fundo do Agro.** A vertical cai no verde chapado.
- **A foto do Tech tem 800x533** — pequena demais para fundo de tela cheia.
- **A imagem do SRI é peça gráfica, não foto** — tem logo e textos próprios,
  que competem com a logo LVRS+ por cima.
- **A fonte da marca é desconhecida.** Poppins é substituta; a única referência
  é um raster pequeno dentro do PNG do lockup. Century Gothic foi testada e
  descartada (larga demais).
- **Não há navegação depois que a pessoa rola o hero.** A navbar antiga foi
  removida por empilhar acima do hero de tela cheia.
- **Imagens pesadas herdadas do Lovable** — algumas passam de 3 MB.
- As logos de Prefeitura e Vale dos Ipês ainda não têm lugar definido.
- Textos das verticais são rascunho e não foram revisados.

## Sites irmãos

- Launch LVRS+ — `launch.lvrs.com.br` · repo `superinovalavras/launch-lvrs`
- Lavras Lab — `lavraslab.lvrs.com.br` · repo `superinovalavras/lavras-lab`
- Painel de gestão dos 12 projetos — `gestaolvrs.govup.io`
