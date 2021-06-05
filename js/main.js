/**
 * Este evento sera executado quando a pagina terminar de carregar 
 */
$(document).ready(function() {
    $('#inputCEP').mask('00000-000');
    $('#inputCEP').focus();
});

/**
 * Evento de click do botao btnBuscarCEP
 */
$('#btnBuscarCEP').click(function() {
    buscarCEP();
});

$('#inputCEP').focusout(function() {
    buscarCEP();
})

/**
 * Evento de click do botao btnGravar
 */
$('#formEndereco').submit(function() {
    if (inputEndereco.value === '') {
        alert('Faltou consultar o CEP!')
    } else {
        alert(`O endereço ${inputEndereco.value}, ${inputNumero.value} foi gravado`);        
    }
    return false;
});

async function buscarCEP() {
    let sCEP = inputCEP.value;
    $.ajax({
        url: `https://viacep.com.br/ws/${sCEP}/json/`,
        cors: true,
        method: 'GET',
        beforeSend: () => {
            $('.loader').css({display:"block"});
        },
        success: (response) => {
            if (response.erro) {
                alert(`O CEP ${sCEP} não foi encontrado`);
                $('#inputCEP').focus();
            } else {
                inputEndereco.value = response.logradouro;
                inputBairro.value = response.bairro;
                inputCidade.value = response.localidade;
                selectEstado.value = response.uf; 
            }
        },
        error: (response) => {
            alert(`O CEP ${sCEP} não foi encontrado`);
            $('#inputCEP').focus();
        },
        complete: () => {
            $('.loader').css({display:"none"});
        }
    });
}