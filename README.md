# Função jQuery Mostrar Mensagem
Exibir uma mensagem amigável para o usuário com funções determinadas para cada botão de interação.

## Pré-requisitos
Esse plugin necessita do jQuery (https://jquery.com/).

## Funcionalidades
* Mensagem no estilo 'alert' do JS, porém bem mais bonito e customizável.
* Mensagem no estilo 'confirm' do JS, porém bem mais bonito e customizável.
* Possibilidade de criar temas diferenciados para customizar ainda mais o visual das suas mensagens.

## Opções
### mensagem
string default null

Mensagem a ser exibida ao usuário. Pode conter trechos HTML.

```
// Mostrar um alert
$.mostrarMsg('alerta', {
    mensagem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
});

// Mostrar um confirm
$.mostrarMsg('confirmacao', {
    mensagem: 'Está certo disso? Posso perguntar?'
});
```

### tipo
string default null

Tipo de mensagem que será exibida. É utilizada para modificar a visualização do alerta. Por exemplo, se deseja mostrar uma mensagem informando que o 'Cliente foi cadastrado com sucesso!', o visual da mensagem pode ser um. Enquanto uma mensagem de erro 'Não foi possível cadastrar o cliente!', o visual pode ser outro, para facilitar a compreensão do usuário.

```
$.mostrarMsg('alerta', {
    mensagem: 'Cliente cadastrado com sucesso!',
    tipo: 'sucesso'
});

$.mostrarMsg('alerta', {
    mensagem: 'Não foi possível cadastrar o cliente.<br/>Por favor tente novamente mais tarde.',
    tipo: 'erro'
});
```

Ao definir um tipo para uma mensagem, o mesmo é adicionado como uma classe na DIV principal da mensagem para que seja possível manipular o visual através do tema.

### tema
string default padrao

Nome do tema a ser aplicado na mensagem. O tema deve estar instalado dentro do diretório do plugin em temas/nome-do-tema/css/mostrarmsg.tema.css. O nome do arquivo não pode ser alterado.

```
$.mostrarMsg('alerta', {
    mensagem: 'Cliente cadastrado com sucesso!',
    tipo: 'sucesso',
    tema: 'meu-tema-predileto'
});
```

### botoes
array default [{botao_ok}]

**ATENÇÃO!** Essa opção deve ser utilizada apenas para o alerta.

Vetor contendo objetos JSON com as configurações para montar os botões. Pode incluir quantos botões achar necessário.

#### Configurações de um botão
##### texto
string default null

Texto a ser exibido dentro do botão.

##### funcao
function default null

Função a ser executada ao clicar no botão.

Obs: todos os botões têm no seu evento click, a função para remover a mensagem da tela.

##### params
object default null

Parâmetros HTML para incluir no botão, como por exemplo: class, type, style.

```
$.mostrarMsg('alerta', {
    mensagem: 'Cliente cadastrado com sucesso!',
    botoes: [
        {
            texto: 'Ir para a lista de clientes',
            funcao: function () {
                window.location = 'lista_clientes.php';
            },
            params: {
                class: 'botao-lista'
            }
        },

        {
            texto: 'Editar as informações desse cliente',
            funcao: function () {
                window.location = 'editar_clientes.php'
            },
            params: {
                class: 'botao-editar'
            }
        }
    ]
});
```

## Desenvolvedor
Diego Lepera

dlepera88@gmail.com

http://diegolepera.xyz/
