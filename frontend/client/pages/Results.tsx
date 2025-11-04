import { Link } from "react-router-dom";

const schemes = [
  {
    id: "pmay",
    title: "Pradhan Mantri Awas Yojana (PMAY)",
    img: "https://cdn.builder.io/api/v1/image/assets%2F4cc3384f65e545ca80f7eeb4c328e33b%2F4c621ac51eda4285baa2a1da2ab583a1?format=webp&width=800",
    desc: "Helps low-income families access affordable housing through government subsidies.",
    eligibility: [
      "Economically Weaker Section (EWS) and Low Income Group (LIG)",
      "Annual income below ₹6 lakh",
    ],
    applyUrl: "https://pmaymis.gov.in/",
    process:
      "Apply online via the official PMAY portal using Aadhaar and income proof.",
  },
  {
    id: "pmgkay",
    title: "Pradhan Mantri Garib Kalyan Anna Yojana (PMGKAY)",
    img: "https://cdn.builder.io/api/v1/image/assets%2F4cc3384f65e545ca80f7eeb4c328e33b%2F4c621ac51eda4285baa2a1da2ab583a1?format=webp&width=800",
    desc: "Provides free food grains to low-income families to ensure food security.",
    eligibility: [
      "BPL (Below Poverty Line) households",
      "Priority households under NFSA",
    ],
    applyUrl: "https://dfpd.gov.in/",
    process:
      "Eligible beneficiaries receive food grains automatically through their ration cards. Learn more on the official portal.",
  },
  {
    id: "pmjdy",
    title: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
    img: "https://cdn.builder.io/api/v1/image/assets%2F4cc3384f65e545ca80f7eeb4c328e33b%2F4c621ac51eda4285baa2a1da2ab583a1?format=webp&width=800",
    desc: "Offers free zero-balance bank accounts with insurance and pension benefits.",
    eligibility: [
      "Indian citizens aged 10+",
      "No existing bank account required",
    ],
    applyUrl: "https://pmjdy.gov.in/",
    process: "Visit any bank branch or apply online using valid ID proof.",
  },
];

export default function Results() {
  return (
    <section className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">
          BenefitsFinder — Government Schemes & Resources
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {schemes.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-md shadow p-6 flex flex-col justify-between"
          >
            <img
              src={s.img}
              alt={s.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <div>
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
            </div>

            <div>
              <a
                href={s.applyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block w-full text-center px-4 py-2 bg-primary text-white rounded shadow-sm hover:opacity-95"
              >
                Apply Now
              </a>
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
