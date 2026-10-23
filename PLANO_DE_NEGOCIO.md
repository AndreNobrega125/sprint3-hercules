# Plano de Negócio — VeroAI

> Documento da Sprint 4 do Challenge CCR Motiva. Os preços de infraestrutura vêm das páginas oficiais dos fornecedores, consultadas em 17/10/2026. Os custos de pessoal usam uma referência salarial geral do mercado brasileiro. **Não são dados internos da Motiva.** Onde há premissa nossa, ela está marcada como tal, e a seção 9 lista o que precisa ser validado com a concessionária.

## 1. O problema e o contexto

Concessionárias de rodovias precisam manter a faixa de domínio sem vegetação alta, que reduz visibilidade, esconde sinalização e aumenta o risco de acidentes. O tema está na pauta regulatória: segundo o resumo que localizamos do Ofício Circular nº 260/2026 da ANTT, a agência registrou crescimento excessivo de vegetação nas rodovias federais concedidas no período chuvoso e recomendou intensificar roçada e capina em áreas críticas (*não conseguimos abrir o PDF; o grupo deve conferir o texto original antes de citá-lo*). A SP-280 é rodovia estadual, então o regulador relevante é a ARTESP, e as normas dela não foram pesquisadas.

A própria Motiva já investe nesse problema:

- **RodoAnel (dez/2025):** projeto com imagens de satélite e IA que classifica áreas verdes, tipo de cobertura e altura da vegetação, sugere o tipo de roçada e o implemento, e gera boletins e ordens de serviço automaticamente. A Motiva diz que pretende expandir o modelo para as outras concessões. A notícia não informa km cobertos, resultados nem se há aplicativo de campo.
- **Autoban (ago/2025):** aplicação de herbicida por viatura em movimento na faixa de domínio. Segundo a Motiva, um trabalho de 20 dias passou a ser feito em 1 dia.

**A proposta do VeroAI é a ferramenta de campo.** O satélite enxerga a vegetação de cima e estima a altura à distância. O VeroAI leva o fiscal ao trecho para **medir a altura real do mato no local**, registrar a vistoria e disparar a roçada, e a equipe confirma a execução. As duas visões se complementam: a de cima mostra o panorama, e a de campo confirma no chão e deixa o registro de quem fez, quando e o quê. A Motiva deve validar essa complementaridade (seção 9).

## 2. Proposta de valor

O VeroAI digitaliza o ciclo vistoria → classificação de risco → roçada → confirmação, dando a cada perfil só a informação de que precisa:

- **Fiscal:** sabe quais trechos precisam de vistoria hoje e registra em minutos pelo celular, com classificação automática (OK/Atenção/Crítico) pela altura medida.
- **Trabalhador:** sabe quais trechos já foram liberados para roçada e quais aguardam o fiscal, evitando deslocamento a trechos ainda não avaliados.
- **Gestor regional:** vê a taxa de conformidade e o histórico completo, sem depender de consolidação manual.

O ganho central é rastreabilidade e velocidade de resposta num item que, sem controle, vira risco de autuação e, em último caso, de acidente.

## 3. Personas e público-alvo

| Persona | Papel no app | Dor que o app endereça (a validar) |
|---|---|---|
| **Fiscal de campo** | Registra vistorias e mede a altura da vegetação | Padronizar a classificação de risco e enviar o alerta automaticamente |
| **Equipe de roçada** | Executa e confirma intervenções | Saber se o trecho já foi vistoriado antes de se deslocar |
| **Gestor regional** | Acompanha indicadores e conformidade | Ter visibilidade quase em tempo real da malha sob sua responsabilidade |

**Público-alvo desta fase:** uso interno pelas equipes de campo e pela gestão regional da Motiva. É uma ferramenta operacional B2B interna, não um produto para o motorista.

## 4. Modelo de valor e receita

Nesta fase o VeroAI é pensado como **ferramenta interna da Motiva**. Não há receita externa. O retorno esperado vem de:

