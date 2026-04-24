import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Shuffle, Trash2, Plus, RotateCcw } from "lucide-react";
import { useMemo } from "react";

type Props = {
  text: string;
  setText: (v: string) => void;
  onShuffle: () => void;
  onClear: () => void;
  onReset: () => void;
};

const EntriesPanel = ({ text, setText, onShuffle, onClear, onReset }: Props) => {
  const count = useMemo(
    () => text.split("\n").map((s) => s.trim()).filter(Boolean).length,
    [text]
  );

  return (
    <div className="bg-card rounded-3xl p-6 shadow-card border-2 border-border h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-2xl font-bold">Entries</h3>
        <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-sm">
          {count} items
        </span>
      </div>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add one entry per line…"
        className="flex-1 min-h-[260px] text-base rounded-2xl border-2 focus-visible:ring-primary"
      />

      <div className="grid grid-cols-2 gap-3 mt-4">
        <Button variant="soft" onClick={onShuffle}>
          <Shuffle /> Shuffle
        </Button>
        <Button variant="soft" onClick={() => setText(text + (text.endsWith("\n") || text === "" ? "" : "\n"))}>
          <Plus /> Add line
        </Button>
        <Button variant="soft" onClick={onReset}>
          <RotateCcw /> Reset
        </Button>
        <Button variant="soft" onClick={onClear} className="text-destructive hover:text-destructive">
          <Trash2 /> Clear
        </Button>
      </div>
    </div>
  );
};

export default EntriesPanel;
