import { assetUrl } from "@/lib/assets";
import { projectCopy, type Language } from "@/lib/content";
const baseProjects = [
  {
    number: "01",
    name: "THAI TAY",
    image: assetUrl("assets/project-construction.jpg"),
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
    image: assetUrl("assets/project-ecommerce.jpg"),
    imageClass: "ecommerce",
    repository: "https://github.com/namethzz/OTW",
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
