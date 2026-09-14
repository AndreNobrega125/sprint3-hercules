# VeroAI — Monitoramento Inteligente de Vegetação em Rodovias

> **Challenge CCR Motiva · Sprint 3 — Protótipo Funcional Completo (React Native/Expo)**

---

## Integrantes

| Nome | RM |
|------|----|
| *(André Nobrega)* | *(RM561754)* |
| *(André Gouveia)* | *(RM564219)* |
| *(Caio Carminato)* | *(RM563630)* |
| *(Guilherme Tamai)* | *(RM563276)* |
| *(Mirella Mascarenhas)* | *(RM562092)* |
| *(Vitor Komura)* | *(RM563694)* |

---

## 🧭 Contexto e Evolução

Na **Sprint 1**, foi desenvolvido um protótipo web em Next.js para validar o conceito do VeroAI: monitoramento de altura de vegetação em trechos de rodovia (SP-280) com classificação automática de risco.

Na **Sprint 2**, o projeto evoluiu para um **app mobile nativo em React Native/Expo**, com:

- 3 dashboards distintos por perfil (Gestor, Fiscal e Trabalhador), cada um com regras de acesso e visualizações próprias
- Fluxo de negócio completo e integrado: vistoria → roçada → notificação
- Sistema de notificações cruzadas entre perfis, todas clicáveis e levando direto à informação atualizada
- Login com validação estrita por matrícula (G101/F101/T101)
- Dados mock realistas no contexto da rodovia SP-280

Na **Sprint 3**, o foco foi fechar lacunas de navegação e ampliar a cobertura de cenários (sucesso, erro, vazio e alternativos), sem introduzir novas telas:

- Corrigido feedback de erro no login para matrícula inválida (antes falhava silenciosamente)
- Corrigidos botões sem ação no Dashboard do Gestor ("Pendentes"/"Concluídas")
- Adicionado cenário de trecho nunca vistoriado e de intervenção em andamento aos mocks, exercitando estados que existiam no código mas nunca apareciam na prática
- Corrigido `tsconfig.json` (referência a arquivo inexistente impedia o typecheck de rodar) e removidos imports/variáveis não utilizados
- Criada camada de componentes reutilizáveis (`src/components/`: `StatCard`, `StatusBadge`, `EmptyState`) e utilitário compartilhado de status (`src/utils/status.ts`), eliminando lógica de cor/label duplicada em pelo menos 4 telas
- Corrigidos 2 bugs encontrados ao rodar o app de verdade: erro de concordância ("notificaçãos") e filtro de altura faltando na seção "Informações do Trecho" do Dashboard do Trabalhador
- Testado de ponta a ponta rodando o app num navegador (`expo start --web`), cobrindo os 3 perfis, fluxo completo de Nova Vistoria e notificações
- Documento de testes manuais cobrindo os fluxos principais: [TESTES_MANUAIS.md](TESTES_MANUAIS.md)

---

## 📊 Fluxo de Negócio

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

## 📱 Telas e Funcionalidades

### Login
- Campo de matrícula com validação estrita (G101/F101/T101)
- Detecção automática do perfil (Gestor/Fiscal/Trabalhador)

### Dashboard do Gestor (G101)
- Indicadores gerais: total de trechos, OK, Atenção, Crítico, conformidade
- Histórico das últimas vistorias registradas pelo Fiscal
- Roçadas pendentes e concluídas pelo Trabalhador
- Notificações de vistorias e roçadas, clicáveis → leva direto ao trecho atualizado

### Dashboard do Fiscal (F101)
- Indicadores: trechos a vistoriar hoje, vistoriados hoje, total
- Lista de "Trechos que Preciso Vistoriar" e "Vistoriado Hoje"
- Botão "+ Nova Vistoria" (3 passos: selecionar trecho, altura, observações/foto)
- Notificações quando o Trabalhador conclui uma roçada

### Dashboard do Trabalhador (T101)
- Indicadores: roçadas pendentes, em andamento, concluídas hoje
- 🌿 "Pronto para Roçada" — trechos já vistoriados, com botão "Marcar Roçada como Concluída"
- ⏳ "Aguardando Vistoria do Fiscal" — trechos sem vistoria ainda (não pode concluir)
- **Sem acesso a registro de vistoria** (acesso negado se tentar navegar até lá)

