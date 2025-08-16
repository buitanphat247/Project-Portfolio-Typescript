import axios from 'axios';
import type { GitHubReadme, ParsedSkill } from '../types/github-readme.types';
import { config } from '../utils/config';

const GITHUB_API_BASE = 'https://api.github.com';

export const fetchGitHubReadme = async (owner: string, repo: string): Promise<GitHubReadme> => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE}/repos/${owner}/${repo}/readme`, {
      headers: {
        'Authorization': `token ${config.github.token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    return response.data;
  } catch (err) {
    console.error('Error fetching GitHub README:', err);
    throw new Error('Có lỗi xảy ra khi lấy README từ GitHub');
  }
};

export const decodeBase64Content = (content: string): string => {
  try {
    return atob(content);
  } catch (err) {
    console.error('Error decoding base64 content:', err);
    return content;
  }
};

export const parseMarkdownToSkills = (markdown: string): ParsedSkill[] => {
  const skills: ParsedSkill[] = [];
  
  // Parse Tech Stack sections
  const techStackSections = markdown.match(/###\s*([^\n]+)\n([\s\S]*?)(?=###|$)/gi);
  
  if (techStackSections) {
    techStackSections.forEach(section => {
      // Extract category name
      const categoryMatch = section.match(/###\s*([^\n]+)/);
      const category = categoryMatch ? categoryMatch[1].trim() : 'Other';
      
      // Find all badges in this section
      const badgeMatches = section.match(/!\[([^\]]+)\]\([^)]+\)/g);
      
      if (badgeMatches) {
        badgeMatches.forEach(badge => {
          const skillName = badge.match(/!\[([^\]]+)\]/)?.[1];
          if (skillName && !skills.find(s => s.name === skillName)) {
            skills.push({
              name: skillName,
              category: category.toLowerCase().replace(/\s+/g, '-'),
              level: 85
            });
          }
        });
      }
    });
  }
  
  // Also look for badges in the main Tech Stack section
  const mainTechSection = markdown.match(/##\s*Tech Stack\s*\n([\s\S]*?)(?=##|$)/i);
  if (mainTechSection) {
    const badgeMatches = mainTechSection[1].match(/!\[([^\]]+)\]\([^)]+\)/g);
    if (badgeMatches) {
      badgeMatches.forEach(badge => {
        const skillName = badge.match(/!\[([^\]]+)\]/)?.[1];
        if (skillName && !skills.find(s => s.name === skillName)) {
          skills.push({
            name: skillName,
            category: 'tech-stack',
            level: 80
          });
        }
      });
    }
  }
  
  return skills;
};
