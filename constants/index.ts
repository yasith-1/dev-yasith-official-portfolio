import { FaYoutube, FaFacebook, FaMedium } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
  RxBlendingMode,
} from "react-icons/rx";

export const SOCIALS = [
  {
    name: "Linkedin",
    icon: RxLinkedinLogo,
    link: "https://www.linkedin.com/in/yashith-prabhashwara/",
  },
  {
    name: "GitHub",
    icon: RxGithubLogo,
    link: "https://github.com/yasith-1",
  },
  {
    name: "Medium",
    icon: FaMedium,
    link: "https://medium.com/@yasithofficialart",
  },
] as const;

export const FRONTEND_SKILL = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Redux",
    image: "redux.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js 14",
    image: "next.png",
    width: 80,
    height: 80,
  },
] as const;

export const BACKEND_SKILL = [
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Express.js",
    image: "express.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
  {
    skill_name: "Firebase",
    image: "firebase.png",
    width: 55,
    height: 55,
  },
  {
    skill_name: "MySQL",
    image: "mysql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "PostgreSQL",
    image: "postgresql.png",
    width: 70,
    height: 70,
  },
] as const;

export const FULLSTACK_SKILL = [
  {
    skill_name: "Docker",
    image: "docker.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Figma",
    image: "figma.png",
    width: 50,
    height: 50,
  },
] as const;

export const OTHER_SKILL = [
  {
    skill_name: "Go",
    image: "go.png",
    width: 60,
    height: 60,
  },
] as const;

export const PROJECTS = [
  {
    title: "Hotel POS Management System",
    description:
      "Multi-company POS system built with layered architecture using Spring Boot (JDBC Template, JWT authentication) and React (Redux state management). Implemented real-time updates via WebSocket, automated database migrations with Flyway, and API documentation with Swagger.",
    image: "/projects/project-1.png",
    link: "https://github.com/yasith-1",
  },
  {
    title: "Dev Docrizor",
    description:
      "Project resource management system for organizing development assets such as diagrams, design files, database scripts, and tracking project tasks efficiently using React, Express, and MongoDB.",
    image: "/projects/project-2.png",
    link: "https://github.com/yasith-1",
  },
  {
    title: "Library Management System",
    description:
      "Desktop application managing books, customers, and fines with report generation using Java, JavaFX, Jasper Report, and MySQL.",
    image: "/projects/project-3.png",
    link: "https://github.com/yasith-1",
  },
  {
    title: "Burger Shop POS",
    description:
      "Web-based POS focused on DOM manipulation and UI/UX design using HTML, JavaScript, and CSS.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    link: "https://github.com/yasith-1",
  },
] as const;

export const FOOTER_DATA = [
  {
    title: "Community",
    data: [
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com/yasith-1",
      },
      {
        name: "Discord",
        icon: RxDiscordLogo,
        link: "https://discord.com",
      },
    ],
  },
  {
    title: "Social Media",
    data: [
      {
        name: "Linkedin",
        icon: RxLinkedinLogo,
        link: "https://www.linkedin.com/in/yashith-prabhashwara/",
      },
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com/yasith-1",
      },
      {
        name: "Medium",
        icon: FaMedium,
        link: "https://medium.com/@yasithofficialart",
      },
    ],
  },
  {
    title: "About",
    data: [
      {
        name: "Contact Me",
        icon: null,
        link: "mailto:yashith.wd@gmail.com",
      },
    ],
  },
] as const;


export const JOURNEY = [
  {
    title: "Intern Software Engineer",
    location: "NEXOVA IT SOLUTIONS",
    description: "Collaboration with a development team to build a POS system. Contributing as a Full-Stack Developer to both frontend and backend development using React and Spring Boot, with MySQL as the database. Involved in API integration & Testing, UI design, and applying OOP and clean code principles.",
    icon: null,
    date: "Sep 2025 - Present",
  },
  {
    title: "Startup Tech Community Member",
    location: "KreedX Development Club",
    description: "Collaborated with a dynamic team at KreedX to deliver full-stack software solutions for multiple client-based projects. Took responsibility for both frontend and backend development using PHP and MySQL. Applied strong OOP principles.",
    icon: null,
    date: "June 2024 - Present",
  },
  {
    title: "iCET ICD Developer Programme",
    location: "Institute of Computer Engineering Technology (iCET)",
    description: "Currently enrolled, developing expertise in enterprise and standalone application development with Java and Spring Boot. Building strong foundations in OOP, design patterns, and modern software architectures.",
    icon: null,
    date: "Nov 2024 - Present",
  },
  {
    title: "Workshop: Git | GitHub",
    location: "Pro Code Lab (PCL)",
    description: "Covered every part of Git and GitHub that are used in real projects, including branching, merging, pull requests, and collaboration workflows.",
    icon: null,
    date: "March 2025",
  },
] as const;

