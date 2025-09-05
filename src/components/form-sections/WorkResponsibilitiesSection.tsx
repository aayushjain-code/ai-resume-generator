import React from "react";
import { Briefcase } from "lucide-react";
import { FormSectionProps } from "@/types";

type WorkResponsibilitiesSectionProps = FormSectionProps;

const WorkResponsibilitiesSection = ({
  register,
  errors,
}: WorkResponsibilitiesSectionProps) => {
  return (
    <div className="form-section">
      <div className="flex items-center space-x-2 mb-6">
        <Briefcase className="w-5 h-5 text-primary-600" />
        <h2 className="text-xl font-semibold text-gray-900">
          Work Responsibilities
        </h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          List 4-6 key responsibilities relevant to your target role
        </label>
        <textarea
          {...register("workResponsibilities", {
            required: "Work responsibilities are required",
            minLength: {
              value: 50,
              message: "Please provide at least 50 characters",
            },
            maxLength: {
              value: 1000,
              message: "Responsibilities must be less than 1000 characters",
            },
          })}
          rows={6}
          className="input-field resize-none"
          placeholder="• Led development of scalable web applications serving 50,000+ users&#10;• Implemented microservices architecture using modern frameworks&#10;• Reduced page load time by 40% through performance optimization&#10;• Integrated payment processing and inventory management systems&#10;• Mentored junior developers and established coding standards&#10;• Collaborated with cross-functional teams to deliver high-quality products"
        />
        <div className="flex justify-between items-center mt-1">
          {errors.workResponsibilities && (
            <p className="text-sm text-red-600">
              {errors.workResponsibilities.message}
            </p>
          )}
          <p className="text-sm text-gray-500 ml-auto">
            Use bullet points and action verbs (Led, Implemented, Developed,
            etc.)
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkResponsibilitiesSection;
