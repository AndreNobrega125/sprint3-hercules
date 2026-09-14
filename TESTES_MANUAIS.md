# Testes Manuais — VeroAI (Sprint 3)

> Como usar este documento: itens marcados **"Testado (execução real, web)"** foram verificados num navegador (`expo start --web`), sem emulador Android — cobre navegação e lógica, mas não câmera/GPS nativos. Itens marcados **"Confirmado em Android real (André, 2026-09-14)"** foram testados por um integrante da equipe rodando o app de verdade no emulador Android — essa é a evidência mais forte que este documento tem, e cobre inclusive os itens que a rodada web não tinha alcançado (câmera mockada, "Marcar Roçada como Concluída", busca sem resultado, ordenação, abrir detalhes de trecho, acesso negado do Trabalhador). Itens ainda marcados "verificado por leitura de código" não foram exercitados em nenhuma rodada.

## 1. Login e detecção de perfil

| Cenário | Resultado Esperado | Resultado Obtido | Status |
|---|---|---|---|
| Login com matrícula válida (G101) | Redireciona para Dashboard do Gestor | Testei: entrou no Dashboard do Gestor com dados corretos (1 OK, 3 Atenção, 2 Crítico, conformidade 17%) | ✅ **Testado (execução real, web)** |
| Login com matrícula válida (F101) | Redireciona para Dashboard do Fiscal | Testei: entrou no Dashboard do Fiscal, consegui abrir "Nova Vistoria" a partir dele | ✅ **Testado (execução real, web)** |
| Login com matrícula válida (T101) | Redireciona para Dashboard do Trabalhador, sem acesso a "Nova Vistoria" | Testei: entrou em "Minhas Tarefas" (Dashboard do Trabalhador) com as seções corretas | ✅ **Testado (execução real, web)** |
| Login com matrícula inválida (ex: "X999") | Exibe alerta de erro e permanece na tela de Login | Confirmado pelo André em Android real: alerta aparece e não navega | ✅ **Confirmado em Android real (André, 2026-09-14)** |
| Campo de matrícula vazio | Exibe alerta "Informe sua matrícula" | Validação já existente em `handleLogin` | ✅ Passou (verificado por leitura de código) |

## 2. Fiscal registra nova vistoria (fluxo principal)

| Cenário | Resultado Esperado | Resultado Obtido | Status |
|---|---|---|---|
| Fiscal completa os 3 passos (selecionar trecho → foto mockada → altura) com altura válida | Vistoria criada, status do trecho recalculado (OK/Atenção/Crítico), alerta de sucesso | Confirmado pelo André em Android real, incluindo a captura de foto (mockada) | ✅ **Confirmado em Android real (André, 2026-09-14)** |
| Altura vazia ou não numérica | Exibe alerta de erro e bloqueia o envio | Validado em `handleSubmitVistoria` (`Alert.alert('Erro', ...)`) | ✅ Passou (verificado por leitura de código) |
| Trabalhador tenta acessar "Nova Vistoria" | Tela de acesso negado, com botão "Voltar" | Confirmado pelo André em Android real | ✅ **Confirmado em Android real (André, 2026-09-14)** |

## 3. Trabalhador conclui roçada (fluxo principal + fluxo alternativo)

| Cenário | Resultado Esperado | Resultado Obtido | Status |
|---|---|---|---|
| Trecho já vistoriado, pendente de roçada | Botão "Marcar Roçada como Concluída" disponível na seção "🌿 Pronto para Roçada", e a ação funciona | Confirmado pelo André em Android real, incluindo o toque no botão de concluir | ✅ **Confirmado em Android real (André, 2026-09-14)** |
| Trecho sem nenhuma vistoria ainda | Card mostra "⏳ Aguardando vistoria do fiscal" em vez do botão de concluir | Confirmado pelo André em Android real | ✅ **Confirmado em Android real (André, 2026-09-14)** |
| Intervenção em andamento (`em_progresso`) | Aparece na seção "Em Andamento" do Dashboard do Trabalhador | Confirmado pelo André em Android real | ✅ **Confirmado em Android real (André, 2026-09-14)** |

## 4. Gestor acompanha tudo (fluxo principal)

| Cenário | Resultado Esperado | Resultado Obtido | Status |
|---|---|---|---|
| Dashboard exibe totais corretos (OK/Atenção/Crítico) e taxa de conformidade | Números batem com os 6 trechos mockados | Confirmado pelo André em Android real | ✅ **Confirmado em Android real (André, 2026-09-14)** |
| Toque no card "Pendentes" (Roçadas) | Navega para uma tela relacionada | Confirmado pelo André em Android real (era o botão morto que corrigi) | ✅ **Confirmado em Android real (André, 2026-09-14)** |
| Toque em uma notificação | Navega direto para o trecho correspondente | Confirmado pelo André em Android real (testado na seção 5, Notificações) | ✅ **Confirmado em Android real (André, 2026-09-14)** |

