"use client";

import { useActionState, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { submitActivity } from "@/app/(dashboard)/activity/actions";
import { toast } from "sonner";

type Answer = {
  question_id: string;
  option_id: string | null;
  text: string | null;
};

export default function ActivityForm({ activity }: { activity: any }) {
  const initialState = { success: true, message: "" };
  const [state, formAction, isPending] = useActionState(
    submitActivity,
    initialState
  );

  useEffect(() => {
    if (!state.success) {
      toast.error(state.message);
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
          updatedAnswers[existingAnswerIndex].text = value;
          updatedAnswers[existingAnswerIndex].option_id = null;
        } else if (type === "qcm") {
          updatedAnswers[existingAnswerIndex].option_id = value;
          updatedAnswers[existingAnswerIndex].text = null;
        }
        return updatedAnswers;
      } else {
        if (type === "text") {
          return [
            ...prevAnswers,
            { question_id, text: value, option_id: null },
          ];
        } else if (type === "qcm") {
          return [
            ...prevAnswers,
            { question_id, option_id: value, text: null },
          ];
        }
      }
      return prevAnswers;
    });
  };

  const handleClearAnswer = (
    e: React.MouseEvent<HTMLButtonElement>,
    question_id: string
  ) => {
    e.preventDefault();
    setAnswers((prevAnswers) =>
      prevAnswers.filter((answer) => answer.question_id !== question_id)
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{activity.forms.title}</CardTitle>
        <CardDescription>{activity.forms.description}</CardDescription>
      </CardHeader>
      <form action={formAction}>
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
        <CardContent>
          <div className="flex flex-col gap-6">
            {activity.forms.questions.map((question: any, index: number) => (
              <Card key={question.id}>
                <CardHeader>
                  <Label>
                    {index + 1}. {question.name}
                  </Label>
                </CardHeader>
                <CardContent className="flex flex-col">
                  {question.type === "text" && (
                    <Input
                      value={
                        answers.find(
                          (answer) => answer.question_id === question.id
                        )?.text || ""
                      }
                      onChange={(e) =>
                        handleInputChange(question.id, e.target.value, "text")
                      }
                      className="mb-2"
                    />
                  )}
                  {question.type === "qcm" && (
                    <div className="flex flex-col gap-2">
                      {question.options.map((option: any) => (
                        <div
                          key={option.id}
                          className="flex items-center gap-2 mb-2"
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option.id.toString()}
                            defaultChecked={
                              answers.find(
                                (answer) => answer.question_id === question.id
                              )?.option_id === option.id.toString()
                            }
                            // checked={
                            //   answers.find(
                            //     (answer) => answer.question_id === question.id
                            //   )?.option_id === option.id.toString()
                            // }
                            onChange={(e) =>
                              handleInputChange(
                                question.id,
                                e.target.value,
                                "qcm"
                              )
                            }
                          />
                          <Label>{option.name}</Label>
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={(e) => handleClearAnswer(e, question.id)}
                    className="text-gray-400 text-sm ml-auto hover:underline"
                  >
                    Clear Answer
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="ml-auto" disabled={isPending}>
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
