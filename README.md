# AI Resume Generator

A powerful, AI-driven resume generator built with Next.js 15, TypeScript, and Tailwind CSS. Generate professional, ATS-friendly resumes using Google's Gemini AI or fallback templates.

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB)

## ✨ Features

### 🎯 **Structured Resume Generation**
- **Candidate Details**: Name, job title, experience level, domain, education
- **Work Responsibilities**: 4-6 key responsibilities with action verbs
- **Skills & Qualifications**: Technical skills, tools, frameworks, certifications
- **Professional Formatting**: ATS-friendly structure with clear sections

### 🤖 **AI-Powered Content**
- **Google Gemini AI Integration**: Generate personalized resume content
- **Smart Fallback System**: Professional templates when API quota is exceeded
- **Job Code Generation**: Unique tracking codes in format `[ROLE-INITIALS-NAME-YYYY]`
- **Context-Aware**: Extracts relevant technologies from job descriptions

### 📄 **Multiple Export Formats**
- **DOCX Generation**: Professional Word documents with proper formatting
- **HTML Preview**: Live preview before downloading
- **PDF Ready**: Optimized for PDF conversion

### 🎨 **Modern UI/UX**
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Form Validation**: Real-time validation with helpful error messages
- **Loading States**: Smooth user experience with progress indicators
- **Toast Notifications**: Clear feedback for all actions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API key (optional, fallback available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aayushjain-code/ai-resume-generator.git
   cd ai-resume-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Gemini API key to `.env.local`:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Usage

### 1. Fill Out the Form
- **Candidate Details**: Enter your name, job title, experience level, domain, and education
- **Job Description**: Provide detailed information about the role you're applying for
- **Work Responsibilities**: List 4-6 key responsibilities with action verbs
- **Skills & Qualifications**: Include technical skills, tools, frameworks, and certifications
- **Additional Notes**: Add any specific requirements or additional information

### 2. Generate Resume
- **Preview**: Click "Preview Resume" to see HTML version
- **Download**: Click "Generate DOCX" to download Word document
- **Job Code**: Each resume includes a unique tracking code

### 3. Customize Output
- The AI generates content based on your inputs and job description
- Fallback templates ensure you always get a professional resume
- All resumes are ATS-optimized for maximum compatibility

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.5.2** - React framework with App Router
- **TypeScript 5.0** - Type-safe development
- **Tailwind CSS 3.4.0** - Utility-first styling
- **React Hook Form** - Form management and validation
- **Lucide React** - Beautiful icons

### Backend & AI
- **Google Generative AI** - Gemini 1.5 Pro for content generation
- **DOCX Generation** - Professional Word document creation
- **Puppeteer** - PDF generation capabilities

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Turbopack** - Fast development builds

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Home page
├── components/
│   ├── form-sections/       # Form section components
│   │   ├── PersonalInfo.tsx
│   │   ├── DescriptionSection.tsx
│   │   ├── WorkResponsibilitiesSection.tsx
│   │   ├── SkillsSection.tsx
│   │   └── AdditionalNotesSection.tsx
│   ├── ResumeForm.tsx       # Main form component
│   ├── Header.tsx           # Header component
│   └── Footer.tsx           # Footer component
└── lib/
    ├── resumeGenerator.ts   # AI integration and resume generation
    ├── docxGenerator.ts     # DOCX document generation
    └── htmlGenerator.ts     # HTML preview generation
```

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

### Tailwind Configuration
Custom color palette and component classes defined in `tailwind.config.js`:
- Primary colors (blue palette)
- Custom component classes (buttons, inputs, form sections)
- Responsive design utilities

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify**: Compatible with Next.js static export
- **Railway**: Full-stack deployment with environment variables
- **AWS/GCP**: Container-based deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful content generation
- **Next.js Team** for the amazing React framework
- **Tailwind CSS** for the utility-first CSS framework
- **Vercel** for seamless deployment platform

## 📞 Support

If you have any questions or need help:

1. Check the [Issues](https://github.com/aayushjain-code/ai-resume-generator/issues) page
2. Create a new issue with detailed description
3. Contact: [aayushjain-code](https://github.com/aayushjain-code)

---

**Made with ❤️ by [Aayush Jain](https://github.com/aayushjain-code)**

---
*Last updated: January 2025*