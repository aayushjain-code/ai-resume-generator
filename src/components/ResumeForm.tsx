"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import PersonalInfo from "./form-sections/PersonalInfo";
import DescriptionSection from "./form-sections/DescriptionSection";
import WorkResponsibilitiesSection from "./form-sections/WorkResponsibilitiesSection";
import SkillsSection from "./form-sections/SkillsSection";
import AdditionalNotesSection from "./form-sections/AdditionalNotesSection";
import { Download, Loader2, Eye } from "lucide-react";
import { generateResume } from "@/lib/resumeGenerator";
import { FormData, ResumeData } from "@/types";

const ResumeForm = ({
  onGeneratingChange,
}: {
  onGeneratingChange: (generating: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setIsGenerating(true);
      onGeneratingChange(true);

      if (!data.description) {
        toast.error("Please provide a job description");
        return;
      }

      const resumeData: ResumeData = {
        ...data,
        exportFormat: "docx",
      };

      const result = await generateResume(resumeData);

      // Create download URL
      const blob = new Blob([result as ArrayBuffer], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);

      const filename = `resume_${
        data.personalInfo?.name?.replace(/\s+/g, "_") || "generated"
      }.docx`;

      setFileName(filename);
      toast.success("Resume generated successfully!");
    } catch (error: unknown) {
      console.error("Error generating resume:", error);

      if (error instanceof Error) {
        if (error.message.includes("quota") || error.message.includes("429")) {
          toast.success(
            "Resume generated using fallback content (API quota exceeded)"
          );
        } else if (error.message.includes("API key")) {
          toast.error("Invalid API key. Please check your configuration.");
        } else {
          toast.error("Failed to generate resume");
        }
      } else {
        toast.error("Failed to generate resume");
      }
    } finally {
      setIsGenerating(false);
      onGeneratingChange(false);
    }
  };

  const onPreview = async (data: FormData) => {
    try {
      setIsGenerating(true);
      onGeneratingChange(true);

      if (!data.description) {
        toast.error("Please provide a job description");
        return;
      }

      const resumeData: ResumeData = {
        ...data,
        exportFormat: "html",
      };

      const result = await generateResume(resumeData);
      const htmlContent = new TextDecoder().decode(result);
      setPreviewHtml(htmlContent);
      setShowPreview(true);
      toast.success("Preview generated successfully!");
    } catch (error: unknown) {
      console.error("Error generating preview:", error);

      if (error instanceof Error) {
        if (error.message.includes("quota") || error.message.includes("429")) {
          toast.success(
            "Preview generated using fallback content (API quota exceeded)"
          );
        } else if (error.message.includes("API key")) {
          toast.error("Invalid API key. Please check your configuration.");
        } else {
          toast.error("Failed to generate preview");
        }
      } else {
        toast.error("Failed to generate preview");
      }
    } finally {
      setIsGenerating(false);
      onGeneratingChange(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const resetForm = () => {
    reset();
    setDownloadUrl(null);
    setFileName("");
    setPreviewHtml(null);
    setShowPreview(false);
  };

  return (
    <div className="space-y-8">
      {showPreview && previewHtml && (
        <div className="form-section">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Resume Preview
            </h3>
            <button
              onClick={() => setShowPreview(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div
            className="border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Information */}
        <PersonalInfo register={register} errors={errors} />

        {/* Description Section */}
        <DescriptionSection register={register} errors={errors} />

        {/* Work Responsibilities Section */}
        <WorkResponsibilitiesSection register={register} errors={errors} />

        {/* Skills Section */}
        <SkillsSection register={register} errors={errors} />

        {/* Additional Notes Section */}
        <AdditionalNotesSection register={register} errors={errors} />

        {/* Action Buttons */}
        <div className="form-section">
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={resetForm}
              className="btn-secondary"
              disabled={isGenerating}
            >
              Reset Form
            </button>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleSubmit(onPreview)}
                disabled={isGenerating}
                className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    <span>Preview Resume</span>
                  </>
                )}
              </button>

              {downloadUrl && (
                <button
                  type="button"
                  onClick={handleDownload}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download DOCX</span>
                </button>
              )}

              <button
                type="submit"
                disabled={isGenerating}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Generate DOCX</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResumeForm;
