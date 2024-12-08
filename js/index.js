$('#formControlCidade').select2({
	placeholder: 'Selecione sua cidade',
	language: 'pt-BR'
});

document.querySelector(".select2-container").classList.add("form-select")


let $questoes = {}
let $niveis = {}
let $desc = {}
let $cursos = {}


fetch('js/dados.json')
.then(response => response.json())
.then(data => {
	$questoes = data.questions
	$niveis = data.levels
	$desc = data.userDesc
	$cursos = data.cursos
	}
)

fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
.then(response => response.json())
.then(data => {
    data.forEach(state => {
        $stateSelect.append(new Option(state.nome, state.sigla));
    });
});

// Variaveis globais
const $startPage = document.querySelector(".start");
const $testPage = document.querySelector(".questions");
const $resultPage = document.querySelector(".results");
const $headerSection = document.querySelector("header");
const $footerSection = document.querySelector("footer");
// Variaveis página de inicio
const $startGameButton = document.querySelector(".start-test");
// Variaveis página de teste
const $questionsContainer = document.querySelector(".question-core");
const $questionsParentContainer = document.querySelector(".question-container");
const $answersContainer = document.querySelector(".answers-container");
const $questionText = document.querySelector(".question-text");
const $backQuestionButton = document.querySelector(".back");

let $actualCatgory = document.querySelector(".question-text");
let currentQuestionIndex = 0;
let totalPoints = 0;
let pointActualAnswer = 0;
let pointLastAnswer = 0;
let categoryLastAnswer = "";
let actualAnswer = "";
let actualAnswerIndex = 0;
let actualAnswerCategory = "";
let pointsCategory = [{category: "Processos e gestão", points: 0, percent: 0, level: 0, levelName: "", desc: ""},{category: "Vendas e atendimento", points: 0, percent: 0, level: 0, levelName: "", desc: ""},{category: "Presença digital", points: 0, percent: 0, level: 0, levelName: "", desc: ""},{category: "Comunicação e marca", points:0, percent: 0, level: 0, levelName: "", desc: ""},{category: "Finanças e pagamentos", points: 0, percent: 0, level: 0, levelName: "", desc: ""}];
let pointsGeneral = {}
let $stateSelect = document.querySelector("#formControlUF")
// Variaveis página de resultados => Hero
const $resultHero = document.querySelector(".resultsHero");
const $levelTitle = document.querySelector(".level-title");
const $levelText = document.querySelector(".resultsHero .level-text");
const $levelImg = document.querySelector(".img-level-hero");
const $btnTrail = document.querySelector("#btn-level");
// Variaveis página de resultados => progress bar
const $resultBars = document.querySelectorAll(".progress-bar");
const $levelNumberBar = document.querySelectorAll(".level-theme");
const $levelTitleBar = document.querySelectorAll(".level-theme-title");
// Variaveis página de resultados => nível do usuário por tema
const $userCategoryLevel = document.querySelectorAll(".userLevelTheme");
const $levelTabOption = document.querySelectorAll(".tab-courses ul.nav");
const $levelTabContent = document.querySelectorAll(".tab-content");
// variaveis página de resultados => lista de cursos por usuário
const $tbProIni = document.querySelector("#tab-process-iniciante");
const $tbProApr = document.querySelector("#tab-process-aprendiz");
const $tbProEmp = document.querySelector("#tab-process-empreendedor");
const $tbProIno = document.querySelector("#tab-process-inovador");
const $tbVenIni = document.querySelector("#tab-sell-iniciante");
const $tbVenApr = document.querySelector("#tab-sell-aprendiz");
const $tbVenEmp = document.querySelector("#tab-sell-empreendedor");
const $tbVenIno = document.querySelector("#tab-sell-inovador");
const $tbDigIni = document.querySelector("#tab-digital-iniciante");
const $tbDigApr = document.querySelector("#tab-digital-aprendiz");
const $tbDigEmp = document.querySelector("#tab-digital-empreendedor");
const $tbDigIno = document.querySelector("#tab-digital-inovador");
const $tbComIni = document.querySelector("#tab-communication-iniciante");
const $tbComApr = document.querySelector("#tab-communication-aprendiz");
const $tbComEmp = document.querySelector("#tab-communication-empreendedor");
const $tbComIno = document.querySelector("#tab-communication-inovador");
const $tbFinIni = document.querySelector("#tab-finance-iniciante");
const $tbFinApr = document.querySelector("#tab-finance-aprendiz");
const $tbFinEmp = document.querySelector("#tab-finance-empreendedor");
const $tbFinIno = document.querySelector("#tab-finance-inovador");
// Variaveis página de resultados => dados de resultados
let $dataUser = [];
let data;



