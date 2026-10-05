# Plano de Negócio — VeroAI

> Documento produzido para a Sprint 4 do Challenge CCR Motiva. As estimativas de custo e escala usam ordens de grandeza plausíveis para o contexto de uma concessionária de rodovias no estado de São Paulo — não são dados oficiais da Motiva, e devem ser tratadas como ponto de partida para validação real com a concessionária.

## 1. O problema

Rodovias concessionadas têm obrigação regulatória (ANTT/ARTESP, conforme o âmbito da concessão) de manter a faixa de domínio livre de vegetação alta, que reduz visibilidade, esconde sinalização e aumenta risco de acidentes — além de gerar autuações quando fiscalizada e encontrada fora do padrão. Hoje esse controle depende de vistoria manual, registro em papel ou planilha, e comunicação informal entre quem fiscaliza (Fiscal) e quem executa a roçada (Trabalhador), sem rastreabilidade de quando cada trecho foi vistoriado pela última vez nem histórico de conformidade.

## 2. Proposta de valor

O VeroAI digitaliza esse ciclo — vistoria → classificação de risco → roçada → confirmação — dando a cada perfil exatamente a informação que precisa:

- **Fiscal**: sabe quais trechos precisam de vistoria hoje, registra em minutos pelo celular, com classificação automática de risco (OK/Atenção/Crítico) pela altura medida.
- **Trabalhador**: sabe exatamente quais trechos já foram liberados pra roçada e quais ainda aguardam o fiscal — elimina deslocamento pra trechos ainda não avaliados.
- **Gestor regional**: enxerga taxa de conformidade agregada e histórico completo, sem depender de relatórios manuais consolidados no fim do mês.

O ganho central não é "mais uma ferramenta" — é rastreabilidade e velocidade de resposta num item que, sem controle, vira risco de autuação regulatória e, em último caso, risco de acidente.

## 3. Personas e público-alvo

| Persona | Papel no app | Dor resolvida |
|---|---|---|
| **Fiscal de campo** | Registra vistorias, mede altura de vegetação | Hoje registra em papel/planilha, sem padronização de classificação de risco nem envio automático de alerta |
| **Equipe de roçada (Trabalhador)** | Executa e confirma intervenções | Hoje recebe ordens verbais ou por planilha, sem saber se um trecho já foi vistoriado (risco de deslocamento em vão) |
| **Gestor regional** | Acompanha indicadores e conformidade | Hoje depende de relatório manual consolidado, sem visibilidade em tempo real do estado da malha sob sua responsabilidade |

**Público-alvo desta fase:** uso interno pelas equipes de campo e gestão regional da Motiva — não é um produto voltado a usuário final/motorista, é uma ferramenta operacional B2B interna.

## 4. Modelo de valor / receita

Nesta fase, o VeroAI é pensado como **ferramenta interna da Motiva**, não como produto comercializado a terceiros. Não há modelo de receita externo — o retorno vem de:

- **Redução de custo operacional**: menos deslocamento de equipe de roçada a trechos ainda não avaliados, menos retrabalho de coordenação manual.
- **Redução de risco regulatório**: histórico auditável de vistorias reduz exposição a autuação por vegetação fora do padrão em fiscalização externa.
- **Ganho de visibilidade gerencial**: decisão de alocação de equipe de roçada baseada em dado real (trechos críticos), não em ronda genérica.

*(Nota: a equipe está avaliando com o professor se um modelo de licenciamento para outras concessões do grupo CCR faria sentido para uma fase futura — não incluído aqui como decisão fechada.)*

## 5. Estimativa de custos operacionais

Estimativa ilustrativa, baseada em um cenário de adoção piloto numa regional (a exemplo da Regional Oeste modelada no app: ~20-25km de rodovia, os 6 trechos hoje mockados sendo uma amostra):

| Item | Estimativa mensal (piloto, 1 regional) |
|---|---|
| Hospedagem/backend (quando sair do mock — API + banco gerenciado) | R$ 150 – 400 |
| Push notifications / infra de notificação | R$ 0 – 100 (a maioria dos provedores tem tier gratuito nesse volume) |
| Suporte/manutenção (fração de 1 dev part-time) | R$ 2.000 – 4.000 |
| **Total estimado (piloto)** | **R$ 2.150 – 4.500/mês** |

Escalando para toda a malha da Motiva (múltiplas regionais), o custo de infraestrutura cresce pouco (é majoritariamente fixo), mas o custo de suporte cresce com o número de usuários simultâneos — típico de SaaS interno de baixo volume de dados.

## 6. Principais riscos

- **Adoção pelo usuário de campo**: se o app não for mais rápido que o processo manual atual, a equipe volta ao papel/WhatsApp. Mitigação: fluxo de registro de vistoria em 3 passos, já validado como rápido nos testes da Sprint 3.
- **Conectividade em campo**: trechos de rodovia podem ter sinal instável. Mitigação: modo offline com sincronização posterior é pendência conhecida, já mapeada para a Sprint 4/5.
- **Confiabilidade do dado de altura**: hoje a medição é manual/estimada pelo fiscal; sem sensor, há risco de inconsistência entre fiscais. Mitigação de médio prazo: padronizar treinamento ou evoluir para medição assistida por câmera/IA.
- **Dependência de um único desenvolvedor de manutenção**: risco operacional de continuidade se o produto virar dependência real da operação.

## 7. Diferenciais competitivos

- Desenhado a partir do fluxo de trabalho real de 3 perfis distintos (não é um formulário genérico de vistoria) — cada perfil só vê o que precisa agir.
- Classificação de risco automática e padronizada (não depende de julgamento subjetivo de cada fiscal sobre "o que é crítico").
- Rastreabilidade completa: toda vistoria e roçada fica associada a data, responsável e trecho, criando histórico auditável — hoje inexistente no processo manual.

## 8. Impacto esperado para a Motiva

- Redução do tempo entre identificação de vegetação crítica e execução da roçada (hoje dependente de comunicação informal).
- Histórico auditável pronto para demonstrar conformidade em fiscalização regulatória.
- Base de dados que, no médio prazo, permite priorizar investimento em roçada preventiva nos trechos historicamente mais recorrentes — hoje essa priorização não existe de forma sistemática.
