import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <footer className={`${isHome ? "bg-transparent" : "mt-12 border-t"}`}>
      <div
        className={`container py-8 text-sm ${isHome ? "text-white/80" : "text-muted-foreground"} flex flex-col md:flex-row items-center justify-between gap-4`}
      >
        <nav className="flex items-center gap-6">
          <a
            className={`hover:text-foreground ${isHome ? "text-white/80" : ""}`}
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className={`hover:text-foreground ${isHome ? "text-white/80" : ""}`}
            href="#"
          >
            Terms of Service
          </a>
          <a
            className={`hover:text-foreground ${isHome ? "text-white/80" : ""}`}
            href="#"
          >
            Contact Us
          </a>
        </nav>
        <p>
          © {new Date().getFullYear()} BenefitsFinder. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
