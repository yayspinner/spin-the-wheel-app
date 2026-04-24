import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCw, Trash2 } from "lucide-react";

type Props = {
  open: boolean;
  winner: string | null;
  onClose: () => void;
  onSpinAgain: () => void;
  onRemove: () => void;
};

const WinnerDialog = ({ open, winner, onClose, onSpinAgain, onRemove }: Props) => {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md rounded-3xl border-2 text-center p-8">
        <DialogHeader>
          <DialogTitle className="sr-only">Winner</DialogTitle>
        </DialogHeader>
        <div className="animate-pop-in flex flex-col items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-gradient-sun flex items-center justify-center shadow-pop">
            <Trophy className="h-10 w-10 text-white" />
          </div>
          <p className="text-muted-foreground font-semibold uppercase tracking-widest text-sm">
            🎉 Winner 🎉
          </p>
          <h3 className="font-display text-4xl font-bold text-gradient-brand break-words max-w-full">
            {winner}
          </h3>
          <div className="grid grid-cols-2 gap-3 w-full mt-4">
            <Button variant="soft" onClick={onRemove}>
              <Trash2 /> Remove
            </Button>
            <Button variant="hero" onClick={onSpinAgain}>
              <RotateCw /> Spin again
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WinnerDialog;
