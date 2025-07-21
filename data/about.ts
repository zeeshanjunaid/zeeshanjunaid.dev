import {
  AmazonwebservicesOriginalWordmark,
  AzureOriginal,
  BitbucketOriginal,
  BootstrapOriginal,
  COriginal,
  CircleciPlain,
  ComposerOriginal,
  Css3Original,
  CypressioOriginal,
  DockerOriginal,
  DrupalOriginal,
  ExpressOriginal,
  FigmaOriginal,
  FirebaseOriginal,
  FoundationOriginal,
  FramermotionOriginal,
  FramermotionOriginalWordmark,
  GatsbyOriginal,
  GitOriginal,
  GithubOriginal,
  GitlabOriginal,
  GoogleOriginal,
  GooglecloudOriginal,
  GraphqlPlain,
  GulpPlain,
  HerokuOriginal,
  Html5Original,
  HugoOriginal,
  IllustratorPlain,
  JavaOriginal,
  JavascriptOriginal,
  JenkinsOriginal,
  JestPlain,
  JunitOriginal,
  LaravelOriginal,
  LessPlainWordmark,
  MaterialuiOriginal,
  MochaOriginal,
  MongodbOriginal,
  MysqlOriginal,
  MysqlPlainWordmark,
  NextjsOriginal,
  NodejsOriginal,
  NpmOriginalWordmark,
  PhotoshopOriginal,
  PostcssOriginal,
  PostgresqlOriginal,
  PrismaOriginal,
  PypiOriginal,
  PythonOriginal,
  ReactOriginal,
  SanityOriginal,
  SassOriginal,
  SeleniumOriginal,
  SketchOriginal,
  SqldeveloperPlain,
  SqliteOriginal,
  SupabaseOriginal,
  TailwindcssOriginal,
  ThreejsOriginal,
  TravisOriginal,
  ViteOriginal,
  VuejsOriginal,
  WebflowOriginal,
  WebpackOriginal,
  WordpressOriginal,
  XdOriginal,
  YarnOriginal,
} from "devicons-react";

export interface SkillProps {
  name: string;
  icon?: any;
  link?: string;
}
interface SkillSetProps {
  name: string;
  skills: SkillProps[];
}