### Lista de Trechos
- Os 6 trechos da SP-280 com status, altura atual e data da última vistoria (incluindo um trecho nunca vistoriado)
- Destaque visual para trechos pendentes de vistoria (via notificação)
- Estado vazio ("Nenhum trecho encontrado") quando a busca não retorna resultados

### Detalhes do Trecho
- Informações completas (km, regional, status, altura atual)
- Histórico de vistorias e intervenções (roçadas)
- Botão "Registrar Nova Vistoria" (oculto para o Trabalhador)

### Notificações
- Lista filtrada por usuário logado
- Marcar como lida / marcar todas / excluir
- Cada notificação é clicável e leva para o trecho/tela correspondente com dados atualizados

---

## 🚀 Como Rodar

```bash
cd mobile
npm install --legacy-peer-deps
npx expo start
```

No terminal, pressione `a` para abrir no **emulador Android** (Android Studio aberto) ou escaneie o QR code com o app **Expo Go**.

> Dica: use `npm run dev-fast` (dentro de `mobile/`) para iniciar o Expo sem checagem de TypeScript, deixando o startup mais rápido.

### 🔐 Contas de Teste

| Matrícula | Perfil | Acesso |
|-----------|--------|--------|
| **G101** | Gestor | Visão geral de tudo: vistorias e roçadas de todos os trechos |
| **F101** | Fiscal | Registra vistorias e acompanha trechos a vistoriar |
| **T101** | Trabalhador | Marca roçadas como concluídas |

A senha não é validada na Sprint 2 — qualquer valor é aceito. Apenas as 3 matrículas acima são reconhecidas pelo sistema; qualquer outro valor é rejeitado no login.

---

## 🎯 Dados Mock

- **Trechos:** 6 trechos da SP-280 (km 50 a km 75), com status OK/Atenção/Crítico — incluindo um trecho nunca vistoriado (km 75, Cotia) para cobrir o fluxo alternativo "aguardando vistoria do fiscal"
- **Vistorias:** registros com altura, data/hora e fiscal responsável
- **Intervenções (roçadas):** pendentes, em andamento e concluídas, vinculadas aos trechos
- **Notificações:** geradas dinamicamente conforme as ações de cada perfil
- **Cenários cobertos:** sucesso (login válido, vistoria registrada, roçada concluída), erro (matrícula inválida, altura não numérica), vazio (lista de trechos sem resultado de busca, notificações zeradas) e alternativo (acesso negado do Trabalhador, trecho aguardando primeira vistoria)

---

## 🛠️ Tecnologias

- **React Native 0.85** + **Expo SDK 56**
- **React Navigation 6** (Native Stack + Bottom Tabs)
- **Zustand** (gerenciamento de estado global)
- **TypeScript**

---

## 📝 Status por Funcionalidade (Sprint 3)

| Funcionalidade | Status | Observação |
|---|---|---|
| Login com detecção de perfil | ✅ Completo | Erro de matrícula inválida agora exibe feedback (corrigido nesta sprint) |
| Dashboard do Gestor | ✅ Completo | Botões "Pendentes"/"Concluídas" agora navegam (corrigido nesta sprint) |
| Dashboard do Fiscal | ✅ Completo | — |
| Dashboard do Trabalhador | ✅ Completo | Estados "aguardando fiscal" e "em andamento" agora aparecem de fato (mock ampliado) |
| Lista de Trechos (busca/ordenação) | ✅ Completo | Estado vazio de busca funcional |
| Detalhes do Trecho | ✅ Completo | Fallback "Nunca vistoriado" adicionado |
| Nova Vistoria (3 passos) | ✅ Completo | Bloqueio de acesso para Trabalhador funcional |
| Notificações (ler/marcar todas/excluir) | ✅ Completo | — |
| Componentes reutilizáveis / consistência visual | ✅ Completo | `StatCard`, `StatusBadge`, `EmptyState` extraídos para `src/components/`, lógica de status centralizada em `src/utils/status.ts` |
| Integração com API real | ⏳ Não iniciado | Previsto para Sprint 4 |
| Autenticação real (JWT/senha) | ⏳ Não iniciado | Previsto para Sprint 4 |
| Câmera e GPS reais | ⏳ Não iniciado | Hoje mockados; `expo-camera`/`expo-location` já instalados |
| Push notifications | ⏳ Não iniciado | Previsto para Sprint 4 |
| Modo offline | ⏳ Não iniciado | Previsto para Sprint 4 |

