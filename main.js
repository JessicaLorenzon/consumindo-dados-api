const cep = document.getElementById('cep');
const endereco = document.getElementById('endereco');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const estado = document.getElementById('estado');
const mensagemErro = document.getElementById('erro');
mensagemErro.innerHTML = '';

async function buscaEndereco(cep) {
    try {
        const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const consultaCEPConvetida = await consultaCEP.json();
        console.log(consultaCEP)
        if (consultaCEPConvetida.erro) {
            throw Error('CEP não existe!');
        }

        endereco.value = consultaCEPConvetida.logradouro;
        bairro.value = consultaCEPConvetida.bairro;
        cidade.value = consultaCEPConvetida.localidade;
        estado.value = consultaCEPConvetida.uf;

        if (mensagemErro.getElementsByTagName('p').length === 1) {
            mensagemErro.innerHTML = '';
        }

    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido! Tente Novamente.</p>`;
    }

}

cep.addEventListener('input', () => {
    cep.value.length === 8 ? buscaEndereco(cep.value) : limpaValores();
})

function limpaValores() {
    endereco.value = '';
    bairro.value = '';
    cidade.value = '';
    estado.value = '';

    mensagemErro.innerHTML = '';
}