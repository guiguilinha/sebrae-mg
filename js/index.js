const $startPage = document.querySelector(".start");
const $testPage = document.querySelector(".questions");
const $resultPage = document.querySelector(".results");

const $startGameButton = document.querySelector(".start-test");
const $questionsContainer = document.querySelector(".question-core");
const $questionsParentContainer = document.querySelector(".question-container");
const $answersContainer = document.querySelector(".answers-container");
const $questionText = document.querySelector(".question-text");
const $nextQuestionButton = document.querySelector(".next");
const $levelTitle = document.querySelector(".level-title");
const $levelText = document.querySelector(".level-text");
const $levelImg = document.querySelector(".img-level-hero");
let $actualCatgory = document.querySelector(".question-text");
const $cardList = document.querySelector(".card-list");
const $levelDetailChildren = document.querySelector(".levelDetail");

let currentQuestionIndex = 0;
let totalPoints = 0;
let pointActualAnswer = 0;
let pointLastAnswer = 0;
let totalCatProcess = 0;
let totalCatSell = 0;
let totalCatDigital = 0;
let totalCatCommunication = 0;
let totalCatFinance = 0;


//$startGameButton.addEventListener("click", startGame);
//$nextQuestionButton.addEventListener("click", calcPoints);

if (document.readyState !== "loading") {
    scrollCourses();
  document.addEventListener("DOMContentLoaded", scrollCourses);
}

function startGame(){
    /* valida form */
    $startPage.classList.add("hide");
    $testPage.classList.remove("hide");
    displayNextQuestion();
}



function displayNextQuestion(){
    resetState();    

    if(questions.length === currentQuestionIndex){
        return finishTest();
    }
    $questionText.textContent = questions[currentQuestionIndex].question;
    $questionText.dataset.category = questions[currentQuestionIndex].category;
    
    questions[currentQuestionIndex].answers.forEach(answer => {
        const newAnswer = document.createElement("button");
        newAnswer.classList.add("btn", "btn-question-sebrae", "my-2", "justify-content-left", "swing-in-top-fwd", "animaDelay-01");
        
        const newOption = document.createElement("span");
        newOption.classList.add("question-choice", "me-3");
        newOption.textContent = answer.option;
        
        newAnswer.textContent = answer.text;
        newAnswer.dataset.weight = answer.point;
        
        //newAnswer.appendChild(newOption);
        $answersContainer.appendChild(newAnswer);
        newAnswer.addEventListener("click", selectAnswer)
    })
    $actualCatgory = $questionText.dataset.category;
}

function resetState(){
    while($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild);
    }
    $nextQuestionButton.classList.add("disabled");   
}

function selectAnswer(event){
    const selectionClicked = event.target;
    const $answerSelection = document.querySelector(".btn-hover");
    if($answerSelection){
        $answerSelection.classList.remove("btn-hover");
    }
    selectionClicked.classList.add("btn-hover");
    $nextQuestionButton.classList.remove("disabled");
    pointActualAnswer = parseInt(selectionClicked.dataset.weight);
}

function calcPoints(){
    
    pointLastAnswer = pointActualAnswer;
    switch($actualCatgory){
        case "Processos e gestão":
            totalCatProcess += pointActualAnswer;
            break;
        case "Vendas e atendimento":
            totalCatSell += pointActualAnswer;
            break;
        case "Presença digital":
            totalCatDigital += pointActualAnswer;
            break;
        case "Comunicação e marca":
            totalCatCommunication += pointActualAnswer;
            break;
        case "Finanças e pagamentos":
            totalCatFinance += pointActualAnswer;
            break;
        default:
            break;
    }
    currentQuestionIndex++;
    displayNextQuestion();
}

