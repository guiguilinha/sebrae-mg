// Função para gerar PDF do resultado do teste
function gerarPDF() {
    try {
        console.log('Iniciando geração do PDF...');
        
        // Elemento que contém o conteúdo a ser convertido para PDF
        const element = document.getElementById('formfinishingTest');
        if (!element) {
            console.error('Elemento formfinishingTest não encontrado');
            return;
        }
        
        console.log('Elemento encontrado:', element);

        // Remover o botão de download temporariamente
        const btnDownload = document.getElementById('btnDownloadPDF');
        if (btnDownload) {
            btnDownload.style.display = 'none';
        }

        // Salvar classes originais
        const originalClasses = {
            formfinishingTest: element.className,
            resultHero: element.querySelector('.resultHero')?.className,
            textResultGeneral: element.querySelector('#text-result-general')?.className,
            imgResultGeneral: element.querySelector('#img-result-general')?.className,
            callToAction: element.querySelector('.callToActionSebraePlay')?.className,
            resultDetail: element.querySelector('#resultDetail')?.className,
            resultDetailList: element.querySelector('#resultDetailList')?.className,
            cardList: element.querySelector('.card-list')?.className,
            cards: Array.from(element.querySelectorAll('.card-list .card')).map(card => card.className),
            cardBodies: Array.from(element.querySelectorAll('.card-list .card-body')).map(body => body.className),
            cardListTitle: element.querySelector('#cardListTitle')?.className,
            map: element.querySelector('#map')?.style.display,
            sebraeUnits: {
                modals: Array.from(element.querySelectorAll('#sebrae-units .modal')).map(modal => ({
                    class: modal.className,
                    fade: modal.classList.contains('fade')
                })),
                closeButtons: Array.from(element.querySelectorAll('#sebrae-units .btn-close')).map(btn => ({
                    class: btn.className,
                    hide: btn.classList.contains('hide')
                }))
            }
        };

        // Aplicar classes mobile
        element.className = originalClasses.formfinishingTest + ' d-flex flex-column';

        const resultHero = element.querySelector('.resultHero');
        if (resultHero) {
            resultHero.className = originalClasses.resultHero + ' d-flex flex-column';
        }

        const textResultGeneral = element.querySelector('#text-result-general');
        if (textResultGeneral) {
            textResultGeneral.className = originalClasses.textResultGeneral + ' w-100';
        }

        const imgResultGeneral = element.querySelector('#img-result-general');
        if (imgResultGeneral) {
            imgResultGeneral.style.display = 'none';
        }

        const callToAction = element.querySelector('.callToActionSebraePlay');
        if (callToAction) {
            callToAction.className = originalClasses.callToAction + ' w-100';
        }

        const resultDetail = element.querySelector('#resultDetail');
        if (resultDetail) {
            resultDetail.className = originalClasses.resultDetail + ' w-100';
        }

        const resultDetailList = element.querySelector('#resultDetailList');
        if (resultDetailList) {
            resultDetailList.className = originalClasses.resultDetailList + ' w-100';
        }

        const cardList = element.querySelector('.card-list');
        if (cardList) {
            cardList.className = originalClasses.cardList + ' w-100 list-group';
        }

        const cards = element.querySelectorAll('.card-list .card');
        cards.forEach(card => {
            card.className = originalClasses.cards[0] + ' w-100 list-group-item';
        });

        const cardBodies = element.querySelectorAll('.card-list .card-body');
        cardBodies.forEach(body => {
            body.className = originalClasses.cardBodies[0] + ' p-2';
        });

        // Ajustar título da lista de cards
        const cardListTitle = element.querySelector('#cardListTitle');
        if (cardListTitle) {
            cardListTitle.className = cardListTitle.className.replace('h2', 'h5');
        }

        // Esconder o mapa
        const map = element.querySelector('#map');
        if (map) {
            map.style.display = 'none';
        }

        // Mostrar os modais
        const modals = element.querySelectorAll('.unitsSebraeMG .modal');
        modals.forEach(modal => {
            modal.style.display = 'block';
            modal.style.position = 'static';
            modal.style.opacity = '1';
            modal.classList.remove('fade');
        });

        // Manipular elementos da seção #sebrae-units
        const sebraeUnits = element.querySelector('#sebrae-units');
        if (sebraeUnits) {
            // Remover classes .modal e .fade
            const modals = sebraeUnits.querySelectorAll('.modal');
            modals.forEach(modal => {
                modal.classList.remove('modal', 'fade');
            });

            // Adicionar classe .hide nos botões de fechar
            const closeButtons = sebraeUnits.querySelectorAll('.btn-close');
            closeButtons.forEach(btn => {
                btn.classList.add('hide');
            });
        }

        // Aplicar estilos específicos para PDF
        element.style.margin = '0';
        element.style.padding = '0';

        if (resultHero) {
            resultHero.style.margin = '0 0 0.5rem 0';
        }

        if (textResultGeneral) {
            textResultGeneral.style.marginRight = '0.5rem';
        }

        if (callToAction) {
            callToAction.style.margin = '0.5rem 0';
        }

        if (resultDetail) {
            resultDetail.style.margin = '0';
        }

        if (resultDetailList) {
            resultDetailList.style.margin = '0';
        }

        if (cardList) {
            cardList.style.fontSize = '85%';
            cardList.style.padding = '0';
            cardList.style.margin = '0';
        }

        cards.forEach(card => {
            card.style.margin = '0 0 0.25rem 0';
            card.style.padding = '0.25rem';
            card.style.fontSize = '85%';
            card.style.width = '100%';
            card.style.minHeight = 'auto';
            card.style.border = '1px solid #dee2e6';
            card.style.borderRadius = '0.25rem';
        });

        cardBodies.forEach(body => {
            body.style.padding = '0.25rem';
            body.style.margin = '0';
        });
        
        // Opções de configuração do PDF
        const opt = {
            margin: [0.25, 0.25, 0.25, 0.25], // [top, left, bottom, right]
            filename: 'resultado-maturidade-digital.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 1.5,
                useCORS: true,
                logging: true,
                letterRendering: true,
                allowTaint: true,
                scrollY: 0,
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight,
                backgroundColor: '#ffffff',
                removeContainer: true
            },
            jsPDF: { 
                unit: 'in', 
                format: 'a4', 
                orientation: 'portrait',
                compress: true
            }
        };

        console.log('Configurações do PDF:', opt);

        // Gerar PDF
        html2pdf().set(opt).from(element).save()
            .then(() => {
                console.log('PDF gerado com sucesso');
                // Restaurar classes originais
                restoreOriginalClasses(element, originalClasses);
                // Restaurar o botão de download
                if (btnDownload) {
                    btnDownload.style.display = '';
                }
            })
            .catch(error => {
                console.error('Erro ao gerar PDF:', error);
                // Restaurar classes originais
                restoreOriginalClasses(element, originalClasses);
                // Restaurar o botão de download
                if (btnDownload) {
                    btnDownload.style.display = '';
                }
            });
    } catch (error) {
        console.error('Erro na função gerarPDF:', error);
        // Restaurar classes originais
        const element = document.getElementById('formfinishingTest');
        if (element) {
            restoreOriginalClasses(element, originalClasses);
        }
        // Restaurar o botão de download
        const btnDownload = document.getElementById('btnDownloadPDF');
        if (btnDownload) {
            btnDownload.style.display = '';
        }
    }
}

