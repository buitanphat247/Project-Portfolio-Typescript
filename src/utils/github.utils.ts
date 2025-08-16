import type { GitHubRepo } from "../types/github.types";

export const getTechnologyBadge = (language: string | null) => {
  if (!language) return "Other";

  const techMap: { [key: string]: string } = {
    JavaScript: "JavaScript",
    TypeScript: "TypeScript",
    React: "React",
    Vue: "Vue",
    "Node.js": "Node.js",
    Python: "Python",
    Java: "Java",
    "C++": "C++",
    "C#": "C#",
    PHP: "PHP",
    HTML: "HTML",
    CSS: "CSS",
    Go: "Go",
    Rust: "Rust",
    Swift: "Swift",
    Kotlin: "Kotlin",
  };

  return techMap[language] || language;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const categorizeRepositories = (repositories: GitHubRepo[]) => {
  const projects = { client: [] as GitHubRepo[], server: [] as GitHubRepo[] };
  const courses: GitHubRepo[] = [];
  const others: GitHubRepo[] = [];

  repositories.forEach((repo) => {
    const name = repo.name.toLowerCase();
    const description = (repo.description || "").toLowerCase();

    // Kiểm tra nếu có từ "course" hoặc "tutorial"
    if (
      name.includes("course") ||
      name.includes("tutorial") ||
      description.includes("course") ||
      description.includes("tutorial")
    ) {
      courses.push(repo);
    }
    // Kiểm tra nếu có từ "project"
    else if (name.includes("project") || description.includes("project")) {
      // Phân loại client/server dựa trên tên hoặc mô tả
      if (
        name.includes("client") ||
        name.includes("frontend") ||
        description.includes("client") ||
        description.includes("frontend") ||
        name.includes("ui") ||
        name.includes("web")
      ) {
        projects.client.push(repo);
      } else if (
        name.includes("server") ||
        name.includes("backend") ||
        description.includes("server") ||
        description.includes("backend") ||
        name.includes("api") ||
        name.includes("db")
      ) {
        projects.server.push(repo);
      } else {
        // Nếu không xác định được client/server, mặc định là client
        projects.client.push(repo);
      }
    }
    // Các repository khác
    else {
      others.push(repo);
    }
  });

  return { projects, courses, others };
};