function finishTest(){
    $testPage.classList.add("hide");
    $resultPage.classList.remove("hide");
    totalPoints = (totalCatProcess + totalCatSell + totalCatDigital + totalCatCommunication + totalCatFinance);
        if(totalPoints <= 20){
            $levelTitle.append(levels[0].level);
            $levelText.append(levels[0].text);
            changeImageSrc(levels[0].img);
        }
        
        if(totalPoints > 20 && totalPoints <= 35){
            $levelTitle.append(levels[1].level);
            $levelText.append(levels[1].text);
            changeImageSrc(levels[1].img);
        }
        if(totalPoints > 35 && totalPoints <= 50){
            $levelTitle.append(levels[2].level);
            $levelText.append(levels[2].text);
            changeImageSrc(levels[2].img);
        }
        if(totalPoints > 50 && totalPoints <= 60){
            $levelTitle.append(levels[3].level);
            $levelText.append(levels[3].text);
            changeImageSrc(levels[3].img);
        }
}

function changeImageSrc(newSrc){
    $levelImg.src = newSrc;
}

const setupProcess = () => {
    new ScrollBooster({
        viewport: document.querySelector('#processCourses .card-list'),
        content: document.querySelector('#processCourses .card-content'),
        scrollMode: 'native',
        direction: 'horizontal'
    });
}

const setupSell = () => {
    new ScrollBooster({
        viewport: document.querySelector('#sellCourses .card-list'),
        content: document.querySelector('#sellCourses .card-content'),
        scrollMode: 'native',
        direction: 'horizontal'
    });
}

const setupDigital = () => {
    new ScrollBooster({
        viewport: document.querySelector('#digitalCourses .card-list'),
        content: document.querySelector('#digitalCourses .card-content'),
        scrollMode: 'native',
        direction: 'horizontal'
    });
}

const setupCommunication = () => {
    new ScrollBooster({
        viewport: document.querySelector('#communicationCourses .card-list'),
        content: document.querySelector('#communicationCourses .card-content'),
        scrollMode: 'native',
        direction: 'horizontal'
    });
}

const setupFinance = () => {
    new ScrollBooster({
        viewport: document.querySelector('#financeCourses .card-list'),
        content: document.querySelector('#financeCourses .card-content'),
        scrollMode: 'native',
        direction: 'horizontal'
    });
}


function scrollCourses() {
    setupProcess();
    setupSell();
    setupDigital();
    setupCommunication();
    setupFinance();
}




//----------------------------------------------------------------------------------------------------------------------


