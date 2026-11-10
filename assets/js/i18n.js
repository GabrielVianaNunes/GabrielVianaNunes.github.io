(function () {
    var STORAGE_KEY = 'site-lang';
    var SUPPORTED = ['pt', 'en', 'de', 'es'];
    var FLAGS = { pt: 'fi-br', en: 'fi-us', de: 'fi-de', es: 'fi-es' };
    var NAMES = { pt: 'Português', en: 'English', de: 'Deutsch', es: 'Español' };

    var dict = {
        en: {
            'nav.about': 'About',
            'nav.experience': 'Experience',
            'nav.skills': 'Skills',
            'nav.projects': 'Projects',
            'nav.contact': 'Contact',
            'nav.logoRole': 'Software Engineer',
            'nav.menuToggle': 'Open menu',
            'skip.link': 'Skip to content',
            'theme.toLight': 'Switch to light mode',
            'theme.toDark': 'Switch to dark mode',
            'langSwitcher.aria': 'Change language',
            'hero.badge': 'Ex-intern at ZEISS · Germany',
            'hero.headline': 'Junior Java Developer building scalable full-stack products and automations.',
            'hero.lead': 'Java & Spring Boot, Angular & TypeScript, Python automation (RPA), PostgreSQL, from data modeling to deployment. Final-year Software Engineering student, with 6 months of international experience at ZEISS in Germany.',
            'hero.location': '📍 Goiânia, Brazil · open to remote & international opportunities',
            'hero.cta.projects': 'See projects',
            'hero.cta.cv': 'Download CV',
            'hero.terminal.whoami': 'Gabriel Nunes · Junior Java Developer · Full Stack & RPA',
            'hero.terminal.stack': 'Java · Spring Boot · Angular · Python · Docker',
            'hero.terminal.status': '✓ available for remote & international opportunities',
            'about.title': 'About me',
            'about.p1': "I'm a final-year Software Engineering student (SENAI FATESG, Goiânia) and full-stack developer who enjoys turning real problems into working software, from the database schema to the interface people actually use.",
            'about.p2': 'My biggest step so far was a 6-month international internship at ZEISS, in Germany, working as a full-stack developer inside a multicultural corporate team. It gave me first-hand exposure to enterprise-grade development, agile practices, and international communication.',
            'about.p3': "Since May 2026 I work as a contract researcher and RPA automation developer at the SENAI Food and Beverage Institute, with Python, Playwright and Java, and I'm open to working with other companies. I use generative AI (Claude) as an everyday engineering tool: I define requirements, architecture and data modeling, and I review and validate every piece of code before delivery.",
            'experience.title': 'Experience',
            'experience.senai.role': 'Software Engineering · SENAI FATESG',
            'experience.senai.period': '2023 - Expected late 2026',
            'experience.senai.desc': 'Undergraduate degree in Software Engineering, covering full-stack development, databases, software architecture and design patterns, and agile methodologies.',
            'experience.fieg.role': 'Software Engineering Intern · FIEG',
            'experience.fieg.period': 'Jun 2024 - Dec 2024 · 7 months',
            'experience.fieg.desc': "Internship in software engineering at FIEG (Federation of Industries of the State of Goiás), part of SENAI's selection process for the international exchange program in Germany.",
            'experience.senaizeiss.role': 'Web Development & Metrology Intern · SENAI ZEISS Centro de Excelência em Metrologia',
            'experience.senaizeiss.period': 'Jan 2025 - Sep 2025 · 9 months',
            'experience.senaizeiss.desc': 'Developed web applications for technical and industrial projects, and operated precision metrology equipment (Duramax, O-Inspect, Prismo, Bosello Max), applying measurement principles in support of advanced manufacturing solutions.',
            'experience.zeiss.role': 'Full-Stack Developer Intern · ZEISS (Germany)',
            'experience.zeiss.period': 'Oct 2025 - Mar 2026 · 6 months',
            'experience.zeiss.desc': 'International internship at ZEISS in Germany, developing internal full-stack applications within a multicultural corporate team, from requirements gathering to implementation, testing and maintenance. First-hand exposure to enterprise software practices and agile methodologies in a global company.',
            'experience.hub.role': 'Researcher & RPA Automation Developer · SENAI HUB Goiás',
            'experience.hub.period': 'May 2026 - Present',
            'experience.hub.desc': "Contract researcher at the SENAI Food and Beverage Institute (Goiás), building process automations (RPA) and systems for laboratory routines: Python and Playwright robots for data entry and downloads in lab management systems, a web system for tracking lab samples (Java, Quarkus, React, SQL Server and Docker), and business-rule discovery with lab teams, mediating between SENAI IT and the vendor's IT.",
            'skills.hardTitle': 'Hard Skills',
            'skills.softTitle': 'Soft Skills',
            'skills.langTitle': 'Languages',
            'skills.cat.backend': 'Backend',
            'skills.cat.frontend': 'Frontend',
            'skills.cat.database': 'Database',
            'skills.cat.tools': 'Tools',
            'skills.cat.other': 'Other competencies',
            'skills.backend.auth': 'Authentication',
            'skills.backend.restapi': 'REST APIs',
            'skills.frontend.responsive': 'Responsive UI',
            'skills.db.modeling': 'Data modeling',
            'skills.other.fullstack': 'Full-stack development',
            'skills.other.automation': 'Process automation',
            'skills.other.integration': 'Systems integration',
            'skills.other.desktop': 'Desktop applications',
            'skills.other.architecture': 'Software architecture',
            'skills.other.patterns': 'Design patterns',
            'skills.other.dsa': 'Data structures & algorithms',
            'skills.other.metrology': 'Optical metrology',
            'skills.soft.written': 'Written communication',
            'skills.soft.critical': 'Critical thinking',
            'skills.soft.problem': 'Problem solving',
            'skills.soft.oral': 'Oral communication & presentation',
            'skills.soft.adapt': 'Adaptability',
            'skills.soft.agile': 'Agile methodologies',
            'skills.soft.team': 'Team collaboration',
            'lang.level.native': 'Native',
            'lang.level.fluent': 'Fluent',
            'lang.level.advanced': 'Advanced',
            'lang.level.intermediate': 'Intermediate (A2)',
            'projects.title': 'Projects',
            'projects.senai.title': 'Metrology Lab Management System',
            'projects.senai.problem': "SENAI's metrology lab needed a single system to manage users, permissions, and service orders instead of relying on manual spreadsheets and paperwork.",
            'projects.senai.solution': 'Built a full management system with role-based permission hierarchy, service-order (OS) workflow, and automatic PDF report generation, backed by a Spring Boot API and PostgreSQL database.',
            'projects.senai.impact': "Digitized the lab's operational workflow end-to-end, from data modeling to backend implementation.",
            'projects.labelProblem': 'Problem',
            'projects.labelSolution': 'Solution',
            'projects.labelImpact': 'Impact',
            'projects.ultralino.badge': 'In progress',
            'projects.ultralino.title': 'Ultralino',
            'projects.ultralino.desc': "A Python + Playwright robot built for SENAI's Food & Beverage lab, automating the registration of hundreds of test variables and analysis notebooks into the UltraLIMS system, eliminating manual, one-by-one data entry and checking for duplicates on every run. Already in production use, with new automations still being developed.",
            'projects.repoLink': 'View on GitHub',
            'projects.blackbox.title': 'Developer Black Box',
            'projects.blackbox.desc': "A local \"black box\" for Windows 11 that records technical process events, crashes and hangs, preserves incident evidence and helps investigate software problems. Privacy first, with everything encrypted on the user's PC and no cloud. Built with Rust, Tauri and React.",
            'contact.title': 'Contact',
            'contact.lead': "Open to opportunities and collaborations. Let's talk.",
            'footer.text': '© 2026 Gabriel Nunes · Goiânia, Brazil'
        },
        pt: {
            'nav.about': 'Sobre',
            'nav.experience': 'Experiência',
            'nav.skills': 'Habilidades',
            'nav.projects': 'Projetos',
            'nav.contact': 'Contato',
            'nav.logoRole': 'Engenheiro de Software',
            'nav.menuToggle': 'Abrir menu',
            'skip.link': 'Pular para o conteúdo',
            'theme.toLight': 'Mudar para tema claro',
            'theme.toDark': 'Mudar para tema escuro',
            'langSwitcher.aria': 'Mudar idioma',
            'hero.badge': 'Ex-estagiário na ZEISS · Alemanha',
            'hero.headline': 'Desenvolvedor Java Júnior construindo produtos full stack e automações escaláveis.',
            'hero.lead': 'Java & Spring Boot, Angular & TypeScript, automação em Python (RPA), PostgreSQL, da modelagem do banco até o deploy. Estudante do último período de Engenharia de Software, com 6 meses de experiência internacional na ZEISS, na Alemanha.',
            'hero.location': '📍 Goiânia, Brasil · aberto a oportunidades remotas e internacionais',
            'hero.cta.projects': 'Ver projetos',
            'hero.cta.cv': 'Baixar currículo',
            'hero.terminal.whoami': 'Gabriel Nunes · Desenvolvedor Java Júnior · Full Stack & RPA',
            'hero.terminal.stack': 'Java · Spring Boot · Angular · Python · Docker',
            'hero.terminal.status': '✓ disponível para oportunidades remotas e internacionais',
            'about.title': 'Sobre mim',
            'about.p1': 'Sou estudante do último período de Engenharia de Software (SENAI FATESG, Goiânia) e desenvolvedor full stack, apaixonado por transformar problemas reais em software funcional, desde a modelagem do banco de dados até a interface que as pessoas realmente usam.',
            'about.p2': 'Meu maior passo até agora foi um estágio internacional de 6 meses na ZEISS, na Alemanha, atuando como desenvolvedor full stack em uma equipe corporativa multicultural. Essa experiência me deu contato direto com desenvolvimento em nível corporativo, práticas ágeis e comunicação internacional.',
            'about.p3': 'Desde maio de 2026 presto serviço por contrato como pesquisador e desenvolvedor de automações (RPA) no Instituto SENAI de Alimentos e Bebidas, com Python, Playwright e Java, e estou aberto a atender outras empresas. Uso IA generativa (Claude) como ferramenta de engenharia no dia a dia: eu defino requisitos, arquitetura e modelagem de dados, e reviso e valido cada trecho de código antes de entregar.',
            'experience.title': 'Experiência',
            'experience.senai.role': 'Engenharia de Software · SENAI FATESG',
            'experience.senai.period': '2023 - Previsão: final de 2026',
            'experience.senai.desc': 'Graduação em Engenharia de Software, com foco em desenvolvimento full stack, bancos de dados, arquitetura de software, design patterns e metodologias ágeis.',
            'experience.fieg.role': 'Estagiário de Engenharia de Software · FIEG',
            'experience.fieg.period': 'Jun/2024 - Dez/2024 · 7 meses',
            'experience.fieg.desc': 'Estágio em engenharia de software na FIEG (Federação das Indústrias do Estado de Goiás), etapa do processo seletivo do SENAI para o intercâmbio internacional na ZEISS, na Alemanha.',
            'experience.senaizeiss.role': 'Estagiário de Desenvolvimento Web e Metrologia · SENAI ZEISS Centro de Excelência em Metrologia',
            'experience.senaizeiss.period': 'Jan/2025 - Set/2025 · 9 meses',
            'experience.senaizeiss.desc': 'Desenvolvimento de aplicações web para projetos técnicos e industriais, além da operação de equipamentos de metrologia de precisão (Duramax, O-Inspect, Prismo, Bosello Max), aplicando princípios de medição no suporte a soluções avançadas de manufatura.',
            'experience.zeiss.role': 'Estagiário Full Stack · ZEISS (Alemanha)',
            'experience.zeiss.period': 'Out/2025 - Mar/2026 · 6 meses',
            'experience.zeiss.desc': 'Estágio internacional na ZEISS, na Alemanha, desenvolvendo aplicações full stack internas dentro de uma equipe corporativa multicultural, do levantamento de requisitos à implementação, testes e manutenção. Contato direto com práticas de engenharia de software e metodologias ágeis em uma empresa global.',
            'experience.hub.role': 'Pesquisador e Desenvolvedor de Automações (RPA) · SENAI HUB Goiás',
            'experience.hub.period': 'Mai/2026 - Atual',
            'experience.hub.desc': 'Pesquisador por contrato no Instituto SENAI de Alimentos e Bebidas (Goiás), desenvolvendo automações de processos (RPA) e sistemas para a rotina de laboratórios: robôs em Python e Playwright para cadastros e downloads em sistemas de gestão laboratorial, um sistema web de rastreamento de amostras (Java, Quarkus, React, SQL Server e Docker) e levantamento de regras de negócio com as equipes, mediando a TI do SENAI e a TI do fornecedor.',
            'skills.hardTitle': 'Competências Técnicas',
            'skills.softTitle': 'Competências Comportamentais',
            'skills.langTitle': 'Idiomas',
            'skills.cat.backend': 'Backend',
            'skills.cat.frontend': 'Frontend',
            'skills.cat.database': 'Banco de Dados',
            'skills.cat.tools': 'Ferramentas',
            'skills.cat.other': 'Outras competências',
            'skills.backend.auth': 'Autenticação',
            'skills.backend.restapi': 'APIs REST',
            'skills.frontend.responsive': 'Interfaces responsivas',
            'skills.db.modeling': 'Modelagem de dados',
            'skills.other.fullstack': 'Desenvolvimento Full Stack',
            'skills.other.automation': 'Automação de processos',
            'skills.other.integration': 'Integração de sistemas',
            'skills.other.desktop': 'Aplicações desktop',
            'skills.other.architecture': 'Arquitetura de software',
            'skills.other.patterns': 'Design patterns',
            'skills.other.dsa': 'Estruturas de dados e algoritmos',
            'skills.other.metrology': 'Metrologia óptica',
            'skills.soft.written': 'Comunicação escrita',
            'skills.soft.critical': 'Pensamento crítico',
            'skills.soft.problem': 'Resolução de problemas',
            'skills.soft.oral': 'Comunicação oral e apresentação',
            'skills.soft.adapt': 'Adaptabilidade',
            'skills.soft.agile': 'Metodologias ágeis',
            'skills.soft.team': 'Trabalho em equipe',
            'lang.level.native': 'Nativo',
            'lang.level.fluent': 'Fluente',
            'lang.level.advanced': 'Avançado',
            'lang.level.intermediate': 'Intermediário (A2)',
            'projects.title': 'Projetos',
            'projects.senai.title': 'Sistema de Gestão para Laboratório de Metrologia',
            'projects.senai.problem': 'O laboratório de metrologia do SENAI precisava de um sistema único para gerenciar usuários, permissões e ordens de serviço, no lugar de planilhas e processos manuais.',
            'projects.senai.solution': 'Desenvolvi um sistema completo de gestão com hierarquia de permissões por perfil, fluxo de Ordens de Serviço e geração automática de relatórios em PDF, com backend em Spring Boot e banco PostgreSQL.',
            'projects.senai.impact': 'Digitalizei o fluxo operacional do laboratório de ponta a ponta, desde a modelagem dos dados até a implementação do backend.',
            'projects.labelProblem': 'Problema',
            'projects.labelSolution': 'Solução',
            'projects.labelImpact': 'Impacto',
            'projects.ultralino.badge': 'Em andamento',
            'projects.ultralino.title': 'Ultralino',
            'projects.ultralino.desc': 'Um robô em Python + Playwright desenvolvido para o laboratório de Alimentos e Bebidas do SENAI, que automatiza o cadastro de centenas de variáveis de ensaio e cadernos de análise no sistema UltraLIMS, eliminando o trabalho manual de cadastro um a um e conferindo duplicidade a cada execução. Já em uso em produção, com novas automações em desenvolvimento.',
            'projects.repoLink': 'Ver no GitHub',
            'projects.blackbox.title': 'Developer Black Box',
            'projects.blackbox.desc': 'Uma "caixa-preta" local para Windows 11 que registra eventos técnicos de processos, travamentos e falhas, preserva evidências de incidentes e ajuda a investigar problemas de software. Privacidade em primeiro lugar, com tudo criptografado no PC do usuário e sem nuvem. Feito com Rust, Tauri e React.',
            'contact.title': 'Contato',
            'contact.lead': 'Aberto a oportunidades e colaborações. Vamos conversar.',
            'footer.text': '© 2026 Gabriel Nunes · Goiânia, Brasil'
        },
        de: {
            'nav.about': 'Über mich',
            'nav.experience': 'Erfahrung',
            'nav.skills': 'Fähigkeiten',
            'nav.projects': 'Projekte',
            'nav.contact': 'Kontakt',
            'nav.logoRole': 'Softwareentwickler',
            'nav.menuToggle': 'Menü öffnen',
            'skip.link': 'Zum Inhalt springen',
            'theme.toLight': 'Zum hellen Modus wechseln',
            'theme.toDark': 'Zum dunklen Modus wechseln',
            'langSwitcher.aria': 'Sprache ändern',
            'hero.badge': 'Ehemaliger Praktikant bei ZEISS · Deutschland',
            'hero.headline': 'Junior-Java-Entwickler, der skalierbare Full-Stack-Produkte und Automatisierungen baut.',
            'hero.lead': 'Java & Spring Boot, Angular & TypeScript, Python-Automatisierung (RPA), PostgreSQL, von der Datenmodellierung bis zum Deployment. Student im letzten Semester der Softwaretechnik, mit 6 Monaten internationaler Erfahrung bei ZEISS in Deutschland.',
            'hero.location': '📍 Goiânia, Brasilien · offen für Remote- und internationale Möglichkeiten',
            'hero.cta.projects': 'Projekte ansehen',
            'hero.cta.cv': 'Lebenslauf herunterladen',
            'hero.terminal.whoami': 'Gabriel Nunes · Junior-Java-Entwickler · Full Stack & RPA',
            'hero.terminal.stack': 'Java · Spring Boot · Angular · Python · Docker',
            'hero.terminal.status': '✓ verfügbar für Remote- und internationale Möglichkeiten',
            'about.title': 'Über mich',
            'about.p1': 'Ich bin Student im letzten Semester der Softwaretechnik (SENAI FATESG, Goiânia) und Full-Stack-Entwickler, der reale Probleme gerne in funktionierende Software verwandelt, vom Datenbankschema bis zur Oberfläche, die Menschen tatsächlich benutzen.',
            'about.p2': 'Mein bisher größter Schritt war ein 6-monatiges internationales Praktikum bei ZEISS in Deutschland, wo ich als Full-Stack-Entwickler in einem multikulturellen Unternehmensteam gearbeitet habe. Das gab mir direkten Einblick in professionelle Softwareentwicklung, agile Praktiken und internationale Kommunikation.',
            'about.p3': 'Seit Mai 2026 arbeite ich auf Vertragsbasis als Forscher und Entwickler von Automatisierungen (RPA) am SENAI-Institut für Lebensmittel und Getränke, mit Python, Playwright und Java, und bin offen für die Zusammenarbeit mit weiteren Unternehmen. Ich nutze generative KI (Claude) im Alltag als Engineering-Werkzeug: Ich lege Anforderungen, Architektur und Datenmodellierung fest und prüfe jeden Codeabschnitt, bevor ich ihn liefere.',
            'experience.title': 'Erfahrung',
            'experience.senai.role': 'Softwaretechnik · SENAI FATESG',
            'experience.senai.period': '2023 - Voraussichtlich Ende 2026',
            'experience.senai.desc': 'Bachelorstudium der Softwaretechnik mit Schwerpunkt auf Full-Stack-Entwicklung, Datenbanken, Softwarearchitektur, Design Patterns und agilen Methoden.',
            'experience.fieg.role': 'Praktikant Softwaretechnik · FIEG',
            'experience.fieg.period': 'Jun. 2024 - Dez. 2024 · 7 Monate',
            'experience.fieg.desc': 'Praktikum in der Softwareentwicklung bei der FIEG (Industrieverband des Bundesstaates Goiás), Teil des SENAI-Auswahlverfahrens für das internationale Austauschprogramm bei ZEISS in Deutschland.',
            'experience.senaizeiss.role': 'Praktikant Webentwicklung & Metrologie · SENAI ZEISS Kompetenzzentrum für Metrologie',
            'experience.senaizeiss.period': 'Jan. 2025 - Sep. 2025 · 9 Monate',
            'experience.senaizeiss.desc': 'Entwicklung von Webanwendungen für technische und industrielle Projekte sowie Bedienung von Präzisionsmesstechnik (Duramax, O-Inspect, Prismo, Bosello Max), Anwendung von Messprinzipien zur Unterstützung fortschrittlicher Fertigungslösungen.',
            'experience.zeiss.role': 'Praktikant Full-Stack-Entwicklung · ZEISS (Deutschland)',
            'experience.zeiss.period': 'Okt. 2025 - März 2026 · 6 Monate',
            'experience.zeiss.desc': 'Internationales Praktikum bei ZEISS in Deutschland, Entwicklung interner Full-Stack-Anwendungen in einem multikulturellen Unternehmensteam, von der Anforderungsanalyse bis zu Implementierung, Tests und Wartung. Direkter Einblick in Software-Engineering-Praktiken und agile Methoden in einem globalen Unternehmen.',
            'experience.hub.role': 'Forscher & RPA-Automatisierungsentwickler · SENAI HUB Goiás',
            'experience.hub.period': 'Mai 2026 - heute',
            'experience.hub.desc': 'Forscher auf Vertragsbasis am SENAI-Institut für Lebensmittel und Getränke (Goiás). Entwicklung von Prozessautomatisierungen (RPA) und Systemen für den Laboralltag: Python- und Playwright-Roboter für Eingaben und Downloads in Laborverwaltungssystemen, ein Websystem zur Probenverfolgung (Java, Quarkus, React, SQL Server und Docker) sowie die Erhebung von Geschäftsregeln mit den Laborteams, in Vermittlung zwischen der SENAI-IT und der IT des Anbieters.',
            'skills.hardTitle': 'Fachliche Fähigkeiten',
            'skills.softTitle': 'Soziale Kompetenzen',
            'skills.langTitle': 'Sprachen',
            'skills.cat.backend': 'Backend',
            'skills.cat.frontend': 'Frontend',
            'skills.cat.database': 'Datenbank',
            'skills.cat.tools': 'Werkzeuge',
            'skills.cat.other': 'Weitere Kompetenzen',
            'skills.backend.auth': 'Authentifizierung',
            'skills.backend.restapi': 'REST-APIs',
            'skills.frontend.responsive': 'Responsives UI',
            'skills.db.modeling': 'Datenmodellierung',
            'skills.other.fullstack': 'Full-Stack-Entwicklung',
            'skills.other.automation': 'Prozessautomatisierung',
            'skills.other.integration': 'Systemintegration',
            'skills.other.desktop': 'Desktop-Anwendungen',
            'skills.other.architecture': 'Softwarearchitektur',
            'skills.other.patterns': 'Design Patterns',
            'skills.other.dsa': 'Datenstrukturen & Algorithmen',
            'skills.other.metrology': 'Optische Metrologie',
            'skills.soft.written': 'Schriftliche Kommunikation',
            'skills.soft.critical': 'Kritisches Denken',
            'skills.soft.problem': 'Problemlösung',
            'skills.soft.oral': 'Mündliche Kommunikation & Präsentation',
            'skills.soft.adapt': 'Anpassungsfähigkeit',
            'skills.soft.agile': 'Agile Methoden',
            'skills.soft.team': 'Teamarbeit',
            'lang.level.native': 'Muttersprache',
            'lang.level.fluent': 'Fließend',
            'lang.level.advanced': 'Fortgeschritten',
            'lang.level.intermediate': 'Mittelstufe (A2)',
            'projects.title': 'Projekte',
            'projects.senai.title': 'Verwaltungssystem für Metrologie-Labor',
            'projects.senai.problem': 'Das Metrologie-Labor des SENAI benötigte ein einziges System zur Verwaltung von Nutzern, Berechtigungen und Serviceaufträgen, anstatt sich auf manuelle Tabellen und Papierkram zu verlassen.',
            'projects.senai.solution': 'Ich entwickelte ein vollständiges Verwaltungssystem mit rollenbasierter Berechtigungshierarchie, einem Workflow für Serviceaufträge und automatischer PDF-Berichterstellung, unterstützt durch eine Spring-Boot-API und eine PostgreSQL-Datenbank.',
            'projects.senai.impact': 'Digitalisierte den betrieblichen Arbeitsablauf des Labors durchgängig, von der Datenmodellierung bis zur Backend-Implementierung.',
            'projects.labelProblem': 'Problem',
            'projects.labelSolution': 'Lösung',
            'projects.labelImpact': 'Auswirkung',
            'projects.ultralino.badge': 'In Arbeit',
            'projects.ultralino.title': 'Ultralino',
            'projects.ultralino.desc': 'Ein Python + Playwright Robot, entwickelt für das Lebensmittel- und Getränkelabor des SENAI, der die Registrierung von Hunderten Testvariablen und Analyseprotokollen im UltraLIMS-System automatisiert, und so die manuelle Eintragung Stück für Stück überflüssig macht und bei jedem Lauf auf Duplikate prüft. Bereits im produktiven Einsatz, mit laufend neuen Automatisierungen in Entwicklung.',
            'projects.repoLink': 'Auf GitHub ansehen',
            'projects.blackbox.title': 'Developer Black Box',
            'projects.blackbox.desc': 'Eine lokale „Blackbox“ für Windows 11, die technische Prozessereignisse, Abstürze und Hänger aufzeichnet, Beweise für Vorfälle sichert und bei der Untersuchung von Softwareproblemen hilft. Datenschutz zuerst, alles verschlüsselt auf dem PC des Nutzers und ohne Cloud. Entwickelt mit Rust, Tauri und React.',
            'contact.title': 'Kontakt',
            'contact.lead': 'Offen für Gelegenheiten und Zusammenarbeit. Lass uns reden.',
            'footer.text': '© 2026 Gabriel Nunes · Goiânia, Brasilien'
        },
        es: {
            'nav.about': 'Sobre mí',
            'nav.experience': 'Experiencia',
            'nav.skills': 'Habilidades',
            'nav.projects': 'Proyectos',
            'nav.contact': 'Contacto',
            'nav.logoRole': 'Ingeniero de Software',
            'nav.menuToggle': 'Abrir menú',
            'skip.link': 'Saltar al contenido',
            'theme.toLight': 'Cambiar a modo claro',
            'theme.toDark': 'Cambiar a modo oscuro',
            'langSwitcher.aria': 'Cambiar idioma',
            'hero.badge': 'Ex-becario en ZEISS · Alemania',
            'hero.headline': 'Desarrollador Java Junior que construye productos full stack y automatizaciones escalables.',
            'hero.lead': 'Java & Spring Boot, Angular & TypeScript, automatización con Python (RPA), PostgreSQL, desde el modelado de datos hasta el despliegue. Estudiante del último semestre de Ingeniería de Software, con 6 meses de experiencia internacional en ZEISS, en Alemania.',
            'hero.location': '📍 Goiânia, Brasil · abierto a oportunidades remotas e internacionales',
            'hero.cta.projects': 'Ver proyectos',
            'hero.cta.cv': 'Descargar CV',
            'hero.terminal.whoami': 'Gabriel Nunes · Desarrollador Java Junior · Full Stack & RPA',
            'hero.terminal.stack': 'Java · Spring Boot · Angular · Python · Docker',
            'hero.terminal.status': '✓ disponible para oportunidades remotas e internacionales',
            'about.title': 'Sobre mí',
            'about.p1': 'Soy estudiante del último período de Ingeniería de Software (SENAI FATESG, Goiânia) y desarrollador full stack, apasionado por transformar problemas reales en software funcional, desde el modelado de la base de datos hasta la interfaz que las personas realmente usan.',
            'about.p2': 'Mi mayor paso hasta ahora fue una pasantía internacional de 6 meses en ZEISS, en Alemania, trabajando como desarrollador full stack dentro de un equipo corporativo multicultural. Esa experiencia me dio contacto directo con el desarrollo a nivel corporativo, prácticas ágiles y comunicación internacional.',
            'about.p3': 'Desde mayo de 2026 presto servicios por contrato como investigador y desarrollador de automatizaciones (RPA) en el Instituto SENAI de Alimentos y Bebidas, con Python, Playwright y Java, y estoy abierto a atender a otras empresas. Uso IA generativa (Claude) como herramienta de ingeniería en el día a día: defino los requisitos, la arquitectura y el modelado de datos, y reviso y valido cada fragmento de código antes de entregarlo.',
            'experience.title': 'Experiencia',
            'experience.senai.role': 'Ingeniería de Software · SENAI FATESG',
            'experience.senai.period': '2023 - Previsto para fines de 2026',
            'experience.senai.desc': 'Grado en Ingeniería de Software, con enfoque en desarrollo full stack, bases de datos, arquitectura de software, patrones de diseño y metodologías ágiles.',
            'experience.fieg.role': 'Pasante de Ingeniería de Software · FIEG',
            'experience.fieg.period': 'Jun. 2024 - Dic. 2024 · 7 meses',
            'experience.fieg.desc': 'Pasantía en ingeniería de software en la FIEG (Federación de las Industrias del Estado de Goiás), etapa del proceso de selección del SENAI para el intercambio internacional en ZEISS, Alemania.',
            'experience.senaizeiss.role': 'Pasante de Desarrollo Web y Metrología · SENAI ZEISS Centro de Excelencia en Metrología',
            'experience.senaizeiss.period': 'Ene. 2025 - Sep. 2025 · 9 meses',
            'experience.senaizeiss.desc': 'Desarrollo de aplicaciones web para proyectos técnicos e industriales, además de operar equipos de metrología de precisión (Duramax, O-Inspect, Prismo, Bosello Max), aplicando principios de medición en apoyo a soluciones avanzadas de manufactura.',
            'experience.zeiss.role': 'Pasante Full Stack · ZEISS (Alemania)',
            'experience.zeiss.period': 'Oct. 2025 - Mar. 2026 · 6 meses',
            'experience.zeiss.desc': 'Pasantía internacional en ZEISS, Alemania, desarrollando aplicaciones full stack internas dentro de un equipo corporativo multicultural, desde el relevamiento de requisitos hasta la implementación, pruebas y mantenimiento. Contacto directo con prácticas de ingeniería de software y metodologías ágiles en una empresa global.',
            'experience.hub.role': 'Investigador y Desarrollador de Automatizaciones (RPA) · SENAI HUB Goiás',
            'experience.hub.period': 'May. 2026 - actualidad',
            'experience.hub.desc': 'Investigador por contrato en el Instituto SENAI de Alimentos y Bebidas (Goiás), desarrollando automatizaciones de procesos (RPA) y sistemas para la rutina de los laboratorios: robots en Python y Playwright para registros y descargas en sistemas de gestión de laboratorio, un sistema web de seguimiento de muestras (Java, Quarkus, React, SQL Server y Docker) y levantamiento de reglas de negocio con los equipos, mediando entre la TI del SENAI y la TI del proveedor.',
            'skills.hardTitle': 'Competencias Técnicas',
            'skills.softTitle': 'Competencias Blandas',
            'skills.langTitle': 'Idiomas',
            'skills.cat.backend': 'Backend',
            'skills.cat.frontend': 'Frontend',
            'skills.cat.database': 'Base de Datos',
            'skills.cat.tools': 'Herramientas',
            'skills.cat.other': 'Otras competencias',
            'skills.backend.auth': 'Autenticación',
            'skills.backend.restapi': 'APIs REST',
            'skills.frontend.responsive': 'UI responsiva',
            'skills.db.modeling': 'Modelado de datos',
            'skills.other.fullstack': 'Desarrollo Full Stack',
            'skills.other.automation': 'Automatización de procesos',
            'skills.other.integration': 'Integración de sistemas',
            'skills.other.desktop': 'Aplicaciones de escritorio',
            'skills.other.architecture': 'Arquitectura de software',
            'skills.other.patterns': 'Patrones de diseño',
            'skills.other.dsa': 'Estructuras de datos y algoritmos',
            'skills.other.metrology': 'Metrología óptica',
            'skills.soft.written': 'Comunicación escrita',
            'skills.soft.critical': 'Pensamiento crítico',
            'skills.soft.problem': 'Resolución de problemas',
            'skills.soft.oral': 'Comunicación oral y presentación',
            'skills.soft.adapt': 'Adaptabilidad',
            'skills.soft.agile': 'Metodologías ágiles',
            'skills.soft.team': 'Trabajo en equipo',
            'lang.level.native': 'Nativo',
            'lang.level.fluent': 'Fluido',
            'lang.level.advanced': 'Avanzado',
            'lang.level.intermediate': 'Intermedio (A2)',
            'projects.title': 'Proyectos',
            'projects.senai.title': 'Sistema de Gestión para Laboratorio de Metrología',
            'projects.senai.problem': 'El laboratorio de metrología del SENAI necesitaba un sistema único para gestionar usuarios, permisos y órdenes de servicio, en lugar de depender de hojas de cálculo y procesos manuales.',
            'projects.senai.solution': 'Desarrollé un sistema completo de gestión con jerarquía de permisos por perfil, flujo de Órdenes de Servicio y generación automática de informes en PDF, con backend en Spring Boot y base de datos PostgreSQL.',
            'projects.senai.impact': 'Digitalicé el flujo operativo del laboratorio de extremo a extremo, desde el modelado de datos hasta la implementación del backend.',
            'projects.labelProblem': 'Problema',
            'projects.labelSolution': 'Solución',
            'projects.labelImpact': 'Impacto',
            'projects.ultralino.badge': 'En curso',
            'projects.ultralino.title': 'Ultralino',
            'projects.ultralino.desc': 'Un robot en Python + Playwright desarrollado para el laboratorio de Alimentos y Bebidas del SENAI, que automatiza el registro de cientos de variables de ensayo y cuadernos de análisis en el sistema UltraLIMS, eliminando el trabajo manual de registro uno por uno y verificando duplicados en cada ejecución. Ya en uso en producción, con nuevas automatizaciones en desarrollo.',
            'projects.repoLink': 'Ver en GitHub',
            'projects.blackbox.title': 'Developer Black Box',
            'projects.blackbox.desc': 'Una "caja negra" local para Windows 11 que registra eventos técnicos de procesos, fallos y bloqueos, conserva evidencias de incidentes y ayuda a investigar problemas de software. Privacidad primero, con todo cifrado en el PC del usuario y sin nube. Hecho con Rust, Tauri y React.',
            'contact.title': 'Contacto',
            'contact.lead': 'Abierto a oportunidades y colaboraciones. Hablemos.',
            'footer.text': '© 2026 Gabriel Nunes · Goiânia, Brasil'
        }
    };

    function resolveLanguage(stored, browserLang) {
        if (SUPPORTED.indexOf(stored) !== -1) return stored;
        var short = (browserLang || '').slice(0, 2).toLowerCase();
        return SUPPORTED.indexOf(short) !== -1 ? short : 'en';
    }

    function t(key) {
        var lang = document.documentElement.getAttribute('lang') || 'en';
        return (dict[lang] && dict[lang][key]) || dict.en[key] || key;
    }

    function applyTranslations(lang) {
        document.documentElement.setAttribute('lang', lang);

        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            var value = (dict[lang] && dict[lang][key]) || dict.en[key];
            if (value !== undefined) el.textContent = value;
        });

        document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
            el.getAttribute('data-i18n-attr').split(',').forEach(function (pair) {
                var parts = pair.split(':');
                var attr = parts[0].trim();
                var key = parts[1].trim();
                var value = (dict[lang] && dict[lang][key]) || dict.en[key];
                if (value !== undefined) el.setAttribute(attr, value);
            });
        });

        var flagEl = document.querySelector('.lang-current-flag');
        if (flagEl) flagEl.className = 'fi ' + FLAGS[lang] + ' lang-current-flag';
        var nameEl = document.querySelector('.lang-current-name');
        if (nameEl) nameEl.textContent = NAMES[lang];

        document.querySelectorAll('.lang-option').forEach(function (opt) {
            var selected = opt.getAttribute('data-lang') === lang;
            opt.setAttribute('aria-selected', selected ? 'true' : 'false');
        });
    }

    function setLanguage(lang, persist) {
        if (SUPPORTED.indexOf(lang) === -1) lang = 'en';
        if (persist) localStorage.setItem(STORAGE_KEY, lang);
        applyTranslations(lang);
    }

    function initDropdown() {
        var toggle = document.querySelector('.lang-toggle');
        var menu = document.querySelector('.lang-menu');
        if (!toggle || !menu) return;

        var options = Array.prototype.slice.call(menu.querySelectorAll('.lang-option'));

        function close() {
            menu.hidden = true;
            toggle.setAttribute('aria-expanded', 'false');
        }
        function open() {
            menu.hidden = false;
            toggle.setAttribute('aria-expanded', 'true');
        }
        function focusOption(index) {
            var clamped = (index + options.length) % options.length;
            options[clamped].focus();
        }

        toggle.addEventListener('click', function () {
            if (menu.hidden) open(); else close();
        });
        toggle.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                open();
                var selectedIndex = options.findIndex(function (opt) {
                    return opt.getAttribute('aria-selected') === 'true';
                });
                focusOption(e.key === 'ArrowDown' ? (selectedIndex + 1) : (selectedIndex - 1));
            }
        });
        document.addEventListener('click', function (e) {
            if (!menu.hidden && !e.target.closest('.lang-switcher')) close();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && !menu.hidden) {
                close();
                toggle.focus();
            }
        });
        options.forEach(function (opt, index) {
            opt.addEventListener('click', function () {
                setLanguage(opt.getAttribute('data-lang'), true);
                close();
                toggle.focus();
            });
            opt.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setLanguage(opt.getAttribute('data-lang'), true);
                    close();
                    toggle.focus();
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    focusOption(index + 1);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    focusOption(index - 1);
                }
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        var stored = localStorage.getItem(STORAGE_KEY);
        var lang = resolveLanguage(stored, navigator.language);
        applyTranslations(lang);
        initDropdown();
    });

    window.i18n = {
        resolveLanguage: resolveLanguage,
        setLanguage: setLanguage,
        t: t,
        SUPPORTED: SUPPORTED
    };
})();
