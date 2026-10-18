import { assetUrl } from "@/lib/assets";
import { projectCopy, type Language } from "@/lib/content";
const baseProjects = [
  {
    number: "01",
    name: "THAI TAY",
    // Screenshot of the deployed v0.10 frontend (prices shown there are labelled sample data).
    image: assetUrl("assets/work/thaitay-home.jpg"),
    repository: "https://github.com/namethzz/THAITAY",
    website: "https://thaitay.vercel.app/",
    tools: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Python", "Pandas"],
  },
  {
    number: "02",
    name: "Economic Crops Chat",
    image: assetUrl("assets/project-crops.jpg"),
    repository: "https://github.com/namethzz/chatbot-project",
    website: "https://chatbot-project-phi-nine.vercel.app/",
    tools: ["Data preprocessing", "ChromaDB", "React", "Node.js", "MongoDB"],
  },
  {
    number: "03",
    name: "OTW.SHOP",
    // Screenshot of the deployed storefront, captured by a verified GitHub Actions job.
    image: assetUrl("assets/work/otw-home.png"),
    repository: "https://github.com/namethzz/OTW",
    website: "https://otw-production.up.railway.app/",
    tools: [
      "C#",
      "ASP.NET Core MVC",
      "Razor",
      "Entity Framework Core",
      "MySQL",
      "Bootstrap",
      "JavaScript",
    ],
  },
  {
    number: "04",
    name: "AirClean",
    // Screenshot of the deployed landing page.
    image: assetUrl("assets/work/airclean-home.jpg"),
    repository: "https://github.com/namethzz/Air-clean-",
    website: "https://aircare-connect-web.onrender.com/",
    tools: ["React", "TypeScript", "C#", "ASP.NET Core 8", "MongoDB", "Docker", "GitHub Actions"],
  },
  {
    number: "05",
    name: "KickHub",
    // Screenshot of the deployed home page.
    image: assetUrl("assets/work/kickhub-home.jpg"),
    repository: "https://github.com/namethzz/kickhub",
    website: "https://kickhub-web.onrender.com/home",
    tools: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB", "JWT"],
  },
];

// Display label for "NN / total" counters.
export const projectTotal = String(baseProjects.length).padStart(2, "0");

export const getProjects = (language: Language) => baseProjects.map((project, index) => ({ ...project, ...projectCopy[language][index] }));