**Pendências identificadas nesta sprint:**
- Testar em dispositivo físico/emulador Android real (a validação desta sprint foi feita rodando o app num navegador via `expo start --web` — cobre navegação e lógica, mas não câmera/GPS nativos nem gestos específicos do Android)
- Decidir se vale o upgrade pro Expo SDK 57 (resolve um alerta de regressão de memória do Hermes V1 apontado pelo `expo-doctor`; é mudança major, não feita ainda)
- Nenhum teste automatizado (unitário/e2e) no projeto ainda

**Plano para a Sprint 4:**
1. Rodar a suíte de testes manuais em dispositivo real e registrar evidência (prints)
2. Iniciar integração com backend/API real, substituindo o mock gradualmente
3. Implementar autenticação real e permissões de câmera/localização
4. Avaliar cobertura de testes automatizados básicos para as stores (Zustand)

> ⏳ Vídeo demonstrativo (roteiro em `mobile/VIDEO_SCRIPT.md`)

---

## 🖼️ Capturas de Tela

| Tela | Print | Descrição |
|------|-------|-----------|
| **Login** | ![Tela de Login](screenshots/Tela%20de%20login%20veroai.png) | Tela de entrada com campo de matrícula (G101/F101/T101) e detecção automática do perfil. |
| **Dashboard do Gestor** | ![Dashboard Gestor](screenshots/Tela%20gestor%20veroai.png) | Visão geral de todos os trechos, vistorias recentes e roçadas pendentes/concluídas. |
| **Dashboard do Fiscal** | ![Dashboard Fiscal](screenshots/Tela%20fiscal%20veroai.png) | Trechos a vistoriar hoje, vistoriados hoje e acesso rápido para nova vistoria. |
| **Dashboard do Trabalhador** | ![Dashboard Trabalhador](screenshots/Tela%20trabalhador%20veroai.png) | Roçadas prontas para execução e trechos aguardando vistoria do fiscal. |
| **Lista de Trechos** | ![Lista de Trechos](screenshots/Tela%20trechos%20veroai.png) | Os 5 trechos da SP-280 com status (OK/Atenção/Crítico) e última vistoria. |
| **Trechos que Precisam de Vistoria** | ![Trechos que Precisam de Vistoria](screenshots/Trechos%20que%20precisam%20de%20vistoria.png) | Destaque visual dos trechos pendentes, acessado pela notificação. |
| **Detalhes do Trecho** | ![Detalhes do Trecho](screenshots/Tela%20Informações%20do%20trecho.png) | Informações completas do trecho, histórico de vistorias e intervenções. |
| **Nova Vistoria - Passo 1** | ![Vistoria Passo 1](screenshots/Tela%20Vistoria%20pt1.png) | Seleção do trecho a ser vistoriado. |
| **Nova Vistoria - Passo 2** | ![Vistoria Passo 2](screenshots/Tela%20Vistoria%20pt2.png) | Medição da altura da vegetação. |
| **Nova Vistoria - Passo 3** | ![Vistoria Passo 3](screenshots/Tela%20Vistoria%20pt3.png) | Observações e confirmação do registro. |
| **Notificações** | ![Notificações](screenshots/Tela%20notificações%20veroai.png) | Lista de notificações por usuário, clicáveis e com opção de marcar como lida. |

---

## 🎬 Vídeo Demonstrativo

> Link do vídeo (YouTube não-listado): _adicionar aqui_

---

## 📁 Estrutura

```
sprint2-hercules/
├── README.md                    ← este arquivo
├── TESTES_MANUAIS.md            ← documento de testes manuais (Sprint 3)
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
    └── package.json
```

---

**Desenvolvido para:** Challenge CCR Motiva — FIAP 2026