// Função para restaurar classes originais
function restoreOriginalClasses(element, originalClasses) {
    element.className = originalClasses.formfinishingTest;

    const resultHero = element.querySelector('.resultHero');
    if (resultHero) {
        resultHero.className = originalClasses.resultHero;
    }

    const textResultGeneral = element.querySelector('#text-result-general');
    if (textResultGeneral) {
        textResultGeneral.className = originalClasses.textResultGeneral;
    }

    const imgResultGeneral = element.querySelector('#img-result-general');
    if (imgResultGeneral) {
        imgResultGeneral.style.display = '';
    }

    const callToAction = element.querySelector('.callToActionSebraePlay');
    if (callToAction) {
        callToAction.className = originalClasses.callToAction;
    }

    const resultDetail = element.querySelector('#resultDetail');
    if (resultDetail) {
        resultDetail.className = originalClasses.resultDetail;
    }

    const resultDetailList = element.querySelector('#resultDetailList');
    if (resultDetailList) {
        resultDetailList.className = originalClasses.resultDetailList;
    }

    const cardList = element.querySelector('.card-list');
    if (cardList) {
        cardList.className = originalClasses.cardList;
    }

    const cards = element.querySelectorAll('.card-list .card');
    cards.forEach((card, index) => {
        card.className = originalClasses.cards[index];
    });

    const cardBodies = element.querySelectorAll('.card-list .card-body');
    cardBodies.forEach((body, index) => {
        body.className = originalClasses.cardBodies[index];
    });

    // Restaurar título da lista de cards
    const cardListTitle = element.querySelector('#cardListTitle');
    if (cardListTitle) {
        cardListTitle.className = originalClasses.cardListTitle;
    }

    // Restaurar o mapa
    const map = element.querySelector('#map');
    if (map) {
        map.style.display = originalClasses.map;
    }

    // Restaurar os modais
    const modals = element.querySelectorAll('.unitsSebraeMG .modal');
    modals.forEach((modal, index) => {
        if (originalClasses.modals[index]) {
            modal.setAttribute('style', originalClasses.modals[index].style || '');
            modal.className = originalClasses.modals[index].class;
        }
    });

    // Restaurar elementos da seção #sebrae-units
    const sebraeUnits = element.querySelector('#sebrae-units');
    if (sebraeUnits) {
        // Restaurar classes .modal e .fade
        const modals = sebraeUnits.querySelectorAll('.modal');
        modals.forEach((modal, index) => {
            if (originalClasses.sebraeUnits.modals[index]) {
                modal.className = originalClasses.sebraeUnits.modals[index].class;
                if (originalClasses.sebraeUnits.modals[index].fade) {
                    modal.classList.add('fade');
                }
            }
        });

        // Restaurar botões de fechar
        const closeButtons = sebraeUnits.querySelectorAll('.btn-close');
        closeButtons.forEach((btn, index) => {
            if (originalClasses.sebraeUnits.closeButtons[index]) {
                btn.className = originalClasses.sebraeUnits.closeButtons[index].class;
                if (!originalClasses.sebraeUnits.closeButtons[index].hide) {
                    btn.classList.remove('hide');
                }
            }
        });
    }
}