export const CERTIFICATIONS = [
  {
    title: "AWS Basics",
    issuer: "KodeKloud",
    date: "February 22, 2026",
    image: "/certifications/aws-basics.png",
    description: "Strengthened understanding of Amazon Web Services fundamentals, including cloud concepts, core AWS services, and real-world use cases.",
    instructor: "Sanjeev Thiyagarajan",
    skills: ["AWS", "Cloud Computing", "DevOps"]
  },
  {
    title: "Docker For Absolute Beginners",
    issuer: "KodeKloud",
    date: "February 21, 2026",
    image: "/certifications/docker.png",
    description: "Strengthened understanding of Docker, including containerization, images, and running applications efficiently in isolated environments.",
    instructor: "Mumshad Mannambeth",
    skills: ["Docker", "Containerization", "DevOps"]
  },
  {
    title: "Linux For Absolute Beginners",
    issuer: "KodeKloud",
    date: "February 20, 2026",
    image: "/certifications/linux.png",
    description: "Strengthened foundational Linux skills, covering essential commands, file management, and system navigation.",
    instructor: "Jeremy Morgan",
    skills: ["Linux", "System Admin", "Open Source"]
  },
  {
    title: "Kubernetes For Absolute Beginners",
    issuer: "KodeKloud",
    date: "February 15, 2026",
    image: "/certifications/kubernetes.png",
    description: "Comprehensive introduction to Kubernetes, covering pods, services, deployments, and cluster management.",
    instructor: "Mumshad Mannambeth",
    skills: ["Kubernetes", "Orchestration", "Cloud Native"]
  },
  {
    title: "8-day Git | GitHub Workshop",
    issuer: "Pro Code Lab (PCL)",
    date: "17 March 2025",
    image: "/certifications/git.png",
    description: "Deep dive into Git and GitHub, covering branching, merging, pull requests, and professional collaboration workflows.",
    instructor: "PCL Instructors",
    skills: ["Git", "GitHub", "Version Control"]
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About me",
    link: "#about-me",
  },
  {
    title: "Experience",
    link: "#experience",
  },
  {
    title: "Projects",
    link: "#projects",
  },
  {
    title: "Testimonials",
    link: "#testimonials",
  },
  {
    title: "Skills",
    link: "#skills",
  },
  {
    title: "Certifications",
    link: "#certifications",
  },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/yasith-1",
};

export const TESTIMONIALS = [
  {
    name: "Praneeth Perera",
    role: "Co-Founder - Nexova, Pega Certified Lead System Architect (CLSA | CSSA | CSA)",
    text: "Yasith has a strong foundation in React and Java Spring Boot, and he quickly demonstrated his ability to build clean, scalable, and well-structured applications. His coding standards are excellent for an intern. He writes readable, maintainable code and shows a solid understanding of both frontend and backend architecture. Beyond his technical skills, what truly stands out is his presentation and communication ability. Yasith confidently explains complex technical concepts in a clear and structured manner, whether during internal demos. His ability to combine strong coding skills with effective communication makes him a valuable team member.",
    image: "/testimonials/praneeth.png", // Paths for future images
  },
  {
    name: "Prasad Ekanayake",
    role: "Co-Founder - Nexova, Pega Certified Lead System Architect",
    text: "I had the pleasure of supervising Yasith during his internship at Nexova, where he was a key contributor to the NexServe project. From day one, Yasith stood out for his technical curiosity and his ability to grasp complex systems quickly. On the NexServe project, he demonstrated impressive problem-solving skills and a proactive approach to development that went well beyond what is typically expected of an intern. He didn't just complete tasks; he consistently looked for ways to optimize workflows and improve the overall quality of the deliverables. What impressed me most was Yasith's professional maturity and his ability to collaborate effectively within a fast-paced team environment.",
    image: "/testimonials/prasad.png",
  },
  {
    name: "Sahan Weerasekera",
    role: "Co-Founder - Nexova, Pega CLSA , MBA in IT (CSE)",
    text: "Yasith's greatest strength is his ability to act as a true team player who brings people together. He maintains strong relationships with all team members and consistently contributes to a positive, collaborative team atmosphere. This quality, combined with his solid full-stack technical expertise in React and Java Spring Boot, makes him a well-rounded contributor who adds value both technically and culturally. His strong emotional intelligence enables him to work effectively across diverse personalities, while also translating business requirements into well-designed React front-end components and robust Spring Boot backend services.",
    image: "/testimonials/sahan.png",
  },
  {
    name: "Gihan Viraj Silva",
    role: "Software Engineer",
    text: "I had the pleasure of mentoring Yasith, and I'm impressed by his passion, curiosity, and dedication. He is a hard worker, a fast learner, and always eager to take on new challenges. Any team would benefit greatly from his drive and enthusiasm.",
    image: "/testimonials/gihan.png",
  }
] as const;
