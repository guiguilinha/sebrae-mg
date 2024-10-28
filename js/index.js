// Variaveis globais
const $startPage = document.querySelector(".start");
const $testPage = document.querySelector(".questions");
const $resultPage = document.querySelector(".results");
// Variaveis página de inicio
const $startGameButton = document.querySelector(".start-test");
// Variaveis página de teste
const $questionsContainer = document.querySelector(".question-core");
const $questionsParentContainer = document.querySelector(".question-container");
const $answersContainer = document.querySelector(".answers-container");
const $questionText = document.querySelector(".question-text");
const $nextQuestionButton = document.querySelector(".next");
// Variaveis página de resultados => Hero
const $resultHero = document.querySelector(".resultsHero");
const $levelTitle = document.querySelector(".level-title");
const $levelText = document.querySelector(".resultBlock .level-text");
const $levelImg = document.querySelector(".img-level-hero");
// Variaveis página de resultados => progress bar
const $resultBars = document.querySelectorAll(".progress-bar");
const $levelNumberBar = document.querySelectorAll(".level-theme");
const $levelTitleBar = document.querySelectorAll(".level-theme-title");
// Variaveis nível do usuário por tema
const $userCategoryLevel = document.querySelectorAll(".userLevelTheme");
const $levelTabOption = document.querySelectorAll(".tab-courses ul.nav");
// variaveis lista de cursos por usuário
const $coursesListProcess = document.querySelector("#box-tab-process");
const $coursesListSell = document.querySelector("#box-tab-sell");
const $coursesListDigital = document.querySelector("#box-tab-digital");
const $coursesListCommunication = document.querySelector("#box-tab-communication");	
const $coursesListFinance = document.querySelector("#box-tab-finance");

let $actualCatgory = document.querySelector(".question-text");
let currentQuestionIndex = 0;
let currentDescIndex = 0;
let totalPoints = 0;
let pointActualAnswer = 0;
let pointLastAnswer = 0;
let pointsCategory = [
	{
		category: "Processos e gestão", points: 0, percent: 0, level: 0, levelName: "", desc: ""
	},
	{
		category: "Vendas e atendimento", points: 0, percent: 0, level: 0, levelName: "", desc: ""
	},
	{
		category: "Presença digital", points: 0, percent: 0, level: 0, levelName: "", desc: ""
	},
	{
		category: "Comunicação e marca", points:0, percent: 0, level: 0, levelName: "", desc: ""
	},
	{
		category: "Finanças e pagamentos", points: 0, percent: 0, level: 0, levelName: "", desc: ""
	}
];
let pointsGeneral = {
		level: 0, levelName: "", generalResultText: "", img: ""
	}


$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", calcPoints);

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
    pointsCategory.filter((categoria) => categoria.category === $actualCatgory).map((ponto) => ponto.points = ponto.points + pointActualAnswer)
    currentQuestionIndex++;
    displayNextQuestion();
}

