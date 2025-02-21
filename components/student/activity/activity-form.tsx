"use client";

import { useState } from "react";

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

type Answer = {
  questionId: string;
  value: string;
};

export default function ActivityForm({ activity }: { activity: any }) {
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleInputChange = (questionId: string, value: string) => {
    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) => answer.questionId === questionId
      );
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex].value = value;
        return updatedAnswers;
      } else {
        return [...prevAnswers, { questionId, value }];
      }
    });
  };

  const handleClearAnswer = (
    e: React.MouseEvent<HTMLButtonElement>,
    questionId: string
  ) => {
    e.preventDefault();
    setAnswers((prevAnswers) =>
      prevAnswers.filter((answer) => answer.questionId !== questionId)
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{activity.forms.title}</CardTitle>
        <CardDescription>{activity.forms.description}</CardDescription>
      </CardHeader>
      <form action="">
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
                          (answer) => answer.questionId === question.id
                        )?.value || ""
                      }
                      onChange={(e) =>
                        handleInputChange(question.id, e.target.value)
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
                            checked={
                              answers.find(
                                (answer) => answer.questionId === question.id
                              )?.value === option.id.toString()
                            }
                            onChange={(e) =>
                              handleInputChange(question.id, e.target.value)
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
          <Button type="submit" className="ml-auto">
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