// -------   Página de inicio   ------ //
// Função para validar o formulário
function formValidate(){
	'use strict';
	
	const forms = document.querySelectorAll('.needs-validation');
	Array.from(forms).forEach(form => {
		form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
				console.log("Formulário inválido!")
            } 
			form.classList.add('was-validated');
			if(form.checkValidity()){
				console.log("Formulário válido!")
				event.preventDefault();
				event.stopPropagation();
				startGame();
				getDataUser();
			}
        }, false ); 
    });
	
};
// Função para iniciar o jogo //
function startGame(){
	$startPage.classList.add("hide");
    $testPage.classList.remove("hide");
	window.scrollTo(0, 0);
	$headerSection.classList.add("hide");
	$footerSection.classList.add("hide");
    displayNextQuestion();

}
// Função para guardar os dados do usuário //
function getDataUser(){
	$dataUser.push({
		"user": {
			"nome": document.getElementById('formControlNome').value,
    		"empresa": document.getElementById('formControlEmpresa').value,
    		"email": document.getElementById('formControlEmail').value,
    		"whatsapp": document.getElementById('formControlWhats').value,
    		"estado": document.getElementById('formControlUF').value,
    		"cidade": document.getElementById('formControlCidade').value,
    		//"receberEmail": marker
		}
	})
}

