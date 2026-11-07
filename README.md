# VeroAI

App Android que digitaliza o controle de vegetação na faixa de domínio de rodovias: **vistoria → classificação de risco → roçada → confirmação**, com uma visão diferente para cada perfil (Fiscal, Trabalhador e Gestor). Desenvolvido no Challenge CCR Motiva, FIAP 2026.

| Gestor | Fiscal | Trabalhador |
|---|---|---|
| <img src="screenshots/Tela%20gestor%20veroai.png" alt="Dashboard do Gestor" width="200"> | <img src="screenshots/Tela%20fiscal%20veroai.png" alt="Dashboard do Fiscal" width="200"> | <img src="screenshots/Tela%20trabalhador%20veroai.png" alt="Dashboard do Trabalhador" width="200"> |

## O problema

A conservação de rodovias concedidas exige manter a vegetação sob controle, mas o processo ainda depende de vistoria visual, planilhas e comunicação informal entre quem inspeciona e quem executa a roçada, sem rastreabilidade.

## O que o app faz

- **Fiscal:** registra a vistoria de um trecho em 3 passos. O app classifica o risco pela altura da vegetação: OK (até 10 cm), Atenção (10 a 30 cm) ou Crítico (30 cm ou mais).
- **Trabalhador:** vê os trechos prontos para roçada e marca como concluída; só é possível depois de uma vistoria registrada.
- **Gestor:** acompanha vistorias e roçadas de todos os trechos, com indicadores e taxa de conformidade.
- **Notificações cruzadas:** cada ação avisa os outros perfis e leva direto ao trecho atualizado.

## Experimente

- **APK:** [baixar veroai-v2.0.0.apk](https://github.com/AndreNobrega125/sprint3-hercules/releases/download/v2.0.0/veroai-v2.0.0.apk) ([página do release](https://github.com/AndreNobrega125/sprint3-hercules/releases/tag/v2.0.0)). O Android vai pedir permissão para instalar de fonte desconhecida.
- **Vídeo de pitch e demonstração:** [YouTube (não listado)](https://youtu.be/UiFV95ehnBA)
- **Contas de teste:** matrícula `G101` (Gestor), `F101` (Fiscal) ou `T101` (Trabalhador). A senha não é validada.

## Tecnologias

React Native 0.85 e Expo SDK 56, TypeScript, React Navigation, Zustand para o estado global e Expo EAS Build para gerar o APK.

## Estado atual

É um **protótipo funcional com dados mockados** (6 trechos da SP-280): os dados não persistem entre execuções, não há API nem autenticação real, e câmera e GPS são simulados. A validação foi manual, em emulador Android ([TESTES_MANUAIS.md](TESTES_MANUAIS.md)); não há testes automatizados.

## Documentação

- [Documentação completa](docs/DETALHES.md): evolução por sprint, todas as telas, fluxo de negócio, status por funcionalidade, como rodar o código e gerar o APK
- [Plano de negócio](PLANO_DE_NEGOCIO.md)
- [Testes manuais](TESTES_MANUAIS.md)
- Versões anteriores do projeto: [Sprint 1 (web)](https://github.com/AndreNobrega125/sprint1-hercules) e [Sprint 2 (mobile)](https://github.com/AndreNobrega125/sprint2-hercules)

## Time

André Nobrega, André Gouveia, Caio Carminato, Guilherme Tamai, Mirella Mascarenhas e Vitor Komura.