- **Custo operacional:** menos deslocamento em vão e menos coordenação manual.
- **Risco regulatório:** histórico auditável de vistorias e roçadas.
- **Gestão:** alocação de equipe baseada em dado, não em ronda genérica.

### 4.1 Formatos de contratação analisados

Mesmo como ferramenta interna, a relação entre quem desenvolve e opera o VeroAI e a Motiva pode assumir três formatos:

| Modelo | Como cobra | Base de cálculo neste plano | Quando faz sentido | Ponto de atenção |
|---|---|---|---|---|
| **Assinatura (SaaS)** | Valor por usuário ativo por mês | Custo em escala ≈ R$ 8–25/usuário/mês (seção 5.2). Preço de lista de apps de inspeção: R$ 42–287/usuário/mês (referência abaixo) | A Motiva quer pagar conforme a adoção e receber atualizações contínuas | A receita cresce com os usuários, mas 94–97% do custo é pessoa. Um valor mínimo mensal protege |
| **Licença** | Pagamento anual (ou único) por concessão ou por km monitorado | A Motiva tem 12 concessões e ≈ 4.475 km, que são unidades de cobrança possíveis | A Motiva prefere custo previsível e operar com equipe própria | Suporte e manutenção precisam ser contratados à parte, senão o custo recai sobre quem desenvolveu |
| **Serviço gerenciado** | Mensalidade fixa por contrato, com nível de serviço (SLA), cobrindo hospedagem, suporte e evolução | O custo vira o piso do contrato: piloto R$ 2,1–5,6 mil/mês e escala R$ 12–38 mil/mês (seção 5) | A Motiva não quer manter um time técnico próprio | Compromisso de nível de serviço e dependência de poucos mantenedores (seção 6) |

**Leitura:** como quase todo o custo é de pessoas, os formatos que cobrem esse custo de forma recorrente (serviço gerenciado e assinatura com valor mínimo) se ajustam melhor que uma licença única. **A proposta do grupo continua sendo a ferramenta interna.** A escolha do formato, e qualquer preço, dependem de validação com a Motiva e com o professor. Este plano não fixa preço: mostra só o piso (o custo, seção 5) e o teto de referência (preços de lista do mercado, abaixo).

### 4.2 Referência de mercado

Preços de lista de produtos maduros e genéricos, não de um protótipo:

| Produto de inspeção em campo (preço de lista, EUA) | US$/usuário/mês | ≈ R$/usuário/mês (câmbio 5,21) |
|---|---|---|
| Fulcrum (Professional / Elite) | 43 / 55 | 224 / 287 |
| GoCanvas | a partir de 29 | 151 |
| MaintainX | a partir de 25 | 130 |
| Clappia | a partir de 8 | 42 |

*Fonte dos preços: agregadores (GetApp, Software Advice, Capterra), que podem estar defasados. Não encontramos software comercial específico para vegetação em faixa de domínio.*

## 5. Estimativa de custos operacionais

**Câmbio usado:** R$ 5,21 por US$ (PTAX de 28/09/2026 = R$ 5,2132; não encontramos a cotação de hoje).

### 5.1 Cenário piloto (1 regional)

**Premissas nossas:** ~30 usuários, ~1.000 fotos por mês de ~1 MB (≈ 1 GB/mês), uso contínuo do servidor.

