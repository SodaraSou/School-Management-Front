"use client";

import { useActionState, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitActivity } from "@/app/v2/(dashboard)/@student/activities/actions";

type Answer = {
  question_id: string;
  option_ids: number[] | null;
  text: string | null;
};

export default function ActivityForm({ activity }: { activity: any }) {
  const initialState = { success: true, message: "" };
  const [state, formAction, isPending] = useActionState(
    submitActivity,
    initialState
  );

  const { toast } = useToast();

  useEffect(() => {
    if (state.success === false) {
      toast({
        title: state.message,
        variant: "destructive",
      });
    }
  }, [state]);

  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleInputChange = (
    question_id: string,
    value: string,
    type: string
  ) => {
    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) => answer.question_id === question_id
      );
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        if (type === "text") {
          updatedAnswers[existingAnswerIndex] = {
            question_id,
            text: value,
            option_ids: null,
          };
        } else if (type === "qcm" || type === "single_choice") {
          updatedAnswers[existingAnswerIndex] = {
            question_id,
            text: null,
            option_ids: [Number(value)],
          };
        } else if (type === "multi") {
          const currentOptions =
            updatedAnswers[existingAnswerIndex].option_ids || [];
          if (currentOptions.includes(Number(value))) {
            updatedAnswers[existingAnswerIndex] = {
              question_id,
              text: null,
              option_ids: currentOptions.filter((v) => v !== Number(value)),
            };
          } else {
            updatedAnswers[existingAnswerIndex] = {
              question_id,
              text: null,
              option_ids: [...currentOptions, Number(value)],
            };
          }
        }
        return updatedAnswers;
      } else {
        if (type === "text") {
          return [
            ...prevAnswers,
            { question_id, text: value, option_ids: null },
          ];
        } else if (type === "qcm" || type === "single_choice") {
          return [
            ...prevAnswers,
            { question_id, text: null, option_ids: [Number(value)] },
          ];
        } else if (type === "multi") {
          return [
            ...prevAnswers,
            { question_id, text: null, option_ids: [Number(value)] },
          ];
        }
      }
      return prevAnswers;
    });
  };

  const handleClearAnswer = (
    e: React.MouseEvent<HTMLButtonElement>,
    question_id: string,
    type: string
  ) => {
    e.preventDefault();
    setAnswers((prevAnswers) =>
      prevAnswers.filter((answer) => answer.question_id !== question_id)
    );

    if (type === "qcm" || type === "single_choice") {
      const radioButtons = document.getElementsByName(
        `question-${question_id}`
      );
      radioButtons.forEach((radio: any) => {
        radio.checked = false;
      });
    }
  };

  return (
    <>
      <div className="bg-indigo-600 rounded-t-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-3">{activity.form.title}</h1>
        <p className="text-blue-100 text-lg">{activity.form.description}</p>
      </div>

      <form action={formAction} className="bg-white rounded-b-2xl shadow-xl">
        <input
          id="activity_id"
          name="activity_id"
          defaultValue={activity.id}
          hidden
        />
        <input
          id="answers"
          name="answers"
          value={JSON.stringify(answers)}
          readOnly
          hidden
        />

        <div className="p-8 space-y-8">
          {activity.form.questions.map((question: any, index: number) => (
            <div
              key={question.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {question.name}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                {question.type === "text" && (
                  <div className="relative">
                    <input
                      value={
                        answers.find(
                          (answer) => answer.question_id === question.id
                        )?.text || ""
                      }
                      onChange={(e) =>
                        handleInputChange(question.id, e.target.value, "text")
                      }
                      className="w-full p-2 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Type your answer here..."
                    />
                  </div>
                )}

                {question.type === "single_choice" && (
                  <div className="space-y-3">
                    {question.options.map((option: any) => (
                      <label
                        key={option.id}
                        className="flex items-center p-2 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all duration-200"
                      >
                        <div className="flex items-center justify-center">
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option.id.toString()}
                            defaultChecked={
                              answers.find(
                                (answer) => answer.question_id === question.id
                              )?.option_ids?.[0] === option.id.toString()
                            }
                            onChange={(e) =>
                              handleInputChange(
                                question.id,
                                e.target.value,
                                "qcm"
                              )
                            }
                            className="w-4 h-4 text-blue-600 border-2 border-gray-300 focus:ring-blue-500"
                          />
                        </div>
                        <span className="ml-4 text-lg text-gray-700">
                          {option.name}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === "multiple_choice" && (
                  <div className="space-y-3">
                    {question.options.map((option: any) => {
                      const currentOptions =
                        answers.find(
                          (answer) => answer.question_id === question.id
                        )?.option_ids || [];
                      return (
                        <label
                          key={option.id}
                          className="flex items-center p-2 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all duration-200"
                        >
                          <div className="flex items-center justify-center">
                            <input
                              type="checkbox"
                              name={`question-${question.id}`}
                              value={option.id}
                              checked={currentOptions.includes(option.id)}
                              onChange={(e) =>
                                handleInputChange(
                                  question.id,
                                  e.target.value,
                                  "multi"
                                )
                              }
                              className="w-4 h-4 text-blue-600 border-2 border-gray-300 focus:ring-blue-500"
                            />
                          </div>
                          <span className="ml-4 text-lg text-gray-700">
                            {option.name}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}

                <button
                  onClick={(e) =>
                    handleClearAnswer(e, question.id, question.type)
                  }
                  className="mt-4 px-4 py-2 text-sm text-gray-600 hover:text-red-600 flex items-center gap-2 transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Answer
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-gray-50 rounded-b-2xl border-t border-gray-200">
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isPending}
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Answers"
              )}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
