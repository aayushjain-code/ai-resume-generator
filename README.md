# AI Resume Generator - Next.js Version

A modern, full-stack resume generator built with Next.js that creates professional, ATS-friendly resumes using Google's Gemini AI.

## ✨ Features

- **Frontend-Only**: Everything runs in the browser - no backend server needed
- **AI-Powered**: Uses Google Gemini 1.5 Pro for intelligent resume generation
- **Smart Fallback**: Generates professional sample resumes when API quota is exceeded
- **Multiple Formats**: Generate DOCX files and HTML previews
- **Responsive Design**: Clean, modern UI that works on all devices
- **Real-time Preview**: See your resume before downloading
- **ATS-Friendly**: Optimized for Applicant Tracking Systems

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone and navigate to the project:**

   ```bash
   cd resume-generator-nextjs
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   echo "NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here" > .env.local
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 How to Use

1. **Fill out the form:**

   - **Job Description** (required): Describe the role you're applying for
   - **Additional Notes** (optional): Any extra information or requirements
   - **Personal Info** (optional): Your name and email

2. **Preview your resume:**

   - Click "Preview Resume" to see the generated resume
   - Review the content and formatting

3. **Download your resume:**
   - Click "Generate DOCX" to download a Word document
   - The file will be automatically downloaded to your device

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini 1.5 Pro
- **Document Generation**: docx.js
- **Form Handling**: react-hook-form
- **Notifications**: react-hot-toast
- **Icons**: Lucide React

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env.local` file

## 📁 Project Structure

```
resume-generator-nextjs/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── form-sections/
│   │   │   ├── PersonalInfo.tsx
│   │   │   ├── DescriptionSection.tsx
│   │   │   └── AdditionalNotesSection.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ResumeForm.tsx
│   └── lib/
│       ├── resumeGenerator.ts
│       ├── docxGenerator.ts
│       └── htmlGenerator.ts
├── public/
├── tailwind.config.js
├── next.config.ts
└── package.json
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `NEXT_PUBLIC_GEMINI_API_KEY` environment variable
4. Deploy!

### Netlify

1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify
3. Add environment variables in Netlify dashboard

### Other Platforms

This is a standard Next.js application and can be deployed to any platform that supports Node.js:

- Railway
- Render
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Security Notes

- API keys are prefixed with `NEXT_PUBLIC_` to work in the browser
- This is safe for client-side use with Gemini API
- Consider implementing rate limiting for production use

## 🐛 Troubleshooting

### Common Issues

1. **API Quota Exceeded**: The app includes a fallback system that generates sample resumes when the API limit is reached
2. **Build Errors**: Make sure all dependencies are installed with `npm install`
3. **Styling Issues**: Ensure Tailwind CSS is properly configured

### Getting Help

- Check the browser console for error messages
- Verify your API key is correct
- Ensure all environment variables are set

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using Next.js and Google Gemini AI**
