// Variaveis Keycloak //
let keycloak = Keycloak()
let initOptions = {onLoad: 'check-sso',};
// Variaveis de dados user //
let dataUserKc
let tokenId
let dataId
let cnpj
// Variaveis da meta //
let meta = []
let actualDate = [];
let dateTime = getFormattedDateGMT3();
let dateTimeEnd;
// Variavel checar login //
const $startTest = document.getElementById("iniciaTeste");
// Variaveis de dados //
let $questoes = {}
let $niveis = {}
let $desc = {}
let $cursos = {}
// Variaveis globais
const ApiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVkZW50aWFsIjoiTUFUVVJJREFERS1ESUdJVEFMIiwiaXNzIjoiaHR0cHM6XC9cL2Rldi5hcGkucGFydG5lci5zZWJyYWVtZy5jb20uYnJcL3YxIiwiaWF0IjoxNzQxNjIyNjczLCJleHAiOjE4Mjg4ODY2NzN9.6qgFrrzFR77g50g23B3pJhuKrX4jdGor4wOMgmSByFo';
const $startPage = document.querySelector(".start");
const $testPage = document.querySelector(".questions");
const $resultPage = document.querySelector(".results");
const $headerSection = document.querySelector("header");
const $footerSection = document.querySelector("footer");
// Variaveis página de inicio
const $startGameButton = document.querySelector(".start-test");
const $testLoginButton = document.querySelector("#login-button");
const $testLogoutButton = document.querySelector("#logout-button");
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

const $userDetailList = document.getElementById("resultDetailList");
const $userDetailDesc = document.querySelectorAll(".userDescLevel");

const $levelBadge = document.querySelector(".levelBadge");
const $cardList = document.getElementById("cardList");

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
// Variaveis página de resultados => dados de resultados //
let $dataUser = [];
let data;

// ----------------------------------------------------------- //
// -------------------- Valida Login Amei -------------------- //
// ----------------------------------------------------------- //

keycloak = new Keycloak();
keycloak.init(initOptions)
	.then(authenticated => {
		if (authenticated === true) {
			dataUserKc = keycloak.idTokenParsed
			cnpj = keycloak.tokenParsed.cpf;
			console.log('Init Success (Authenticated)');
			document.getElementById('login-btns').classList.add('hide');
			document.getElementById('login-info').classList.remove('hide');
			document.getElementById('user-name').innerHTML = dataUserKc.given_name;	
			vinculaEmpresa(cnpj);
		} else {
			console.log('Init Success (NOT Authenticated)');
			document.getElementById('login-btns').classList.remove('hide');
			document.getElementById('login-info').classList.add('hide');
		}
	})
	.catch( () => {
		output(authenticated);
	});
// ------------------------------------------------------------------------- //
// -------------------- Valida login para iniciar teste -------------------- //
// ------------------------------------------------------------------------- //

$testLoginButton.addEventListener('click', () => {
	if(keycloak.authenticated === true){
		document.getElementById('login-btns').classList.add('hide');
		document.getElementById('login-info').classList.remove('hide');
	} else {
		document.getElementById('login-btns').classList.remove('hide');
		document.getElementById('login-info').classList.add('hide');	
	}
})





function checkLogin() {
	if(keycloak.authenticated === true){
		startGame();
	} else {
		const loginModal = new bootstrap.Modal(document.getElementById("notLogin"));
		loginModal.show();
	} 
};

// Escuta se usuário clicou em iniciar teste //
$startTest.addEventListener('click', checkLogin) 

// ---------------------------------------------------------- //
// -------------------- Página de inicio -------------------- //
// ---------------------------------------------------------- //

// Função para iniciar o jogo //
function startGame(){
	$startPage.classList.add("hide");
    $testPage.classList.remove("hide");
	window.scrollTo(0, 0);
	$headerSection.classList.add("hide");
	$footerSection.classList.add("hide");
    displayNextQuestion();
	setTimeout(autoLogout, 30* 60 * 1000);
}

// ----------------------------------------------------------------------- //
// -------------------- Página de Nível de Maturidade -------------------- //
// ----------------------------------------------------------------------- //

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
	if(currentQuestionIndex >= 15){
		document.querySelectorAll(".btn-question-sebrae").classList.remove("btn-hover");
	}
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

// -------------------------------------------------------------- //
// -------------------- Página de Resultados -------------------- //
// -------------------------------------------------------------- //

