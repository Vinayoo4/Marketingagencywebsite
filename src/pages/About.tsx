const About = () => {
  return (
    <div className="container py-14 space-y-10">
      <section className="max-w-3xl">
        <h1 className="text-4xl font-bold">About Shri Nandi Marketing Agency</h1>
        <p className="mt-4 text-slate-300 leading-relaxed">
          We are a practical marketing and operations partner for small brands that need digital growth and backend systems working together.
          Our work sits at the intersection of performance marketing, e-commerce execution, and compliance support.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="service-card">
          <h2 className="text-2xl font-semibold text-cyan-300">Founder story</h2>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            The agency is founded by a BTech AIML professional with hands-on e-commerce and operations experience.
            This background helps us move beyond ad campaigns into process-driven execution that actually holds up in real business conditions.
          </p>
        </article>

        <article className="service-card">
          <h2 className="text-2xl font-semibold text-cyan-300">Our edge</h2>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            Not just marketing; we understand systems, code, and compliance.
            That means fewer bottlenecks, cleaner execution, and better long-term outcomes for founders and teams.
          </p>
        </article>
      </section>
    </div>
  );
};

export default About;
