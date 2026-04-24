import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Is YaySpinner really free?", a: "Yes — 100% free. No signup, no credit card, no daily limits. Spin all you want." },
  { q: "Is the wheel truly random?", a: "Each segment has equal probability. We use the browser's secure random function so every spin is unbiased." },
  { q: "How many entries can I add?", a: "Add as many as you like. The wheel automatically scales the segments and labels to fit." },
  { q: "Can I use it for giveaways and raffles?", a: "Absolutely. Many creators, teachers and businesses use YaySpinner for transparent, on-stream picks." },
  { q: "Do my entries get saved?", a: "Your entries stay in your browser only. We don't track or store them on a server." },
];

const FAQ = () => (
  <section id="faq" className="py-24">
    <div className="container max-w-3xl">
      <div className="text-center mb-12">
        <p className="font-display font-bold text-primary uppercase tracking-widest text-sm mb-3">FAQ</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold">Quick answers</h2>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="bg-card border-2 border-border rounded-2xl px-6 shadow-card"
          >
            <AccordionTrigger className="font-display font-bold text-lg hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