// Função que finaliza o teste e prepara a página de resultados //
function finishTest(){
    $testPage.classList.add("hide");
    $resultPage.classList.remove("hide");
	$headerSection.classList.remove("hide");
	$footerSection.classList.remove("hide");
	window.location.href = "#formfinishingTest";
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
		
	}
	
	// Preenche dados de datalhes por tema
	for(let j = 0; j < $userDetailList.children.length; j++) {
		//$userDetailList.children[j].textContent = pointsCategory[j].levelName;
		$userDetailList.children[j].lastElementChild.textContent = $desc
			.filter((item) => item.lvl == pointsCategory[j].level && item.category === pointsCategory[j].category)
			.map((desc) => desc.desc);
		let statusLevel = pointsCategory[j].level;
		let listLevelCard = $cardList.children[0].children
		switch(statusLevel) {
			case 1:
				$userDetailList.children[j].children[0].lastElementChild.innerHTML = '<span class="badge fw-medium text-success-emphasis bg-success-subtle border border-success-subtle">Iniciante</span>';
				switch (pointsCategory[j].category) {
					case "Processos e gestão":
						listLevelCard.forEach(item => {
							if(item.classList.contains("processos-gestao") && item.classList.contains("iniciante")){
								item.classList.remove("hide");
							}
						});
					break;
					case "Vendas e atendimento":
						listLevelCard.forEach(item => {
							if(item.classList.contains("vendas-atendimento") && item.classList.contains("iniciante")){
								item.classList.remove("hide");
							}
						});
					break;
					case "Presença digital":
						listLevelCard.forEach(item => {
							if(item.classList.contains("presenca-digital") && item.classList.contains("iniciante")){
								item.classList.remove("hide");
							}
						});
					break;
					case "Comunicação e marca":
						listLevelCard.forEach(item => {
							if(item.classList.contains("comunicacao-marca") && item.classList.contains("iniciante")){
								item.classList.remove("hide");
							}
						});
					break;
					case "Finanças e pagamentos":
						listLevelCard.forEach(item => {
							if(item.classList.contains("financas-pagamentos") && item.classList.contains("iniciante")){
								item.classList.remove("hide");
							}
						});
					break;
				}
				break;
			case 2:
				$userDetailList.children[j].children[0].lastElementChild.innerHTML = '<span class="badge fw-medium text-warning-emphasis bg-warning-subtle border border-warning-subtle">Aprendiz</span> '
				switch (pointsCategory[j].category) {
					case "Processos e gestão":
						listLevelCard.forEach(item => {
							if(item.classList.contains("processos-gestao") && item.classList.contains("aprendiz")){
								item.classList.remove("hide");
							}
						});
					break;
					case "Vendas e atendimento":
						listLevelCard.forEach(item => {
							if(item.classList.contains("vendas-atendimento") && item.classList.contains("aprendiz")){
								item.classList.remove("hide");
							}
						});
					break;
					case "Presença digital":
						listLevelCard.forEach(item => {
							if(item.classList.contains("presenca-digital") && item.classList.contains("aprendiz")){
								item.classList.remove("hide");
							}
						});
					break;
					case "Comunicação e marca":
						listLevelCard.forEach(item => {
							if(item.classList.contains("comunicacao-marca") && item.classList.contains("aprendiz")){
								item.classList.remove("hide");
							}
						});
					break;
					case "Finanças e pagamentos":
						listLevelCard.forEach(item => {
							if(item.classList.contains("financas-pagamentos") && item.classList.contains("aprendiz")){
								item.classList.remove("hide");
							}
						});
					break;
				}
				break;
			case 3:
				$userDetailList.children[j].children[0].lastElementChild.innerHTML = '<span class="badge fw-medium text-primary-emphasis bg-primary-subtle border border-primary-subtle">Empreendedor</span> '
				switch (pointsCategory[j].category) {
					case "Processos e gestão":
						listLevelCard.forEach(item => {
							if(item.classList.contains("processos-gestao") && item.classList.contains("empreeendedor")){
								item.classList.remove("hide");
							}
						});
					break;
					case "Vendas e atendimento":
						listLevelCard.forEach(item => {
							if(item.classList.contains("vendas-atendimento") && item.classList.contains("empreendedor")){
								item.classList.remove("hide");
							}
						});
					break;
					case "Presença digital":
						listLevelCard.forEach(item => {
							if(item.classList.contains("presenca-digital") && item.classList.contains("empreendedor")){
								item.classList.remove("hide");
							}
						});
					break;
					case "Comunicação e marca":
						listLevelCard.forEach(item => {
							if(item.classList.contains("comunicacao-marca") && item.classList.contains("empreendedor")){
								item.classList.remove("hide");
							}
						});
					break;
					case "Finanças e pagamentos":
						listLevelCard.forEach(item => {
							if(item.classList.contains("financas-pagamentos") && item.classList.contains("empreendedor")){
								item.classList.remove("hide");
							}
						});
					break;
				}
				break;
			case 4:
				$userDetailList.children[j].children[0].lastElementChild.innerHTML = '<span class="badge fw-medium text-info-emphasis bg-info-subtle border border-info-subtle">Inovador</span> '
				switch (pointsCategory[j].category) {
					case "Processos e gestão":
						listLevelCard.forEach(item => {
							if(item.classList.contains("processos-gestao") && item.classList.contains("inovador")){
								item.classList.remove("hide");
							}
						});
					break;
					case "Vendas e atendimento":
						listLevelCard.forEach(item => {
							if(item.classList.contains("vendas-atendimento") && item.classList.contains("inovador")){
								item.classList.remove("hide");
							}
						});
					break;
					case "Presença digital":
						listLevelCard.forEach(item => {
							if(item.classList.contains("presenca-digital") && item.classList.contains("inovador")){
								item.classList.remove("hide");
							}
						});
					break;
					case "Comunicação e marca":
						listLevelCard.forEach(item => {
							if(item.classList.contains("comunicacao-marca") && item.classList.contains("inovador")){
								item.classList.remove("hide");
							}
						});
					break;
					case "Finanças e pagamentos":
						listLevelCard.forEach(item => {
							if(item.classList.contains("financas-pagamentos") && item.classList.contains("aprendiz")){
								item.classList.remove("hide");
							}
						});
					break;
				}
				break;
		}
	}

	//Cria e popula os cards de cursos por categoria
	/*if (document.readyState !== "loading") {
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
    	                $tbComIni.append(cardMount);
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
	} */
	
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
	dadosMeta();
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
/*
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
	*/
