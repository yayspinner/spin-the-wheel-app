import { Sparkles } from "lucide-react";

const Header = () => (
  <header className="sticky top-0 z-30 backdrop-blur-md bg-background/70 border-b border-border/60">
    <div className="container flex items-center justify-between h-16">
      <a href="/" className="flex items-center gap-2 font-display font-bold text-xl">
        <span className="h-9 w-9 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-pop">
          <Sparkles className="h-5 w-5 text-white" />
        </span>
        <span className="text-gradient-brand">YaySpinner</span>
      </a>
      <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted-foreground">
        <a href="#wheel" className="hover:text-primary transition-colors">Spin</a>
        <a href="#features" className="hover:text-primary transition-colors">Features</a>
        <a href="#how" className="hover:text-primary transition-colors">How it works</a>
        <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
      </nav>
      <a
        href="#wheel"
        className="hidden sm:inline-flex items-center gap-2 px-5 h-10 rounded-xl bg-gradient-brand text-primary-foreground font-display font-bold shadow-pop hover:scale-105 transition-transform"
      >
        Try it free
      </a>
    </div>
  </header>
);

export default Header;
