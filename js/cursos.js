const cursos = [
	{
		"categoria": "Comunicação e Branding",
		"nome": "Luz, Câmera e Conversão",
		"desc": "Aprenda a criar vídeos que atraem e convertem clientes para o seu negócio.",
		"nivel": "1, 2, 3",
		"link": "https://sebraeplay.com.br/cursos/luz-camera-e-conversao"
	},
	{
		"categoria": "Comunicação e Branding",
		"nome": "Sebraetec - Branding",
		"desc": "Desenvolva uma estratégia de branding personalizada para o seu negócio, garantindo que sua marca seja percebida de forma autêntica e relevante pelos seus clientes.",
		"nivel": "0",
		"link": "https://sebraetec.sebraemg.com.br/produto/branding/"
	},
	{
		"categoria": "Comunicação e Branding",
		"nome": "DigitalBiz - Oficina O Texto Vendedor",
		"desc": "Descubra técnicas de escrita que mostram ao público o valor do seu negócio e aprenda a pensar legendas que geram interação, utilizar palavras-chave, escrever textos para anúncios e muito mais.",
		"nivel": "2, 3",
		"link": "https://movimentolab.sebraemg.com.br/digital-biz/o-texto-vendedor/"
	},
	{
		"categoria": "Comunicação e Branding",
		"nome": "Sebraetec - Comunicação Visual – Crie Sua Marca",
		"desc": "Desenvolva uma identidade visual forte e profissional para sua marca com um especialista.",
		"nivel": "1 e 2",
		"link": "https://sebraetec.sebraemg.com.br/produto/comunicacao-visual-identidade-visual-mais-combo-2/"
	},
	{
		"categoria": "Comunicação e Branding",
		"nome": "Sebraetec - Branding + Identidade Visual",
		"desc": "Invista em branding e identidade visual para tornar sua empresa uma referência no mercado. Uma gestão eficaz da imagem da marca é fundamental para alcançar o sucesso. Com essa consultoria você vai criar e desenvolver conteúdos que expressem o verdadeiro propósito da sua marca.",
		"nivel": "2",
		"link": "https://sebraetec.sebraemg.com.br/produto/branding-identidade-visual/"
	},
	{
		"categoria": "Comunicação e Branding",
		"nome": "Sebraetec - Comunicação Visual",
		"desc": "Aproveite a consultoria de Comunicação Visual e Identidade Visual para criar uma marca forte e alinhada com a personalidade do seu negócio. Fortaleça sua presença no mercado com uma comunicação visual que transmita seus valores e conquiste seus clientes.",
		"nivel": "2, 3",
		"link": "https://sebraetec.sebraemg.com.br/produto/comunicacao-visual-identidade-visual-mais/"
	},
	{
		"categoria": "Comunicação e Branding",
		"nome": "Sebraetec - Impulsiona Conteúdos",
		"desc": "Capacite-se e comece a planejar e produzir conteúdos relevantes que vão engajar seu público-alvo e gerar um feedback contínuo e crescente.",
		"nivel": "2",
		"link": "https://sebraetec.sebraemg.com.br/produto/impulsiona-midias-sociais-planejamento-e-producao-de-conteudo-para-as-principais-midias-sociais/"
		
	},
	{
		"categoria": "Finanças e Pagamentos",
		"nome": "Emissor de NF do Sebrae ",
		"desc": "Simplifique a emissão de notas fiscais eletrônicas para o seu negócio com esta ferramenta prática.",
		"nivel": "0",
		"link": "https://sebrae.com.br/sites/PortalSebrae/produtoseservicos/emissornfe"
	},
	{
		"categoria": "Finanças e Pagamentos",
		"nome": "Consultoria Gestão Financeira",
		"desc": "Melhore o controle financeiro do seu negócio com consultoria especializada e personalizada.",
		"nivel": "0",
		"link": "https://sebraemg.com.br/consultoria/consultoria-gestao-financeira/"
	},
	{
		"categoria": "Finanças e Pagamentos",
		"nome": "Atendimento Especializado em Finanças",
		"desc": "Receba orientações individuais e sob medida para compreender e otimizar a gestão financeira de seus negócios.",
		"nivel": "0",
		"link": ""
	},
	{
		"categoria": "Finanças e Pagamentos",
		"nome": "MODELAÇÃO Finanças",
		"desc": "Programa gratuito, presencial, dinâmico, mão na massa e com foco em finanças O objetivo é trazer à tona pontos de oportunidades em finanças, resgatando aspectos que poderão ser aprofundados em uma continuidade. Utiliza ferramentas financeiras para identificar e impulsionar melhorias.",
		"nivel": " 2",
		"link": "https://oferta.sebraemg.com.br/modelacao-sebrae"
	},
	{
		"categoria": "Não categorizado",
		"nome": "Curso de Introdução ao BIM",
		"desc": "Entenda como a Modelagem da Informação da Construção (BIM) pode transformar os processos da sua micro ou pequena empresa, com foco em mudanças tecnológicas e de gestão.",
		"nivel": "3",
		"link": ""
	},
	{
		"categoria": "Não categorizado",
		"nome": "Portal da Inovação",
		"desc": "Acesse a plataforma gratuita que foi criada para guiar empreendedores e gestores públicos em busca de soluções inovadoras desmistificando a ideia de que inovação é algo grandioso e tecnológico.",
		"nivel": "0",
		"link": "https://inovacaosebraeminas.com.br/"
	},
	{
		"categoria": "Não categorizado",
		"nome": "Prepara Gastronomia - Gestão Integrada",
		"desc": "Participe do programa que oferece consultorias de gestão e operação para melhorar os processos do seu negócio no segmento de alimentação fora do lar.",
		"nivel": "1, 2, 3",
		"link": ""
	},
	{
		"categoria": "Não categorizado",
		"nome": "Sebrae Play",
		"desc": "Acesse uma plataforma completa de capacitação empresarial, com conteúdos exclusivos e atualizados para aprimorar a gestão, vendas, marketing e outras áreas essenciais do seu negócio.",
		"nivel": "0",
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
		"nivel": "0",
		"link": "https://sebraeplay.com.br/cursos/apresentacoes-de-impacto"
	},
	{
		"categoria": "Não categorizado",
		"nome": "Sebrae Connect",
		"desc": "Conecte-se com soluções plug and play das áreas de Finanças e Pagamentos, Marketing Digital e Gestão de Operações e Processos e reduza tempo de esforço e custos.",
		"nivel": "2, 3, 4",
		"link": "https://connect.sebraemg.com.br/"
	},
	{
		"categoria": "Presença Digital",
		"nome": "DigitalBiz - Oficina Gestão de Redes Sociais",
		"desc": "Aprenda a transformar suas redes sociais em poderosas aliadas para impulsionar o seu negócio na internet.",
		"nivel": "2 e 3",
		"link": "https://movimentolab.sebraemg.com.br/digital-biz/gestao-de-redes-sociais/"
	},
	{
		"categoria": "Presença Digital",
		"nome": "E-mail Marketing para sua Empresa",
		"desc": "Aprenda a criar e-mails de alto impacto, distribuí-los com as ferramentas certas, monitorar sua reputação como remetente, medir o sucesso dos envios e muito mais.",
		"nivel": "3",
		"link": "https://sebraeplay.com.br/cursos/e-mail-marketing-para-a-sua-empresa"
	},
	{
		"categoria": "Presença Digital",
		"nome": "Planejamento de Marketing Digital",
		"desc": "Aprenda a como aproveitar as oportunidades do marketing digital para posicionar e destacar o seu negócio no ambiente on-line, com estratégias aplicáveis imediatamente.",
		"nivel": "2, 3",
		"link": "https://sebraeplay.com.br/cursos/planejamento-de-marketing-digital"
	},
	{
		"categoria": "Presença Digital",
		"nome": "Consultoria em Marketing Digital",
		"desc": "Receba orientações individuais para entender e reavaliar suas estratégias de marketing digital e seu modelo de comunicação nas redes sociais.",
		"nivel": "0",
		"link": ""
	},
	{
		"categoria": "Presença Digital",
		"nome": "Digital Biz - Oficina Instagram, Facebook e WhatsApp para negócios",
		"desc": "Aprenda a usar Instagram, Facebook e WhatsApp estrategicamente para impulsionar seus negócios.",
		"nivel": "1, 2",
		"link": "https://movimentolab.sebraemg.com.br/digital-biz/instagram-facebook-e-whatsapp-para-negocios/"
	},
	{
		"categoria": "Presença Digital",
		"nome": "Digitalize ",
		"desc": "Participe de oficinas e atividades práticas, que vão te ensinar a implementar conhecimentos sobre digitalização de forma prática e eficaz nos seus negócios.",
		"nivel": "0",
		"link": "https://www.canva.com/design/DAGDPhE6uoQ/gnqnqq1OtmeakFjhrURR7Q/view?utm_content=DAGDPhE6uoQ&utm_campaign=designshare&utm_medium=link&utm_source=editor"
	},
	{
		"categoria": "Presença Digital",
		"nome": "Facebook Day",
		"desc": "Descubra como potencializar sua presença e vendas no Facebook com estratégias práticas.",
		"nivel": "1, 2",
		"link": "https://sebraeplay.com.br/cursos/facebook-day"
	},
	{
		"categoria": "Presença Digital",
		"nome": "Instagram Day",
		"desc": "Domine as ferramentas do Instagram para expandir seu alcance e atrair mais clientes.",
		"nivel": "1, 2",
		"link": "https://sebraeplay.com.br/cursos/instagram-day"
	},
	{
		"categoria": "Presença Digital",
		"nome": "Sebraetec - Consultoria Omnichannel para Integração dos Canais de Vendas",
		"desc": "Aproveite a consultoria Omnichannel para integrar todos os seus canais de vendas, proporcionando uma experiência de compra mais fluida e eficiente para seus clientes, e impulsionando os resultados do seu negócio.",
		"nivel": "2, 3, 4",
		"link": "https://sebraetec.sebraemg.com.br/produto/consultoria-omnichannel-para-integracao-dos-canais-de-vendas/"
	},
	{
		"categoria": "Presença Digital",
		"nome": "Sebraetec - Consultoria para Growth Hacking",
		"desc": "Descubra novas maneiras de pensar sobre a gestão da sua empresa e aprenda a criar planos de ação eficazes para a divulgação e comercialização dos seus produtos e serviços nos canais on-line. Potencialize sua presença digital e alcance mais clientes!",
		"nivel": "3, 4",
		"link": "https://sebraetec.sebraemg.com.br/produto/consultoria-para-growth-hacking/"
	},
	{
		"categoria": "Presença Digital",
		"nome": "Sebraetec - Implantação de Loja Virtual - Diagnóstico de Avaliação",
		"desc": "Participe do diagnóstico de avaliação para a implantação de uma loja virtual e descubra como otimizar sua presença on-line. Receba orientações personalizadas para criar uma loja que atraia clientes e potencialize suas vendas no ambiente digital.",
		"nivel": "3, 4",
		"link": "https://sebraetec.sebraemg.com.br/produto/implantacao-de-loja-virtual-diagnostico-de-avaliacao/"
	},
	{
		"categoria": "Presença Digital",
		"nome": "Sebraetec - Implantação de Loja Virtual - Plus",
		"desc": "Participe do processo de implantação da sua loja virtual e receba todo o suporte necessário para estabelecer uma presença on-line de sucesso. Transforme seu negócio e alcance novos clientes no ambiente digital.",
		"nivel": "3, 4",
		"link": "https://sebraetec.sebraemg.com.br/produto/implantacao-de-loja-virtual/"
	},
	{
		"categoria": "Presença Digital",
		"nome": "Inserção Digital – Desenvolvimento de Website – Pocket",
		"desc": "Melhore a sua rede de relacionamentos e aumente as possibilidades de alcance e interação com o seu público. Esta consultoria vai te ajudar a estabelecer a sua presença digital de forma profissional e eficiente.",
		"nivel": "2, 3",
		"link": "https://sebraetec.sebraemg.com.br/produto/insercao-digital-desenvolvimento-de-website-mais/"
	},
	{
		"categoria": "Presença Digital",
		"nome": "Sebraetec - Inserção Digital – Desenvolvimento de Website – Plus",
		"desc": "Construa a presença digital da sua empresa com um website profissional, totalmente personalizado para as suas necessidades. Aumente sua visibilidade online e atraia mais clientes com essa solução completa de inserção digital.",
		"nivel": "2, 3",
		"link": "https://sebraetec.sebraemg.com.br/produto/insercao-digital-desenvolvimento-de-website/"
	},
	{
		"categoria": "Presença Digital",
		"nome": "Sebraetec - Planejamento para Busca Orgânica – SEO",
		"desc": "Receba orientação especializada e aprenda a otimizar seu site para atrair mais visitantes. Descubra estratégias eficazes de SEO que vão ajudar seu negócio a se destacar nos resultados de busca e conquistar mais clientes.",
		"nivel": "3, 4",
		"link": "https://sebraetec.sebraemg.com.br/produto/planejamento-para-busca-organica-seo/"
	},
	{
		"categoria": "Presença Digital",
		"nome": "Sebraetec - Planejamento para Presença Digital e Links Patrocinados",
		"desc": "Receba orientação especializada para planejar e otimizar campanhas de tráfego on-line, garantindo visibilidade assertiva para o público-alvo. Inclui estratégias para redes sociais, links patrocinados e outras mídias digitais.",
		"nivel": "3, 4",
		"link": "https://sebraetec.sebraemg.com.br/produto/planejamento-para-presenca-digital-e-links-patrocinados/"
	},
	{
		"categoria": "Presença Digital",
		"nome": "Se Joga no Online",
		"desc": "Participe da nossa parceria com o Mercado Livre e descubra como vender seus produtos em uma das maiores plataformas de e-commerce. Receba orientações para otimizar suas vendas on-line e alcance mais clientes, aproveitando todo o potencial do marketplace.",
		"nivel": "3",
		"link": "https://sebrae.com.br/sites/PortalSebrae/parceriamercadolivre"
	},
	{
		"categoria": "Presença Digital",
		"nome": "Reload",
		"desc": "Participe do maior evento de Marketing Digital do Sebrae. Ele é para quem quer se atualizar, inspirar, pensar fora da caixa, alavancar seu negócio e se destacar no mundo digital.",
		"nivel": "0",
		"link": "https://reload.sebrae.com.br/"
	},
	{
		"categoria": "Presença Digital",
		"nome": "Sebraetec - Acelera Digital - Estratégia e Canais de Mkt Digital",
		"desc": "Destaque sua empresa no mercado e conquiste novos públicos com uma presença digital forte, ganhando visibilidade e conectando-se com seu público nas redes sociais.",
		"nivel": "1, 2",
		"link": "https://sebraetec.sebraemg.com.br/produto/acelera-digital/"
	},
	{
		"categoria": "Presença Digital",
		"nome": "Atendimento Especializado em Marketing Digital",
		"desc": "Desenvolva suas mídias digitais para criar conteúdos estratégicos que fortaleçam a comunicação do seu negócio. Aprenda a conectar-se melhor com seu público e a gerar impacto por meio de uma presença digital mais eficiente",
		"nivel": "0",
		"link": ""
	},
	{
		"categoria": "Presença Digital",
		"nome": "Desenvolvimento de Mídias Digitais de Comunicação – Plus",
		"desc": "Desenvolva suas mídias digitais e aprenda a criar conteúdos que conectem seu negócio ao público certo. Otimize sua comunicação e fortaleça sua presença digital com estratégias que geram resultados",
		"nivel": "2, 3",
		"link": "https://sebraetec.sebraemg.com.br/produto/desenvolvimento-de-midias-digitais-de-comunicacao/"
	},
	{
		"categoria": "Presença Digital",
		"nome": "Desenvolvimento de Mídias Digitais de Comunicação – Pocket",
		"desc": "Desenvolva suas mídias digitais para criar conteúdos estratégicos que fortaleçam a comunicação do seu negócio. Aprenda a conectar-se melhor com seu público e a gerar impacto por meio de uma presença digital mais eficiente",
		"nivel": "2, 3",
		"link": "https://sebraetec.sebraemg.com.br/produto/desenvolvimento-de-midias-digitais-de-comunicacao-mais/"
	},
	{
		"categoria": "Presença Digital",
		"nome": "Comportamento do consumidor digital",
		"desc": "Entenda o comportamento do consumidor digital e aprenda a adaptar suas estratégias para atrair e engajar clientes no ambiente online.",
		"nivel": "2, 3",
		"link": "https://sebraeplay.com.br/cursos/comportamento-do-consumidor-digital"
	},
	{
		"categoria": "Processos e Gestão",
		"nome": "ALI ",
		"desc": "Receba acompanhamento especializado para implementar inovações no seu negócio e melhorar sua competitividade. Com o apoio do Agente Local de Inovação,você poderá desenvolver soluções criativas e eficientes para crescer no mercado.",
		"nivel": "2, 3",
		"link": "https://sebrae.com.br/sites/PortalSebrae/agentelocaldeinovacao"
	},
	{
		"categoria": "Processos e Gestão",
		"nome": "Consultoria FOCUS",
		"desc": "Acesse a plataforma FOCUS e melhore os resultados da sua empresa. Gerencie indicadores de desempenho e compare sua performance com a média de outras empresas do mesmo setor para identificar oportunidades de crescimento.",
		"nivel": "2, 3",
		"link": "https://focus.sebraemg.com.br/#/"
	},
	{
		"categoria": "Processos e Gestão",
		"nome": "Consultoria Gestão Competitiva para o Varejo",
		"desc": "Participe de consultoria especializada que vai ajudá-lo a implantar um sistema de gestão por resultados e criar planos de ação focados na melhoria dos Fatores Críticos de Sucesso da sua empresa.",
		"nivel": "2, 3",
		"link": ""
	},
	{
		"categoria": "Processos e Gestão",
		"nome": "Sebraetec - Adequação à Lei Geral de Proteção de Dados Pessoais (LGPD)",
		"desc": "Receba consultoria especializada para adequar sua empresa à Lei Geral de Proteção de Dados (LGPD). Garanta a conformidade legal e proteja as informações dos seus clientes, assegurando mais confiança e segurança para o seu negócio.",
		"nivel": "2, 3, 4",
		"link": "https://sebraetec.sebraemg.com.br/produto/adequacao-a-lei-geral-de-protecao-de-dados-pessoais-lgpd/"
	},
	{
		"categoria": "Processos e Gestão",
		"nome": "Sebraetec - Eficiência nos Processos Empresariais",
		"desc": "Aproveite a consultoria especializada para otimizar e controlar os processos da sua empresa, aumentando a eficiência operacional e garantindo resultados mais consistentes e assertivos.",
		"nivel": "2, 3",
		"link": "https://sebraetec.sebraemg.com.br/produto/eficiencia-nos-processos-empresariais/"
	},
	{
		"categoria": "Processos e Gestão",
		"nome": "Sebraetec - Organização e Controle de Estoque",
		"desc": "Receba consultoria especializada para implementar um sistema eficiente de organização e controle de estoque, reduzindo custos, otimizando recursos e melhorando a gestão do seu negócio.",
		"nivel": "2, 3",
		"link": "https://sebraetec.sebraemg.com.br/produto/organizacao-e-controle-de-estoque/"
	},
	{
		"categoria": "Processos e Gestão",
		"nome": "Educampo",
		"desc": "Obtenha projeções, cenários e análises integradas para apoiar o planejamento e a tomada de decisões no seu negócio e em toda a cadeia produtiva, garantindo mais eficiência e evolução.",
		"nivel": "0",
		"link": "https://sebrae.com.br/sites/PortalSebrae/ufs/mg/sebraeaz/educampo-mg"
	},
	{
		"categoria": "Processos e Gestão",
		"nome": "PNBOX",
		"desc": "Utilize nossa plataforma digital para elaborar o seu plano de negócios. Com 14 ferramentas disponíveis, você pode usá-las como e onde quiser. Construa um plano completo ou utilize apenas o que precisa no seu momento atual.",
		"nivel": "0",
		"link": "https://pnbox.sebrae.com.br/"
	},
	{
		"categoria": "Processos e Gestão",
		"nome": "Consultoria Modelagem de Negócio",
		"desc": "Acesse uma ampla variedade de ferramentas e metodologias, defina suas prioridades e objetivos e desenvolva um plano de ação estratégico.",
		"nivel": "0",
		"link": "https://sebraemg.com.br/produto/consultoria-especializada-em-modelagem-de-negocios/"
	},
	{
		"categoria": "Processos e Gestão",
		"nome": "Gestão de KPI na Prática",
		"desc": "Aprenda a analisar criticamente os Fatores Críticos de Sucesso (FCS) do seu negócio, identificar falhas nos processos e criar estratégias para melhorar seus indicadores de desempenho (KPI).",
		"nivel": "2",
		"link": ""
	},
	{
		"categoria": "Vendas e Atendimento",
		"nome": "DigitalBiz - Oficina Funil de Vendas",
		"desc": "Aprenda a criar um funil para atrair, engajar e acompanhar seus potenciais clientes em cada etapa dessa jornada. Desde despertar o interesse até a efetivação da compra.",
		"nivel": "2, 3",
		"link": "https://movimentolab.sebraemg.com.br/digital-biz/funil-de-vendas/"
	},
	{
		"categoria": "Vendas e Atendimento",
		"nome": "DigitalBiz - Oficina Posts que Vendem",
		"desc": "Aprenda a transformar suas redes sociais em poderosas aliadas para impulsionar sua empresa na internet.",
		"nivel": "2, 3",
		"link": "https://movimentolab.sebraemg.com.br/digital-biz/posts-que-vendem/"
	},
	{
		"categoria": "Vendas e Atendimento",
		"nome": "Planejamento e Preparação para Comercialização em Marketplace",
		"desc": "Receba orientação especializada para planejar e preparar a comercialização dos seus produtos em marketplaces. Aumente suas vendas ao aproveitar as oportunidades que essas plataformas oferecem para expandir o alcance do seu negócio.",
		"nivel": "2, 3",
		"link": "https://sebraetec.sebraemg.com.br/produto/planejamento-e-preparacao-para-comercializacao-em-marketplace/"
	},
	{
		"categoria": "Vendas e Atendimento",
		"nome": "Sebraetec - Implantação ou Adequação na Operação do Delivery",
		"desc": "Invista na implementação de melhorias no seu serviço de delivery e garanta otimização na gestão e operação de pedidos, preparação e entregas, assim como mais agilidade em cada etapa.",
		"nivel": "2, 3",
		"link": "https://sebraetec.sebraemg.com.br/produto/implementacao-ou-adequacao-da-operacao-de-delivery-2/"
	},
	{
		"categoria": "Vendas e Atendimento",
		"nome": "Sebraetec - Impulsiona Vendas",
		"desc": "Acesse as estratégias e ferramentas mais utilizadas e eficientes para automatizar a interação nas suas lojas virtuais, melhorando sua presença on-line e aumentando suas chances de sucesso.",
		"nivel": "2, 3",
		"link": "https://sebraetec.sebraemg.com.br/produto/impulsiona-vendas-online-foco-prioritario-nas-vendas-pelas-midias-sociais-social-shopping/"
	},
	{
		"categoria": "Vendas e Atendimento",
		"nome": "Caminhos da Moda",
		"desc": "Acesse a plataforma on-line do Sebrae que conecta indústrias de moda a lojistas por meio do cadastro de seus produtos e serviços, facilitando contato e vendas na cadeia produtiva do segmento e apresentando Minas para o Brasil.",
		"nivel": "3, 4",
		"link": "https://caminhosdamoda.sebraemg.com.br/"
	},
	{
		"categoria": "Vendas e Atendimento",
		"nome": "MODELAÇÃO Mercado",
		"desc": "Participe do programa de Modelagem de Negócios do Sebrae e aprenda a estruturar e desenvolver o seu modelo de negócio de forma estratégica, aumentando suas chances de sucesso no mercado.",
		"nivel": "2",
		"link": "https://oferta.sebraemg.com.br/modelacao-sebrae"
	},
	{
		"categoria": "Vendas e Atendimento",
		"nome": "Rotas para o mercado ",
		"desc": "Conquiste novos mercados e aumente suas vendas com a estratégia Rotas para o Mercado. Defina canais, melhore processos de vendas e implemente ações práticas para otimizar seus resultados.",
		"nivel": "",
		"link": ""
	}
]