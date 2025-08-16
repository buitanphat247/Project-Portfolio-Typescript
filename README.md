# Portfolio Website - React TypeScript

Một website portfolio hiện đại và responsive được xây dựng bằng React, TypeScript và Tailwind CSS.

## 🚀 Tính năng

- **Responsive Design**: Tương thích với mọi thiết bị
- **Modern UI/UX**: Giao diện đẹp mắt với animation mượt mà
- **Component-based**: Kiến trúc component tái sử dụng
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Styling hiện đại và dễ tùy chỉnh
- **Smooth Scrolling**: Điều hướng mượt mà giữa các section
- **Contact Form**: Form liên hệ với validation
- **Project Showcase**: Hiển thị dự án với modal chi tiết
- **Skills Visualization**: Hiển thị kỹ năng với progress bars

## 📁 Cấu trúc dự án

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── About.tsx       # About section
│   ├── Skills.tsx      # Skills section
│   ├── Projects.tsx    # Projects showcase
│   ├── Experience.tsx  # Work experience
│   ├── Contact.tsx     # Contact form
│   └── Footer.tsx      # Footer
├── interface/          # TypeScript interfaces
│   └── data.interface.tsx
├── data/              # Sample data
│   └── portfolioData.ts
├── App.tsx            # Main App component
└── main.tsx           # Entry point
```

## 🛠️ Cài đặt

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd Project-Portfolio-TypeScript
   ```

2. **Cài đặt dependencies**
   ```bash
   npm install
   ```

3. **Cấu hình Environment Variables**
   
   Tạo file `.env.local` trong thư mục gốc:
   ```env
   # GitHub Configuration
   VITE_GITHUB_TOKEN=your_github_token_here
   VITE_GITHUB_USERNAME=your_github_username_here
   ```

   **Cách lấy GitHub Token:**
   1. Vào [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
   2. Click "Generate new token (classic)"
   3. Đặt tên (ví dụ: "Portfolio App")
   4. Chọn scopes: `public_repo`, `read:user`, `read:email`
   5. Copy token và paste vào file `.env.local`


4. **Chạy development server**
   ```bash
   npm run dev
   ```

5. **Build cho production**
   ```bash
   npm run build
   ```

## 📝 Cấu hình dữ liệu

Chỉnh sửa file `src/data/portfolioData.ts` để cập nhật thông tin cá nhân:

```typescript
export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Tên của bạn",
    title: "Chức danh",
    avatar: "URL ảnh đại diện",
    bio: "Mô tả về bản thân",
    location: "Địa chỉ"
  },
  skills: [
    // Thêm kỹ năng của bạn
  ],
  projects: [
    // Thêm dự án của bạn
  ],
  experience: [
    // Thêm kinh nghiệm làm việc
  ],
  education: [
    // Thêm thông tin học vấn
  ],
  contact: {
    // Thông tin liên hệ
  }
};
```

## 🎨 Tùy chỉnh

### Thay đổi màu sắc
Chỉnh sửa các class Tailwind CSS trong các components để thay đổi màu sắc chủ đạo.

### Thêm sections mới
1. Tạo component mới trong `src/components/`
2. Thêm interface tương ứng trong `src/interface/data.interface.tsx`
3. Import và sử dụng trong `App.tsx`

### Responsive Design
Tất cả components đã được thiết kế responsive với Tailwind CSS breakpoints:
- `sm:` (640px+)
- `md:` (768px+)
- `lg:` (1024px+)
- `xl:` (1280px+)

## 🔧 Công nghệ sử dụng

- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Vite** - Build Tool
- **ESLint** - Code Linting

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)
1. Push code lên GitHub
2. Connect repository với Vercel
3. Deploy tự động

### Netlify
1. Build project: `npm run build`
2. Upload thư mục `dist` lên Netlify

### GitHub Pages
1. Cài đặt `gh-pages`: `npm install --save-dev gh-pages`
2. Thêm script deploy vào `package.json`
3. Chạy: `npm run deploy`

## 📄 License

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng:

1. Fork project
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📞 Liên hệ

- Email: nguyenvana@email.com
- LinkedIn: [LinkedIn Profile](https://linkedin.com/in/nguyenvana)
- GitHub: [GitHub Profile](https://github.com/nguyenvana)

---

⭐ Nếu project này hữu ích, hãy cho một star nhé!
