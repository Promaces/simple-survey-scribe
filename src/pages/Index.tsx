import { useState } from "react";
import { SurveyQuestion } from "@/components/SurveyQuestion";
import { ProgressBar } from "@/components/ProgressBar";
import { ThankYou } from "@/components/ThankYou";

const questions = [
  {
    id: 1,
    text: "What's your name?",
    type: "text" as const,
  },
  {
    id: 2,
    text: "How did you hear about us?",
    type: "choice" as const,
    choices: ["Social Media", "Friend", "Search Engine", "Other"],
  },
  {
    id: 3,
    text: "What's your favorite feature of our product?",
    type: "text" as const,
  },
];

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleNext = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [questions[currentQuestion].id]: answer }));
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

export default Index;