// Adicionar botão de download do PDF
function adicionarBotaoPDF() {
    // Verificar se o botão já existe
    if (document.querySelector('#btnDownloadPDF')) {
        return;
    }

    const botaoPDF = document.createElement('button');
    botaoPDF.id = 'btnDownloadPDF';
    botaoPDF.className = 'btn btn-primary mt-3 mb-4';
    botaoPDF.innerHTML = '<i class="bi bi-download"></i> Baixar Resultado em PDF';
    botaoPDF.onclick = gerarPDF;
    
    // Inserir o botão no início da seção de resultados
    const resultadoContainer = document.getElementById('formfinishingTest');
    if (resultadoContainer) {
        resultadoContainer.insertBefore(botaoPDF, resultadoContainer.firstChild);
    }
}

// Função para verificar se a seção de resultados está visível
function verificarSecaoResultados() {
    const resultadoContainer = document.getElementById('formfinishingTest');
    if (resultadoContainer && resultadoContainer.style.display !== 'none') {
        adicionarBotaoPDF();
    }
}

// Executar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado');
    
    // Verificar inicialmente
    verificarSecaoResultados();

    // Observar mudanças no DOM
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' || mutation.type === 'attributes') {
                verificarSecaoResultados();
            }
        });
    });

    // Observar mudanças no DOM
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
    });
}); 