function finishTest(){
    $testPage.classList.add("hide");
    $resultPage.classList.remove("hide");
	window.scrollTo(0, 0);
    
	// Calcula o total de pontos do usuário
	totalPoints = pointsCategory.reduce((acc, point) => acc + point.points, 0);
	
    
	//Calcula o n~ivel de maturidade e preenche o texto do resultado geral
    let generalLevel = 0;
	if(totalPoints <= 20){
		generalLevel = 1;
		pointsGeneral = generalResult(generalLevel);
		populateResultHero(pointsGeneral[0])
    }
    if(totalPoints > 20 && totalPoints <= 35){
		generalLevel = 2;
		pointsGeneral = generalResult(generalLevel);
		populateResultHero(pointsGeneral[0])
    }
    if(totalPoints > 35 && totalPoints <= 50){
		generalLevel = 3;
		pointsGeneral = generalResult(generalLevel);
		populateResultHero(pointsGeneral[0])
    }
    if(totalPoints > 50 && totalPoints <= 60){
		generalLevel = 4;
		pointsGeneral = generalResult(generalLevel);
		populateResultHero(pointsGeneral[0])
    }

	// Preenche o Array com resultados do usuário
	pointsCategory.forEach((point) => { 
		point.percent = (point.points / 12 * 100)
		point.level = levelName(point.points)
		point.levelName = levels[point.level - 1].level
		point.desc = levels[point.level - 1].text
	})
  
	// Preenche dados da barra de progresso
	for(let i = 0; i < $resultBars.length; i++) {
		$resultBars[i].textContent = `${pointsCategory[i].percent}%`;
		$resultBars[i].setAttribute("style", `width: ${pointsCategory[i].percent}%`);
		$levelNumberBar[i].textContent = pointsCategory[i].level;
		$levelTitleBar[i].textContent = pointsCategory[i].levelName;
	}
	
	// Preenche dados de datalhes por tema
	for(let j = 0; j < $userCategoryLevel.length; j++) {
		$userCategoryLevel[j].textContent = pointsCategory[j].levelName;
		$userCategoryLevel[j].nextElementSibling.textContent = userDesc
			.filter((item) => item.lvl == pointsCategory[j].level && item.category === pointsCategory[j].category)
			.map((desc) => desc.desc);
		setLevelTheme(j, pointsCategory[j].level);
	}

	//Cria e popula os cards de cursos por categoria
	
	if (document.readyState !== "loading") {
		cursos.forEach((item, index)  => {		
			let cardMount = "";
			let bloco = "";
			if(item.categoria === "Processos e gestão"){ 
					if(item.nivel.includes(1)) {
						cardMount = createCard(item.nome, item.desc, item.link, item.img, "Iniciante digital");
						bloco = document.getElementById("tab-process-iniciante");
						bloco.append(cardMount);
    	        	} else if(item.nivel.includes(2)) {
    	            	cardMount = createCard(item.nome, item.desc, item.link, item.img, "Aprendiz digital");
						bloco = document.getElementById("tab-process-aprendiz");
						bloco.append(cardMount);
					} else if(item.nivel.includes(3)) {
						cardMount = createCard(item.nome, item.desc, item.link, item.img, "Empreendedor digital");
    	                bloco = document.getElementById("tab-process-empreendedor");
    	                bloco.append(cardMount);
    	            } else if(item.nivel.includes(4)) {
						cardMount = createCard(item.nome, item.desc, item.link, item.img, "Inovador digital");
						bloco = document.getElementById("tab-process-inovador");
    	                bloco.append(cardMount);
					}
			}
			if(item.categoria === "Vendas e atendimento"){
					if(item.nivel.includes(1)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, "Iniciante digital");
    	                bloco = document.getElementById("tab-sell-iniciante");
    	                bloco.append(cardMount);
    	            } else if(item.nivel.includes(2)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, "Aprendiz digital");
    	                bloco = document.getElementById("tab-sell-aprendiz");
    	                bloco.append(cardMount);
    	            } else if(item.nivel.includes(3)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, "Empreendedor digital");
    	                bloco = document.getElementById("tab-sell-empreendedor");
    	                bloco.append(cardMount);
    	            } else if(item.nivel.includes(3)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, "Inovador digital");
    	                bloco = document.getElementById("tab-sell-inovador");
    	                bloco.append(cardMount);
					}
			}
			if(item.categoria === "Presença digital"){
					if(item.nivel.includes(1)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, "Iniciante digital");
    	                bloco = document.getElementById("tab-digital-iniciante");
    	                bloco.append(cardMount);
    	            } else if(item.nivel.includes(2)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, "Aprendiz digital");
    	                bloco = document.getElementById("tab-digital-aprendiz");
    	                bloco.append(cardMount);
    	            } else if(item.nivel.includes(3)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, "Empreendedor digital");
    	                bloco = document.getElementById("tab-digital-empreendedor");
    	                bloco.append(cardMount);
    	            } else if(item.nivel.includes(4)) {
						cardMount = createCard(item.nome, item.desc, item.link, item.img, "Inovador digital");
						bloco = document.getElementById("tab-digital-inovador");
    	                bloco.append(cardMount);
					}
			}
			if(item.categoria === "Comunicação e marca"){
					if(item.nivel.includes(1)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, "Iniciante digital");
    	                bloco = document.querySelector("#tab-commmunication-iniciante");
    	                bloco.append(cardMount);
    	            } else if(item.nivel.includes(2)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, "Aprendiz digital");
    	                bloco = document.getElementById("tab-commmunication-aprendiz");
    	                bloco.append(cardMount);
    	            } else if(item.nivel.includes(3)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, "Empreendedor digital");
    	                bloco = document.getElementById("tab-commmunication-empreendedor");
    	                bloco.append(cardMount);
    	            } else if(item.nivel.includes(4)) {
						cardMount = createCard(item.nome, item.desc, item.link, item.img, "Inovador digital");
						bloco = document.getElementById("tab-commmunication-inovador");
    	                bloco.append(cardMount);
					}
			}
			if(item.categoria === "Finanças e pagamentos"){
					if(item.nivel.includes(1)) {
						cardMount = createCard(item.nome, item.desc, item.link, item.img, "Iniciante digital");
    	                bloco = document.getElementById("tab-finance-iniciante");
    	                bloco.append(cardMount);
    	            } else if(item.nivel.includes(2)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, "Aprendiz digital");
    	                bloco = document.getElementById("tab-finance-aprendiz");
    	                bloco.append(cardMount);
    	            } else if(item.nivel.includes(3)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, "Empreendedor digital");
    	                bloco = document.getElementById("tab-finance-empreendedor");
    	                bloco.append(cardMount);
    	            } else if(item.nivel.includes(4)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, "Inovador digital");
						bloco = document.getElementById("tab-finance-inovador");
    	                bloco.append(cardMount);
					}
			}
		});
	}
}

function generalResult(result) {
	const dataLevel = levels.filter((level) => level.id === result);
	return dataLevel;
}

function populateResultHero(hero){
	$levelTitle.append(hero.level);
	$levelText.append(hero.text);
	changeImageSrc(hero.img);
}

function setLevelTheme(i, level){
	level = level - 1
	for(let k = 0; k <= 3; k++) {
		if(level == k) {
			$levelTabOption[i].children[k].children[1].classList.add("active");
			$levelTabOption[i].children[k].children[0].classList.remove("invisible");
			$levelTabOption[i].children[k].children[0].classList.add("visible");
        } else {
			$levelTabOption[i].children[k].children[1].classList.remove("active");
			$levelTabOption[i].children[k].children[0].classList.remove("visible");
			$levelTabOption[i].children[k].children[0].classList.add("invisible");
		}
	}	
}

