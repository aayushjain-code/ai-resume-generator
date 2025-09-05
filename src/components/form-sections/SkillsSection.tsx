import React from "react";
import { Wrench } from "lucide-react";
import { FormSectionProps } from "@/types";

type SkillsSectionProps = FormSectionProps;

const SkillsSection = ({ register, errors }: SkillsSectionProps) => {
  return (
    <div className="form-section">
      <div className="flex items-center space-x-2 mb-6">
        <Wrench className="w-5 h-5 text-primary-600" />
        <h2 className="text-xl font-semibold text-gray-900">
          Skills & Qualifications
        </h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          List your technical skills, tools, frameworks, certifications, and
          soft skills
        </label>
        <textarea
          {...register("skills", {
            maxLength: {
              value: 800,
              message: "Skills must be less than 800 characters",
            },
          })}
          rows={5}
          className="input-field resize-none"
          placeholder="Technical Skills: JavaScript, Python, React, Node.js, AWS, Docker&#10;Frameworks: Express.js, Django, Spring Boot, Vue.js&#10;Databases: PostgreSQL, MongoDB, Redis&#10;Tools: Git, Jenkins, Kubernetes, Terraform&#10;Certifications: AWS Solutions Architect, Google Cloud Professional&#10;Soft Skills: Leadership, Problem Solving, Communication, Team Collaboration"
        />
        <div className="flex justify-between items-center mt-1">
          {errors.skills && (
            <p className="text-sm text-red-600">{errors.skills.message}</p>
          )}
          <p className="text-sm text-gray-500 ml-auto">
            Include technical skills, tools, frameworks, certifications, and
            soft skills
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
