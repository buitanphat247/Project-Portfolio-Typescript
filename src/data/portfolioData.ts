import type { PortfolioData } from "../interface/data.interface";

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Bùi Tấn Phát (MoiMoi)",
    title: "Full Stack Developer",
    avatar: "/avatar.jpg",
    bio: "Tôi là Bùi Tấn Phát, một lập trình viên đam mê về phát triển web và mobile. Tôi thích khám phá các công nghệ mới và áp dụng chúng vào việc xây dựng các ứng dụng sáng tạo, giúp cải thiện cuộc sống và trải nghiệm người dùng.",
    location: "Bà Rịa - Vũng Tàu, Việt Nam",
  },
  skills: [
    // Frontend
    { id: 1, name: "HTML5", level: 95, category: "frontend" },
    { id: 2, name: "CSS3", level: 90, category: "frontend" },
    { id: 3, name: "JavaScript", level: 88, category: "frontend" },
    { id: 4, name: "TypeScript", level: 85, category: "frontend" },
    { id: 5, name: "React", level: 90, category: "frontend" },
    { id: 6, name: "Vue.js", level: 80, category: "frontend" },
    { id: 7, name: "Next.js", level: 85, category: "frontend" },
    { id: 8, name: "TailwindCSS", level: 88, category: "frontend" },
    { id: 9, name: "Bootstrap", level: 85, category: "frontend" },
    { id: 10, name: "MUI", level: 80, category: "frontend" },
    { id: 11, name: "SASS", level: 75, category: "frontend" },
    { id: 12, name: "LESS", level: 70, category: "frontend" },
    { id: 13, name: "Windicss", level: 75, category: "frontend" },
    { id: 14, name: "Redux", level: 80, category: "frontend" },
    { id: 15, name: "React Router", level: 85, category: "frontend" },
    { id: 16, name: "React Query", level: 75, category: "frontend" },
    { id: 17, name: "Ant Design", level: 80, category: "frontend" },

    // Backend
    { id: 18, name: "NodeJS", level: 85, category: "backend" },
    { id: 19, name: "Express.js", level: 80, category: "backend" },
    { id: 20, name: "PHP", level: 75, category: "backend" },
    { id: 21, name: "Java", level: 70, category: "backend" },
    { id: 22, name: "Spring Boot", level: 65, category: "backend" },
    { id: 23, name: "Nodemon", level: 85, category: "backend" },
    { id: 24, name: "Context API", level: 80, category: "backend" },

    // Database
    { id: 25, name: "MongoDB", level: 80, category: "database" },
    { id: 26, name: "MySQL", level: 75, category: "database" },
    { id: 27, name: "SQLite", level: 70, category: "database" },
    { id: 28, name: "Microsoft SQL Server", level: 65, category: "database" },

    // Mobile & IoT
    { id: 29, name: "React Native", level: 75, category: "tools" },
    { id: 30, name: "Node-RED", level: 70, category: "tools" },
    { id: 31, name: "Arduino", level: 65, category: "tools" },

    // DevOps & Hosting
    { id: 32, name: "Vercel", level: 85, category: "tools" },
    { id: 33, name: "Heroku", level: 80, category: "tools" },
    { id: 34, name: "Firebase", level: 75, category: "tools" },
    { id: 35, name: "Google Cloud", level: 70, category: "tools" },
    { id: 36, name: "Cloudflare", level: 75, category: "tools" },
    { id: 37, name: "GitHub Pages", level: 85, category: "tools" },
    { id: 38, name: "Docker", level: 70, category: "tools" },

    // UI/Design
    { id: 39, name: "Figma", level: 75, category: "tools" },
    { id: 40, name: "Canva", level: 80, category: "tools" },
    { id: 41, name: "Dribbble", level: 70, category: "tools" },
    { id: 42, name: "Adobe Photoshop", level: 65, category: "tools" },
    { id: 43, name: "Adobe Illustrator", level: 60, category: "tools" },
    { id: 44, name: "Adobe InDesign", level: 55, category: "tools" },
    { id: 45, name: "Adobe Premiere Pro", level: 60, category: "tools" },
    { id: 46, name: "Adobe After Effects", level: 55, category: "tools" },
    { id: 47, name: "Adobe Dreamweaver", level: 70, category: "tools" },

    // Tools & Others
    { id: 48, name: "Git", level: 90, category: "tools" },
    { id: 49, name: "GitHub", level: 90, category: "tools" },
    { id: 50, name: "GitLab", level: 80, category: "tools" },
    { id: 51, name: "GitLab CI", level: 75, category: "tools" },
    { id: 52, name: "Postman", level: 85, category: "tools" },
    { id: 53, name: "ESLint", level: 80, category: "tools" },
    { id: 54, name: "Yarn", level: 85, category: "tools" },
    { id: 55, name: "Markdown", level: 90, category: "tools" },
    { id: 56, name: "Portfolio", level: 85, category: "tools" },
    { id: 57, name: "Babel", level: 75, category: "tools" },

    // Algorithms & Competitive Programming
    { id: 58, name: "Python", level: 85, category: "backend" },
    { id: 59, name: "C++", level: 80, category: "backend" },
    { id: 60, name: "C", level: 75, category: "backend" },
    { id: 61, name: "Data Structures", level: 85, category: "backend" },
    { id: 62, name: "Algorithms", level: 85, category: "backend" },
    { id: 63, name: "Competitive Programming", level: 80, category: "backend" },
  ],
  projects: [
    {
      id: 1,
      title: "Monkey-Blogging",
      description:
        "Hệ thống blog hiện đại với giao diện đẹp mắt và tính năng quản lý nội dung chuyên nghiệp.",
      image: "", // Bạn có thể thay đổi đường dẫn ảnh ở đây
      technologies: ["JavaScript", "React", "Node.js", "MongoDB"],
      githubUrl: "https://github.com/buitanphat247/Monkey-Blogging",
      liveUrl: "https://monkey-blogging.vercel.app",
    },
    {
      id: 2,
      title: "Project-Giao-Duc-Dia-Phuong-By-React",
      description:
        "Website giáo dục địa phương cung cấp tài liệu học tập, khóa học trực tuyến và tin tức giáo dục để nâng cao kiến thức và kỹ năng từ mầm non đến đại học.",
      image: "",
      technologies: ["JavaScript", "React", "TailwindCSS", "Node.js"],
      githubUrl:
        "https://github.com/buitanphat247/Project-Giao-Duc-Dia-Phuong-By-React",
      liveUrl: "https://education-local.vercel.app",
    },
    {
      id: 3,
      title: "C-Algorithm",
      description:
        "Thư viện thuật toán và cấu trúc dữ liệu được viết bằng C++ với các giải pháp tối ưu.",
      image: "",
      technologies: ["C++", "Algorithms", "Data Structures"],
      githubUrl: "https://github.com/buitanphat247/C-Algorithm",
      liveUrl: undefined,
    },
    {
      id: 4,
      title: "Project-Movie-Galaxy-By-React",
      description:
        "Movies Galaxy là website xem phim trực tuyến miễn phí với chất lượng cao và giao diện trực quan, mang đến trải nghiệm người dùng tuyệt vời.",
      image: "",
      technologies: ["JavaScript", "React", "API", "CSS3"],
      githubUrl:
        "https://github.com/buitanphat247/Project-Movie-Galaxy-By-React",
      liveUrl: "https://movie-galaxy.vercel.app",
    },
    {
      id: 5,
      title: "Course-Backend-Api-By-NodeJs-ExpressJs",
      description:
        "Học BackEnd NodeJs, Express JS, MongoDB, MySQL cùng tôi - Khóa học toàn diện về phát triển backend.",
      image: "",
      technologies: ["JavaScript", "Node.js", "Express.js", "MongoDB", "MySQL"],
      githubUrl:
        "https://github.com/buitanphat247/Course-Backend-Api-By-NodeJs-ExpressJs",
      liveUrl: "https://backend-course.vercel.app",
    },
    {
      id: 6,
      title: "Portfolio Website",
      description:
        "Website portfolio responsive với thiết kế huyền bí và tối ưu SEO.",
      image: "",
      technologies: ["React", "TypeScript", "TailwindCSS", "Vite"],
      githubUrl: "https://github.com/buitanphat247",
      liveUrl: "https://buitanphat247.github.io",
    },
  ],
  experience: [
    {
      id: 1,
      company: "Freelance Developer",
      position: "Full Stack Developer",
      duration: "2023 - Hiện tại",
      description:
        "Phát triển các ứng dụng web và mobile cho khách hàng. Tối ưu hóa hiệu suất và kiến trúc hệ thống. Làm việc với nhiều công nghệ khác nhau.",
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "TypeScript",
        "TailwindCSS",
      ],
    },
    {
      id: 2,
      company: "Student Projects",
      position: "Lead Developer",
      duration: "2022 - 2023",
      description:
        "Lãnh đạo team phát triển các dự án học tập. Áp dụng kiến thức về thuật toán và cấu trúc dữ liệu vào thực tế.",
      technologies: ["JavaScript", "React", "C++", "Python", "Git"],
    },
    {
      id: 3,
      company: "Personal Projects",
      position: "Solo Developer",
      duration: "2021 - 2022",
      description:
        "Xây dựng các dự án cá nhân để học hỏi và phát triển kỹ năng. Tập trung vào UI/UX và responsive design.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "GitHub"],
    },
  ],
  education: [
    {
      id: 1,
      institution: "HCMUS University",
      degree: "Sinh viên",
      field: "Công nghệ thông tin",
      duration: "2021 - Hiện tại",
      description: "Chuyên ngành Kỹ thuật phần mềm",
    },
    {
      id: 2,
      institution: "Self-Learning",
      degree: "Chứng chỉ",
      field: "Full Stack Web Development",
      duration: "2022 - 2023",
      description: "Tự học và thực hành các công nghệ web hiện đại",
    },
  ],
  contact: {
    email: "buitanphat247@gmail.com",
    phone: "+84 xxx xxx xxx",
    linkedin: "https://linkedin.com/in/buitanphat247",
    github: "https://github.com/buitanphat247",
    twitter: undefined,
  },
};
