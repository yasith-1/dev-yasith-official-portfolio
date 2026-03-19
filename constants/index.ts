import { FaYoutube, FaFacebook, FaMedium, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
  RxBlendingMode,
  RxDotFilled
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

export const GITHUB_USERNAME = "yasith-1";

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
  {
    skill_name: "Angular",
    image: "angular.png",
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
  {
    skill_name: "Java",
    image: "java.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Spring Boot",
    image: "springboot.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "PHP",
    image: "php.png",
    width: 80,
    height: 80,
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
  {
    skill_name: "AWS",
    image: "aws.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Kubernetes",
    image: "kubernetes.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CI/CD",
    image: "cicd.png",
    width: 80,
    height: 80,
  },
] as const;

export const OTHER_SKILL = [
  // {
  //   skill_name: "Go",
  //   image: "go.png",
  //   width: 60,
  //   height: 60,
  // },
] as const;

export const TOOLS = [
  {
    skill_name: "Postman",
    image: "postman.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Docker Desktop",
    image: "docker.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Swagger",
    image: "swagger.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "IntelliJ IDEA",
    image: "intellij.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "VS Code",
    image: "vscode.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "NetBeans",
    image: "netbeans.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MySQL Workbench",
    image: "mysql.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "HeidiSQL",
    image: "heidisql.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "DBeaver",
    image: "dbeaver.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Draw.io",
    image: "drawio.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Jira",
    image: "jira.svg",
    width: 80,
    height: 80,
  },
] as const;

export interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

export const PROJECTS: Project[] = [
  // {
  //   title: "Hotel POS Management System",
  //   description:
  //     "Multi-company POS system built with layered architecture using Spring Boot (JDBC Template, JWT authentication) and React (Redux state management). Implemented real-time updates via WebSocket, automated database migrations with Flyway, and API documentation with Swagger.",
  //   image: "/projects/project-1.png",
  //   link: "https://github.com/yasith-1",
  // },
  {
    title: "Library Management System",
    description:
      "Desktop application managing books, customers, and fines with report generation using Java, JavaFX, Jasper Report, and MySQL.",
    image: "/projects/project-3.png",
    link: "https://github.com/yasith-1/javaFX-library-management-system",
  },
  {
    title: "Burger Shop POS",
    description: "Web-based POS focused on DOM manipulation and UI/UX design using HTML, JavaScript, and CSS.",
    image: "https://repository-images.githubusercontent.com/1016531246/d7f95791-dffb-4242-b9af-feaa067ead09",
    link: "https://github.com/yasith-1/mos-burger",
  },
  {
    title: "Defense Management System",
    description: "This project was built to understand all of the OOP concepts in JAVA . Used SWING for GUI create.",
    image: "https://repository-images.githubusercontent.com/951761808/4deb487e-0a5e-46a6-9ed3-b598833efee8",
    link: "https://github.com/yasith-1/Defence_Management_System_OOP",
  },
];

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
        name: "Medium",
        icon: FaMedium,
        link: "https://medium.com/@yasithofficialart",
      },
      {
        name: "WhatsApp",
        icon: FaWhatsapp,
        link: "https://wa.me/94701410113",
      },
    ],
  },
  {
    title: "Quick Links",
    data: [
      {
        name: "Contact Me",
        icon: HiOutlineMail,
        link: "mailto:yashith.wd@gmail.com",
      },
      {
        name: "Projects",
        icon: RxBlendingMode,
        link: "#projects",
      },
      {
        name: "Certifications",
        icon: RxDotFilled,
        link: "#certifications",
      },
      {
        name: "Download CV",
        icon: RxDotFilled,
        link: "/resume/Yashith_Prabhashwara_CV.pdf",
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
    link: "https://learn.kodekloud.com/user/certificate/1104c32d-0b79-4395-83cf-217320912eb1",
    description: "Strengthened understanding of Amazon Web Services fundamentals, including cloud concepts, core AWS services, and real-world use cases.",
    instructor: "Sanjeev Thiyagarajan",
    skills: ["AWS", "Cloud Computing", "DevOps"]
  },
  {
    title: "Docker For Absolute Beginners",
    issuer: "KodeKloud",
    date: "February 21, 2026",
    image: "/certifications/docker.png",
    link: "https://learn.kodekloud.com/user/certificate/77400c31-ad47-409a-b72e-04cc882a4610",
    description: "Strengthened understanding of Docker, including containerization, images, and running applications efficiently in isolated environments.",
    instructor: "Mumshad Mannambeth",
    skills: ["Docker", "Containerization", "DevOps"]
  },
  {
    title: "Linux For Absolute Beginners",
    issuer: "KodeKloud",
    date: "February 20, 2026",
    image: "/certifications/linux.png",
    link: "https://learn.kodekloud.com/user/certificate/ceeabf6a-6592-480a-83f1-05550bafaecd",
    description: "Strengthened foundational Linux skills, covering essential commands, file management, and system navigation.",
    instructor: "Jeremy Morgan",
    skills: ["Linux", "System Admin", "Open Source"]
  },
  {
    title: "Kubernetes For Absolute Beginners",
    issuer: "KodeKloud",
    date: "February 15, 2026",
    image: "/certifications/kubernetes.png",
    link: "https://learn.kodekloud.com/user/certificate/10b4b6c6-9dbf-4578-be84-c26002045a81",
    description: "Comprehensive introduction to Kubernetes, covering pods, services, deployments, and cluster management.",
    instructor: "Mumshad Mannambeth",
    skills: ["Kubernetes", "Orchestration", "Cloud Native"]
  },
  {
    title: "8-day Git | GitHub Workshop",
    issuer: "Pro Code Lab (PCL)",
    date: "17 March 2025",
    image: "/certifications/git.png",
    link: "https://drive.google.com/file/d/1ny_q6q7_2bj_0vvLG8HTJ18VDzgG6N-E/view",
    description: "Deep dive into Git and GitHub, covering branching, merging, pull requests, and professional collaboration workflows.",
    instructor: "PCL Instructors",
    skills: ["Git", "GitHub", "Version Control"]
  },
  {
    title: ".NET Development for Beginners",
    issuer: "LinkedIn Learning",
    date: "March 4, 2026",
    image: "/certifications/dotnet.png",
    link: "https://www.linkedin.com/learning/certificates/8c0c65440a361987121ecdd7673ab4d8c6d51817651af9d5bdc5e8e6e3769692?trk=share_certificate",
    description: "A beginner-friendly introduction to the .NET ecosystem, covering what .NET is, what can be built with it, and environment setup.",
    instructor: "Microsoft .NET",
    skills: [".NET", "C#", "Development"]
  },
  {
    title: "Learning Redux Toolkit",
    issuer: "LinkedIn Learning",
    date: "March 4, 2026",
    image: "/certifications/redux-toolkit.png",
    link: "https://www.linkedin.com/learning/certificates/b2ccf04e7c8e72d7b9fedf87b852a8bb5febeff862c836d2d851b1d455055a89?trk=share_certificate",
    description: "Focused on modern state management in React applications using Redux Toolkit to simplify workflows and solve common state issues.",
    instructor: "Ebenezer Don",
    skills: ["Redux", "React", "State Management"]
  },
  {
    title: "Spring 6: Spring Security",
    issuer: "LinkedIn Learning",
    date: "March 8, 2026",
    image: "/certifications/spring-security.png",
    link: "https://www.linkedin.com/learning/certificates/d1b879300b797f9c5bf56af77e3e1af2711a58e2ae9a3190a0009916dc6273bd?trk=share_certificate",
    description: "A comprehensive guide to securing Java applications using Spring Security, covering authentication and advanced protection techniques.",
    instructor: "Frank P Moley III",
    skills: ["Spring Security", "Java", "Web Security"]
  },
  {
    title: "Docker Foundations Professional Certificate",
    issuer: "LinkedIn Learning",
    date: "March 11, 2026",
    image: "/certifications/docker-foundations.png",
    link: "https://www.linkedin.com/learning/certificates/b9f11716213def56cbcac1ffb17a08b0706ba579e4c69fc9dcac0b8ea41de64a?trk=share_certificate",
    description: "Validates foundational proficiency in Docker and containerization, including deep understanding of Docker products and their application.",
    instructor: "Shea Hanson",
    skills: ["Docker", "DevOps", "Containers"]
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
    title: "Skills",
    link: "#skills",
  },
  {
    title: "Projects",
    link: "#projects",
  },
  {
    title: "Certifications",
    link: "#certifications",
  },
  {
    title: "Recommendation",
    link: "#testimonials",
  }
] as const;

export const LINKS = {
  sourceCode: "https://github.com/yasith-1",
};

export const TESTIMONIALS = [
  {
    name: "Sharada Marasinghe",
    role: "Software Engineer | Lead Developer | Assistant Lecturer",
    text: "Yashith Prabhashwara worked under my guidance, and during that time he demonstrated strong technical capability and a proactive attitude toward software development. He has solid experience with technologies such as the MERN stack, Java with Spring Boot, MySQL, MongoDB, Docker, and AWS. Yashith is highly motivated, detail-oriented, and capable of transforming ideas into practical, production-ready solutions. He works well both independently and as part of a team, and his willingness to continuously learn new technologies makes him a valuable asset to any development team. I wish him continued success in his software engineering career.",
    image: "/testimonials/sharada.png",
  },
  {
    name: "Praneeth Perera",
    role: "Co-Founder - Nexova, Pega Certified Lead System Architect (CLSA | CSSA | CSA)",
    text: "Yasith has a strong foundation in React and Java Spring Boot, and he quickly demonstrated his ability to build clean, scalable, and well-structured applications. His coding standards are excellent for an intern. He writes readable, maintainable code and shows a solid understanding of both frontend and backend architecture. Beyond his technical skills, what truly stands out is his presentation and communication ability. Yasith confidently explains complex technical concepts in a clear and structured manner, whether during internal demos. His ability to combine strong coding skills with effective communication makes him a valuable team member.",
    image: "/testimonials/praneeth.png",
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

export const WHATSAPP_CONFIG = {
  phoneNumber: "94701410113",
  assistantName: "Yashith Prabhashwara",
};
