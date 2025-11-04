import React from "react";

const Submissions: React.FC = () => {
  return (
    <section className="container py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Submissions</h1>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        This page will display all user submissions. Continue prompting if you'd like me to implement the backend connection or display real data here.
      </p>
    </section>
  );
};

export default Submissions;
