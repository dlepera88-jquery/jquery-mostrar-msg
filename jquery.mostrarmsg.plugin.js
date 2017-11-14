/**
 * jquery.mostrarmsg.plugin.js
 * @version: v1.17.08
 * @author: Diego Lepera
 *
 * Created by Diego Lepera on 2017-07-24. Please report any bug at
 * https://github.com/dlepera88-jquery/jquery-mostrar-msg/issues
 *
 * The MIT License (MIT) https://github.com/dlepera88-jquery/jquery-mostrar-msg/blob/master/LICENSE
 * Copyright (c) 2017 Diego Lepera http://diegolepera.xyz/
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/** @preserve
 * The MIT License (MIT)
 * Copyright (c) 2017 Diego Lepera http://diegolepera.xyz/
 */

 // Verificar se o jQuery foi inicializado
 if (typeof jQuery === 'undefined') {
     console.error('[Plugin $.mostrarMsg] O jQuery ainda não foi inciado.\nPara utilizar esse plugin é necessário inicializar o jQuery antes.');
 } // Fim if

(function ($) {
    var fArquivos = {
        __DIR__: function () {
            // Dessa maneira o src retorna com o domínio (src absoluto)
            // var script_src = $('script[src]').get(0).src;

            // Dessa forma, retorna o src relativo
            var script_src = $('script[src*="jquery-mostrar-msg"]').attr('src');
            return script_src.substring(0, script_src.lastIndexOf('/')) || '.';
        },

        /**
         * Carregar o tema solicitado pelo desenvolvedor
         * @param  {String} tema Nome do tema
         * @return {Void}
         */
        carregarTema: function (tema) {
            // Carregar o arquivo CSS com o tema solicitado
            var css_tema = fArquivos.__DIR__() + '/temas/' + tema + '/css/mostrarmsg.tema.css';
            $.get(css_tema, function () {
                var $link = $(document.createElement('link')).attr({
                    rel:    'stylesheet',
                    media:  'all',
                    href:   css_tema
                });

                if ($('link[rel="stylesheet"]').length > 0) {
                    $link.insertAfter($('link[rel="stylesheet"]').last());
                } else {
                    $link.appendTo($('head'));
                } // Fim if
            }).fail(function () {
                console.warn('Não foi possível carregar o arquivo %s.', css_tema);
            });
        } // Fim function carregarTema
    };


    var metodos = {
        alerta: function (opcoes) {
            opcoes = $.extend(true, {
                /**
                 * Mensagem a ser exibida. Pode conter elementos HTML
                 * @type {String}
                 */
                mensagem: null,

                /**
                 * Tipo de mensagem a ser exibida. Será incluída uma classe com
                 * o mesmo nome, para manipular o visual da mensagem
                 * @type {String}
                 */
                tipo: null,

                /**
                 * Vetor contendo os botões que estarão no alerta. Cada item
                 * deve conter as configurações do botão no formato Object.
                 * @type {Array}
                 */
                botoes: [
                    {
                        texto: 'Ok',
                        // padrao: true,
                        funcao: function () {

                        },
                        params: {
                            class: 'botao -destaque'
                        }
                    }
                ],

                /**
                 * Nome do tema que vai definir o visual da mensagem
                 * @type {String}
                 */
                tema: 'padrao'
            }, opcoes);

            // Carregar o arquivo CSS com o tema solicitado
            fArquivos.carregarTema(opcoes.tema);

            // Criar a div que receberá a mensagem como um todo
            var $div = $(document.createElement('div')).addClass('__jQuery-mostrarMsg ' + opcoes.tema + ' ' + opcoes.tipo);

            // Criar a div que vai receber a mensagem e os botões
            var $cx_msg = $(document.createElement('div')).addClass('caixa-msg').appendTo($div);

            // Criar o parágrafo que vai receber a mensagem
            /*var $paragr = */$(document.createElement('p')).addClass('mensagem').html(opcoes.mensagem).appendTo($cx_msg);

            // Criar os botões
            var qtde_botoes = opcoes.botoes.length || 0;

            if (qtde_botoes < 1) {
                console.warn('[Plugin $.mostrarMsg] ' + $.mostrarMsg.msg_tecla_esc);

                /*
                 * Caso nenhum botão seja configurado, configuro a tecla ESC para
                 * remover a mensagem da tela
                 */
                $(window).on('keyup.' + $.mostrarMsg.evt_ns, { $msg: $div }, function (evt) {
                    var tecla_esc = (evt.key && evt.key === 'ESC') || ((evt.keycode || evt.which) === 27);

                    if (tecla_esc) {
                        evt.data.$msg.fadeOut('fast', function () {
                            evt.data.$msg.remove();
                        });
                    } // Fim if
                });

                // Adicionar uma mensagem indicando o uso da tecla ESC
                $(document.createElement('p')).addClass('tecla-esc').html('Pressione a tecla ESC para fechar.').appendTo($div);
            } else {
                // Criar a div que vai receber os botões
                var $botoes = $(document.createElement('div')).addClass('botoes').appendTo($cx_msg),
                    func_click = function (evt) {
                        var btn_atual = evt.data.btn_atual;

                        // Esconder a mensagem e excluí-la
                        $(this).parents('.__jQuery-mostrarMsg').fadeOut('fast', function () {
                            if (typeof btn_atual.funcao === 'function') {
                                btn_atual.funcao.apply();
                            } // Fim if

                            $(this).remove();
                        });
                    }, btn_atual;

                for (var i = 0; i < qtde_botoes; i++) {
                    btn_atual = opcoes.botoes[i];
                    $(document.createElement('button')).text(btn_atual.texto).attr(btn_atual.params)
                        .on('click.' + $.mostrarMsg.evt_ns, {btn_atual: btn_atual}, func_click).appendTo($botoes);
                } // Fim for
            } // Fim if ... else

            $div.appendTo($('body'));
        },

        confirmacao: function (opcoes) {
            opcoes = $.extend(true, {
                /**
                 * Mensagem a ser exibida. Pode conter elementos HTML
                 * @type {String}
                 */
                mensagem: null,

                /**
                 * Nome do tema que vai definir o visual da mensagem
                 * @type {String}
                 */
                tema: 'padrao',

                /**
                 * Botão 'Sim'. Será usado pelo usuário para aceitar a confirmação
                 * solicitada
                 * @type {Object}
                 */
                btn_sim: {
                    texto: 'Sim',
                    // padrao: true,
                    funcao: function () {
                        return false;
                    },
                    params: {
                        class: 'botao -sim'
                    }
                },

                /**
                 * Botão 'Não'. Será usada pelo usuário para negar a confirmação
                 * solicitada
                 * @type {Object}
                 */
                btn_nao: {
                    texto: 'Não',
                    // padrao: false,
                    funcao: function () {
                        return false;
                    },
                    params: {
                        class: 'botao -nao'
                    }
                }
            }, opcoes);

            metodos.alerta({
                mensagem: opcoes.mensagem,
                tema: opcoes.tema,
                botoes: [opcoes.btn_sim, opcoes.btn_nao]
            });
        }
    };


    $.mostrarMsg = function(metodo) {
        if (metodos[metodo]) {
            return metodos[metodo].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (!metodo || typeof metodo === 'object' || metodo === 'init') {
            return metodos.init.apply(this, arguments);
        } else {
            console.error('[Plugin $.fn.formAjax] O método [%s] não foi localizado!', metodo);
        } // Fim if ... elseif ... else
    };

    /**
     * Namespace dos eventos aplicados pelo plugin
     * @type {String}
     */
    $.mostrarMsg.evt_ns = '__mostrarMsg';

    /**
     * Mensagem indicativa para pressionar a tecla ESC para remover a mensagem da
     * tela quando nenhum botão for configurado
     * @type {String}
     */
    $.mostrarMsg.msg_tecla_esc = 'O ideal é configurar pelo menos 1 botão. Para remover a mensagem quando nenhum botão é configurado pressione a tecla ESC.';
})(jQuery);
