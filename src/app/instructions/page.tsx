"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Instructions() {
  const router = useRouter();
  const [company, setCompany] = useState("");

  function handleNext(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!company.trim()) return alert("Please enter your company name.");
    // Save to localStorage (or context) for now
    localStorage.setItem("company", company);
    router.push("/survey");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cyan-900 px-4">
      <form
        className="max-w-xl w-full p-8 rounded-2xl shadow-xl bg-white"
        onSubmit={handleNext}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          Research Questionnaire - Organizational Readiness to Adopt Oracle HCM
          in MSMEs
        </h2>
        <p className="mb-4 text-gray-700">
          This survey is part of an academic research project under the MBA
          program at Anna University, undertaken to analyze the organizational
          readiness of MSME for adopting Oracle Human Capital Management (HCM)
          software. Your inputs will be used purely for academic purposes, and
          no personal or company-specific data will be collected or disclosed.
        </p>
        <p className="mb-4 text-gray-700">
          <strong>Oracle Human Capital Management (HCM) Cloud</strong> is an
          integrated suite of cloud-based applications designed to manage HR
          operations such as recruitment, onboarding, payroll, performance,
          learning, and workforce planning. It helps organizations automate HR
          tasks, enhance employee experience, and align workforce strategies
          with business goals.
        </p>
        <a
          href="https://www.oracle.com/human-capital-management/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline mb-6 inline-block"
        >
          Learn more about Oracle HCM ↗
        </a>
        <div className="mb-6">
          <label className="block font-medium mb-1 text-gray-800">
            Company Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-red-700 hover:cursor-pointer transition rounded-lg px-8 py-3 text-white font-semibold text-lg w-full"
        >
          Next
        </button>
      </form>
    </main>
  );
}
