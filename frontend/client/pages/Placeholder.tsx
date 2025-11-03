import { Link } from "react-router-dom";

export default function Placeholder({ title = "Coming Soon", description = "This page is a placeholder. Continue prompting if you'd like me to fill this content next." }: { title?: string; description?: string }) {
  return (
    <section className="container py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
      <div className="mt-8">
        <Link to="/questionnaire" className="inline-flex items-center px-6 py-3 rounded-md bg-primary text-white hover:bg-primary/90">Start a New Search</Link>
      </div>
    </section>
  );
}
