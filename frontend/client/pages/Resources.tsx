import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const schemes = [
  {
    id: "pmay",
    title: "Pradhan Mantri Awas Yojana (PMAY)",
    img: "https://cdn.builder.io/api/v1/image/assets%2F4cc3384f65e545ca80f7eeb4c328e33b%2F4c621ac51eda4285baa2a1da2ab583a1?format=webp&width=800",
    category: "Housing",
    desc: "Provides affordable housing subsidies and financial assistance to eligible low-income families.",
    eligibility: ["EWS/LIG households", "Annual income under ₹6 lakh"],
    process:
      "Apply online via the official PMAY portal using Aadhaar and income proof.",
    url: "https://pmaymis.gov.in/",
  },
  {
    id: "pmgkay",
    title: "Pradhan Mantri Garib Kalyan Anna Yojana (PMGKAY)",
    img: "https://cdn.builder.io/api/v1/image/assets%2F4cc3384f65e545ca80f7eeb4c328e33b%2F4c621ac51eda4285baa2a1da2ab583a1?format=webp&width=800",
    category: "Food",
    desc: "Provides additional food grains to eligible households to ensure food security during times of need.",
    eligibility: ["BPL households", "NFSA priority households"],
    process:
      "Benefits are distributed through the Public Distribution System (ration cards) via State food departments.",
    url: "https://dfpd.gov.in/",
  },
  {
    id: "pmjdy",
    title: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
    img: "https://cdn.builder.io/api/v1/image/assets%2F4cc3384f65e545ca80f7eeb4c328e33b%2F4c621ac51eda4285baa2a1da2ab583a1?format=webp&width=800",
    category: "Financial",
    desc: "Financial inclusion program providing zero-balance bank accounts, insurance and pension access.",
    eligibility: [
      "Indian citizens aged 10+",
      "No existing bank account required",
    ],
    process:
      "Open an account at any bank branch or apply via the PMJDY portal using valid ID proof.",
    url: "https://pmjdy.gov.in/",
  },
  {
    id: "pmkisan",
    title: "PM-KISAN (PM Kisan Samman Nidhi)",
    img: "https://cdn.builder.io/api/v1/image/assets%2F4cc3384f65e545ca80f7eeb4c328e33b%2F4c621ac51eda4285baa2a1da2ab583a1?format=webp&width=800",
    category: "Agriculture",
    desc: "Income support of ₹6,000 per year for small and marginal farmers to supplement agricultural needs.",
    eligibility: [
      "Small and marginal landholding farmers",
      "Aadhaar-linked bank account",
    ],
    process:
      "Register on the PM-KISAN portal with Aadhaar and bank details to receive transfers.",
    url: "https://pmkisan.gov.in/",
  },
  {
    id: "pmvvy",
    title: "Pradhan Mantri Vaya Vandana Yojana (PMVVY)",
    img: "https://cdn.builder.io/api/v1/image/assets%2F4cc3384f65e545ca80f7eeb4c328e33b%2F4c621ac51eda4285baa2a1da2ab583a1?format=webp&width=800",
    category: "Pension",
    desc: "Pension scheme targeted at senior citizens to provide guaranteed returns and steady income.",
    eligibility: ["Indian citizens aged 60+"],
    process:
      "Apply through LIC of India or authorized agents; documentation includes ID and KYC.",
    url: "https://licindia.in/",
  },
];

export default function Resources() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(schemes.map((s) => s.category)))],
    [],
  );

  const filtered = useMemo(() => {
    return schemes.filter((s) => {
      const matchesQuery = (s.title + s.desc + s.category)
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesCategory = category === "All" || s.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <section className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Resources</h1>
      </div>

      <div className="mb-6 flex flex-col md:flex-row items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search schemes by name, description or category"
          className="flex-1 h-10 rounded-md border px-3"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-10 rounded-md border px-3"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-md shadow p-6 flex flex-col"
          >
            <img
              src={s.img}
              alt={s.title}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-medium mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>

            <div className="mb-3">
              <div className="font-semibold">Eligibility Criteria</div>
              <ul className="text-sm list-disc ml-5 mt-2">
                {s.eligibility.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <div className="font-semibold">Application Process</div>
              <p className="text-sm mt-2">{s.process}</p>
            </div>

            <div className="mt-auto">
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block w-full text-center px-4 py-2 bg-primary text-white rounded shadow-sm hover:opacity-95"
              >
                Apply Now
              </a>
            </div>

            <div className="mt-3 text-xs text-muted-foreground">
              Category: <span className="font-medium">{s.category}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Link
          to="/questionnaire"
          className="block w-full text-center px-4 py-3 bg-primary text-white rounded-md shadow"
        >
          Start a New Search
        </Link>
      </div>
    </section>
  );
}