// Função para criar os cards de cursos //
function createCard(currentName, currentDesc, currentLink, currentImg, extraCategory, currentLevel){ 
    let setBg = "bg-brand";
	let linkTarget = "_blank";
	if(currentImg === "") currentImg = "default-course-icon";
	
	if(currentLink === "") {
		currentLink = "#sebrae-units";
		linkTarget = ""
	}

	const newCard = document.createElement("div");
    newCard.classList.add("col");
	newCard.innerHTML = `
        <div class="card">
          <img src="${currentImg}" class="img-fluid rounded-start">
          <div class="card-body">
            <p class="card-text mb-0 pb-0"><small class="text-body-secondary text-uppercase">Processos e gestão</small></p>
            <h5 class="card-title">${currentName}</h5>
            <div class="card-level-badge mb-2">
              <span class="badge fw-medium text-success-emphasis bg-success-subtle border border-success-subtle">Iniciante</span> 
              <span class="badge fw-medium text-warning-emphasis bg-warning-subtle border border-warning-subtle">Aprendiz</span> 
              <span class="badge fw-medium text-primary-emphasis bg-primary-subtle border border-primary-subtle">Empreendedor</span> 
              <span class="badge fw-medium text-info-emphasis bg-info-subtle border border-info-subtle">Inovador</span> 
            </div>
            <p class="card-text">${currentDesc}</p>
            <p class="card-text"><small class="text-body-secondary"><a href="${currentLink}" target="${linkTarget}">Saiba mais</a></small></p>
          </div>
        </div>`
	return newCard;
}
// Função que altera a imagem do Hero //
function changeImageSrc(newSrc){
    $levelImg.src = newSrc;
}

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
	fetch('./back/processar_quiz.php' , {
		method: 'POST',
		headers: {
            'Content-Type': 'application/json; charset=utf8', // Define o tipo de dados que será enviado
        },
        body: JSON.stringify(data),  // Envia os dados no formato JSON
	})
	.then(response => response.text())
	.then(result => {
		if (result === '{"success":true}') {
			//alert('Dados enviados com sucesso!');
		} else {
			//alert('Ocorreu um erro ao enviar os dados.');
		}
	})
	.catch(error => {
		console.error('Erro:', error);
		//alert('Erro na requisição.');
	});
}

// ------ Eventos de escuta ------ //
//$startGameButton.addEventListener("click", formValidate);
$backQuestionButton.addEventListener("click", backQuestion);