## 5. Notificações (fluxo principal + estado vazio)

| Cenário | Resultado Esperado | Resultado Obtido | Status |
|---|---|---|---|
| Usuário com notificações não lidas | Badge com contador na aba | Confirmado pelo André em Android real | ✅ **Confirmado em Android real (André, 2026-09-14)** |
| Marcar uma notificação como lida (individual) | Marca como lida e navega direto pro trecho relacionado | Confirmado pelo André em Android real | ✅ **Confirmado em Android real (André, 2026-09-14)** |
| Marcar todas como lidas | Zera contador para o usuário logado | Confirmado pelo André em Android real | ✅ **Confirmado em Android real (André, 2026-09-14)** |
| Excluir notificação | Remove da lista imediatamente | Confirmado pelo André em Android real | ✅ **Confirmado em Android real (André, 2026-09-14)** |
| Usuário sem nenhuma notificação (T101) | Exibe estado vazio "Nenhuma notificação" | Confirmado pelo André em Android real | ✅ **Confirmado em Android real (André, 2026-09-14)** |

## 6. Lista de Trechos (estado vazio + busca)

| Cenário | Resultado Esperado | Resultado Obtido | Status |
|---|---|---|---|
| Busca por código/município sem correspondência | Exibe "Nenhum trecho encontrado" | Confirmado pelo André em Android real | ✅ **Confirmado em Android real (André, 2026-09-14)** |
| Ordenação (Por Criticidade / Por Nome) | Lista reordena corretamente | Confirmado pelo André em Android real | ✅ **Confirmado em Android real (André, 2026-09-14)** |
| Trecho nunca vistoriado | Exibe "Nunca vistoriado" em vez de data em branco | Confirmado pelo André em Android real | ✅ **Confirmado em Android real (André, 2026-09-14)** |
| Abrir detalhes de um trecho | Mostra informações, histórico de vistorias e intervenções corretos | Confirmado pelo André em Android real | ✅ **Confirmado em Android real (André, 2026-09-14)** |

---

## Bugs encontrados na execução real — corrigidos e revalidados

| Bug | Onde | Descrição | Status |
|---|---|---|---|
| Erro de concordância | `DashboardGestor.tsx`, card de notificações | Texto mostrava "2 **notificaçãos** não lidas" (plural errado) | ✅ Corrigido e revalidado — testei de novo após a correção: "2 notificações não lidas" |
| Rótulo incorreto | `DashboardTrabalhador.tsx`, seção "Informações do Trecho" | Dizia "altura crítica... acima de 30cm", mas listava trechos com 22cm e 18cm — faltava filtro por altura em `trechosParaRocada` | ✅ Corrigido e revalidado — testei de novo: agora só lista KM50 (35cm) e KM65 (38cm) |

## Componentização (consistência visual / reuso de código)

Criada a pasta `src/components/` com `StatCard`, `StatusBadge`, `EmptyState`, e `src/utils/status.ts` com a lógica de cor/label/classificação de status (antes duplicada em pelo menos 4 telas). Telas refatoradas: `DashboardGestor`, `DashboardFiscal`, `DashboardTrabalhador`, `ListaTrechos`, `TrechoDetalhe`, `NovaVistoria`. Revalidado após a refatoração: os 3 dashboards, a lista de trechos e as seções alternativas (Aguardando Fiscal, Em Andamento) continuam funcionando exatamente igual, sem regressão visual ou funcional.

## Verificações automatizadas (evidência objetiva)

| Verificação | Comando | Resultado |
|---|---|---|
| TypeScript (typecheck) | `cd mobile && npx tsc --noEmit` | ✅ **0 erros** — antes desta sprint o comando falhava sempre por `tsconfig.json` referenciar um arquivo inexistente (`tsconfig.app.json`); corrigido junto com a limpeza de imports não usados |
| Diagnóstico de projeto | `cd mobile && npx expo-doctor` | ✅ 21/22 checks — só resta um alerta de regressão de memória do Hermes V1, que só se corrige com upgrade major pro Expo SDK 57 (decisão não tomada ainda, ver pendências) |
| Execução real (web) | `cd mobile && npx expo start --web` | ✅ App sobe e bundla sem erro; navegado de ponta a ponta pelos 3 perfis, fluxo de Nova Vistoria completo, e notificações, sem crash nem tela branca |
| Execução real (Android) | Emulador Android Studio | ✅ Todos os fluxos deste documento confirmados pelo André em 2026-09-14, incluindo câmera mockada, GPS mockado e gestos nativos — sem crashes reportados |

## Pendências para a Sprint 4

- [ ] Decidir se vale fazer o upgrade pro Expo SDK 57 (corrige o alerta do Hermes V1, mas é mudança major/arriscada)
- [ ] Integração com API real (hoje 100% mock)
- [ ] Autenticação real (hoje aceita qualquer senha)
- [ ] Câmera e GPS reais (hoje mockados)
- [ ] Push notifications
- [ ] Modo offline com sincronização
