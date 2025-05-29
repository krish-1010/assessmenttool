// app/page.tsx or pages/index.js
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cyan-900  px-4">
      <div className="max-w-lg w-full p-8 rounded-2xl shadow-xl  bg-white text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          Oracle HCM FitScore Readiness Assessment Tool
        </h1>
        <p className="text-black mb-8">
          Analyze your organization&apos;s readiness to adopt Oracle HCM. Based
          on research at Anna University MSME program.
        </p>
        <Link
          href="/instructions"
          className="bg-red-700 transition rounded-lg px-8 py-3 text-white font-semibold text-lg shadow"
        >
          Start
        </Link>
      </div>
    </main>
  );
}
