const scriptGoogle = 'https://script.google.com/macros/s/AKfycbyPQp2-nzJJ9QSTaoHZfD_uYYXGxL403uc6VGSEsoYg9cagIoBloCCeRSP3gPKgl2RD/exec';
const dadosTesteDeMaturidadeDigital = document.forms['teste-maturidade-digital'];

dadosTesteDeMaturidadeDigital.addEventListener('submit', async (event) => {
    event.preventDefault();

    fetch(scriptGoogle, { method: 'POST', body: new FormData(dadosTesteDeMaturidadeDigital) })
    .then(response => {
        dadosTesteDeMaturidadeDigital.reset();
    })
    .catch(error => console.error('Erro no envio: ', error));
})