function getCities(){
	const state = $stateSelect.value;
	const cities = document.getElementById('formControlCidade')

	cities.length = 0
	cities.appendChild(new Option("Selecione sua cidade"))

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios?orderBy=nome`)
    .then(response => response.json())
    .then(data => {
        data.forEach(city => {
            cities.append(new Option(city.nome, city.nome));
        });
    });
}

// Função de busca no campo Select de cidades
$stateSelect.addEventListener("change", getCities);

// -------   Página de Nível de Maturidade   ------ //
// Função para limpar o estado das questões e respostas //
function resetState(){
    while($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild);
    } 
}
// Função para mostrar as questões e respostas //
function displayNextQuestion(){
    resetState();    

    if($questoes.length === currentQuestionIndex){
		getQuestionData(actualQuestion, actualAnswer, actualAnswerCategory, pointActualAnswer);
        return finishTest();
    }
	if(currentQuestionIndex === 0){
		$backQuestionButton.classList.add("hide");
	} else {
		$backQuestionButton.classList.remove("hide");
	}
    $questionText.textContent = $questoes[currentQuestionIndex].question;
    $questionText.dataset.category = $questoes[currentQuestionIndex].category;
    
    $questoes[currentQuestionIndex].answers.forEach(answer => {
        const newAnswer = document.createElement("button");
        newAnswer.classList.add("btn", "btn-question-sebrae", "my-2", "justify-content-left", "swing-in-top-fwd", "animaDelay-01");
        newAnswer.textContent = answer.text;
        newAnswer.dataset.weight = answer.point;
        newAnswer.dataset.category = $questoes[currentQuestionIndex].category;

        $answersContainer.appendChild(newAnswer);
        newAnswer.addEventListener("click", selectAnswer)
    })
	document.querySelectorAll(".btn-question-sebrae").classList.remove("btn-hover");
}
// Função para selecionar a resposta //
function selectAnswer(event){
    const selectionClicked = event.target;
    const $answerSelection = document.querySelector(".btn-hover");
    if($answerSelection){
        $answerSelection.classList.remove("btn-hover");
    }
    selectionClicked.classList.add("btn-hover");
	actualQuestion = $questionText.innerText;
    actualAnswer = selectionClicked.innerText;
    actualAnswerCategory = selectionClicked.dataset.category;
    pointActualAnswer = parseInt(selectionClicked.dataset.weight);
	
	calcPoints();
	if(currentQuestionIndex < $questoes.length){
		getQuestionData(actualQuestion, actualAnswer, actualAnswerCategory, pointActualAnswer, currentQuestionIndex);
	}
}
// Função que calcula os pontos //
function calcPoints(){  
    pointsCategory.filter((categoria) => categoria.category === $actualCatgory.dataset.category).map((ponto) => ponto.points += pointActualAnswer)
    currentQuestionIndex++;
    displayNextQuestion();
}
// Função que preenche os resultados de cada questão //
function getQuestionData(question, answer, category, points, index){
	$dataUser.push({
		"question": {
			"categoria": category,
			"questao": question,
			"resposta": answer,
			"pontos": points
		}
	})
}

// Função que volta a pergunta anterior //
function backQuestion(){
    let back = $dataUser.pop();
	pointsCategory.filter((categoria) => categoria.category === back.categoria).map((ponto) => ponto.points -= back.pontos)
	currentQuestionIndex--;
    displayNextQuestion();
}

// --------   Página de Resultados   ------ //
// Função que finaliza o teste e prepara a página de resultados //
function finishTest(){
    $testPage.classList.add("hide");
    $resultPage.classList.remove("hide");
	$headerSection.classList.remove("hide");
	$footerSection.classList.remove("hide");
	window.scrollTo(0, 0);
    
	// Calcula o total de pontos do usuário
	totalPoints = pointsCategory.reduce((acc, point) => acc + point.points, 0);
	
    
	//Calcula o nível de maturidade e preenche o texto do resultado geral
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
		point.percent = Math.round( (point.points / 12 * 100) )
		point.level = levelName(point.points)
		point.levelName = $niveis[point.level - 1].level
		point.desc = $niveis[point.level - 1].text
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
		$userCategoryLevel[j].nextElementSibling.textContent = $desc
			.filter((item) => item.lvl == pointsCategory[j].level && item.category === pointsCategory[j].category)
			.map((desc) => desc.desc);
		setLevelTheme(j, pointsCategory[j].level);
	}

	//Cria e popula os cards de cursos por categoria
	if (document.readyState !== "loading") {
		$cursos.forEach((item)  => {		
			let cardMount = "";
			if(item.categoria === "Processos e gestão"){ 
					if(item.nivel.includes(1) || item.nivel.includes(0)) {
						cardMount = createCard(item.nome, item.desc, item.link, item.img, item.extra, "Iniciante digital");
						$tbProIni.append(cardMount);
    	        	} 
					if(item.nivel.includes(2) || item.nivel.includes(0)) {
    	            	cardMount = createCard(item.nome, item.desc, item.link, item.img, item.extra, "Aprendiz digital");
						$tbProApr.append(cardMount);
					} 
					if(item.nivel.includes(3) || item.nivel.includes(0)) {
						cardMount = createCard(item.nome, item.desc, item.link, item.img, item.extra, "Empreendedor digital");
    	                $tbProEmp.append(cardMount);
    	            }
					if(item.nivel.includes(4) || item.nivel.includes(0)) {
						cardMount = createCard(item.nome, item.desc, item.link, item.img, item.extra, "Inovador digital");
						$tbProIno.append(cardMount);
					}
			}
			if(item.categoria === "Vendas e atendimento"){
					if(item.nivel.includes(1) || item.nivel.includes(0)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, item.extra, "Iniciante digital");
    	                $tbVenIni.append(cardMount);
    	            }
					if(item.nivel.includes(2) || item.nivel.includes(0)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, item.extra, "Aprendiz digital");
    	                $tbVenApr.append(cardMount);
    	            }
					if(item.nivel.includes(3) || item.nivel.includes(0)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, item.extra, "Empreendedor digital");
    	                $tbVenEmp.append(cardMount);
    	            }
					if(item.nivel.includes(3) || item.nivel.includes(0)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, item.extra, "Inovador digital");
    	                $tbVenIno.append(cardMount);
					}
			}
			if(item.categoria === "Presença digital"){
					if(item.nivel.includes(1) || item.nivel.includes(0)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, item.extra, "Iniciante digital");
    	                $tbDigIni.append(cardMount);
    	            }
					if(item.nivel.includes(2) || item.nivel.includes(0)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, item.extra, "Aprendiz digital");
    	                $tbDigApr.append(cardMount);
    	            }
					if(item.nivel.includes(3) || item.nivel.includes(0)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, item.extra, "Empreendedor digital");
    	                $tbDigEmp.append(cardMount);
    	            }
					if(item.nivel.includes(4) || item.nivel.includes(0)) {
						cardMount = createCard(item.nome, item.desc, item.link, item.img, item.extra, "Inovador digital");
						$tbDigIno.append(cardMount);
					}
			}
			if(item.categoria === "Comunicação e marca"){
					if(item.nivel.includes(1) || item.nivel.includes(0)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, item.extra, "Iniciante digital");
    	                $tbComIni.appendChild(cardMount);
    	            }
					if(item.nivel.includes(2) || item.nivel.includes(0)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, item.extra, "Aprendiz digital");
    	                $tbComApr.append(cardMount);
    	            }
					if(item.nivel.includes(3) || item.nivel.includes(0)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, item.extra, "Empreendedor digital");
    	                $tbComEmp.append(cardMount);
    	            }
					if(item.nivel.includes(4) || item.nivel.includes(0)) {
						cardMount = createCard(item.nome, item.desc, item.link, item.img, item.extra, "Inovador digital");
						$tbComIno.append(cardMount);
					}
			}
			if(item.categoria === "Finanças e pagamentos"){
					if(item.nivel.includes(1) || item.nivel.includes(0)) {
						cardMount = createCard(item.nome, item.desc, item.link, item.img, item.extra, "Iniciante digital");
    	                $tbFinIni.append(cardMount);
    	            }
					if(item.nivel.includes(2) || item.nivel.includes(0)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, item.extra, "Aprendiz digital");
    	                $tbFinApr.append(cardMount);
    	            }
					if(item.nivel.includes(3) || item.nivel.includes(0)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, item.extra, "Empreendedor digital");
    	                $tbFinEmp.append(cardMount);
    	            }
					if(item.nivel.includes(4) || item.nivel.includes(0)) {
    	                cardMount = createCard(item.nome, item.desc, item.link, item.img, item.extra, "Inovador digital");
						$tbFinIno.append(cardMount);
					}
			}
		});
		if (document.readyState !== "loading") {
			scrollCourses();
		} else {
		  document.addEventListener("DOMContentLoaded", scrollCourses);
		}
	}
	
	$dataUser.push({
		level: {
			nivel: pointsGeneral[0].level,
			pontosTotais: totalPoints,
			processo_nivel: pointsCategory[0].levelName,
			processo_pontos: pointsCategory[0].points,
			vendas_nivel: pointsCategory[1].levelName,
			vendas_pontos: pointsCategory[1].points,
			presenca_nivel: pointsCategory[2].levelName,
			presenca_pontos: pointsCategory[2].points,
			comunicacao_nivel: pointsCategory[3].levelName,
			comunicacao_pontos: pointsCategory[3].points,
			financas_nivel: pointsCategory[4].levelName,
			financas_pontos: pointsCategory[4].points,
		}
	})

	dataSave($dataUser)
}
// Função que retorna o resultado geral do teste //
function generalResult(result) {
	const dataLevel = $niveis.filter((level) => level.id === result);
	dataLevel.map(item => { dataLevel[0].points = totalPoints });
	return dataLevel;
}
// Função que calcula os pontos de cada tema e retorna seus nomes //
function levelName(points){
    let results = 0;
	let req = [];
    results = points / 12 * 100;
    if(results <= 30){
        points = $niveis[0].id
		req = points
    } else if (results > 30 && results < 60) {
		points = $niveis[1].id
		req = points
    } else if (results > 59 && results <= 83) {
		points = $niveis[2].id
		req = points
    } else {
		points = $niveis[3].id
		req = points
    }
    return req;
}
//Função que popula o Hero de resultados //
function populateResultHero(hero){
	$levelTitle.append(hero.level);
	$levelText.append(hero.text);
	changeImageSrc(hero.img);
	$btnTrail.textContent = hero.level;
	$btnTrail.parentElement.setAttribute('href', hero.link);
}
// Função que popula o nível do usuário por tema //
function setLevelTheme(i, level){
	level = level - 1
	for(let k = 0; k <= 3; k++) {
		if(level == k) {
			
			$levelTabOption[i].children[k].children[1].classList.add("active", "show");
			$levelTabOption[i].children[k].children[0].classList.remove("invisible");
			$levelTabOption[i].children[k].children[0].classList.add("visible");
			$levelTabContent[i].children[k].classList.add("active", "show");
        } else {
			
			$levelTabOption[i].children[k].children[1].classList.remove("active", "show");
			$levelTabOption[i].children[k].children[0].classList.remove("visible");
			$levelTabOption[i].children[k].children[0].classList.add("invisible");
			$levelTabContent[i].children[k].classList.remove("active", "show");
		}
	}	
}
// Função para criar os cards de cursos //
function createCard(currentName, currentDesc, currentLink, currentImg, extraCategory, currentLevel){ 
    let setBg = "bg-brand";
	if(currentImg === "") currentImg = "default-course-icon";
	if(extraCategory === ""){
		setBg = "bg-brand";
	}
	if(extraCategory === "agro") {
		setBg = "bg-agro";
	}
	if(extraCategory === "food") {
        setBg = "bg-food";
    }
	if(extraCategory === "civil") {
        setBg = "bg-civil";
    }
	if(currentLink === "") currentLink = "#sebrae-units";
	
	const newCard = document.createElement("div");
    newCard.classList.add("card", "card-courses");
	newCard.innerHTML = `
        <div class="${setBg} d-flex justify-content-center pt-4 pb-2 m-3 mb-0 rounded-3">
			<span class="position-absolute badge-course-position translate-middle badge rounded-1 bg-badge-iniciante fw-normal text-end">${currentLevel}</span>
			<svg class="bi" width="40" height="40"><use xlink:href="#${currentImg}"/></svg>
		</div>
		<div class="card-body">
			<h6 class="card-title-course">${currentName}</h6>
		    <p class="card-text fw-light lh-sm text-break">${currentDesc}</p>
			<a href="${currentLink}" class="btn-link stretched-link" target="_blank">Veja mais</a>
		</div>`;
	return newCard;
}
// Função que altera a imagem do Hero //
function changeImageSrc(newSrc){
    $levelImg.src = newSrc;
}

// ------ Funções auxiliares para funcionamento da aplicação ------ //
// Função para criar a mascara de telefone do form //
const $telMask = document.getElementById('formControlWhats');
$telMask.addEventListener('input', function (event) {
    const target = event.target;
    target.value = target.value.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
});
// Função para validar e-mail do form //
const isValidEmail = (email) => {
	const regex =
	  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return regex.test(String(email).toLowerCase())
}
// Função popula dados de uso do usuario //

// Funções de efeito de Scroll na lista de cursos //
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

// Função para salvar dados no banco
function dataSave(data){
	fetch('./processar_quiz.php' , {
		method: 'POST',
		headers: {
            'Content-Type': 'application/json; charset=utf8', // Define o tipo de dados que será enviado
        },
        body: JSON.stringify(data),  // Envia os dados no formato JSON
	})
	.then(response => response.text())
	.then(result => {
		if (result === '{"success":true}') {
			alert('Dados enviados com sucesso!');
		} else {
			alert('Ocorreu um erro ao enviar os dados.');
		}
	})
	.catch(error => {
		console.error('Erro:', error);
		alert('Erro na requisição.');
	});
}

// ------ Eventos de escuta ------ //
$startGameButton.addEventListener("click", formValidate);
$backQuestionButton.addEventListener("click", backQuestion);
