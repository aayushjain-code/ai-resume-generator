import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
} from "docx";

import { ResumeData } from "@/types";

export const generateDocx = async (resumeContent: string, resumeData: ResumeData) => {
  try {
    // Parse the resume content into structured sections
    const sections = parseResumeContent(resumeContent);

    // Create document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Header
            ...createHeader(resumeData.personalInfo),

            // Professional Summary
            ...createSection("PROFESSIONAL SUMMARY", sections.summary),

            // Core Technical Skills
            ...createSkillsTable(sections.skills),

            // Project Experience
            ...createSection("PROJECT EXPERIENCE", sections.projects),

            // Education
            ...createSection("EDUCATION", sections.education),

            // Additional Information
            ...createSection("ADDITIONAL INFORMATION", sections.additional),
          ],
        },
      ],
    });

    // Generate buffer
    const buffer = await Packer.toBuffer(doc);
    return buffer;
  } catch (error: unknown) {
    console.error("Error generating DOCX:", error);
    throw new Error(`Failed to generate DOCX: ${error}`);
  }
};

const createHeader = (personalInfo: ResumeData["personalInfo"]) => {
  const elements = [];

  if (personalInfo?.name) {
    elements.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: personalInfo.name,
            bold: true,
            size: 32,
            color: "2563eb",
          }),
        ],
        spacing: { after: 100 },
      })
    );
  }

  if (personalInfo?.email) {
    elements.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: personalInfo.email,
            size: 20,
            color: "6b7280",
          }),
        ],
        spacing: { after: 200 },
      })
    );
  }

  return elements.length > 0
    ? elements
    : [new Paragraph({ children: [new TextRun({ text: "" })] })];
};

const createSection = (title: string, content: string) => {
  const elements = [];

  // Section title
  elements.push(
    new Paragraph({
      children: [
        new TextRun({
          text: title,
          bold: true,
          size: 24,
          color: "1f2937",
        }),
      ],
      spacing: { before: 400, after: 200 },
    })
  );

  // Section content
  if (content) {
    const lines = content.split("\n").filter((line) => line.trim());
    lines.forEach((line) => {
      if (line.trim()) {
        elements.push(
          new Paragraph({
            children: [
              new TextRun({
                text: line.trim(),
                size: 22,
              }),
            ],
            spacing: { after: 100 },
          })
        );
      }
    });
  }

  return elements;
};

const createSkillsTable = (skillsContent: string) => {
  if (!skillsContent) return [];

  const elements = [];

  // Skills title
  elements.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "CORE TECHNICAL SKILLS",
          bold: true,
          size: 24,
          color: "1f2937",
        }),
      ],
      spacing: { before: 400, after: 200 },
    })
  );

  // Parse skills into table format
  const skillsData = parseSkillsContent(skillsContent);

  if (skillsData.length > 0) {
    const table = new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      rows: skillsData.map(
        (skill) =>
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: skill.category,
                        bold: true,
                        size: 20,
                      }),
                    ],
                  }),
                ],
                width: {
                  size: 30,
                  type: WidthType.PERCENTAGE,
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: skill.skills,
                        size: 20,
                      }),
                    ],
                  }),
                ],
                width: {
                  size: 70,
                  type: WidthType.PERCENTAGE,
                },
              }),
            ],
          })
      ),
    });

    elements.push(table);
  }

  return elements;
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

