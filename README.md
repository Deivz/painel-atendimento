# Sistema de Gestão/Painel de Atendimento para as UPS de Porto Seguro

Este projeto consiste em um sistema para exibição do controle dos pacientes agendados pelo SUS nas UPS da cidade de Porto Seguro.
A Secretaria de Desenvolvimento e Assistência Social (SEDAS) de Porto Seguro solicitou que fosse criado um painel para divulgação em tempo real
dos chamados de paciente, com seus respectivos nomes, nome do profissional que irá atende-los e em qual sala da UPS será realizado o atendimento.


### Objetivo

Atender a solicitação das UPS, que visa facilitar ao máximo para seus pacientes a exibição dos chamados, tornando-o mais limpo, eficiente e de fácil compreensão.


## Funcionalidade

O projeto visa consumir uma API, onde consta a lista dos pacientes a serem atendidos, e lista-los na tela a medida que forem sendo chamados, destinando-os
as suas respectivas salas de atendimento com o profissional o qual fora agendado.
O sistema anterior não exibia de forma diferenciada os pacientes chamados mais recentemente e nem emitia sinal sonoro, decidi implementar essas modificações para
facilitar a compreensão por parte dos pacientes e tornar o sistema mais funcional, uma vez que consegue cumprir melhor o seu papel, que é informar.


## Tecnologias Escolhidas

### `ReactJS`

Optei a atender a demanda deste cliente utilizando ReactJS. Os motivos da escolha foram
- A facilidade na reutilização de componentes (optei por utilizar cards para exibir as informações pros pacientes. O motivo desta escolha é tornar mais fácil a visibilidade para os mesmos.);
- Por se tratar de uma exibição do browser em uma tv, a possibilidade de se construir uma PWA torna a visualização mais adequada e com uma aparência bem mais profissional;
- A abordagem de PWA também permite futura implementação de aplicativo, que possibilita notificar o paciente também em seu dispositivo de SmartPhone;
- Facilidade e velocidade na implementação do sistema.


### `CSS`

A opção de se construir o sistema utilizando CSS puro se deu por conta da maior liberdade de personalização, bem como por não se tratar de um projeto que demanda
componentização complexa ou bibliotecas externas.

