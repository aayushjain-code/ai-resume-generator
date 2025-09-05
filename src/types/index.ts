import { UseFormRegister, FieldErrors } from "react-hook-form";

export interface FormData {
  personalInfo: {
    name: string;
    email?: string;
    jobTitle: string;
    yearsOfExperience: string;
    domain?: string;
    education?: string;
  };
  description: string;
  workResponsibilities: string;
  skills: string;
  additionalNotes?: string;
}

export interface FormSectionProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export interface ResumeData extends FormData {
  exportFormat: 'docx' | 'html';
}

export interface PersonalInfo {
  name?: string;
  email?: string;
  jobTitle?: string;
  yearsOfExperience?: string;
  domain?: string;
  education?: string;
}
