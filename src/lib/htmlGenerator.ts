import { ResumeData } from "@/types";

export const generateHtml = (resumeContent: string, resumeData: ResumeData) => {
  try {
    // Parse the resume content into structured sections
    const sections = parseResumeContent(resumeContent);

    return generateHtmlForPreview(sections, resumeData);
  } catch (error: unknown) {
    console.error("Error generating HTML:", error);
    throw new Error(`Failed to generate HTML: ${error}`);
  }
};

const generateHtmlForPreview = (sections: Record<string, string>, resumeData: ResumeData) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume Preview - ${
      resumeData.personalInfo?.name || "Generated"
    }</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8fafc;
            padding: 20px;
        }
        
        .resume-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            color: white;
            text-align: center;
            padding: 40px 20px;
        }
        
        .name {
            font-size: 36px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .job-title {
            font-size: 22px;
            opacity: 0.9;
            margin-bottom: 15px;
        }
        
        .contact-info {
            font-size: 16px;
            opacity: 0.8;
        }
        
        .content {
            padding: 40px;
        }
        
        .section {
            margin-bottom: 35px;
        }
        
        .section-title {
            font-size: 24px;
            font-weight: bold;
            color: #1f2937;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 8px;
            margin-bottom: 20px;
            position: relative;
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: -3px;
            left: 0;
            width: 50px;
            height: 3px;
            background: #1d4ed8;
        }
        
        .skills-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .skills-table th {
            background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
            padding: 15px;
            text-align: left;
            font-weight: bold;
            color: #1f2937;
            border: 1px solid #d1d5db;
        }
        
        .skills-table td {
            padding: 15px;
            border: 1px solid #d1d5db;
            background: white;
        }
        
        .skills-table tr:nth-child(even) td {
            background: #f9fafb;
        }
        
        .project-item, .education-item {
            margin-bottom: 25px;
            padding: 20px;
            background: #f8fafc;
            border-left: 4px solid #2563eb;
            border-radius: 0 8px 8px 0;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .project-title, .education-degree {
            font-weight: bold;
            color: #1f2937;
            font-size: 18px;
            margin-bottom: 8px;
        }
        
        .project-role, .education-institute {
            color: #6b7280;
            font-style: italic;
            margin-bottom: 8px;
            font-size: 16px;
        }
        
        .project-duration, .education-year {
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 10px;
        }
        
        .project-tech, .education-location {
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 12px;
        }
        
        .project-achievements, .summary-text {
            line-height: 1.7;
            color: #374151;
        }
        
        .summary-text {
            font-size: 16px;
            background: #f0f9ff;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #0ea5e9;
        }
        
        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            background: #f3f4f6;
            color: #6b7280;
            font-size: 14px;
        }
        
        ul {
            margin-left: 20px;
        }
        
        li {
            margin-bottom: 8px;
        }
        
        .highlight {
            background: linear-gradient(120deg, #fef3c7 0%, #fde68a 100%);
            padding: 2px 4px;
            border-radius: 3px;
        }
        
        @media print {
            body {
                background: white;
                padding: 0;
            }
            
            .resume-container {
                box-shadow: none;
                border-radius: 0;
            }
        }
    </style>
</head>
<body>
    <div class="resume-container">
        <!-- Header -->
        <div class="header">
            <div class="name">${
              resumeData.personalInfo?.name || "Generated Resume"
            }</div>
            ${
              resumeData.personalInfo?.email
                ? `<div class="contact-info">${resumeData.personalInfo.email}</div>`
                : ""
            }
        </div>
        
        <div class="content">
            <!-- Professional Summary -->
            ${
              sections.summary
                ? `
            <div class="section">
                <div class="section-title">PROFESSIONAL SUMMARY</div>
                <div class="summary-text">${sections.summary.replace(
                  /\n/g,
                  "<br>"
                )}</div>
            </div>
            `
                : ""
            }
            
            <!-- Core Technical Skills -->
            ${
              sections.skills
                ? `
            <div class="section">
                <div class="section-title">CORE TECHNICAL SKILLS</div>
                ${generateSkillsTableHtml(sections.skills)}
            </div>
            `
                : ""
            }
            
            <!-- Project Experience -->
            ${
              sections.projects
                ? `
            <div class="section">
                <div class="section-title">PROJECT EXPERIENCE</div>
                ${generateProjectsHtml(sections.projects)}
            </div>
            `
                : ""
            }
            
            <!-- Education -->
            ${
              sections.education
                ? `
            <div class="section">
                <div class="section-title">EDUCATION</div>
                ${generateEducationHtml(sections.education)}
            </div>
            `
                : ""
            }
        </div>
    </div>
</body>
</html>`;
};

const generateSkillsTableHtml = (skillsContent: string) => {
  const skills = parseSkillsContent(skillsContent);

  if (skills.length === 0) return "";

  let tableHtml =
    '<table class="skills-table"><thead><tr><th>Category</th><th>Skills</th></tr></thead><tbody>';

  skills.forEach((skill) => {
    tableHtml += `<tr><td><strong>${skill.category}</strong></td><td>${skill.skills}</td></tr>`;
  });

  tableHtml += "</tbody></table>";
  return tableHtml;
};

const generateProjectsHtml = (projectsContent: string) => {
  const lines = projectsContent.split("\n").filter((line) => line.trim());
  let html = "";

  for (const line of lines) {
    if (line.trim()) {
      html += `<div class="project-item">${line.replace(/\n/g, "<br>")}</div>`;
    }
  }

  return html;
};

const generateEducationHtml = (educationContent: string) => {
  const lines = educationContent.split("\n").filter((line) => line.trim());
  let html = "";

  for (const line of lines) {
    if (line.trim()) {
      html += `<div class="education-item">${line.replace(
        /\n/g,
        "<br>"
      )}</div>`;
    }
  }

  return html;
};

const parseResumeContent = (content: string) => {
  const sections = {
    summary: "",
    skills: "",
    projects: "",
    education: "",
    additional: "",
  };

  const lines = content.split("\n");
  let currentSection = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.includes("PROFESSIONAL SUMMARY")) {
      currentSection = "summary";
    } else if (
      trimmedLine.includes("CORE TECHNICAL SKILLS") ||
      trimmedLine.includes("SKILLS")
    ) {
      currentSection = "skills";
    } else if (
      trimmedLine.includes("PROJECT EXPERIENCE") ||
      trimmedLine.includes("EXPERIENCE")
    ) {
      currentSection = "projects";
    } else if (trimmedLine.includes("EDUCATION")) {
      currentSection = "education";
    } else if (trimmedLine.includes("ADDITIONAL INFORMATION")) {
      currentSection = "additional";
    } else if (currentSection && trimmedLine) {
      sections[currentSection as keyof typeof sections] +=
        (sections[currentSection as keyof typeof sections] ? "\n" : "") +
        trimmedLine;
    }
  }

  return sections;
};

const parseSkillsContent = (skillsContent: string) => {
  const skills = [];
  const lines = skillsContent.split("\n");

  for (const line of lines) {
    if (line.includes(":") || line.includes("|")) {
      const parts = line.split(/[:|]/);
      if (parts.length >= 2) {
        skills.push({
          category: parts[0].trim(),
          skills: parts[1].trim(),
        });
      }
    }
  }

  return skills;
};

