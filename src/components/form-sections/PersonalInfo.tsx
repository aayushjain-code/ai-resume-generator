import React from "react";
import { User, Mail, Briefcase, GraduationCap, Calendar } from "lucide-react";
import { FormSectionProps } from "@/types";

type PersonalInfoProps = FormSectionProps;

const PersonalInfo = ({ register, errors }: PersonalInfoProps) => {
  return (
    <div className="form-section">
      <div className="flex items-center space-x-2 mb-6">
        <User className="w-5 h-5 text-primary-600" />
        <h2 className="text-xl font-semibold text-gray-900">
          Candidate Details
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              {...register("personalInfo.name", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              className="input-field pl-10"
              placeholder="John Doe"
            />
          </div>
          {errors.personalInfo?.name && (
            <p className="mt-1 text-sm text-red-600">
              {errors.personalInfo.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              {...register("personalInfo.email", {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="input-field pl-10"
              placeholder="john.doe@email.com"
            />
          </div>
          {errors.personalInfo?.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.personalInfo.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Title / Target Role *
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              {...register("personalInfo.jobTitle", {
                required: "Job title is required",
                minLength: {
                  value: 2,
                  message: "Job title must be at least 2 characters",
                },
              })}
              className="input-field pl-10"
              placeholder="Software Engineer, Data Scientist, etc."
            />
          </div>
          {errors.personalInfo?.jobTitle && (
            <p className="mt-1 text-sm text-red-600">
              {errors.personalInfo.jobTitle.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Years of Experience *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              {...register("personalInfo.yearsOfExperience", {
                required: "Years of experience is required",
              })}
              className="input-field pl-10"
            >
              <option value="">Select experience</option>
              <option value="0-1">0-1 years</option>
              <option value="2-3">2-3 years</option>
              <option value="4-5">4-5 years</option>
              <option value="6-8">6-8 years</option>
              <option value="9-12">9-12 years</option>
              <option value="13+">13+ years</option>
            </select>
          </div>
          {errors.personalInfo?.yearsOfExperience && (
            <p className="mt-1 text-sm text-red-600">
              {errors.personalInfo.yearsOfExperience.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Domain / Industry Focus
          </label>
          <input
            type="text"
            {...register("personalInfo.domain")}
            className="input-field"
            placeholder="Technology, Healthcare, Finance, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Education
          </label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              {...register("personalInfo.education")}
              className="input-field pl-10"
              placeholder="Bachelor's in Computer Science, etc."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