| Item | Base de preço (fonte oficial) | Custo mensal |
|---|---|---|
| API + banco + autenticação + fotos | Supabase Pro: US$ 25 (8 GB de banco, 100 GB de arquivos, 100 mil usuários ativos, 250 GB de tráfego). Alternativa na Railway: plano Hobby de US$ 5 mais uso, que calculamos em ≈ US$ 21–25 pelas taxas (US$ 20/vCPU, US$ 10/GB de RAM) | US$ 25–30 ≈ **R$ 130–160** |
| Armazenamento de fotos fora do Supabase | Cloudflare R2: US$ 0,015/GB, 10 GB grátis, sem custo de saída | ≈ R$ 0 no 1º ano |
| Notificações push | Firebase Cloud Messaging: gratuito, sem limite de mensagens (sem garantia de entrega) | R$ 0 |
| Build e atualização do app | Expo EAS Free: 15 builds Android/mês e 1.000 usuários de atualização, fila de baixa prioridade. O plano Starter (US$ 19) dá fila prioritária e 3.000 usuários | R$ 0 (Starter se necessário) |
| Publicação na Play Store (opcional) | Google Play: US$ 25, taxa única | R$ 130 uma vez |
| **Suporte e manutenção** | 20–30% de um desenvolvedor pleno. Referência geral: R$ 7–13 mil CLT ou R$ 10–18 mil PJ por mês (JobRise; não é específica de React Native) | **R$ 2.000–5.400** |
| **Total do piloto** | | **≈ R$ 2,1–5,6 mil/mês** |

Cerca de 94% a 97% do custo é gente, não servidor (R$ 2.000–5.400 de suporte contra R$ 130–160 de infraestrutura).

### 5.2 Cenário de escala (malha da Motiva)

A Motiva opera cerca de **4.475 km em seis estados, em 12 concessões** (Gazeta do Povo; outra reportagem, mais antiga, traz 3.615 km, a diferença é de data).

**Premissas nossas, de baixa confiança:** ~1.500 usuários, ~50 GB de fotos por mês.

| Item | Base de cálculo | Custo mensal |
|---|---|---|
| Servidores: 2 instâncias de API (2 vCPU, 4 GB cada) = US$ 160; banco (2 vCPU, 8 GB) = US$ 120; 100 GB de disco = US$ 15 | Taxas da Railway | ≈ US$ 295 |
| Atualização do app (1.500 usuários) | EAS Starter | US$ 19 |
| Fotos (≈ 300–600 GB acumulados no 1º ano) | Cloudflare R2 | ≈ US$ 5–10 |
| **Infraestrutura (soma ≈ US$ 320–325, com ~20% de margem)** | | US$ 325–390 ≈ **R$ 1,7–2,0 mil** |
| Equipe de manutenção e suporte | 1 a 2 desenvolvedores dedicados, PJ R$ 10–18 mil cada | **R$ 10–36 mil** |
| **Total de escala** | | **≈ R$ 12–38 mil/mês** |

Isso dá **≈ R$ 8–25 por usuário por mês**, contra R$ 130–290 dos produtos de lista do benchmark. A comparação não é equivalente (eles são produtos maduros, o VeroAI é um protótipo), mas mostra que o custo marginal por usuário é baixo.

### 5.3 O que não pesquisamos

Encargos trabalhistas além do salário, monitoramento de erros, domínio e e-mail, preços de capacidade extra do Supabase, adequação à LGPD (o app guarda matrícula e nome de colaboradores) e a economia real que o app geraria. Essa última depende de números internos da Motiva.

## 6. Principais riscos

- **Pergunta esperada da Motiva: "já temos satélite, por que campo?"** Resposta do VeroAI: o satélite estima de cima, e a vistoria mede e confirma no local, além de registrar o ciclo vistoria → roçada com responsável e data. Vale ter essa resposta pronta para o pitch e validar com a Motiva.
- **Adoção em campo.** Se registrar no app não for mais rápido que o processo atual, a equipe volta ao papel ou ao WhatsApp. Mitigação: registro de vistoria em 3 passos, validado nos testes.
- **Conectividade.** Trechos de rodovia podem ter sinal instável. O modo offline com sincronização é uma limitação conhecida e ainda não existe.
- **Confiabilidade da altura medida.** Hoje é informada manualmente pelo fiscal, sem sensor. Evolução possível: medição assistida por câmera.
- **Dependência de plataformas de terceiros.** Preços e limites da Expo, do Supabase e da Railway mudam, e o plano gratuito do Supabase pausa projetos inativos (por isso o orçamento usa o Pro).
- **Dependência de poucos mantenedores**, se o produto virar parte crítica da operação.
- **Dados do protótipo.** Os trechos do app são ilustrativos. Parte dos municípios mockados não bate com a quilometragem real da SP-280 (as marginais de Barueri, por exemplo, ficam entre os km 22 e 27, segundo a ViaOeste).

