import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThankYouProps {
  onRestart: () => void;
}

export const ThankYou = ({ onRestart }: ThankYouProps) => {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <CheckCircle className="w-16 h-16 text-primary animate-bounce" />
      </div>
      <h2 className="text-2xl font-semibold">Thank You!</h2>
      <p className="text-muted-foreground">Your responses have been recorded.</p>
      <Button onClick={onRestart} variant="outline">
        Take Survey Again
      </Button>
    </div>
  );
};