import OpenAI from "openai";
import { generateDocx } from "./docxGenerator";
import { generateHtml } from "./htmlGenerator";

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || "",
  dangerouslyAllowBrowser: true, // Only for client-side usage
});

const RESUME_SYSTEM_PROMPT = `You are an expert resume writer. Generate a professional, ATS-friendly resume based on the following inputs:

RESUME STRUCTURE REQUIREMENTS:
1. HEADER: Full Name, Email (if provided)
2. PROFESSIONAL SUMMARY: 3-4 sentences highlighting key strengths relevant to the job
3. KEY RESPONSIBILITIES / EXPERIENCE: 4-6 responsibilities relevant to the role with action verbs
4. SKILLS & QUALIFICATIONS: Technical skills, tools, frameworks, certifications, and relevant soft skills
5. EDUCATION: Educational background details
6. FOOTER: Job Code in format [ROLE-INITIALS-NAME-YYYY] (e.g., Job Code: ML-ENG-AYJ-2025)

FORMATTING GUIDELINES:
- Write in a concise, professional tone with action verbs
- Format cleanly for ATS systems (no tables, fancy graphics)
- Use bullet points for easy scanning
- Keep consistent formatting throughout
- Include relevant keywords from the job description
- Generate realistic and professional content based on the job requirements
- Add quantifiable achievements where possible

OUTPUT FORMAT:
Return the resume content in clean, structured text format that can be easily converted to DOCX. Use clear section headers and maintain professional formatting.`;

import { ResumeData } from "@/types";

export const generateResume = async (
  resumeData: ResumeData
): Promise<ArrayBuffer> => {
  try {
    // Generate content using OpenAI

    // Prepare the prompt with resume data
    const prompt = `${RESUME_SYSTEM_PROMPT}

CANDIDATE DETAILS:
- Full Name: ${resumeData.personalInfo?.name || "John Doe"}
- Job Title / Target Role: ${
      resumeData.personalInfo?.jobTitle || "Software Engineer"
    }
- Years of Experience: ${
      resumeData.personalInfo?.yearsOfExperience
        ? `${resumeData.personalInfo.yearsOfExperience} years`
        : "3-5 years"
    }
- Domain / Industry Focus: ${resumeData.personalInfo?.domain || "Technology"}
- Education: ${
      resumeData.personalInfo?.education || "Bachelor's in Computer Science"
    }

WORK RESPONSIBILITIES:
${
  resumeData.workResponsibilities ||
  "• Led development of scalable applications\n• Implemented modern frameworks\n• Collaborated with cross-functional teams"
}

SKILLS & QUALIFICATIONS:
${resumeData.skills || "JavaScript, Python, React, Node.js, AWS, Docker"}

JOB DESCRIPTION:
${resumeData.description}

ADDITIONAL NOTES:
${resumeData.additionalNotes || "None provided"}

PERSONAL INFORMATION:
Name: ${resumeData.personalInfo?.name || "Not provided"}
Email: ${resumeData.personalInfo?.email || "Not provided"}

Please generate a professional resume following the structure and guidelines above. Create realistic and professional content that matches the job description requirements. Include a Job Code at the bottom in the format: Job Code: [ROLE-INITIALS-NAME-YYYY]`;

    // Generate content using OpenAI
    let resumeContent;
    
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: RESUME_SYSTEM_PROMPT
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      });

      resumeContent = completion.choices[0]?.message?.content || "";
    } catch (apiError: unknown) {
      // Check if it's a quota error and handle it immediately
      if (
        apiError instanceof Error &&
        (apiError.message.includes("429") ||
          apiError.message.includes("quota") ||
          apiError.message.includes("rate_limit") ||
          apiError.message.includes("insufficient_quota"))
      ) {
        console.log("API quota exceeded, generating fallback resume...");
        const fallbackContent = generateFallbackResume(resumeData);

        // Generate the appropriate format with fallback content
        switch (resumeData.exportFormat) {
          case "html":
            return new TextEncoder().encode(
              generateHtml(fallbackContent, resumeData)
            ).buffer;
          case "docx":
          default:
            return await generateDocx(fallbackContent, resumeData);
        }
      }
      // Re-throw other API errors
      throw apiError;
    }

    console.log("Generated resume content length:", resumeContent.length);

    // Generate the appropriate format
    switch (resumeData.exportFormat) {
      case "html":
        return new TextEncoder().encode(generateHtml(resumeContent, resumeData))
          .buffer;
      case "docx":
      default:
        return await generateDocx(resumeContent, resumeData);
    }
  } catch (error: unknown) {
    console.error("Error in resume generation:", error);

    // Check if it's a quota error
    if (
      error instanceof Error &&
      (error.message.includes("429") ||
        error.message.includes("quota") ||
        error.message.includes("rate_limit") ||
        error.message.includes("insufficient_quota") ||
        error.message.includes("QuotaFailure"))
    ) {
      console.log("API quota exceeded, generating fallback resume...");
      const fallbackContent = generateFallbackResume(resumeData);

      // Generate the appropriate format with fallback content
      switch (resumeData.exportFormat) {
        case "html":
          return new TextEncoder().encode(
            generateHtml(fallbackContent, resumeData)
          ).buffer;
        case "docx":
        default:
          return await generateDocx(fallbackContent, resumeData);
      }
    }

    // Check if it's an API key error
    if (
      error instanceof Error &&
      (error.message.includes("API_KEY") ||
        error.message.includes("authentication") ||
        error.message.includes("invalid_api_key"))
    ) {
      throw new Error(
        "Invalid API key. Please check your OpenAI API key configuration."
      );
    }

    throw new Error(
      `Failed to generate resume: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

const generateFallbackResume = (resumeData: ResumeData) => {
  const name = resumeData.personalInfo?.name || "John Doe";
  const email = resumeData.personalInfo?.email || "john.doe@email.com";
  const jobTitle = resumeData.personalInfo?.jobTitle || "Software Engineer";
  const yearsOfExperience = resumeData.personalInfo?.yearsOfExperience
    ? `${resumeData.personalInfo.yearsOfExperience} years`
    : "3-5 years";
  const domain = resumeData.personalInfo?.domain || "Technology";
  const education =
    resumeData.personalInfo?.education || "Bachelor's in Computer Science";
  const workResponsibilities =
    resumeData.workResponsibilities ||
    "• Led development of scalable applications\n• Implemented modern frameworks\n• Collaborated with cross-functional teams";
  const skills =
    resumeData.skills || "JavaScript, Python, React, Node.js, AWS, Docker";
  const additionalNotes = resumeData.additionalNotes || "";

  // Generate Job Code
  const currentYear = new Date().getFullYear();
  const nameInitials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  const jobCode = `${jobTitle
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()}-${nameInitials}-${currentYear}`;

  return `${name.toUpperCase()}
${email}

PROFESSIONAL SUMMARY
Experienced ${jobTitle.toLowerCase()} with ${yearsOfExperience} of expertise in ${domain.toLowerCase()}, specializing in modern technologies and cloud platforms. Proven track record of delivering scalable solutions and leading cross-functional teams to achieve business objectives. ${
    additionalNotes ? `Additional focus: ${additionalNotes}` : ""
  }

KEY RESPONSIBILITIES / EXPERIENCE
${workResponsibilities}

SKILLS & QUALIFICATIONS
${skills}

EDUCATION
${education}

Job Code: ${jobCode}

---
Note: This resume was generated using fallback content due to API quota limitations. For a more personalized resume, please try again later or upgrade your API plan.`;
};

// Removed unused function
