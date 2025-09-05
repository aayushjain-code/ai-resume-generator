import React from "react";
import { StickyNote } from "lucide-react";

interface AdditionalNotesSectionProps {
  register: any;
  errors: any;
}

const AdditionalNotesSection = ({
  register,
  errors,
}: AdditionalNotesSectionProps) => {
  return (
    <div className="form-section">
      <div className="flex items-center space-x-2 mb-6">
        <StickyNote className="w-5 h-5 text-primary-600" />
        <h2 className="text-xl font-semibold text-gray-900">
          Additional Notes
        </h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional information, skills, or requirements
        </label>
        <textarea
          {...register("additionalNotes", {
            maxLength: {
              value: 1000,
              message: "Additional notes must be less than 1000 characters",
            },
          })}
          rows={4}
          className="input-field resize-none"
          placeholder="Add any additional information, specific skills, requirements, or notes that should be included in the resume..."
        />
        <div className="flex justify-between items-center mt-1">
          {errors.additionalNotes && (
            <p className="text-sm text-red-600">
              {errors.additionalNotes.message}
            </p>
          )}
          <p className="text-sm text-gray-500 ml-auto">
            Optional: Include any specific skills, achievements, or requirements
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdditionalNotesSection;

