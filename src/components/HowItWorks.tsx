const steps = [
  { n: "1", title: "Add your entries", desc: "Type or paste names, prizes or options — one per line." },
  { n: "2", title: "Hit the SPIN button", desc: "Watch the wheel spin with smooth, satisfying physics." },
  { n: "3", title: "Celebrate the winner", desc: "Confetti, fanfare, and a quick option to remove or spin again." },
];

const HowItWorks = () => (
  <section id="how" className="py-24 bg-gradient-soft">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="font-display font-bold text-primary uppercase tracking-widest text-sm mb-3">How it works</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold">Three spins to <span className="text-gradient-brand">happiness</span></h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6 relative">
        {steps.map((s) => (
          <div key={s.n} className="relative bg-card rounded-3xl p-8 shadow-card border-2 border-border">
            <div className="h-16 w-16 rounded-2xl bg-gradient-brand text-primary-foreground font-display font-bold text-3xl flex items-center justify-center shadow-pop mb-5">
              {s.n}
            </div>
            <h3 className="font-display font-bold text-2xl mb-2">{s.title}</h3>
            <p className="text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