const questions = [
    {
        category: "Processos e gestão",
        question: "Como você gerencia as operações do seu negócio?",
        answers: [
            {text: "Uso métodos manuais e anotações em papel.", point: 1, option: "A"},
            {text: "Utilizo planilhas no computador para algumas atividades.", point: 2, option: "B"},
            {text: "Uso um programa simples para organizar processos.", point: 3, option: "C"},
            {text: "Tenho sistemas integrados que automatizam processos e fornecem análises.", point: 4, option: "D"}
        ]
    },
    {
        category: "Processos e gestão",
        question: "Como você controla o estoque e as compras do seu negócio?",
        answers: [
            {text: "Faço registros manuais e não acompanho regularmente.", point: 1},
            {text: "Uso planilhas para controlar estoque e compras.", point: 2},
            {text: "Utilizo programas específicos para gestão de estoque e pedidos a fornecedores.", point: 3},
            {text: "Tenho sistemas integrados que automatizam vendas, estoque, compras e preveem necessidades futuras.", point: 4}
        ]
    },
    {
        category: "Processos e gestão",
        question: "Como você emite notas fiscais e documentos fiscais?",
        answers: [
            {text: "Emito notas fiscais manualmente ou uso blocos de papel.", point: 1},
            {text: "Uso sistemas on-line para emitir notas fiscais individualmente.", point: 2},
            {text: "Utilizo um programa que integra vendas e emite notas fiscais automaticamente.", point: 3},
            {text: "Tenho processos automatizados de faturamento integrados à gestão financeira.", point: 4}
        ]
    },
    {
        category: "Vendas e atendimento",
        question: "Por quais canais você vende seus produtos ou serviços?",
        answers: [
            {text: "Vendo apenas pessoalmente, em loja física ou em atendimento presencial.", point: 1},
            {text: "Vendo pessoalmente e recebo pedidos por WhatsApp ou redes sociais.", point: 2},
            {text: "Além dos atendimentos presenciais e redes sociais, vendo também pelo meu site ou plataformas de vendas on-line (ex: Mercado Livre, OLX)", point: 3},
            {text: "Uso vários canais (loja física, site, redes sociais, sites de vendas online) e faça gestão de forma integrada com apoio de um sistema (software).", point: 4}
        ]
    },
    {
        category: "Vendas e atendimento",
        question: "Como você atende e se comunica com seus clientes?",
        answers: [
            {text: "Atendo apenas pessoalmente ou por telefone, sem anotar informações dos clientes", point: 1},
            {text: "Mantenho o histórico das conversas na ferramenta que o cliente fez contato (WhatsApp Business, e-mail etc).", point: 2},
            {text: "Utilizo ferramentas para gerenciar contatos e acompanhar solicitações.", point: 3},
            {text: "Uso sistemas que automatizam o atendimento, com histórico do cliente e atendimento personalizado.", point: 4}
        ]
    },
    {
        category: "Vendas e atendimento",
        question: "Como você recebe opiniões e sugestões dos clientes?",
        answers: [
            {text: "Não tenho um processo para receber opiniões.", point: 1},
            {text: "Recebo opiniões informalmente, quando os clientes procuram.", point: 2},
            {text: "Peço opiniões através de pesquisas ou redes sociais.", point: 3},
            {text: "Utilizo ferramentas específicas para coletar e analisar opiniões, melhorando produtos e serviços.", point: 4}
        ]
    },
    {
        category: "Presença digital",
        question: "Como é a presença do seu negócio na internet?",
        answers: [
            {text: "Não tenho presença on-line ou tenho apenas um perfil básico em redes sociais.", point: 1},
            {text: "Tenho perfis ativos em redes sociais, mas posto de forma irregular e sem planejamento.", point: 2},
            {text: "Tenho um site atualizado e utilizo as redes sociais com estratégia definida.", point: 3},
            {text: "Invisto em marketing digital, tenho verba mensal para anúncios on-line, tenho site otimizado e faço análise de resultados com frequência.", point: 4}
        ]
    },
    {
        category: "Presença digital",
        question: "Como você utiliza a internet para promover e vender seus produtos ou serviços?",
        answers: [
            {text: "Não utilizo a internet para promoção ou vendas.", point: 1},
            {text: "Divulgo produtos ou serviços nas redes sociais, sem estratégia definida.", point: 2},
            {text: "Vendo pela internet através de site próprio ou sites de vendas online e faço promoções online.", point: 3},
            {text: "Utilizo estratégias avançadas de vendas online, campanhas de marketing e análise de dados para melhorar resultados.", point: 4}
        ]
    },
    {
        category: "Presença digital",
        question: "Como você investe em publicidade digital para atrair novos clientes?",
        answers: [
            {text: "Não invisto em publicidade digital.", point: 1},
            {text: "Impulsiono postagens nas redes sociais de vez em quando, mas sem uma estratégia clara.", point: 2},
            {text: "Faço anúncios pagos nas redes sociais ou em sites, com metas definidas, mas sem acompanhar os resultados de perto.", point: 3},
            {text: "Invisto em campanhas de publicidade digital bem planejadas, monitorando os resultados e ajustando as estratégias conforme necessário.", point: 4}
        ]
    },
    {
        category: "Comunicação e marca",
        question: "Como você trabalha a identidade da sua marca?",
        answers: [
            {text: "Não tenho uma identidade de marca definida.", point: 1},
            {text: "Tenho um logotipo e materiais básicos, mas não aplico em todas as minhas comunicações.", point: 2},
            {text: "Tenho uma identidade visual e uma mensagem clara, e aplico em todos os canais de comunicação.", point: 3},
            {text: "Desenvolvo estratégias para fortalecer a imagem e o posicionamento da minha marca no mercado.", point: 4}
        ]
    },
    {
        category: "Comunicação e marca",
        question: "Como você planeja e executa a comunicação com seus clientes?",
        answers: [
            {text: "Comunico-me esporadicamente, sem planejamento.", point: 1},
            {text: "Faço publicações e envios, mas sem calendário definido.", point: 2},
            {text: "Planejo conteúdos e ações de comunicação com base em objetivos claros.", point: 3},
            {text: "Uso dados para personalizar a comunicação e automatizo interações com os clientes.", point: 4}
        ]
    },
    {
        category: "Comunicação e marca",
        question: "Como você gerencia as redes sociais do seu negócio?",
        answers: [
            {text: "Não faço uma gestão ativa ou integrada dos meus canais de comunicação.", point: 1},
            {text: "Faço publicações esporádicas e uso os canais separadamente, sem integração entre eles.", point: 2},
            {text: "Uso vários canais (redes sociais, e-mail etc.), tenho uma estratégia, mas sem monitoramento de resultados.", point: 3},
            {text: "Faço uma gestão integrada de todos os canais, com análise de resultados para ajustar e otimizar minha comunicação.", point: 4}
        ]
    },
    {
        category: "Finanças e pagamentos",
        question: "Quais formas de pagamento você oferece aos seus clientes?",
        answers: [
            {text: "Apenas dinheiro.", point: 1},
            {text: "Dinheiro e cartões por meio de maquininha.", point: 2},
            {text: "Além dos anteriores, aceito PIX e pagamentos on-line, boletos bancários e pagamentos por aproximação.", point: 3},
            {text: "Ofereço diversas opções digitais, incluindo carteiras digitais e pagamentos por aproximação (por exemplo, via celular).", point: 4}
        ]
    },
    {
        category: "Finanças e pagamentos",
        question: "Como você gerencia as finanças do seu negócio?",
        answers: [
            {text: "Não tenho controle financeiro formal.", point: 1},
            {text: "Uso planilhas para registrar receitas e despesas.", point: 2},
            {text: "Utilizo programas e aplicativos para gestão financeira e geração de relatórios.", point: 3},
            {text: "Uso sistemas avançados que automatizam finanças, com análises de custos e faturamento e previsões financeiras.", point: 4}
        ]
    },
    {
        category: "Finanças e pagamentos",
        question: "Você utiliza aplicativos ou serviços financeiros digitais no seu negócio?",
        answers: [
            {text: "Não utilizo nenhum aplicativo ou serviço financeiro digital.", point: 1},
            {text: "Uso apenas o internet banking tradicional do meu banco.", point: 2},
            {text: "Utilizo contas digitais ou aplicativos financeiros para algumas operações, como pagamentos, recebimentos ou controle financeiro.", point: 3},
            {text: "Integro meu negócio com soluções financeiras digitais inovadoras, como aplicativos de gestão financeira, plataformas de pagamento on-line, bancos digitais ou sistemas que automatizam finanças e pagamentos.  Realizo serviços financeiros digitais como: antecipação de recebíveis, portabilidade e negociação de dívidas", point: 4}
        ]
    }
]

const levels = [
    {
        id: 1,
        level: "Iniciante Digital",
        text: "Seu negócio está nos primeiros passos da transformação digital. Há muitas oportunidades para incorporar ferramentas e práticas digitais que podem melhorar sua eficiência e competitividade.",
        img: "img/iniciante_digital.png"
    },
    {
        id: 2,
        level: "Aprendiz Digital",
        text: "Você já iniciou a jornada digital e utiliza algumas ferramentas. Focar em áreas específicas pode impulsionar ainda mais seu negócio.",
        img: "img/aprendiz_digital.png"
    },
    {
        id: 3,
        level: "Empreendedor Digital",
        text: "Seu negócio já adota várias práticas digitais e está colhendo os benefícios. Continuar inovando e integrando processos será essencial.",
        img: "img/empreendedor_digital.png"
    },
    {
        id: 4,
        level: "Inovador Digital",
        text: "Você está na vanguarda da transformação digital, utilizando tecnologias avançadas e estratégias inovadoras.",
        img: "img/inovador_digital.png"
    },
]