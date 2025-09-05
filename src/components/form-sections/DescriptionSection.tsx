import React from "react";
import { FileText } from "lucide-react";
import { FormSectionProps } from "@/types";

type DescriptionSectionProps = FormSectionProps;

const DescriptionSection = ({ register, errors }: DescriptionSectionProps) => {
  return (
    <div className="form-section">
      <div className="flex items-center space-x-2 mb-6">
        <FileText className="w-5 h-5 text-primary-600" />
        <h2 className="text-xl font-semibold text-gray-900">
          Job Description *
        </h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Describe the job or role you&apos;re applying for
        </label>
        <textarea
          {...register("description", {
            required: "Job description is required",
            minLength: {
              value: 50,
              message: "Description must be at least 50 characters",
            },
            maxLength: {
              value: 2000,
              message: "Description must be less than 2000 characters",
            },
          })}
          rows={6}
          className="input-field resize-none"
          placeholder="Enter a detailed description of the job, role, or position you're applying for. Include key responsibilities, requirements, and any specific details that would help generate a targeted resume..."
        />
        <div className="flex justify-between items-center mt-1">
          {errors.description && (
            <p className="text-sm text-red-600">{errors.description.message}</p>
          )}
          <p className="text-sm text-gray-500 ml-auto">
            Provide detailed information about the job to generate a targeted
            resume
          </p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionSection;
