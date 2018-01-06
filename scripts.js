// foco no campo ao abrir modal
$('#adicionarItem').on('shown.bs.modal', function () {
    $('#descricao').focus();
});

// ao carregar a página cria as listas
function criarLista() {
    listaItems = new Array();
    listaItemsComprados = new Array();
    qtd = 0;
    qtdComprados = 0;
    document.getElementById('qtdItens').innerHTML = "(0)";
    document.getElementById('qtdItensComprados').innerHTML = "(0)";
}

$(document).ready(function () {
    document.getElementById('msgCampo').innerHTML = "";
    // inicia o validate do form 
    $("#formAdicionarItem").validate({
        rules: {
            descricao: {
                required: true,
                minlength: 3
            }
        },
        messages: {
            descricao: {
                required: "Preencha este campo, por favor.",
                minlength: "Insira no mínimo 3 caracteres."
            }
        },
        errorElement: "em",
        errorPlacement: function (error, element) {
            // Add the `help-block` class to the error element
            error.addClass("help-block");

            // Add `has-feedback` class to the parent div.form-group
            // in order to add icons to inputs
            element.parents("").addClass("has-feedback");

            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            } else {
                error.insertAfter(element);
            }

            // Add the span element, if doesn't exists, and apply the icon classes to it.
            if (!element.next("span")[ 0 ]) {

            }
        },
        success: function (label, element) {

        },
        highlight: function (element, errorClass, validClass) {
            $(element).parents("").addClass("has-error").removeClass("has-success");

        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents("").addClass("has-success").removeClass("has-error");

        }
    });
});

function limparForm() {
    document.formAdicionarItem.descricao.value = "";
    document.formAdicionarItem.index.value = "";
    document.getElementById('msgCampo').innerHTML = "";
}

function mostrarItens() {
    var options = "";
    for (var i = 1; i <= qtd; i++) {
        options += "<tr>";
        options += "<td class='col-sm-9'>" + listaItems[i] + "</td>";
        options += "<td class='col-sm-1'><button type='button' onclick='excluirItem(" + i + ")' class='btn btn-warning btn-sm'>Excluir</button></td>";
        options += "<td class='col-sm-1'><button type='button' data-target='#adicionarItem' onclick='carregarItem(" + i + ")' class='btn btn-primary btn-sm'> Alterar</button></td>";
        options += "<td class='col-sm-1'><button type='button' onclick='comprarItem(" + i + ")' class='btn btn-success btn-sm'>Comprado</button></td>";
        options += "</tr>";
    }
    $('#tabelaItens').html(options).show();
    document.getElementById('qtdItens').innerHTML = "(" + qtd + ")";
}

function adicionarItem(descricao, index) {
    if (descricao !== "") {
        if (index === "") {
            // novo item
            qtd++;
            listaItems[qtd] = descricao;
        } else {
            // alteração do item
            listaItems[index] = descricao;
        }
        mostrarItens();
        $('#adicionarItem').modal('toggle');
        limparForm();
    } else {
        document.getElementById('msgCampo').innerHTML = "O campo descrição é obrigatório!";
    }
}

function excluirItem(index) {
    for (var j = index; j < qtd; j++) {
        listaItems[j] = listaItems[j + 1];
    }
    qtd--;
    mostrarItens();
}

function carregarItem(index) {
    $('#adicionarItem').modal('show');
    $('#descricao').val(listaItems[index]);
    $('#index').val(index);
}

function comprarItem(index) {
    qtdComprados++;
    listaItemsComprados[qtdComprados] = listaItems[index];
    var options = "";
    for (var i = 1; i <= qtdComprados; i++) {
        options += "<tr>";
        options += "<td class='col-sm-11'>" + listaItemsComprados[i] + "</td>";
        options += "</tr>";
    }
    excluirItem(index);
    $('#tabelaItensComprados').html(options).show();
    document.getElementById('qtdItensComprados').innerHTML = "(" + qtdComprados + ")";
}

function limparItens() {
    listaItems = new Array();
    qtd = 0;
    mostrarItens();
    document.getElementById('qtdItens').innerHTML = "(" + 0 + ")";
}

function limparItensComprados() {
    listaItemsComprados = new Array();
    qtdComprados = 0;
    $('#tabelaItensComprados').html("").show();
    document.getElementById('qtdItensComprados').innerHTML = "(" + 0 + ")";
}
            