// Create a card //
function createCard(currentName, currentDesc, currentLink, currentImg, currentLevel) {
    const newCard = document.createElement("div");
    newCard.classList.add("card", "card-courses");
	newCard.innerHTML = `
        <div class="bg-brand d-flex justify-content-center pt-4 pb-2 m-3 mb-0 rounded-3">
			<span class="position-absolute badge-course-position translate-middle badge rounded-1 bg-badge-iniciante fw-normal text-end">${currentLevel}</span>
			<svg class="bi" width="40" height="40"><use xlink:href="#${currentImg}"/></svg>
		</div>
		<div class="card-body">
			<h6 class="card-title-course">${currentName}</h6>
		    <p class="card-text fw-light lh-sm text-break">${currentDesc}</p>
			<a href="#${currentLink}" class="btn-link">Veja mais</a>
		</div>`;
	return newCard;
}

// Function for theme //
function levelName(points){
    let results = 0;
	let req = [];
    results = points / 12 * 100;
    if(results <= 30){
        points = levels[0].id
		req = points
    } else if (results > 30 && results < 60) {
		points = levels[1].id
		req = points
    } else if (results > 59 && results <= 83) {
		points = levels[2].id
		req = points
    } else {
		points = levels[3].id
		req = points
    }
    return req;
}

// function change image
function changeImageSrc(newSrc){
    $levelImg.src = newSrc;
}

// ---- Effects Courses List ---- //

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

// ---- End Effects Couses Lists ---- //



//----------------------------------------------------------------------------------------------------------------------
//------------------------------------------ DATA ----------------------------------------------------------------------
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
// --------------------------------------------------------------------------------------------- //

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
// --------------------------------------------------------------------------------------------- //

const userDesc = [
	{
		category: "Processos e gestão",
		level: "Iniciante Digital",
		desc: "Aprenda a organizar, planejar e gerenciar seu negócio de maneira digital, com foco na estratégia de marketing digital.",
		lvl: 1,
	},
	{
		category: "Processos e gestão",
        level: "Aprendiz Digital",
        desc: "Continue a evoluir em sua jornada digital, focando em áreas específicas e explorando novos métodos de gestão.",
		lvl: 2,
	},
	{
		category: "Processos e gestão",
        level: "Empreendedor Digital",
        desc: "Utilize as ferramentas digitais para melhorar sua gestão, planejar e executar suas ações de maneira mais eficiente.",
		lvl: 3,
	},
	{
		category: "Processos e gestão",
        level: "Inovador Digital",
        desc: "Conheça as novas tecnologias e ferramentas digitais que estão mudando a maneira de gerenciar seu negócio, como o Google Analytics, o Microsoft Power BI e a plataforma de e-commerce.",
		lvl: 4,
	},
	{
		category: "Vendas e atendimento",
		level: "Iniciante Digital",
        desc: "Aprenda a gerenciar as vendas de maneira digital, utilizando ferramentas como o WooCommerce e o Magento.",
		lvl: 1,
	},
	{
		category: "Vendas e atendimento",
        level: "Aprendiz Digital",
        desc: "Continue a evoluir em seu negócio, explorando novos métodos de vendas e atendimento.",
		lvl: 2,
	},
	{
		category: "Vendas e atendimento",
        level: "Empreendedor Digital",
        desc: "Utilize as ferramentas digitais para melhorar sua gestão de vendas, planejar e executar suas ações de maneira mais eficiente.",
		lvl: 3,
	},
	{
		category: "Vendas e atendimento",
        level: "Inovador Digital",
        desc: "Conheça as novas tecnologias e ferramentas digitais que estão mudando a maneira de gerenciar seu negócio, como o Google Analytics, o Microsoft Power BI e a plataforma de e-commerce.",
		lvl: 4,
	},
	{
		category: "Presença digital",
		level: "Iniciante Digital",
        desc: "Aprenda a gerenciar a sua presença digital, utilizando ferramentas como o Google Analytics e o Facebook Ads.",
		lvl: 1,
	},
	{
		category: "Presença digital",
        level: "Aprendiz Digital",
        desc: "Continue a evoluir em seu negócio, explorando novos métodos de gerenciar a sua presença digital.",
		lvl: 2,
	},
	{
		category: "Presença digital",
        level: "Empreendedor Digital",
        desc: "Utilize as ferramentas digitais para melhorar sua gestão de presença digital, planejar e executar suas ações de maneira mais eficiente.",
		lvl: 3,
	},
	{
		category: "Presença digital",
        level: "Inovador Digital",
        desc: "Conheça as novas tecnologias e ferramentas digitais que estão mudando a maneira de gerenciar seu negócio, como o Google Analytics, o Microsoft Power BI e a plataforma de e-commerce.",
		lvl: 4,
	},
	{
		category: "Comunicação e marca",
		level: "Iniciante Digital",
        desc: "Aprenda a gerenciar a sua comunicação digital, utilizando ferramentas como o Google Analytics e o Facebook Ads.",
		lvl: 1,
	},
	{
		category: "Comunicação e marca",
        level: "Aprendiz Digital",
        desc: "Continue a evoluir em seu negócio, explorando novos métodos de gerenciar a sua comunicação digital.",
		lvl: 2,
	},
	{
		category: "Comunicação e marca",
        level: "Empreendedor Digital",
        desc: "Utilize as ferramentas digitais para melhorar sua gestão de comunicação digital, planejar e executar suas ações de maneira mais eficiente.",
		lvl: 3,
	},
	{
		category: "Comunicação e marca",
        level: "Inovador Digital",
        desc: "Conheça as novas tecnologias e ferramentas digitais que estão mudando a maneira de gerenciar seu negócio, como o Google Analytics, o Microsoft Power BI e a plataforma de e-commerce.",
		lvl: 4,
	},
	{
		category: "Finanças e pagamentos",
		level: "Iniciante Digital",
        desc: "Aprenda a gerenciar as suas finanças digitais, utilizando ferramentas como o Google Analytics e o Mint.",
		lvl: 1,
	},
	{
		category: "Finanças e pagamentos",
        level: "Aprendiz Digital",
        desc: "Continue a evoluir em seu negócio, explorando novos métodos de gerenciar as suas finanças digitais.",
		lvl: 2,
	},
	{
		category: "Finanças e pagamentos",
        level: "Empreendedor Digital",
        desc: "Utilize as ferramentas digitais para melhorar sua gestão de finanças, planejar e executar suas ações de maneira mais eficiente.",
		lvl: 3,
	},
	{
		category: "Finanças e pagamentos",
        level: "Inovador Digital",
        desc: "Conheça as novas tecnologias e ferramentas digitais que estão mudando a maneira de gerenciar seu negócio, como o Google Analytics, o Microsoft Power BI e a plataforma de e-commerce.",
		lvl: 4,
	}
]
// --------------------------------------------------------------------------------------------- //

