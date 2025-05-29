"use client";
import { useEffect, useState } from "react";
import { calculateFitScore } from "../utils/score"; // your scoring fn above
import dynamic from "next/dynamic";
const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

export default function ResultPage() {
  const [score, setScore] = useState(null);
  const [company, setCompany] = useState("Your company");

  useEffect(() => {
    const responses = JSON.parse(localStorage.getItem("responses") || "{}");
    setScore(calculateFitScore(responses));
    const name = localStorage.getItem("company") || "Your company";
    setCompany(name);
  }, []);

  if (score === null) return <div>Loading...</div>;

  let verdict = "";
  if (score > 70) verdict = `${company} has high potential to adopt Oracle HCM`;
  else if (score > 40)
    verdict = `${company} has moderate potential to adopt Oracle HCM`;
  else verdict = `${company} has low potential to adopt Oracle HCM`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cyan-900 px-4">
      <div className="max-w-lg w-full p-8 rounded-2xl shadow-xl bg-white text-center">
        <h2 className="text-2xl font-bold mb-6">Your Oracle HCM FitScore</h2>
        <GaugeComponent
          value={score}
          minValue={0}
          maxValue={100}
          className="text-black"
          labels={{
            valueLabel: {
              style: {
                fontSize: "40px",
                fill: "#111", // THIS sets SVG text color to black
                color: "#111", // fallback for React/CSS
                textShadow: "none", // to remove white border
              },
              matchColorWithArc: false, // make sure it's NOT set to true
            },
          }}
          arc={{
            subArcs: [
              {
                limit: 40,
                color: "#EA4228", //red
                showTick: true,
              },
              {
                limit: 70,
                color: "#F5CD19", //yellow
                showTick: true,
              },
              {
                limit: 100,
                color: "#5BE12C", //green
                showTick: true,
              },
            ],
          }}
        />
        <div className="mt-8 text-3xl font-bold text-blue-700">
          {score} / 100
        </div>
        <div className="mt-4 text-lg text-black">
          Readiness Level: <span className="font-bold">{verdict}</span>
        </div>
      </div>
    </main>
  );
}
