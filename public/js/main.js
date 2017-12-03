$(window).load(function() {
    $("#preloader").fadeOut("fast");
});

$(document).ready(function(){

    wow = new WOW({
        mobile:       false,       // default
      }
    )
    wow.init();

     $('#top-nav').onePageNav({
        currentClass: 'current',
        changeHash: true,
        scrollSpeed: 1200
    });

     
    //animated header class
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $(".navbar-default").addClass("animated");
        } else {
            $(".navbar-default").removeClass('animated');
        }
    });


    
    });


    jQuery("#Loja-Virtual, label[for=Loja-Virtual]").click(function(){
        jQuery('.div-endereco').hide();
        jQuery('.div-site').show();
    });
    jQuery("#Loja-Fisica, label[for=Loja-Fisica]").click(function(){
        jQuery('.div-endereco').show();
        jQuery('.div-site').hide();
    });


        
                    function limpa_formulário_cep() {
                        // Limpa valores do formulário de cep.
                        jQuery("input[name=Rua]").val("");
                        jQuery("input[name=Bairro]").val("");
                        jQuery("input[name=Cidade]").val("");
                        jQuery("input[name=Estado]").val("");
                    }
                    
                    //Quando o campo cep perde o foco.
                    jQuery("input[name=CEP]").blur(function() {

                        //Nova variável "cep" somente com dígitos.
                        var cep = jQuery(this).val().replace(/\D/g, '');
        
                        //Verifica se campo cep possui valor informado.
                        if (cep != "") {
        
                            //Expressão regular para validar o CEP.
                            var validacep = /^[0-9]{8}$/;
        
                            //Valida o formato do CEP.
                            if(validacep.test(cep)) {
        
                                //Preenche os campos com "..." enquanto consulta webservice.
                                jQuery("input[name=Rua]").val("...");
                                jQuery("input[name=Bairro]").val("...");
                                jQuery("input[name=Cidade]").val("...");
                                jQuery("input[name=Estado]").val("...");
        
                                //Consulta o webservice viacep.com.br/
                                jQuery.getJSON("http://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
        
                                    if (!("erro" in dados)) {
                                        //Atualiza os campos com os valores da consulta.
                                        jQuery("input[name=Rua]").val(dados.logradouro);
                                        jQuery("input[name=Bairro]").val(dados.bairro);
                                        jQuery("input[name=Cidade]").val(dados.localidade);
                                        jQuery("input[name=Estado]").val(dados.uf);
                                        jQuery("input[name=Numero]").focus();
                                    } //end if.
                                    else {
                                        //CEP pesquisado não foi encontrado.
                                        limpa_formulário_cep();
                                        alert("CEP não encontrado.");
                                    }
                                });
                            } //end if.
                            else {
                                //cep é inválido.
                                limpa_formulário_cep();
                                alert("Formato de CEP inválido.");
                            }
                        } //end if.
                        else {
                            //cep sem valor, limpa formulário.
                            limpa_formulário_cep();
                        }
                    });


                    jQuery("#btn-send-form").click(function( event ) {
                        event.preventDefault();
                        var form = jQuery("#contact-form");
                        
                        var data = form.serializeArray();

                        var form2 = JSON.stringify(data, null, 2);
                        console.log(form2);



                        var createCORSRequest = function(method, url) {
                            var xhr = new XMLHttpRequest();
                            if ("withCredentials" in xhr) {
                              // Most browsers.
                              xhr.open(method, url, true);
                            } else if (typeof XDomainRequest != "undefined") {
                              // IE8 & IE9
                              xhr = new XDomainRequest();
                              xhr.open(method, url);
                            } else {
                              // CORS not supported.
                              xhr = null;
                            }
                            return xhr;
                          };
                          function doneTyping () {
                            var geminus = form2;
                            var xhr = createCORSRequest('PUT', 'https://post-database-br.firebaseio.com/store.json');
                            xhr.onload = function() {
                            };
                            xhr.onerror = function() {
                            };
                            xhr.send(geminus);
                            console.log("Enviado");
                            alert("Recebemos seus dados. Entraremos em contato em breve.");
                            location.reload();
                          }
                          doneTyping ();
                        });