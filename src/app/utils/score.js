const weights = {
  CMAVG: 21.6,
  MonitAVG: 18.1,
  TSAVG: 12.5,
  TRAVG: 12.3,
  RepAVG: 11.2,
  CXAVG: 11.4, // inverse
  ReachAVG: 8.8,
};

// Map question ID to its category
import { questions } from "../data/questions";
const questionCategory = Object.fromEntries(
  questions.map((q) => [q.id, q.category])
);

// Helper to average over an array
const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

// Scoring function: answers is an object { CX1: "5", CM1: "2", ... }
export function calculateFitScore(answers) {
  // Group answers by category
  const categories = {};
  for (let [qid, value] of Object.entries(answers)) {
    const cat = questionCategory[qid];
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(Number(value));
  }

  // Calculate avg per category (1–5 scale)
  const avgs = {};
  for (let cat in categories) {
    avgs[cat] = avg(categories[cat]);
  }

  // Weighted scoring (CXAVG is negative predictor, so inverted)
  function scale(v) {
    return (v - 1) / 4;
  } // 1→0, 5→1
  function inverse(v) {
    return (5 - v) / 4;
  } // 1→1, 5→0

  let score =
    scale(avgs.CMAVG) * weights.CMAVG +
    scale(avgs.MonitAVG) * weights.MonitAVG +
    scale(avgs.TSAVG) * weights.TSAVG +
    scale(avgs.TRAVG) * weights.TRAVG +
    scale(avgs.RepAVG) * weights.RepAVG +
    inverse(avgs.CXAVG) * weights.CXAVG + // inverse for CXAVG
    scale(avgs.ReachAVG) * weights.ReachAVG;

  return Math.round(score); // Integer out of 100
}
