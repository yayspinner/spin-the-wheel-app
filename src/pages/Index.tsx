import { useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import SpinWheel, { type SpinWheelHandle } from "@/components/SpinWheel";
import EntriesPanel from "@/components/EntriesPanel";
import WinnerDialog from "@/components/WinnerDialog";
import { Button } from "@/components/ui/button";
import { Sparkles, PartyPopper } from "lucide-react";

const DEFAULT_ENTRIES = [
  "Alice", "Bob", "Charlie", "Diana",
  "Ethan", "Fiona", "George", "Hannah",
];

const Index = () => {
  const [text, setText] = useState(DEFAULT_ENTRIES.join("\n"));
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const wheelRef = useRef<SpinWheelHandle>(null);

  const entries = useMemo(
    () => text.split("\n").map((s) => s.trim()).filter(Boolean),
    [text]
  );

  const fireConfetti = () => {
    const end = Date.now() + 600;
    const colors = ["#ff3ea5", "#ffb800", "#22d3ee", "#a855f7"];
    (function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 70, origin: { x: 0 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 70, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const handleResult = (w: string) => {
    setWinner(w);
    setOpen(true);
    fireConfetti();
  };

  const handleSpinAgain = () => {
    setOpen(false);
    setTimeout(() => wheelRef.current?.spin(), 250);
  };

  const handleRemoveWinner = () => {
    if (!winner) return;
    const next = entries.filter((e, i) => !(e === winner && entries.indexOf(winner) === i));
    setText(next.join("\n"));
    setOpen(false);
  };

  const shuffle = () => {
    const arr = [...entries];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setText(arr.join("\n"));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* HERO */}
      <section id="wheel" className="relative overflow-hidden pt-12 pb-20">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
        <div className="pointer-events-none absolute top-40 -right-24 h-96 w-96 rounded-full bg-secondary/40 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />

        <div className="container relative">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2 bg-card border-2 border-border rounded-full px-4 py-1.5 text-sm font-bold text-primary shadow-card">
              <Sparkles className="h-4 w-4" /> The happiest random picker on the web
            </span>
            <h1 className="mt-6 font-display font-bold text-5xl md:text-7xl leading-tight tracking-tight">
              Spin the wheel,<br />
              <span className="text-gradient-brand">make a yay decision</span>
            </h1>
            <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              YaySpinner is a free, colorful Spin The Wheel app for giveaways, classrooms, raffles
              and "what should we eat tonight?" moments.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
            <div className="flex flex-col items-center">
              <div className="animate-float">
                <SpinWheel
                  ref={wheelRef}
                  entries={entries}
                  onResult={handleResult}
                  spinning={spinning}
                  setSpinning={setSpinning}
                  size={typeof window !== "undefined" && window.innerWidth < 640 ? 320 : 460}
                />
              </div>
              <Button
                variant="hero"
                size="xl"
                className="mt-8"
                disabled={spinning || entries.length === 0}
                onClick={() => wheelRef.current?.spin()}
              >
                <PartyPopper /> {spinning ? "Spinning…" : "Spin the wheel"}
              </Button>
            </div>

            <EntriesPanel
              text={text}
              setText={setText}
              onShuffle={shuffle}
              onClear={() => setText("")}
              onReset={() => setText(DEFAULT_ENTRIES.join("\n"))}
            />
          </div>
        </div>
      </section>

      <Features />
      <HowItWorks />
      <FAQ />

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-hero p-12 md:p-16 text-center shadow-pop">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 0, transparent 40%), radial-gradient(circle at 80% 70%, white 0, transparent 40%)" }} />
            <div className="relative">
              <h2 className="text-white font-display font-bold text-4xl md:text-5xl mb-4">
                Ready to add a little yay?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
                Scroll back up, drop in your entries, and let the wheel pick.
              </p>
              <a
                href="#wheel"
                className="inline-flex items-center gap-2 bg-white text-primary px-8 h-14 rounded-2xl font-display font-bold text-lg shadow-card hover:scale-105 transition-transform"
              >
                <PartyPopper /> Start spinning
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <WinnerDialog
        open={open}
        winner={winner}
        onClose={() => setOpen(false)}
        onSpinAgain={handleSpinAgain}
        onRemove={handleRemoveWinner}
      />
    </div>
  );
};

export default Index;
