"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import ResumeForm from "@/components/ResumeForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Resume Generator
            </h1>
            <p className="text-lg text-gray-600">
              Create professional, ATS-friendly resumes powered by AI
            </p>
          </div>
          <ResumeForm onGeneratingChange={() => {}} />
        </div>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}
