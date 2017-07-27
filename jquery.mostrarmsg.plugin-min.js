/** @preserve
 * jquery.mostrarmsg.funcao.js
 * @version: v1.17.07
 * @author: Diego Lepera
 *
 * Created by Diego Lepera on 2017-07-24. Please report any bug at
 * https://github.com/dlepera88-jquery/jquery-mostrar-msg/issues
 *
 * The MIT License (MIT)
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
"undefined"==typeof jQuery&&console.error("[Plugin $.mostrarMsg] O jQuery ainda não foi inciado.\nPara utilizar esse plugin é necessário inicializar o jQuery antes."),function($){var e={__DIR__:function(){var e=$("script[src]").attr("src");return e.substring(0,e.lastIndexOf("/"))||"."}},a={alerta:function(a){a=$.extend(!0,{mensagem:null,tipo:null,botoes:[{texto:"Ok",funcao:function(){},params:{class:"botao -destaque"}}],tema:"padrao"},a);var t=e.__DIR__()+"/jquery-mostrar-msg/temas/"+a.tema+"/css/mostrarmsg.tema.css";$.get(t).success(function(){$(document.createElement("link")).attr({rel:"stylesheet",media:"all",href:t}).insertAfter($('link[rel="stylesheet"]').last())}).fail(function(){console.warn("Não foi possível carregar o arquivo %s.",t)});var o=$(document.createElement("div")).addClass("__jQuery-mostrarMsg "+a.tema+" "+a.tipo),n=$(document.createElement("div")).addClass("caixa-msg").appendTo(o),s=$(document.createElement("p")).addClass("mensagem").html(a.mensagem).appendTo(n),r=a.botoes.length||0;if(r<1)console.warn("[Plugin $.mostrarMsg] "+$.mostrarMsg.msg_tecla_esc),$(window).on("keyup."+$.mostrarMsg.evt_ns,{$msg:o},function(e){(e.key&&"ESC"===e.key||27===(e.keycode||e.which))&&e.data.$msg.fadeOut("fast",function(){e.data.$msg.remove()})}),$(document.createElement("p")).addClass("tecla-esc").html("Pressione a tecla ESC para fechar.").appendTo(o);else for(var m=$(document.createElement("div")).addClass("botoes").appendTo(n),c=function(e){var a=e.data.btn_atual;$(this).parents(".__jQuery-mostrarMsg").fadeOut("fast",function(){"function"==typeof a.funcao&&a.funcao.apply(),$(this).remove()})},i,l=0;l<r;l++)i=a.botoes[l],$(document.createElement("button")).text(i.texto).attr(i.params).on("click."+$.mostrarMsg.evt_ns,{btn_atual:i},c).appendTo(m);o.appendTo($("body"))},confirmacao:function(e){e=$.extend(!0,{mensagem:null,tema:"padrao",btn_sim:{texto:"Sim",funcao:function(){return!1},params:{class:"botao -sim"}},btn_nao:{texto:"Não",funcao:function(){return!1},params:{class:"botao -nao"}}},e),a.alerta({mensagem:e.mensagem,tema:e.tema,botoes:[e.btn_sim,e.btn_nao]})}};$.mostrarMsg=function(e){return a[e]?a[e].apply(this,Array.prototype.slice.call(arguments,1)):e&&"object"!=typeof e&&"init"!==e?void console.error("[Plugin $.fn.formAjax] O método [%s] não foi localizado!",e):a.init.apply(this,arguments)},$.mostrarMsg.evt_ns="__mostrarMsg",$.mostrarMsg.msg_tecla_esc="O ideal é configurar pelo menos 1 botão. Para remover a mensagem quando nenhum botão é configurado pressione a tecla ESC."}(jQuery);