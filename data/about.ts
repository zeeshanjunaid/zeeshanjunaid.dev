import {
  BootstrapOriginal,
  COriginal,
  Css3Original,
  FirebaseOriginal,
  FoundationOriginal,
  GatsbyOriginal,
  Html5Original,
  HugoOriginal,
  JavaOriginal,
  JavascriptOriginal,
  LessPlainWordmark,
  MaterialuiOriginal,
  MongodbOriginal,
  MysqlOriginal,
  NextjsOriginal,
  PostcssOriginal,
  PostgresqlOriginal,
  PythonOriginal,
  ReactOriginal,
  SassOriginal,
  SqliteOriginal,
  SupabaseOriginal,
  TailwindcssOriginal,
  ViteOriginal,
  VuejsOriginal,
} from "devicons-react";

interface SkillProps {
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
];
