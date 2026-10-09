import { assetUrl } from "@/lib/assets";
import { projectCopy, type Language } from "@/lib/content";
const baseProjects = [
  {
    number: "01",
    name: "THAI TAY",
    // Authentic UI capture provided in the THAI TAY source repository.
    image: "https://raw.githubusercontent.com/namethzz/THAITAY/main/preview/desktop.png",
    imageClass: "construction",
    repository: "https://github.com/namethzz/THAITAY",
    website: "https://namethzz.github.io/THAITAY/#overview",
    tools: ["React", "JavaScript", "CSS", "Python", "Pandas", "Git / GitHub"],
  },
  {
    number: "02",
    name: "Economic Crops Chat",
    image: assetUrl("assets/project-crops.jpg"),
    imageClass: "crops",
    repository: "https://github.com/namethzz/chatbot-project",
    tools: ["Data preprocessing", "ChromaDB", "React", "Node.js", "MongoDB"],
  },
  {
    number: "03",
    name: "OTW.SHOP",
    // Screenshot of the deployed storefront, captured by a verified GitHub Actions job.
    image: assetUrl("assets/work/otw-storefront.png"),
    imageClass: "ecommerce",
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
];

export const getProjects = (language: Language) => baseProjects.map((project, index) => ({ ...project, ...projectCopy[language][index] }));
