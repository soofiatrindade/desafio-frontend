function Init () {
    var seletor = document.getElementById('conteudo')

    seletor.innerHTML = 'Aguardando...'
    setTimeout(function () {
        seletor.innerHTML = 'Pronto vamos começar!'
    }, 3000)
}