const cursos = [
	{
		"categoria": "Comunicação e marca",
		"nome": "Luz, Câmera e Conversão",
		"desc": "Aprenda a criar vídeos que atraem e convertem clientes para o seu negócio.",
		"nivel": [1, 2, 3],
		"link": "https://sebraeplay.com.br/cursos/luz-camera-e-conversao"
	},
	{
		"categoria": "Comunicação e marca",
		"nome": "Sebraetec - Branding",
		"desc": "Desenvolva uma estratégia de branding personalizada para o seu negócio, garantindo que sua marca seja percebida de forma autêntica e relevante pelos seus clientes.",
		"nivel": [0],
		"link": "https://sebraetec.sebraemg.com.br/produto/branding/"
	},
	{
		"categoria": "Comunicação e marca",
		"nome": "DigitalBiz - Oficina O Texto Vendedor",
		"desc": "Descubra técnicas de escrita que mostram ao público o valor do seu negócio e aprenda a pensar legendas que geram interação, utilizar palavras-chave, escrever textos para anúncios e muito mais.",
		"nivel": [2, 3],
		"link": "https://movimentolab.sebraemg.com.br/digital-biz/o-texto-vendedor/"
	},
	{
		"categoria": "Comunicação e marca",
		"nome": "Sebraetec - Comunicação Visual – Crie Sua Marca",
		"desc": "Desenvolva uma identidade visual forte e profissional para sua marca com um especialista.",
		"nivel": [1, 2],
		"link": "https://sebraetec.sebraemg.com.br/produto/comunicacao-visual-identidade-visual-mais-combo-2/"
	},
	{
		"categoria": "Comunicação e marca",
		"nome": "Sebraetec - Branding + Identidade Visual",
		"desc": "Invista em branding e identidade visual para tornar sua empresa uma referência no mercado. Uma gestão eficaz da imagem da marca é fundamental para alcançar o sucesso. Com essa consultoria você vai criar e desenvolver conteúdos que expressem o verdadeiro propósito da sua marca.",
		"nivel": [2],
		"link": "https://sebraetec.sebraemg.com.br/produto/branding-identidade-visual/"
	},
	{
		"categoria": "Comunicação e marca",
		"nome": "Sebraetec - Comunicação Visual",
		"desc": "Aproveite a consultoria de Comunicação Visual e Identidade Visual para criar uma marca forte e alinhada com a personalidade do seu negócio. Fortaleça sua presença no mercado com uma comunicação visual que transmita seus valores e conquiste seus clientes.",
		"nivel": [2, 3],
		"link": "https://sebraetec.sebraemg.com.br/produto/comunicacao-visual-identidade-visual-mais/"
	},
	{
		"categoria": "Comunicação e marca",
		"nome": "Sebraetec - Impulsiona Conteúdos",
		"desc": "Capacite-se e comece a planejar e produzir conteúdos relevantes que vão engajar seu público-alvo e gerar um feedback contínuo e crescente.",
		"nivel": [2],
		"link": "https://sebraetec.sebraemg.com.br/produto/impulsiona-midias-sociais-planejamento-e-producao-de-conteudo-para-as-principais-midias-sociais/"
		
	},
	{
		"categoria": "Finanças e pagamentos",
		"nome": "Emissor de NF do Sebrae ",
		"desc": "Simplifique a emissão de notas fiscais eletrônicas para o seu negócio com esta ferramenta prática.",
		"nivel": [0],
		"link": "https://sebrae.com.br/sites/PortalSebrae/produtoseservicos/emissornfe"
	},
	{
		"categoria": "Finanças e pagamentos",
		"nome": "Consultoria Gestão Financeira",
		"desc": "Melhore o controle financeiro do seu negócio com consultoria especializada e personalizada.",
		"nivel": [0],
		"link": "https://sebraemg.com.br/consultoria/consultoria-gestao-financeira/"
	},
	{
		"categoria": "Finanças e pagamentos",
		"nome": "Atendimento Especializado em Finanças",
		"desc": "Receba orientações individuais e sob medida para compreender e otimizar a gestão financeira de seus negócios.",
		"nivel": [0],
		"link": ""
	},
	{
		"categoria": "Finanças e pagamentos",
		"nome": "MODELAÇÃO Finanças",
		"desc": "Programa gratuito, presencial, dinâmico, mão na massa e com foco em finanças O objetivo é trazer à tona pontos de oportunidades em finanças, resgatando aspectos que poderão ser aprofundados em uma continuidade. Utiliza ferramentas financeiras para identificar e impulsionar melhorias.",
		"nivel": [2],
		"link": "https://oferta.sebraemg.com.br/modelacao-sebrae"
	},
	{
		"categoria": "Não categorizado",
		"nome": "Curso de Introdução ao BIM",
		"desc": "Entenda como a Modelagem da Informação da Construção (BIM) pode transformar os processos da sua micro ou pequena empresa, com foco em mudanças tecnológicas e de gestão.",
		"nivel": [3],
		"link": ""
	},
	{
		"categoria": "Não categorizado",
		"nome": "Portal da Inovação",
		"desc": "Acesse a plataforma gratuita que foi criada para guiar empreendedores e gestores públicos em busca de soluções inovadoras desmistificando a ideia de que inovação é algo grandioso e tecnológico.",
		"nivel": [0],
		"link": "https://inovacaosebraeminas.com.br/"
	},
	{
		"categoria": "Não categorizado",
		"nome": "Prepara Gastronomia - Gestão Integrada",
		"desc": "Participe do programa que oferece consultorias de gestão e operação para melhorar os processos do seu negócio no segmento de alimentação fora do lar.",
		"nivel": [1, 2, 3],
		"link": ""
	},
	{
		"categoria": "Não categorizado",
		"nome": "Sebrae Play",
		"desc": "Acesse uma plataforma completa de capacitação empresarial, com conteúdos exclusivos e atualizados para aprimorar a gestão, vendas, marketing e outras áreas essenciais do seu negócio.",
		"nivel": [0],
		"link": "https://sebraeplay.com.br/"
	},
	{
		"categoria": "Não categorizado",
		"nome": "Bootcamp",
		"desc": "Participe de uma imersão dinâmica e intensa com foco em criatividade, inovação e experimentação. Utilizando métodos ágeis aplicados pelas empresas mais inovadoras do mundo,o curso oferece aprendizado prático, adaptado aos pequenos negócios.",
		"nivel": "0",
		"link": "https://serviobrasileirodeapoiosmicroepequenasempresasmg.twygoead.com/e/352710-curso-bootcamp-repositorio"
	},
	{
		"categoria": "Não categorizado",
		"nome": "Sebraeplay - Apresentações de Impacto",
		"desc": "Aprenda sobre os principais pontos que você deve se atentar ao desenvolver uma apresentação, desde a história que você quer contar, até o design dos slides.",
		"nivel": [0],
		"link": "https://sebraeplay.com.br/cursos/apresentacoes-de-impacto"
	},
	{
		"categoria": "Não categorizado",
		"nome": "Sebrae Connect",
		"desc": "Conecte-se com soluções plug and play das áreas de Finanças e pagamentos, Marketing Digital e Gestão de Operações e Processos e reduza tempo de esforço e custos.",
		"nivel": [2, 3, 4],
		"link": "https://connect.sebraemg.com.br/"
	},
	{
		"categoria": "Presença digital",
		"nome": "DigitalBiz - Oficina Gestão de Redes Sociais",
		"desc": "Aprenda a transformar suas redes sociais em poderosas aliadas para impulsionar o seu negócio na internet.",
		"nivel": [2, 3],
		"link": "https://movimentolab.sebraemg.com.br/digital-biz/gestao-de-redes-sociais/"
	},
	{
		"categoria": "Presença digital",
		"nome": "E-mail Marketing para sua Empresa",
		"desc": "Aprenda a criar e-mails de alto impacto, distribuí-los com as ferramentas certas, monitorar sua reputação como remetente, medir o sucesso dos envios e muito mais.",
		"nivel": [3],
		"link": "https://sebraeplay.com.br/cursos/e-mail-marketing-para-a-sua-empresa"
	},
	{
		"categoria": "Presença digital",
		"nome": "Planejamento de Marketing Digital",
		"desc": "Aprenda a como aproveitar as oportunidades do marketing digital para posicionar e destacar o seu negócio no ambiente on-line, com estratégias aplicáveis imediatamente.",
		"nivel": [2, 3],
		"link": "https://sebraeplay.com.br/cursos/planejamento-de-marketing-digital"
	},
	{
		"categoria": "Presença digital",
		"nome": "Consultoria em Marketing Digital",
		"desc": "Receba orientações individuais para entender e reavaliar suas estratégias de marketing digital e seu modelo de comunicação nas redes sociais.",
		"nivel": [0],
		"link": ""
	},
	{
		"categoria": "Presença digital",
		"nome": "Digital Biz - Oficina Instagram, Facebook e WhatsApp para negócios",
		"desc": "Aprenda a usar Instagram, Facebook e WhatsApp estrategicamente para impulsionar seus negócios.",
		"nivel": [1, 2],
		"link": "https://movimentolab.sebraemg.com.br/digital-biz/instagram-facebook-e-whatsapp-para-negocios/"
	},
	{
		"categoria": "Presença digital",
		"nome": "Digitalize ",
		"desc": "Participe de oficinas e atividades práticas, que vão te ensinar a implementar conhecimentos sobre digitalização de forma prática e eficaz nos seus negócios.",
		"nivel": [0],
		"link": "https://www.canva.com/design/DAGDPhE6uoQ/gnqnqq1OtmeakFjhrURR7Q/view?utm_content=DAGDPhE6uoQ&utm_campaign=designshare&utm_medium=link&utm_source=editor"
	},
	{
		"categoria": "Presença digital",
		"nome": "Facebook Day",
		"desc": "Descubra como potencializar sua presença e vendas no Facebook com estratégias práticas.",
		"nivel": [1, 2],
		"link": "https://sebraeplay.com.br/cursos/facebook-day"
	},
	{
		"categoria": "Presença digital",
		"nome": "Instagram Day",
		"desc": "Domine as ferramentas do Instagram para expandir seu alcance e atrair mais clientes.",
		"nivel": [1, 2],
		"link": "https://sebraeplay.com.br/cursos/instagram-day"
	},
	{
		"categoria": "Presença digital",
		"nome": "Sebraetec - Consultoria Omnichannel para Integração dos Canais de Vendas",
		"desc": "Aproveite a consultoria Omnichannel para integrar todos os seus canais de vendas, proporcionando uma experiência de compra mais fluida e eficiente para seus clientes, e impulsionando os resultados do seu negócio.",
		"nivel": [2, 3, 4],
		"link": "https://sebraetec.sebraemg.com.br/produto/consultoria-omnichannel-para-integracao-dos-canais-de-vendas/"
	},
	{
		"categoria": "Presença digital",
		"nome": "Sebraetec - Consultoria para Growth Hacking",
		"desc": "Descubra novas maneiras de pensar sobre a gestão da sua empresa e aprenda a criar planos de ação eficazes para a divulgação e comercialização dos seus produtos e serviços nos canais on-line. Potencialize sua presença digital e alcance mais clientes!",
		"nivel": [3, 4],
		"link": "https://sebraetec.sebraemg.com.br/produto/consultoria-para-growth-hacking/"
	},
	{
		"categoria": "Presença digital",
		"nome": "Sebraetec - Implantação de Loja Virtual - Diagnóstico de Avaliação",
		"desc": "Participe do diagnóstico de avaliação para a implantação de uma loja virtual e descubra como otimizar sua presença on-line. Receba orientações personalizadas para criar uma loja que atraia clientes e potencialize suas vendas no ambiente digital.",
		"nivel": [3, 4],
		"link": "https://sebraetec.sebraemg.com.br/produto/implantacao-de-loja-virtual-diagnostico-de-avaliacao/"
	},
	{
		"categoria": "Presença digital",
		"nome": "Sebraetec - Implantação de Loja Virtual - Plus",
		"desc": "Participe do processo de implantação da sua loja virtual e receba todo o suporte necessário para estabelecer uma presença on-line de sucesso. Transforme seu negócio e alcance novos clientes no ambiente digital.",
		"nivel": [3, 4],
		"link": "https://sebraetec.sebraemg.com.br/produto/implantacao-de-loja-virtual/"
	},
	{
		"categoria": "Presença digital",
		"nome": "Inserção Digital – Desenvolvimento de Website – Pocket",
		"desc": "Melhore a sua rede de relacionamentos e aumente as possibilidades de alcance e interação com o seu público. Esta consultoria vai te ajudar a estabelecer a sua presença digital de forma profissional e eficiente.",
		"nivel": [2, 3],
		"link": "https://sebraetec.sebraemg.com.br/produto/insercao-digital-desenvolvimento-de-website-mais/"
	},
	{
		"categoria": "Presença digital",
		"nome": "Sebraetec - Inserção Digital – Desenvolvimento de Website – Plus",
		"desc": "Construa a presença digital da sua empresa com um website profissional, totalmente personalizado para as suas necessidades. Aumente sua visibilidade online e atraia mais clientes com essa solução completa de inserção digital.",
		"nivel": [2, 3],
		"link": "https://sebraetec.sebraemg.com.br/produto/insercao-digital-desenvolvimento-de-website/"
	},
	{
		"categoria": "Presença digital",
		"nome": "Sebraetec - Planejamento para Busca Orgânica – SEO",
		"desc": "Receba orientação especializada e aprenda a otimizar seu site para atrair mais visitantes. Descubra estratégias eficazes de SEO que vão ajudar seu negócio a se destacar nos resultados de busca e conquistar mais clientes.",
		"nivel": [3, 4],
		"link": "https://sebraetec.sebraemg.com.br/produto/planejamento-para-busca-organica-seo/"
	},
	{
		"categoria": "Presença digital",
		"nome": "Sebraetec - Planejamento para Presença digital e Links Patrocinados",
		"desc": "Receba orientação especializada para planejar e otimizar campanhas de tráfego on-line, garantindo visibilidade assertiva para o público-alvo. Inclui estratégias para redes sociais, links patrocinados e outras mídias digitais.",
		"nivel": [3, 4],
		"link": "https://sebraetec.sebraemg.com.br/produto/planejamento-para-presenca-digital-e-links-patrocinados/"
	},
	{
		"categoria": "Presença digital",
		"nome": "Se Joga no Online",
		"desc": "Participe da nossa parceria com o Mercado Livre e descubra como vender seus produtos em uma das maiores plataformas de e-commerce. Receba orientações para otimizar suas vendas on-line e alcance mais clientes, aproveitando todo o potencial do marketplace.",
		"nivel": [3],
		"link": "https://sebrae.com.br/sites/PortalSebrae/parceriamercadolivre"
	},
	{
		"categoria": "Presença digital",
		"nome": "Reload",
		"desc": "Participe do maior evento de Marketing Digital do Sebrae. Ele é para quem quer se atualizar, inspirar, pensar fora da caixa, alavancar seu negócio e se destacar no mundo digital.",
		"nivel": [0],
		"link": "https://reload.sebrae.com.br/"
	},
	{
		"categoria": "Presença digital",
		"nome": "Sebraetec - Acelera Digital - Estratégia e Canais de Mkt Digital",
		"desc": "Destaque sua empresa no mercado e conquiste novos públicos com uma presença digital forte, ganhando visibilidade e conectando-se com seu público nas redes sociais.",
		"nivel": [1, 2],
		"link": "https://sebraetec.sebraemg.com.br/produto/acelera-digital/"
	},
	{
		"categoria": "Presença digital",
		"nome": "Atendimento Especializado em Marketing Digital",
		"desc": "Desenvolva suas mídias digitais para criar conteúdos estratégicos que fortaleçam a comunicação do seu negócio. Aprenda a conectar-se melhor com seu público e a gerar impacto por meio de uma presença digital mais eficiente",
		"nivel": [0],
		"link": ""
	},
	{
		"categoria": "Presença digital",
		"nome": "Desenvolvimento de Mídias Digitais de Comunicação – Plus",
		"desc": "Desenvolva suas mídias digitais e aprenda a criar conteúdos que conectem seu negócio ao público certo. Otimize sua comunicação e fortaleça sua presença digital com estratégias que geram resultados",
		"nivel": [2, 3],
		"link": "https://sebraetec.sebraemg.com.br/produto/desenvolvimento-de-midias-digitais-de-comunicacao/"
	},
	{
		"categoria": "Presença digital",
		"nome": "Desenvolvimento de Mídias Digitais de Comunicação – Pocket",
		"desc": "Desenvolva suas mídias digitais para criar conteúdos estratégicos que fortaleçam a comunicação do seu negócio. Aprenda a conectar-se melhor com seu público e a gerar impacto por meio de uma presença digital mais eficiente",
		"nivel": [2, 3],
		"link": "https://sebraetec.sebraemg.com.br/produto/desenvolvimento-de-midias-digitais-de-comunicacao-mais/"
	},
	{
		"categoria": "Presença digital",
		"nome": "Comportamento do consumidor digital",
		"desc": "Entenda o comportamento do consumidor digital e aprenda a adaptar suas estratégias para atrair e engajar clientes no ambiente online.",
		"nivel": [2, 3],
		"link": "https://sebraeplay.com.br/cursos/comportamento-do-consumidor-digital"
	},
	{
		"categoria": "Processos e gestão",
		"nome": "ALI ",
		"desc": "Receba acompanhamento especializado para implementar inovações no seu negócio e melhorar sua competitividade. Com o apoio do Agente Local de Inovação,você poderá desenvolver soluções criativas e eficientes para crescer no mercado.",
		"nivel": [2, 3],
		"link": "https://sebrae.com.br/sites/PortalSebrae/agentelocaldeinovacao"
	},
	{
		"categoria": "Processos e gestão",
		"nome": "Consultoria FOCUS",
		"desc": "Acesse a plataforma FOCUS e melhore os resultados da sua empresa. Gerencie indicadores de desempenho e compare sua performance com a média de outras empresas do mesmo setor para identificar oportunidades de crescimento.",
		"nivel": [2, 3],
		"link": "https://focus.sebraemg.com.br/#/"
	},
	{
		"categoria": "Processos e gestão",
		"nome": "Consultoria Gestão Competitiva para o Varejo",
		"desc": "Participe de consultoria especializada que vai ajudá-lo a implantar um sistema de gestão por resultados e criar planos de ação focados na melhoria dos Fatores Críticos de Sucesso da sua empresa.",
		"nivel": [2, 3],
		"link": ""
	},
	{
		"categoria": "Processos e gestão",
		"nome": "Sebraetec - Adequação à Lei Geral de Proteção de Dados Pessoais (LGPD)",
		"desc": "Receba consultoria especializada para adequar sua empresa à Lei Geral de Proteção de Dados (LGPD). Garanta a conformidade legal e proteja as informações dos seus clientes, assegurando mais confiança e segurança para o seu negócio.",
		"nivel": [2, 3, 4],
		"link": "https://sebraetec.sebraemg.com.br/produto/adequacao-a-lei-geral-de-protecao-de-dados-pessoais-lgpd/"
	},
	{
		"categoria": "Processos e gestão",
		"nome": "Sebraetec - Eficiência nos Processos Empresariais",
		"desc": "Aproveite a consultoria especializada para otimizar e controlar os processos da sua empresa, aumentando a eficiência operacional e garantindo resultados mais consistentes e assertivos.",
		"nivel": [2, 3],
		"link": "https://sebraetec.sebraemg.com.br/produto/eficiencia-nos-processos-empresariais/"
	},
	{
		"categoria": "Processos e gestão",
		"nome": "Sebraetec - Organização e Controle de Estoque",
		"desc": "Receba consultoria especializada para implementar um sistema eficiente de organização e controle de estoque, reduzindo custos, otimizando recursos e melhorando a gestão do seu negócio.",
		"nivel": [2, 3],
		"link": "https://sebraetec.sebraemg.com.br/produto/organizacao-e-controle-de-estoque/"
	},
	{
		"categoria": "Processos e gestão",
		"nome": "Educampo",
		"desc": "Obtenha projeções, cenários e análises integradas para apoiar o planejamento e a tomada de decisões no seu negócio e em toda a cadeia produtiva, garantindo mais eficiência e evolução.",
		"nivel": [0],
		"link": "https://sebrae.com.br/sites/PortalSebrae/ufs/mg/sebraeaz/educampo-mg"
	},
	{
		"categoria": "Processos e gestão",
		"nome": "PNBOX",
		"desc": "Utilize nossa plataforma digital para elaborar o seu plano de negócios. Com 14 ferramentas disponíveis, você pode usá-las como e onde quiser. Construa um plano completo ou utilize apenas o que precisa no seu momento atual.",
		"nivel": [0],
		"link": "https://pnbox.sebrae.com.br/"
	},
	{
		"categoria": "Processos e gestão",
		"nome": "Consultoria Modelagem de Negócio",
		"desc": "Acesse uma ampla variedade de ferramentas e metodologias, defina suas prioridades e objetivos e desenvolva um plano de ação estratégico.",
		"nivel": [0],
		"link": "https://sebraemg.com.br/produto/consultoria-especializada-em-modelagem-de-negocios/"
	},
	{
		"categoria": "Processos e gestão",
		"nome": "Gestão de KPI na Prática",
		"desc": "Aprenda a analisar criticamente os Fatores Críticos de Sucesso (FCS) do seu negócio, identificar falhas nos processos e criar estratégias para melhorar seus indicadores de desempenho (KPI).",
		"nivel": [2],
		"link": ""
	},
	{
		"categoria": "Vendas e atendimento",
		"nome": "DigitalBiz - Oficina Funil de Vendas",
		"desc": "Aprenda a criar um funil para atrair, engajar e acompanhar seus potenciais clientes em cada etapa dessa jornada. Desde despertar o interesse até a efetivação da compra.",
		"nivel": [2, 3],
		"link": "https://movimentolab.sebraemg.com.br/digital-biz/funil-de-vendas/"
	},
	{
		"categoria": "Vendas e atendimento",
		"nome": "DigitalBiz - Oficina Posts que Vendem",
		"desc": "Aprenda a transformar suas redes sociais em poderosas aliadas para impulsionar sua empresa na internet.",
		"nivel": [2, 3],
		"link": "https://movimentolab.sebraemg.com.br/digital-biz/posts-que-vendem/"
	},
	{
		"categoria": "Vendas e atendimento",
		"nome": "Planejamento e Preparação para Comercialização em Marketplace",
		"desc": "Receba orientação especializada para planejar e preparar a comercialização dos seus produtos em marketplaces. Aumente suas vendas ao aproveitar as oportunidades que essas plataformas oferecem para expandir o alcance do seu negócio.",
		"nivel": [2, 3],
		"link": "https://sebraetec.sebraemg.com.br/produto/planejamento-e-preparacao-para-comercializacao-em-marketplace/"
	},
	{
		"categoria": "Vendas e atendimento",
		"nome": "Sebraetec - Implantação ou Adequação na Operação do Delivery",
		"desc": "Invista na implementação de melhorias no seu serviço de delivery e garanta otimização na gestão e operação de pedidos, preparação e entregas, assim como mais agilidade em cada etapa.",
		"nivel": [2, 3],
		"link": "https://sebraetec.sebraemg.com.br/produto/implementacao-ou-adequacao-da-operacao-de-delivery-2/"
	},
	{
		"categoria": "Vendas e atendimento",
		"nome": "Sebraetec - Impulsiona Vendas",
		"desc": "Acesse as estratégias e ferramentas mais utilizadas e eficientes para automatizar a interação nas suas lojas virtuais, melhorando sua presença on-line e aumentando suas chances de sucesso.",
		"nivel": [2, 3],
		"link": "https://sebraetec.sebraemg.com.br/produto/impulsiona-vendas-online-foco-prioritario-nas-vendas-pelas-midias-sociais-social-shopping/"
	},
	{
		"categoria": "Vendas e atendimento",
		"nome": "Caminhos da Moda",
		"desc": "Acesse a plataforma on-line do Sebrae que conecta indústrias de moda a lojistas por meio do cadastro de seus produtos e serviços, facilitando contato e vendas na cadeia produtiva do segmento e apresentando Minas para o Brasil.",
		"nivel": [3, 4],
		"link": "https://caminhosdamoda.sebraemg.com.br/"
	},
	{
		"categoria": "Vendas e atendimento",
		"nome": "MODELAÇÃO Mercado",
		"desc": "Participe do programa de Modelagem de Negócios do Sebrae e aprenda a estruturar e desenvolver o seu modelo de negócio de forma estratégica, aumentando suas chances de sucesso no mercado.",
		"nivel": [2],
		"link": "https://oferta.sebraemg.com.br/modelacao-sebrae"
	},
	{
		"categoria": "Vendas e atendimento",
		"nome": "Rotas para o mercado ",
		"desc": "Conquiste novos mercados e aumente suas vendas com a estratégia Rotas para o Mercado. Defina canais, melhore processos de vendas e implemente ações práticas para otimizar seus resultados.",
		"nivel": [0],
		"link": ""
	}
]