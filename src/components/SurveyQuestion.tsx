import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface QuestionProps {
  question: {
    id: number;
    text: string;
    type: "text" | "choice";
    choices?: string[];
  };
  onNext: (answer: string) => void;
  onPrevious: () => void;
  isFirst: boolean;
}

export const SurveyQuestion = ({ question, onNext, onPrevious, isFirst }: QuestionProps) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onNext(answer);
      setAnswer("");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">{question.text}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {question.type === "text" ? (
          <Input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full"
            placeholder="Type your answer here..."
          />
        ) : (
          <RadioGroup value={answer} onValueChange={setAnswer} className="space-y-4">
            {question.choices?.map((choice) => (
              <div key={choice} className="flex items-center space-x-2">
                <RadioGroupItem value={choice} id={choice} />
                <Label htmlFor={choice}>{choice}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
        <div className="flex justify-between pt-4">
          {!isFirst && (
            <Button type="button" variant="outline" onClick={onPrevious}>
              Previous
            </Button>
          )}
          <Button type="submit" className="ml-auto">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};