const btnGenerate = document.querySelector('#generate-pdf');

/*btnGenerate.addEventListener("click", () => {
	const content = document.querySelector('#content')

	const options = {
		margin: [0, 5, 10, 5],
		filename: 'Sebrae-MG_Maturidade_Digital_resultado.pdf',
		html2canvas: {scale: 0.5},
		image: {type: 'jpeg', quality: 0.9},
        jsPDF: {unit: 'mm', format: 'a4', orientation: 'portrait'}
	}
	html2pdf().set(options).from(content).save();
}) */


// ---------------------------- //
// ------ Inicializações ------ //
// ---------------------------- //

// ------ Busca e prepara os dados das questões ------ //
fetch('js/dados.json')
.then(response => response.json())
.then(data => {
	$questoes = data.questions
	$niveis = data.levels
	$desc = data.userDesc
	$cursos = data.cursos
	}
)


// ------ busca dados de empresas vinculadas ------ //
function vinculaEmpresa(dataId, cnpj){
	fetch('./back/ameicnpj.php', {
		method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataId),
	})
	.then(response => response.json())
	.then(dataRes => {
		let cnpj = dataRes.valueOf();
		cnpj = cnpj.toString();
		console.log(cnpj);
		meta.map(function (meta) {
			meta.company = cnpj
			return meta
		})
	})
	.catch((error) => console.error('Error:', error));
}

// ------ Dados para contabilizar meta ------ //
function dadosMeta() {
	dataUserKc = keycloak.idTokenParsed
	tokenId = keycloak.idToken
	dataId = {tokenId: tokenId, userId: dataUserKc.cpf}
    
	meta.push({
		company: cnpj,
		nome: dataUserKc.name,
        date_hour_start: dateTime[0].data_atual,
        date_hour_end: dateTime[0].data_final,
        carga_horaria: "1",
        theme_id: 10101,
        code_integration: "2025-03-11 10:42:00",
        type: "APLICATIVO",
        title: "Maturidade Digital",
        description: `Diagnóstico prernchido pelo usuário ${dataUserKc.name}`,
        credential: "maturidadedigital",
        cod_projeto: "829f8355-6d5c-47de-beb8-f2c0184e2f34",
        cod_acao: "421588",
		instrumento: "Diagnóstico",
		nome_realizacao: "Atendimento Remoto",
		tipo_realizacao: "PRT",
		origin_id: 36,
		cod_meio_atendimento: 11,
		cod_categoria: 19,
		orientacao_cliente: "orientacao"
	})
	vinculaEmpresa(dataId);
	return meta
}


// ------ Funções de formatação ------ //

// ------ DateTime -------- //
function getFormattedDateGMT3() {
    const now = new Date();

    // Ajusta a data para o fuso horário GMT-3
    const offsetHours = -3; // GMT-3
    now.setHours(now.getUTCHours() + offsetHours);

    // Formata a data no padrão desejado
    const pad = (num) => String(num).padStart(2, '0');
    const year = now.getFullYear();
    const month = pad(now.getMonth() + 1);
    const day = pad(now.getDate());
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const minutesPlus = pad(now.getMinutes()+1);
    const seconds = pad(now.getSeconds());

	let start_date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
	let end_date = `${year}-${month}-${day} ${hours}:${minutesPlus}:${seconds}`

	actualDate.push({
		data_atual: start_date,
		data_final: end_date
	})
    return actualDate;
}
// Função autologout //
function autoLogout() {
	keycloak.logout();
}

function testar(){
	fetch('https://api.partner.sebraemg.com.br/v1/interaction', {
		method: 'POST',
		mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
			'ApiKey': ApiKey
        },
        body: JSON.stringify(meta),
	})
	.then(response => response.json())
	.then(dataM => {
		console.log(dataM);
		})
	.catch((error) => console.error('Error:', error));
}

//const cList = document.getElementById('course-list-collapse');

/*
let seeMore = document.getElementById('list-toggle');
let contentList = document.getElementById('course-list');
seeMore.addEventListener('click', () => {
	contentList.classList.toggle('gradient');
	
	if (cList.classList.contains('show')) {
		cList.classList.toggle('show');
		seeMore.innerHTML = 'Ver mais cursos';
		cList.style.height = '15rem';
		
	} else {
		cList.classList.add('show');
		seeMore.innerHTML = 'Ver menos cursos';
		cList.style.height = cList.scrollHeight + 'px';
	}
});
*/