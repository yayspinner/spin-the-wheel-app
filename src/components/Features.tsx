import { Zap, Users, GraduationCap, Gift, Shuffle, Smile } from "lucide-react";

const features = [
  { icon: Zap, title: "Instant & Free", desc: "No signup, no ads in your face. Just spin and go.", grad: "bg-gradient-sun" },
  { icon: Users, title: "Pick a winner", desc: "Run giveaways, raffles and team draws transparently.", grad: "bg-gradient-brand" },
  { icon: GraduationCap, title: "Classroom ready", desc: "Pick the next student or randomize teams in a click.", grad: "bg-gradient-sky" },
  { icon: Gift, title: "Decision maker", desc: "What to eat? Where to go? Let the wheel decide.", grad: "bg-gradient-sun" },
  { icon: Shuffle, title: "Fully customizable", desc: "Add unlimited entries, shuffle, edit on the fly.", grad: "bg-gradient-brand" },
  { icon: Smile, title: "Just plain fun", desc: "Confetti, colors and big satisfying spins.", grad: "bg-gradient-sky" },
];

const Features = () => (
  <section id="features" className="py-24">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="font-display font-bold text-primary uppercase tracking-widest text-sm mb-3">Why YaySpinner</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
          A spinner that's actually <span className="text-gradient-brand">fun to use</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Built for giveaways, classrooms, parties, and everyday choices that need a little magic.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="group bg-card rounded-3xl p-7 shadow-card border-2 border-border hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`h-14 w-14 rounded-2xl ${f.grad} flex items-center justify-center shadow-pop mb-5 group-hover:scale-110 transition-transform`}>
              <f.icon className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-display font-bold text-xl mb-2">{f.title}</h3>
            <p className="text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
