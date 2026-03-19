// Data dos cursos para filtro/busca
const cursosData = [
  {
    id: 1,
    titulo: 'Carreira, Remuneração e Avaliação de Desempenho',
    categoria: 'Administração e Negócios',
    img: 'img/capas/logo-carreiraremuneracaoeavaliacaodedesempenho.png',
    descricao: 'Aprenda a estruturar planos de carreira, políticas salariais e avaliações de desempenho eficazes.',
    url: 'https://go.hotmart.com/T101687724I'
  },
  {
    id: 2,
    titulo: 'CompraNet',
    categoria: 'Administração e Negócios',
    img: 'img/capas/logo-compranet.png',
    descricao: 'Entenda como operar no sistema de compras públicas e participar de processos governamentais.',
    url: 'https://go.hotmart.com/Q101742690O'
  },
  {
    id: 3,
    titulo: 'Cultura e Clima Organizacional',
    categoria: 'Administração e Negócios',
    img: 'img/capas/logo-culturaeclimaorganizacional.png',
    descricao: 'Desenvolva ambientes organizacionais saudáveis e aumente o engajamento da equipe.',
    url: 'https://go.hotmart.com/Q101743317O'
  },
  {
    id: 4,
    titulo: 'Custos e Formação de Preço de Vendas',
    categoria: 'Administração e Negócios',
    img: 'img/capas/logo-custodeprecodevendas.jpeg',
    descricao: 'Aprenda a calcular custos e definir preços estratégicos para maximizar lucros.',
    url: '#'
  },
  {
    id: 5,
    titulo: 'Desenvolvimento e Treinamento',
    categoria: 'Administração e Negócios',
    img: 'img/capas/logo-desenvolvimentoetreinamento.jpeg',
    descricao: 'Crie programas de capacitação eficientes para desenvolver talentos dentro da empresa.',
    url: '#'
  },
  {
    id: 6,
    titulo: 'Empreendedorismo',
    categoria: 'Administração e Negócios',
    img: 'img/capas/logo-empreendedorismo.jpeg',
    descricao: 'Aprenda a criar, estruturar e expandir seu próprio negócio com estratégias práticas.',
    url: '#'
  },
  {
    id: 7,
    titulo: 'Gestão de Estoque',
    categoria: 'Administração e Negócios',
    img: 'img/capas/logo-gestaodeestoque.png',
    descricao: 'Controle e otimize estoques, evitando perdas e melhorando a eficiência operacional.',
    url: '#'
  },
  {
    id: 8,
    titulo: 'Gestão Financeira',
    categoria: 'Administração e Negócios',
    img: 'img/capas/logo-gestaofinanceira.png',
    descricao: 'Controle finanças, fluxo de caixa e investimentos para garantir a saúde do negócio.',
    url: '#'
  },
  {
    id: 9,
    titulo: 'Gestão Econômica',
    categoria: 'Administração e Negócios',
    img: 'img/capas/logo-gestaoeconomica.png',
    descricao: 'Entenda conceitos econômicos aplicados à gestão empresarial e tomada de decisões.',
    url: '#'
  },
  {
    id: 10,
    titulo: 'LGPD',
    categoria: 'Direito',
    img: 'img/capas/logo-LGPD.png',
    descricao: 'Aprenda a Lei Geral de Proteção de Dados e como aplicá-la na sua empresa.',
    url: '#'
  },
  {
    id: 11,
    titulo: 'Licitação na Prática',
    categoria: 'Direito',
    img: 'img/capas/logo-licitacaonapratica.png',
    descricao: 'Domine processos licitatórios e participe de contratos públicos com segurança.',
    url: '#'
  },
  {
    id: 12,
    titulo: 'Noções Básicas de Direito Tributário',
    categoria: 'Direito',
    img: 'img/capas/logo-nocoesdedireitotributario.png',
    descricao: 'Entenda os principais impostos e obrigações fiscais no Brasil.',
    url: '#'
  },
  {
    id: 13,
    titulo: 'Gestão de Tempo',
    categoria: 'Auto Ajuda e Desenvolvimento Humano',
    img: 'img/capas/logo-gestaodetempo.png',
    descricao: 'Organize tarefas e aumente sua produtividade com técnicas modernas de gestão de tempo.',
    url: '#'
  },
  {
    id: 14,
    titulo: 'Liderança Inspiradora',
    categoria: 'Auto Ajuda e Desenvolvimento Humano',
    img: 'img/capas/logo-liderancainspiradora.png',
    descricao: 'Desenvolva habilidades para liderar equipes com motivação e alta performance.',
    url: '#'
  },
  {
    id: 15,
    titulo: 'Objetivos, Metas e Foco',
    categoria: 'Auto Ajuda e Desenvolvimento Humano',
    img: 'img/capas/logo-objetivosmetasefocos.png',
    descricao: 'Defina metas claras e mantenha o foco para alcançar resultados consistentes.',
    url: '#'
  },
  {
    id: 16,
    titulo: 'Proatividade e Protagonismo',
    categoria: 'Auto Ajuda e Desenvolvimento Humano',
    img: 'img/capas/logo-proatividadeeprotagonismo.png',
    descricao: 'Desenvolva atitude proativa e assuma o controle da sua carreira e resultados.',
    url: '#'
  },
  {
    id: 17,
    titulo: 'Processo Decisório',
    categoria: 'Administração e Negócios',
    img: 'img/capas/logo-processodecisorio.png',
    descricao: 'Aprenda técnicas para tomar decisões estratégicas com mais segurança e eficiência.',
    url: '#'
  },
  {
    id: 18,
    titulo: 'Recrutamento e Seleção',
    categoria: 'Administração e Negócios',
    img: 'img/capas/logo-recrutamentoesecao.png',
    descricao: 'Atraia, selecione e contrate os melhores talentos para sua empresa.',
    url: '#'
  }
];

// Categorias únicas para filtros
const categorias = [...new Set(cursosData.map(curso => curso.categoria))].sort();

