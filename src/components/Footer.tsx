import { Sparkles } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/60 bg-card/40 backdrop-blur">
    <div className="container py-12 grid md:grid-cols-3 gap-8 items-center">
      <div className="flex items-center gap-2 font-display font-bold text-xl">
        <span className="h-9 w-9 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-pop">
          <Sparkles className="h-5 w-5 text-white" />
        </span>
        <span className="text-gradient-brand">YaySpinner</span>
      </div>
      <p className="text-muted-foreground text-center text-sm">
        Made with 💜 for makers, teachers and party planners.
      </p>
      <div className="flex md:justify-end gap-6 text-sm font-semibold text-muted-foreground">
        <a href="#features" className="hover:text-primary">Features</a>
        <a href="#how" className="hover:text-primary">How it works</a>
        <a href="#faq" className="hover:text-primary">FAQ</a>
      </div>
    </div>
    <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} YaySpinner · yayspinner.com
    </div>
  </footer>
);

export default Footer;