export const Skillset: SkillSetProps[] = [
  {
    name: "Programming Languages",
    skills: [
      {
        name: "HTML",
        icon: Html5Original,
        link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      },
      {
        name: "HTMX",
        link: "https://htmx.org",
      },
      {
        name: "CSS",
        icon: Css3Original,
        link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      },
      {
        name: "Javascript",
        icon: JavascriptOriginal,
        link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      {
        name: "Python",
        icon: PythonOriginal,
        link: "https://www.python.org/about/",
      },
      {
        name: "Java",
        icon: JavaOriginal,
        link: "https://www.java.com/en/download/help/whatis_java.html",
      },
      {
        name: "C / C++",
        icon: COriginal,
        link: "https://en.wikipedia.org/wiki/C_(programming_language)",
      },
    ],
  },
  {
    name: "Frontend Frameworks",
    skills: [
      {
        name: "React",
        icon: ReactOriginal,
        link: "https://reactjs.org/docs/getting-started.html",
      },
      {
        name: "Next.js",
        icon: NextjsOriginal,
        link: "https://nextjs.org/docs",
      },
      {
        name: "Gatsby.js",
        icon: GatsbyOriginal,
        link: "https://www.gatsbyjs.com/",
      },
      {
        name: "Vite",
        icon: ViteOriginal,
        link: "https://vitejs.dev/",
      },
      {
        name: "Create React App",
        link: "https://create-react-app.dev/",
      },
      {
        name: "Vue",
        icon: VuejsOriginal,
        link: "https://vuejs.org/",
      },
      {
        name: "Hugo",
        icon: HugoOriginal,
        link: "https://gohugo.io/",
      },
    ],
  },
  {
    name: "CSS Tools/Libs/Frameworks",
    skills: [
      {
        name: "Sass",
        icon: SassOriginal,
        link: "https://sass-lang.com/guide",
      },

      {
        name: "Less",
        icon: LessPlainWordmark,
        link: "https://lesscss.org/",
      },
      {
        name: "PostCSS",
        icon: PostcssOriginal,
        link: "https://postcss.org/",
      },
      {
        name: "Bootstrap",
        icon: BootstrapOriginal,
        link: "https://getbootstrap.com/",
      },
      {
        name: "Tailwind CSS",
        icon: TailwindcssOriginal,
        link: "https://tailwindcss.com/",
      },
      {
        name: "Foundation Zurb",
        icon: FoundationOriginal,
        link: "https://zurb.com/foundation/",
      },
      {
        name: "Material UI",
        icon: MaterialuiOriginal,
        link: "https://mui.com/",
      },
      {
        name: "shadcn/ui",
        link: "https://ui.shadcn.com/",
      },
      {
        name: "Styled Components",
        link: "https://styled-components.com/",
      },
    ],
  },
  {
    name: "Animations",
    skills: [
      {
        name: "Gsap",
        link: "https://greensock.com/gsap/",
      },
      {
        name: "Framer Motion",
        link: "https://www.framer.com/motion/",
        icon: FramermotionOriginalWordmark,
      },
      {
        name: "Three.js",
        link: "https://threejs.org/",
        icon: ThreejsOriginal,
      },
    ],
  },
  {
    name: "Databases",
    skills: [
      {
        name: "MySQL",
        icon: MysqlOriginal,
        link: "https://www.mysql.com/",
      },
      {
        name: "MongoDB",
        icon: MongodbOriginal,
        link: "https://www.mongodb.com/",
      },
      {
        name: "PostgreSQL",
        icon: PostgresqlOriginal,
        link: "https://www.postgresql.org/",
      },
      {
        name: "SQLite",
        icon: SqliteOriginal,
        link: "https://www.sqlite.org/",
      },
      {
        name: "Firebase",
        icon: FirebaseOriginal,
        link: "https://firebase.google.com/",
      },
      {
        name: "Supabase",
        icon: SupabaseOriginal,
        link: "https://supabase.com/",
      },
      {
        name: "Prisma",
        icon: PrismaOriginal,
        link: "https://www.prisma.io/",
      },
    ],
  },
  {
    name: "Web Stacks",
    skills: [
      {
        name: "MERN",
      },
      {
        name: "XAMP",
      },
      {
        name: "JAMstack",
      },
    ],
  },
  {
    name: "Backend Languages",
    skills: [
      {
        name: "Node.js",
        icon: NodejsOriginal,
        link: "https://nodejs.org/en/",
      },
      {
        name: "Express.js",
        icon: ExpressOriginal,
        link: "https://expressjs.com/",
      },
      {
        name: "Laravel",
        icon: LaravelOriginal,
        link: "https://laravel.com/",
      },
    ],
  },
  {
    name: "Query Languages",
    skills: [
      {
        name: "Graphql",
        icon: GraphqlPlain,
        link: "https://graphql.org/",
      },
      {
        name: "SQL",
        icon: SqldeveloperPlain,
        link: "https://aws.amazon.com/what-is/sql/#:~:text=Structured%20query%20language%20(SQL)%20is,relationships%20between%20the%20data%20values.",
      },
      {
        name: "MongoDB Query Language (MQL)",
        icon: MysqlPlainWordmark,
        link: "https://www.mongodb.com/developer/products/atlas/getting-started-atlas-mongodb-query-language-mql/?tck=docs_chatbot",
      },
    ],
  },
  {
    name: "Web Technologies",
    skills: [
      {
        name: "Restful APIs",
        link: "https://aws.amazon.com/what-is/restful-api/#:~:text=RESTful%20API%20is%20an%20interface,applications%20to%20perform%20various%20tasks.",
      },
      {
        name: "Ajax",
        link: "https://en.wikipedia.org/wiki/Ajax",
      },
      {
        name: "JSON",
        link: "https://en.wikipedia.org/wiki/JSON",
      },
      {
        name: "WebSockets",
        link: "https://en.wikipedia.org/wiki/WebSocket",
      },
      {
        name: "WebRTC",
        link: "https://en.wikipedia.org/wiki/WebRTC",
      },
    ],
  },
  {
    name: "Version Control",
    skills: [
      {
        name: "Git",
        icon: GitOriginal,
        link: "https://git-scm.com/",
      },
      {
        name: "Github",
        icon: GithubOriginal,
        link: "https://github.com/",
      },
      {
        name: "Gitlab",
        icon: GitlabOriginal,
        link: "https://about.gitlab.com/",
      },
      {
        name: "Bitbucket",
        icon: BitbucketOriginal,
        link: "https://www.bitbucket.org/",
      },
    ],
  },
  {
    name: "Build Tools",
    skills: [
      {
        name: "Webpack",
        icon: WebpackOriginal,
        link: "https://webpack.js.org/",
      },
      {
        name: "Gulp",
        icon: GulpPlain,
        link: "https://gulpjs.com/",
      },

      {
        name: "Turbo",
      },
      {
        name: "Jenkins",
        icon: JenkinsOriginal,
        link: "https://www.jenkins.io/",
      },
      {
        name: "Travis CI",
        icon: TravisOriginal,
        link: "https://travis-ci.org/",
      },
      {
        name: "CircleCI",
        icon: CircleciPlain,
        link: "https://circleci.com/",
      },
      {
        name: "Docker",
        icon: DockerOriginal,
        link: "https://www.docker.com/",
      },
    ],
  },
  {
    name: "Analytics",
    skills: [
      {
        name: "Google Analytics",
        icon: GoogleOriginal,
        link: "https://analytics.google.com/",
      },
      {
        name: "Mixpanel",
        link: "https://mixpanel.com/",
      },
      {
        name: "Hotjar",
        link: "https://www.hotjar.com/",
      },
      {
        name: "Amplitude",
        link: "https://amplitude.com/",
      },
    ],
  },
  {
    name: "Security",
    skills: [
      {
        name: "SSL implementation",
        link: "https://en.wikipedia.org/wiki/SSL#Implementations",
      },
      {
        name: "OWASP best practices",
        link: "https://owasp.org/www-project-top-ten/",
      },
      {
        name: "Penetration testing",
        link: "https://www.cloudflare.com/learning/security/glossary/what-is-penetration-testing/#:~:text=Penetration%20testing%20(or%20pen%20testing,attackers%20could%20take%20advantage%20of.",
      },
    ],
  },
  {
    name: "Testing",
    skills: [
      {
        name: "Jest",
        icon: JestPlain,
        link: "https://jestjs.io/docs/getting-started",
      },
      {
        name: "Mocha",
        icon: MochaOriginal,
        link: "https://mochajs.org/",
      },
      {
        name: "Selenium",
        icon: SeleniumOriginal,
        link: "https://www.selenium.dev/",
      },
      {
        name: "JUnit",
        icon: JunitOriginal,
        link: "https://junit.org/junit5/",
      },
      {
        name: "Cypress",
        icon: CypressioOriginal,
        link: "https://www.cypress.io/",
      },
    ],
  },
  {
    name: "Package Managers",
    skills: [
      {
        name: "Npm",
        icon: NpmOriginalWordmark,
        link: "https://npmjs.com/",
      },
      {
        name: "Yarn",
        icon: YarnOriginal,
        link: "https://yarnpkg.com/en/docs/",
      },
      {
        name: "Pip",
        icon: PypiOriginal,
        link: "https://pip.pypa.io/",
      },
      {
        name: "Composer",
        icon: ComposerOriginal,
        link: "https://getcomposer.org/doc/01-basic-usage.md",
      },
    ],
  },
  {
    name: "Cloud Platforms",
    skills: [
      {
        name: "AWS",
        icon: AmazonwebservicesOriginalWordmark,
        link: "https://aws.amazon.com/",
      },
      {
        name: "Google Cloud Platform",
        icon: GooglecloudOriginal,
        link: "https://cloud.google.com/",
      },
      {
        name: "Microsoft Azure",
        icon: AzureOriginal,
        link: "https://azure.microsoft.com/en-us/",
      },
      {
        name: "Heroku",
        icon: HerokuOriginal,
        link: "https://www.heroku.com/",
      },
    ],
  },
  {
    name: "Networking",
    skills: [
      {
        name: "DNS management",
        link: "https://en.wikipedia.org/wiki/DNS#Management",
      },
      {
        name: "CDN implementation",
        link: "https://en.wikipedia.org/wiki/Content_delivery_network",
      },
      {
        name: "Load balancing",
        link: "https://en.wikipedia.org/wiki/Load_balancing",
      },
    ],
  },
  {
    name: "Design Tools",
    skills: [
      {
        name: "Figma",
        icon: FigmaOriginal,
        link: "https://www.figma.com/",
      },
      {
        name: "Sketch",
        icon: SketchOriginal,
        link: "https://www.sketch.com/",
      },
      {
        name: "Adobe XD",
        icon: XdOriginal,
        link: "https://www.adobe.com/products/xd.html",
      },
      {
        name: "InVision",
        link: "https://www.invisionapp.com/",
      },
      {
        name: "Photoshop",
        icon: PhotoshopOriginal,
        link: "https://www.adobe.com/products/photoshop.html",
      },
      {
        name: "Illustrator",
        icon: IllustratorPlain,
        link: "https://www.adobe.com/products/illustrator.html",
      },
    ],
  },
  {
    name: "No Code Tools",
    skills: [
      {
        name: "Bubble",
        link: "https://bubble.io/",
      },
      {
        name: "Webflow",
        icon: WebflowOriginal,
        link: "https://www.webflow.com/",
      },
      {
        name: "Wix",
        link: "https://www.wix.com/",
      },
      {
        name: "Framer",
        icon: FramermotionOriginal,
        link: "https://www.framer.com/",
      },
    ],
  },
  {
    name: "Content Management Systems",
    skills: [
      {
        name: "WordPress",
        icon: WordpressOriginal,
        link: "https://wordpress.org/",
      },
      {
        name: "Shopify",
        link: "https://www.shopify.com/",
      },
      {
        name: "Drupal",
        link: "https://www.drupal.org/",
        icon: DrupalOriginal,
      },
      {
        name: "Joomla",
        link: "https://www.joomla.org/",
      },
      {
        name: "Contentful",
        link: "https://www.contentful.com/",
      },
      {
        name: "Prismic",
        link: "https://www.prismic.io/",
      },
      {
        name: "Sanity",
        link: "https://www.sanity.io/",
        icon: SanityOriginal,
      },
      {
        name: "Strapi",
        link: "https://strapi.io/",
      },
    ],
  },
];
export interface WorkExperienceProps {
  duration: string;
  role: string;
  company: string;
  companyLink: string;
  description: string;
  technologies: string[];
}
export const WorkExperience: WorkExperienceProps[] = [
  {
    duration: "2023 - Present",
    role: "Frontend developer",
    company: "Passage Protocol",
    companyLink: "https://passage.xyz/",
    description:
      "Led the frontend development for a critical crypto-powered membership engine. My work directly contributed to simplifying complex Web3 interactions for users, resulting in a more intuitive product and faster user adoption. Delivered a high-performance single-page application that became central to the company's product offering.",
    technologies: [
      "React",
      "Node.js",
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Framer Motion",
      "Webflow",
      "Web 3.0",
    ],
  },
  {
    duration: "2022 - 2023",
    role: "Frontend Developer",
    company: "Ledgy",
    companyLink: "https://ledgy.com/",
    description:
      "Enhanced the equity management platform's user experience and performance, directly impacting user satisfaction and platform adoption. Implemented modern content management solutions that improved the team's workflow efficiency and reduced content update times by 60%.",
    technologies: [
      "React",
      "Node.js",
      "Gatsby.js",
      "Contentful",
      "TypeScript",
      "Framer Motion",
    ],
  },
  {
    duration: "2020 - 2022",
    role: "Fullstack Designer & Developer",
    company: "Mindable Media",
    companyLink: "https://mindable.com/",
    description:
      "Bridged the gap between design and development to deliver cohesive digital experiences for clients. My dual expertise resulted in faster project delivery and better design-to-development handoffs, leading to a 40% reduction in revision cycles and higher client satisfaction scores.",
    technologies: [
      "React",
      "Node.js",
      "Next.js",
      "Gatsby.js",
      "Wordpress",
      "Framer Motion",
      "Figma",
    ],
  },
  {
    duration: "2018 - 2020",
    role: "Fullstack Developer",
    company: "The Bureau Dubai",
    companyLink: "https://thebureaubc.com",
    description:
      "Developed scalable web solutions that directly supported the company's growth and client acquisition goals. My work on responsive, user-friendly websites contributed to improved client engagement metrics and helped establish the company's strong digital presence in the competitive Dubai market.",
    technologies: ["Php", "Adobe XD", "Wordpress"],
  },
];

// Core skillset for About page - focused and specialized
export const CoreSkillset: SkillSetProps[] = [
  {
    name: "Frontend Development",
    skills: [
      {
        name: "React",
        icon: ReactOriginal,
        link: "https://reactjs.org/docs/getting-started.html",
      },
      {
        name: "Next.js",
        icon: NextjsOriginal,
        link: "https://nextjs.org/docs",
      },
      {
        name: "TypeScript",
        link: "https://www.typescriptlang.org/",
      },
      {
        name: "Tailwind CSS",
        icon: TailwindcssOriginal,
        link: "https://tailwindcss.com/",
      },
      {
        name: "Framer Motion",
        link: "https://www.framer.com/motion/",
        icon: FramermotionOriginalWordmark,
      },
    ],
  },
  {
    name: "UI/UX Design",
    skills: [
      {
        name: "Figma",
        icon: FigmaOriginal,
        link: "https://www.figma.com/",
      },
      {
        name: "Adobe XD",
        icon: XdOriginal,
        link: "https://www.adobe.com/products/xd.html",
      },
      {
        name: "User Research",
        link: "https://www.nngroup.com/articles/which-ux-research-methods/",
      },
      {
        name: "Prototyping",
        link: "https://www.interaction-design.org/literature/topics/prototyping",
      },
    ],
  },
  {
    name: "CMS & E-commerce",
    skills: [
      {
        name: "Webflow",
        icon: WebflowOriginal,
        link: "https://www.webflow.com/",
      },
      {
        name: "Shopify",
        link: "https://www.shopify.com/",
      },
      {
        name: "WordPress",
        icon: WordpressOriginal,
        link: "https://wordpress.org/",
      },
      {
        name: "Contentful",
        link: "https://www.contentful.com/",
      },
    ],
  },
  {
    name: "Backend & Database",
    skills: [
      {
        name: "Node.js",
        icon: NodejsOriginal,
        link: "https://nodejs.org/en/",
      },
      {
        name: "Supabase",
        icon: SupabaseOriginal,
        link: "https://supabase.com/",
      },
      {
        name: "PostgreSQL",
        icon: PostgresqlOriginal,
        link: "https://www.postgresql.org/",
      },
      {
        name: "Firebase",
        icon: FirebaseOriginal,
        link: "https://firebase.google.com/",
      },
    ],
  },
];
