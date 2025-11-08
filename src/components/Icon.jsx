// Icon tái sử dụng cho Font Awesome
// Cách dùng: <Icon name="skills" /> hoặc <Icon name="users" className="text-xl" />

const NAME_TO_CLASS = {
  skills: 'fa-solid fa-layer-group',
  skill: 'fa-solid fa-code',
  projects: 'fa-solid fa-folder-open',
  achievements: 'fa-solid fa-trophy',
  dashboard: 'fa-solid fa-chart-line',
  users: 'fa-solid fa-users',
  settings: 'fa-solid fa-gear',
  bell: 'fa-solid fa-bell',
  chevronLeft: 'fa-solid fa-chevron-left',
  chevronRight: 'fa-solid fa-chevron-right',
  download: 'fa-solid fa-download',
  upload: 'fa-solid fa-upload',
};

export default function Icon({ name, className = '' }) {
  const base = NAME_TO_CLASS[name] || name; // cho phép truyền trực tiếp class FA nếu muốn
  return <i className={`${base} ${className}`.trim()}></i>;
}


