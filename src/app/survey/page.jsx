"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "../data/questions"; // adjust path as needed

const likertLabels = [
  "1 - Strongly Disagree",
  "2 - Disagree",
  "3 - Neutral",
  "4 - Agree",
  "5 - Strongly Agree",
];

export default function SurveyPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState({});

  const handleChange = (id, value) =>
    setAnswers((a) => ({ ...a, [id]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions.");
      return;
    }
    // Save in localStorage for demo; or send to API/Sheets
    localStorage.setItem("responses", JSON.stringify(answers));
    router.push("/result");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-cyan-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-black">
          Oracle HCM FitScore Survey
        </h2>
        <div className="flex flex-col gap-8">
          {questions.map((q, idx) => (
            <div key={q.id} className="border-b pb-6">
              <div className="font-semibold mb-3">
                {idx + 1}. {q.text}
              </div>
              <div className="flex gap-6">
                {likertLabels.map((label, value) => (
                  <label key={value} className="flex flex-col items-center">
                    <input
                      type="radio"
                      name={q.id}
                      value={value + 1}
                      checked={answers[q.id] === String(value + 1)}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                      className="w-5 h-5 text-black"
                      required={idx === 0}
                    />
                    <span className="mt-1 text-xs text-black">{value + 1}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="mt-8 w-full bg-red-700 hover:bg-red-900 text-white font-semibold py-3 rounded-lg text-lg"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
