# VeroAI — Monitoramento Inteligente de Vegetação em Rodovias

> **Challenge CCR Motiva · Versão final (Sprint 4) — App Android em React Native/Expo**

O **VeroAI** digitaliza o ciclo de controle de vegetação na faixa de domínio de rodovias concessionadas — **vistoria → classificação de risco → roçada → confirmação** — dando a cada perfil (Fiscal, Trabalhador e Gestor) exatamente a informação de que precisa. O protótipo foi construído sobre a rodovia **SP-280 (Regional Oeste)** e usa dados mockados enquanto a integração com APIs reais não está disponível.

---

## 🔗 Links principais

| Entrega | Link |
|---|---|
| 📦 **APK para download** | [`veroai-v2.0.0.apk` (GitHub Releases)](https://github.com/AndreNobrega125/sprint3-hercules/releases/download/v2.0.0/veroai-v2.0.0.apk) · [página do release](https://github.com/AndreNobrega125/sprint3-hercules/releases/tag/v2.0.0) |
| 🎬 **Vídeo de pitch e demonstração** | _adicionar link do YouTube (não listado) após a gravação_ |
| 💼 **Plano de negócio** | [PLANO_DE_NEGOCIO.md](PLANO_DE_NEGOCIO.md) |
| 🧪 **Documento de testes manuais** | [TESTES_MANUAIS.md](TESTES_MANUAIS.md) |

---

## Integrantes

| Nome | RM |
|------|----|
| André Nobrega | RM561754 |
| André Gouveia | RM564219 |
| Caio Carminato | RM563630 |
| Guilherme Tamai | RM563276 |
| Mirella Mascarenhas | RM562092 |
| Vitor Komura | RM563694 |

---

## 📲 Como instalar o APK (Android)

1. No celular Android, abra o link do APK acima (ou baixe o arquivo `veroai-v2.0.0.apk` pelo computador e transfira para o aparelho).
2. Ao abrir o arquivo, o Android pedirá para **permitir a instalação de apps de fontes desconhecidas** para o navegador/gerenciador de arquivos usado — autorize (o APK não vem da Play Store por ser uma entrega acadêmica).
3. Toque em **Instalar** e depois em **Abrir**.
4. Na tela de login, use uma das contas de teste abaixo.

> O APK é gerado em modo *internal distribution* (perfil `preview` do EAS Build), pensado para instalação direta — não é um pacote para publicação na Play Store.

### 🔐 Contas de teste

| Matrícula | Perfil | Acesso |
|-----------|--------|--------|
| **G101** | Gestor | Visão geral de tudo: vistorias e roçadas de todos os trechos |
| **F101** | Fiscal | Registra vistorias e acompanha trechos a vistoriar |
| **T101** | Trabalhador | Marca roçadas como concluídas |

A senha não é validada nesta versão (protótipo com dados mockados): apenas as 3 matrículas acima são reconhecidas; qualquer outro valor é rejeitado no login com um alerta de erro.

---

## 🧭 Resumo das entregas por Sprint

| Sprint | Entrega | Resultado |
|---|---|---|
| **1** | Protótipo web em Next.js para validar o conceito: monitoramento de altura de vegetação na SP-280 com classificação automática de risco | Conceito validado; web descontinuada em favor do app mobile |
| **2** | App mobile nativo em React Native/Expo: 3 dashboards por perfil, fluxo vistoria → roçada → notificação, notificações cruzadas entre perfis, login por matrícula, dados mock da SP-280 | App funcional com navegação por perfil |
| **3** | Protótipo funcional completo: correção de navegação quebrada, mock cobrindo sucesso/erro/vazio/alternativo, componentização, testes manuais documentados e confirmados em emulador Android | Todos os fluxos navegáveis, sem botões mortos, typecheck limpo |
| **4** | Versão final: build do **APK via Expo EAS Build**, **plano de negócio** e README consolidado | APK gerado e hospedado no GitHub Releases; plano de negócio documentado |

<details>
<summary><strong>Detalhe da evolução na Sprint 3</strong></summary>

- Corrigido feedback de erro no login para matrícula inválida (antes falhava silenciosamente)
- Corrigidos botões sem ação no Dashboard do Gestor ("Pendentes"/"Concluídas")
- Adicionados aos mocks um trecho nunca vistoriado e uma intervenção em andamento, exercitando estados que existiam no código mas nunca apareciam
- Corrigido `tsconfig.json` (referência a arquivo inexistente impedia o typecheck) e removidos imports/variáveis não utilizados
- Criada camada de componentes reutilizáveis (`src/components/`: `StatCard`, `StatusBadge`, `EmptyState`) e utilitário compartilhado de status (`src/utils/status.ts`)
- Corrigidos 2 bugs encontrados na execução real: erro de concordância ("notificaçãos") e filtro de altura faltando em "Informações do Trecho"
- Testado em navegador (`expo start --web`) e confirmado em emulador Android, cobrindo os 3 perfis, Nova Vistoria, notificações e câmera/GPS mockados

</details>

<details>
<summary><strong>Detalhe da entrega na Sprint 4</strong></summary>

- Projeto vinculado ao EAS (`@andrenobrega_125/veroai-mobile`) com `eas.json` configurado para gerar **APK** (e não AAB) no perfil `preview`
- Corrigida a causa de falha do primeiro build: o EAS roda `npm ci`, que exige `package-lock.json` sincronizado — adicionado `.npmrc` com `legacy-peer-deps=true` e regenerado o lockfile, validado localmente com `npm ci` antes do novo build
- Plano de negócio contextualizado na Motiva: [PLANO_DE_NEGOCIO.md](PLANO_DE_NEGOCIO.md)
- APK hospedado no GitHub Releases (`v2.0.0`), baixado pelo mesmo link deste README, instalado em emulador Android e percorrido nos fluxos principais (login válido/inválido, 3 perfis, concluir roçada, notificação cruzada, Nova Vistoria) — sem crashes
- README consolidado como documento-âncora (este arquivo)

</details>

---

## 💼 Plano de negócio (resumo)

- **Problema:** concessionárias têm obrigação regulatória de manter a faixa de domínio livre de vegetação alta; hoje o controle depende de vistoria manual, papel/planilha e comunicação informal entre Fiscal e equipe de roçada, sem rastreabilidade.
- **Proposta de valor:** digitalizar o ciclo vistoria → roçada, com classificação de risco automática e padronizada, e cada perfil vendo apenas o que precisa agir.
- **Público-alvo:** equipes de campo (Fiscal/Trabalhador) e gestão regional da Motiva — ferramenta operacional B2B **interna**.
- **Valor/receita:** retorno por redução de custo operacional (menos deslocamento em vão), redução de risco regulatório (histórico auditável) e visibilidade gerencial. Licenciamento a outras concessões do grupo é uma possibilidade futura, ainda não fechada.
- **Custo estimado (piloto, 1 regional):** ordem de R$ 2.150 – 4.500/mês, majoritariamente suporte/manutenção — estimativa ilustrativa, não dado oficial da Motiva.

➡️ Documento completo, com personas, riscos e diferenciais: [PLANO_DE_NEGOCIO.md](PLANO_DE_NEGOCIO.md)

---

## 📊 Fluxo de negócio

1. **Fiscal** registra uma vistoria em um trecho
   - Classificação automática pela altura: **OK** (≤10cm), **Atenção** (10–30cm), **Crítico** (≥30cm)
   - **Gestor** e **Trabalhador** recebem notificação

2. **Trabalhador** marca a roçada como concluída
   - Só é possível se o trecho já tiver uma vistoria registrada (senão fica em "Aguardando Vistoria do Fiscal")
   - **Fiscal** e **Gestor** recebem notificação

3. **Gestor** acompanha tudo
   - Vê todas as vistorias feitas pelo Fiscal e roçadas concluídas pelo Trabalhador
   - Clica nas notificações para abrir o trecho com as informações mais recentes

---

## 📱 Telas e funcionalidades

### Login
- Campo de matrícula com validação estrita (G101/F101/T101) e alerta de erro para matrícula inválida
- Detecção automática do perfil (Gestor/Fiscal/Trabalhador)

### Dashboard do Gestor (G101)
- Indicadores gerais: OK, Atenção, Crítico e taxa de conformidade
- Últimas vistorias registradas pelo Fiscal
- Roçadas pendentes e concluídas (cards navegáveis)
- Notificações clicáveis → levam direto ao trecho atualizado

### Dashboard do Fiscal (F101)
- Indicadores: trechos a vistoriar hoje, vistoriados hoje, total
- Listas "Trechos que Preciso Vistoriar" e "Vistoriado Hoje"
- Botão "+ Nova Vistoria" (3 passos: selecionar trecho, foto, altura/observações)

### Dashboard do Trabalhador (T101)
- Indicadores: roçadas pendentes, em andamento, concluídas hoje
- 🌿 "Pronto para Roçada" — trechos já vistoriados, com botão "Marcar Roçada como Concluída"
- ⏳ "Aguardando Vistoria do Fiscal" — trechos sem vistoria (não pode concluir)
- Sem acesso a registro de vistoria (tela de "Acesso Negado")

### Lista e detalhes de trechos
- 6 trechos da SP-280 com status, altura e última vistoria (incluindo um trecho nunca vistoriado), busca, ordenação e estado vazio
- Detalhes com km, regional, histórico de vistorias e intervenções; botão "Registrar Nova Vistoria" oculto para o Trabalhador

### Notificações
- Lista filtrada por usuário, marcar como lida / marcar todas / excluir, e navegação direta ao trecho relacionado

---

## 🛠️ Stack utilizada

- **React Native 0.85** + **Expo SDK 56**
- **React Navigation 6** (Native Stack + Bottom Tabs)
- **Zustand** (estado global)
- **TypeScript**
- **Expo EAS Build** (geração do APK)

---

## 🎯 Dados mock

- **Trechos:** 6 trechos da SP-280 (km 50 a km 75), com status OK/Atenção/Crítico — incluindo um nunca vistoriado (km 75, Cotia)
- **Vistorias:** altura, data/hora e fiscal responsável
- **Intervenções (roçadas):** pendentes, em andamento e concluídas
- **Notificações:** geradas dinamicamente conforme as ações de cada perfil
- **Cenários cobertos:** sucesso (login válido, vistoria registrada, roçada concluída), erro (matrícula inválida, altura não numérica), vazio (busca sem resultado, notificações zeradas) e alternativo (acesso negado do Trabalhador, trecho aguardando primeira vistoria)

---

## 📝 Status e limitações conhecidas

| Funcionalidade | Status | Observação |
|---|---|---|
| Login com detecção de perfil | ✅ Completo | Erro de matrícula inválida com alerta |
| Dashboards (Gestor, Fiscal, Trabalhador) | ✅ Completo | Sem botões sem ação |
| Lista e detalhes de trechos | ✅ Completo | Busca, ordenação e estados vazios |
| Nova Vistoria (3 passos) | ✅ Completo | Classificação automática em tempo real |
| Notificações | ✅ Completo | Ler, marcar todas, excluir, navegar |
| Componentes reutilizáveis | ✅ Completo | `src/components/` e `src/utils/status.ts` |
| Build do APK (EAS) | ✅ Gerado e testado | Perfil `preview`, hospedado no GitHub Releases; instalado em emulador e fluxos principais executados sem crashes ([TESTES_MANUAIS.md](TESTES_MANUAIS.md), seção 7) |
| Integração com API real | ❌ Fora do escopo | Dados 100% mockados |
| Autenticação real (JWT/senha) | ❌ Fora do escopo | Login apenas por matrícula de teste |
| Câmera e GPS reais | ❌ Fora do escopo | Mockados; `expo-camera`/`expo-location` já instalados |
| Push notifications / modo offline | ❌ Fora do escopo | Evolução futura |

**Limitações conhecidas (honestas):**
- É um **protótipo funcional com dados mockados**: os dados não persistem entre execuções do app.
- O `expo-doctor` aponta uma regressão de memória do Hermes V1 no Expo SDK 56, que só é corrigida com upgrade major para o SDK 57 — **não realizado** por ser mudança de alto risco; não afetou os testes realizados.
- Não há testes automatizados (unitários/e2e); a validação foi manual — ver [TESTES_MANUAIS.md](TESTES_MANUAIS.md).
- A validação em dispositivo foi feita em **emulador Android**; dispositivo físico não foi validado.

---

## 🚀 Como rodar o código-fonte

```bash
cd mobile
npm install --legacy-peer-deps
npx expo start
```

No terminal do Expo, pressione `a` para abrir no **emulador Android** (Android Studio aberto) ou escaneie o QR code com o app **Expo Go**.

> Dica: `npm run dev-fast` (dentro de `mobile/`) inicia o Expo sem checagem de TypeScript, deixando o startup mais rápido.

### Como gerar o APK novamente

```bash
cd mobile
npx eas login
npx eas build --platform android --profile preview
```

O `eas.json` já define o perfil `preview` com `buildType: apk`, e o `.npmrc` fixa `legacy-peer-deps=true` para que o `npm ci` executado pelo EAS resolva as dependências da mesma forma que o ambiente local. Os binários **não** são versionados no repositório — são publicados em GitHub Releases.

---

## 🖼️ Capturas de tela

| Tela | Print | Descrição |
|------|-------|-----------|
| **Login** | ![Tela de Login](screenshots/Tela%20de%20login%20veroai.png) | Tela de entrada com campo de matrícula (G101/F101/T101) e detecção automática do perfil. |
| **Dashboard do Gestor** | ![Dashboard Gestor](screenshots/Tela%20gestor%20veroai.png) | Visão geral de todos os trechos, vistorias recentes e roçadas pendentes/concluídas. |
| **Dashboard do Fiscal** | ![Dashboard Fiscal](screenshots/Tela%20fiscal%20veroai.png) | Trechos a vistoriar hoje, vistoriados hoje e acesso rápido para nova vistoria. |
| **Dashboard do Trabalhador** | ![Dashboard Trabalhador](screenshots/Tela%20trabalhador%20veroai.png) | Roçadas prontas para execução e trechos aguardando vistoria do fiscal. |
| **Lista de Trechos** | ![Lista de Trechos](screenshots/Tela%20trechos%20veroai.png) | Trechos da SP-280 com status (OK/Atenção/Crítico) e última vistoria (print da Sprint 2; a versão atual tem 6 trechos). |
| **Trechos que Precisam de Vistoria** | ![Trechos que Precisam de Vistoria](screenshots/Trechos%20que%20precisam%20de%20vistoria.png) | Destaque visual dos trechos pendentes, acessado pela notificação. |
| **Detalhes do Trecho** | ![Detalhes do Trecho](screenshots/Tela%20Informações%20do%20trecho.png) | Informações completas do trecho, histórico de vistorias e intervenções. |
| **Nova Vistoria - Passo 1** | ![Vistoria Passo 1](screenshots/Tela%20Vistoria%20pt1.png) | Seleção do trecho a ser vistoriado. |
| **Nova Vistoria - Passo 2** | ![Vistoria Passo 2](screenshots/Tela%20Vistoria%20pt2.png) | Medição da altura da vegetação. |
| **Nova Vistoria - Passo 3** | ![Vistoria Passo 3](screenshots/Tela%20Vistoria%20pt3.png) | Observações e confirmação do registro. |
| **Notificações** | ![Notificações](screenshots/Tela%20notificações%20veroai.png) | Lista de notificações por usuário, clicáveis e com opção de marcar como lida. |

---

## 📁 Estrutura do repositório

```
sprint2-hercules/
├── README.md                    ← documento-âncora (este arquivo)
├── PLANO_DE_NEGOCIO.md          ← plano de negócio (Sprint 4)
├── TESTES_MANUAIS.md            ← documento de testes manuais (Sprint 3)
├── screenshots/                 ← capturas de tela
└── mobile/                       ← App Expo
    ├── src/
    │   ├── screens/              ← Login, 3 Dashboards, ListaTrechos, TrechoDetalhe, NovaVistoria, Notificacoes
    │   ├── components/           ← Componentes reutilizáveis (StatCard, StatusBadge, EmptyState)
    │   ├── navigation/           ← Stack + Bottom Tabs (dinâmico por perfil)
    │   ├── context/              ← authStore, dataStore, notificationStore (Zustand)
    │   ├── mocks/                ← Dados mock (usuários, trechos, vistorias, intervenções, notificações)
    │   ├── utils/                ← Lógica compartilhada (classificação/cor/label de status)
    │   └── types/                ← Tipos TypeScript
    ├── App.tsx
    ├── app.json
    ├── eas.json                  ← perfis do EAS Build (preview = APK)
    ├── .npmrc                    ← legacy-peer-deps=true
    └── package.json
```

---

**Desenvolvido para:** Challenge CCR Motiva — FIAP 2026