## 7. Diferenciais

- **Foco no ciclo operacional de campo**, com três perfis e regras próprias, e não um formulário genérico de inspeção. Por exemplo, o Trabalhador só conclui a roçada depois da vistoria.
- **Classificação de risco padronizada** pela altura, igual para todos os fiscais.
- **Rastreabilidade:** cada vistoria e roçada fica ligada a data, responsável e trecho.
- **Custo baixo por usuário** (seção 5.2), o que viabiliza adoção ampla.

O ponto central é a **medição e a confirmação em campo**, que complementam a visão de cima do satélite e fecham o ciclo com registro.

## 8. Impacto esperado para a Motiva

Estes são impactos qualitativos. Não estimamos ganho financeiro, porque isso exige dados internos.

- Menor tempo entre identificar vegetação crítica e executar a roçada.
- Histórico auditável pronto para fiscalização.
- Base de dados para priorizar roçada preventiva nos trechos mais recorrentes.

## 9. O que validar com a Motiva

1. O VeroAI complementa o fluxo do RodoAnel ou o duplica?
2. Como a vistoria de campo é registrada hoje, e quanto custa o deslocamento em vão?
3. Quantos fiscais, equipes e gestores por regional, e quantos km por concessão?
4. Qual o histórico de autuações por vegetação (ANTT/ARTESP)?
5. A SP-280 é dividida entre concessões (ViaOeste/Motiva e Ecovias Raposo Castello, segundo as notícias). Quais trechos são da Motiva?

## Fontes

- [Expo: planos e preços](https://expo.dev/pricing)
- [Supabase: preços](https://supabase.com/pricing)
- [Railway: preços](https://railway.com/pricing)
- [Cloudflare R2: preços](https://developers.cloudflare.com/r2/pricing/)
- [Google Play Console: taxa de registro](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en)
- [Firebase: planos de preço (FCM sem custo)](https://firebase.google.cn/docs/projects/billing/firebase-pricing-plans)
- [Motiva RodoAnel: IA e satélite para vegetação](https://rodovias.motiva.com.br/rodoanel/noticias/2025/dezembro/rodoanel-utiliza-inteligencia-artificial-para-elevar-padrao-de-m/)
- [Motiva Autoban: método de manutenção na faixa de domínio](https://rodovias.motiva.com.br/autoban/noticias/2025/agosto/metodo-inedito-de-manutencao-de-rodovias-e-aplicado-pela-autoban/)
- [ANTT: Ofício Circular 260/2026 (PDF, não verificado)](https://www.gov.br/antt/pt-br/assuntos/rodovias/normativos-surod/oficios-circulares-orientativos/oficio-circular-no-260-2026-surod-dir-antt.pdf)
- [Gazeta do Povo: CCR muda de nome (malha de 4.475 km)](https://www.gazetadopovo.com.br/brasil/ccr-muda-de-nome-vende-aeroportos-intensifica-negocios-em-rodovias/)
- [ViaOeste: obras nas marginais da SP-280 (km 22–27)](https://rodovias.motiva.com.br/viaoeste/noticias/2025/novembro/viaoeste-avanca-nas-obras-e-libera-novo-trecho-das-marginais-da-/)
- [Câmbio: dólar comercial](https://renovainvest.com.br/dolar-hoje/)
- [JobRise: salário de desenvolvedor pleno 2026](https://jobrise.io/pt/blog/salario-desenvolvedor-pleno-vs-senior-2026/)
- [GetApp: Fulcrum](https://www.getapp.com/all-software/a/fulcrum/) e [Software Advice: Fulcrum](https://www.softwareadvice.com/product/186985-Fulcrum/)
