import { useState } from "react";
import { SurveyQuestion } from "@/components/SurveyQuestion";
import { ProgressBar } from "@/components/ProgressBar";
import { ThankYou } from "@/components/ThankYou";
import { questions } from "./questions";
import { sendSurveyResults } from "@/utils/emailService";
import { useToast } from "@/components/ui/use-toast";

export const SurveyContainer = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const { toast } = useToast();

  const handleNext = async (answer: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: answer };
    setAnswers(newAnswers);
    
    if (currentQuestion + 1 >= questions.length) {
      try {
        await sendSurveyResults(newAnswers);
        toast({
          title: "Survey Completed",
          description: "Your responses have been recorded and sent successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to send survey results. Please try again.",
          variant: "destructive",
        });
      }
    }
    setCurrentQuestion((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
  };

  const isComplete = currentQuestion >= questions.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        {!isComplete && (
          <>
            <ProgressBar current={currentQuestion + 1} total={questions.length} />
            <SurveyQuestion
              question={questions[currentQuestion]}
              onNext={handleNext}
              onPrevious={handlePrevious}
              isFirst={currentQuestion === 0}
            />
          </>
        )}
        {isComplete && <ThankYou onRestart={handleRestart} />}
      </div>
    </div>
  );
};