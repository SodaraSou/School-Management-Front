"use client";

import { useActionState, useState } from "react";

import {
  FileText,
  Plus,
  X,
  EllipsisVertical,
  Edit,
  Trash2,
  Save,
} from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "../ui/card";
import QuestionOptionMenu from "./question-option-menu";
import { Badge } from "../ui/badge";
import { createActivity } from "@/app/(dashboard)/teacher/group/[group_id]/subject/[subject_id]/assignment/create/actions";

type Option = {
  name: string;
  is_correct: boolean;
};

type Question = {
  name: string;
  type: string;
  is_require: boolean;
  correct_answer: string;
  points: number;
  options?: Option[];
};

export default function AssignmentCreateForm({
  groupId,
  subjectId,
  activity,
  type,
}: {
  groupId: string;
  subjectId: string;
  activity: string;
  type: string;
}) {
  const initialState = { success: true, message: "", errors: {} };
  const [state, formAction, isPending] = useActionState(
    createActivity,
    initialState
  );

  const [questions, setQuestions] = useState<Question[]>([]);
  const [question, setQuestion] = useState<Question>({
    name: "",
    type: "text",
    is_require: true,
    correct_answer: "",
    points: 0,
    options: [],
  });
  const [editQuestion, setEditQuestion] = useState<Question>({
    name: "",
    type: "text",
    is_require: true,
    correct_answer: "",
    points: 0,
    options: [],
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isEditNumber, setIsEditNumber] = useState<Number>();

  // Add Question
  const handleOnChange = (e: { target: { id: string; value: string } }) => {
    const { value, id } = e.target;
    setQuestion((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleAddQuestion = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let questionToInsert: Question = {
      name: question.name,
      type: question.type,
      is_require: question.is_require,
      correct_answer: question.correct_answer,
      points: question.points,
      options: question.options,
    };
    if (question.type === "question") {
      questionToInsert = {
        name: question.name,
        type: question.type,
        is_require: question.is_require,
        correct_answer: question.correct_answer,
        points: question.points,
      };
    }
    setQuestions((prevQuestions) => [...prevQuestions, questionToInsert]);
    setQuestion({
      name: "",
      type: "text",
      is_require: true,
      correct_answer: "",
      points: 0,
      options: [],
    });
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, i) => i !== index)
    );
  };

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { id, value } = e.target;
    setQuestion((prevState) => {
      const updatedOptions = [...(prevState.options || [])];
      updatedOptions[index] = {
        ...updatedOptions[index],
        [id]: value,
      };
      return { ...prevState, options: updatedOptions };
    });
  };

  const handleAddOption = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setQuestion((prevState) => ({
      ...prevState,
      options: [...(prevState.options || []), { name: "", is_correct: false }],
    }));
  };

  const handleRemoveOption = (index: number) => {
    setQuestion((prevState) => {
      const updatedOptions = (prevState.options || []).filter(
        (_, i) => i !== index
      );
      return { ...prevState, options: updatedOptions };
    });
  };

  // Edit Question
  const handleEditQuestion = (index: number, question: Question) => {
    setIsEdit(true);
    setIsEditNumber(index);
    setEditQuestion(question);
  };

  const handleOnEditQuestion = (e: {
    target: { id: string; value: string };
  }) => {
    const { value, id } = e.target;
    setEditQuestion((prevState) => {
      const updatedQuestion = {
        ...prevState,
        [id]: value,
      };
      if (id === "type" && value === "question") {
        (updatedQuestion as Question).options = [];
      }
      return updatedQuestion;
    });
  };

  const handleDoneEditQuestion = (index: number) => {
    let questionToInsert: Question = {
      name: editQuestion.name,
      type: editQuestion.type,
      is_require: editQuestion.is_require,
      correct_answer: editQuestion.correct_answer,
      points: editQuestion.points,
      options: editQuestion.options,
    };
    if (question.type === "question") {
      questionToInsert = {
        name: editQuestion.name,
        type: editQuestion.type,
        is_require: editQuestion.is_require,
        correct_answer: editQuestion.correct_answer,
        points: editQuestion.points,
      };
    }
    setQuestions((prevState) => {
      const updatedQuestions = [...prevState];
      updatedQuestions[index] = questionToInsert;
      return updatedQuestions;
    });
    setIsEdit(false);
    setIsEditNumber(undefined);
    setEditQuestion({
      name: "",
      type: "question",
      is_require: true,
      correct_answer: "",
      points: 0,
      options: [],
    });
  };

  const handleEditOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    optionIndex: number
  ) => {
    const { id, value } = e.target;
    setEditQuestion((prevState) => {
      const updatedOptions = [...((prevState as Question).options || [])];
      updatedOptions[optionIndex] = {
        ...updatedOptions[optionIndex],
        [id]: value,
      };
      return { ...(prevState as Question), options: updatedOptions };
    });
  };

  const handleRemoveEditOption = (optionIndex: number) => {
    setEditQuestion((prevState) => {
      const updatedOptions =
        (prevState as Question).options?.filter((_, i) => i !== optionIndex) ||
        [];
      return { ...(prevState as Question), options: updatedOptions };
    });
  };

  const handleAddEditOption = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditQuestion((prevState) => ({
      ...(prevState as Question),
      options: [
        ...((prevState as Question).options || []),
        { name: "", is_correct: false },
      ],
    }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <FileText /> {activity}
        </CardTitle>
      </CardHeader>
      {state?.message && <p>{state?.message}</p>}
      <form action={formAction}>
        <input
          id="subject_id"
          name="subject_id"
          defaultValue={subjectId}
          hidden
        />
        <input id="group_id" name="group_id" defaultValue={groupId} hidden />
        <input
          id="activity_type"
          name="activity_type"
          defaultValue={type}
          hidden
        />
        <input
          id="questions"
          name="questions"
          defaultValue={JSON.stringify(questions)}
          hidden
        />
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input id="title" name="title" placeholder="Title" />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="Description"
            />
          </div>
          {/* List of Questions */}
          <div className="flex flex-col gap-4">
            {questions.map((question, index) => (
              <div
                key={index}
                className="w-full flex flex-col bg-gray-100 p-4 rounded-lg space-y-4"
              >
                {isEditNumber === index ? (
                  <>
                    <div className="flex justify-between gap-4">
                      <Input
                        id="name"
                        name="name"
                        defaultValue={(editQuestion as Question).name}
                        onChange={handleOnEditQuestion}
                        className="py-6"
                        placeholder="Untitled Question"
                      />
                      <QuestionOptionMenu
                        handleOnChange={handleOnEditQuestion}
                        defaultValue={(editQuestion as Question).type}
                      />
                    </div>
                    {(editQuestion as Question).type === "text" ? (
                      <div>Question</div>
                    ) : (
                      <RadioGroup className="flex flex-col gap-4">
                        {(editQuestion as Question).options?.map(
                          (option, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                value={`option-${index}`}
                                disabled
                              />
                              <Input
                                id={`name`}
                                value={option.name}
                                onChange={(e) =>
                                  handleEditOptionChange(e, index)
                                }
                                placeholder="Untitled Option"
                              />
                              <input
                                type="radio"
                                name="correct_option"
                                id={`is_correct`}
                                value={index.toString()}
                                checked={option.is_correct}
                                onChange={() => {
                                  const updatedOptions = (
                                    editQuestion as Question
                                  ).options?.map((opt, i) => ({
                                    ...opt,
                                    is_correct: i === index,
                                  }));
                                  setEditQuestion((prevState) => ({
                                    ...(prevState as Question),
                                    options: updatedOptions,
                                  }));
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveEditOption(index)}
                              >
                                <X />
                              </button>
                            </div>
                          )
                        )}
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="add-option" disabled />
                          <button
                            type="button"
                            onClick={handleAddEditOption}
                            className="text-sm"
                          >
                            Add Option
                          </button>
                        </div>
                      </RadioGroup>
                    )}
                    <div className="ml-auto">
                      <Button onClick={() => handleDoneEditQuestion(index)}>
                        <Edit /> Done
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between gap-4">
                      <p>{question.name || "Untitled Question"}</p>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon" disabled={isEdit}>
                            <EllipsisVertical />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-auto">
                          <div className="flex flex-col gap-4">
                            <button
                              onClick={() =>
                                handleEditQuestion(index, question)
                              }
                              className="flex items-center gap-2"
                            >
                              <Edit width={16} height={16} /> Edit
                            </button>

                            <button
                              onClick={() => handleRemoveQuestion(index)}
                              className="flex items-center gap-2"
                            >
                              <Trash2 width={16} height={16} /> Remove
                            </button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    {question.type === "text" ? (
                      <div>Question</div>
                    ) : (
                      <RadioGroup className="flex flex-col gap-4">
                        {question.options?.map((option, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={`option-${index}`}
                              disabled
                            />
                            <Label>{option.name}</Label>{" "}
                            {option.is_correct && (
                              <Badge
                                variant="outline"
                                className="bg-transparent border border-green-500 text-green-500"
                              >
                                Correct Answer
                              </Badge>
                            )}
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                  </>
                )}
              </div>
            ))}
            {/* Create Question */}
            <div className="w-full flex flex-col bg-gray-100 p-4 rounded-lg space-y-4">
              <div className="flex justify-between gap-4">
                <Input
                  id="name"
                  name="name"
                  value={question.name}
                  onChange={handleOnChange}
                  className="py-6"
                  placeholder="Untitled Question"
                />
                <QuestionOptionMenu
                  handleOnChange={handleOnChange}
                  defaultValue={question.type}
                />
              </div>
              {question.type === "text" ? (
                <div>Question</div>
              ) : (
                <RadioGroup className="flex flex-col gap-4">
                  {question.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={`option-${index}`} disabled />
                      <Input
                        id={`name`}
                        value={option.name}
                        onChange={(e) => handleOptionChange(e, index)}
                        placeholder="Untitled Option"
                      />
                      <input
                        type="radio"
                        name="correct_option"
                        id={`is_correct`}
                        value={index.toString()}
                        checked={option.is_correct}
                        onChange={() => {
                          const updatedOptions = question.options?.map(
                            (opt, i) => ({
                              ...opt,
                              is_correct: i === index,
                            })
                          );
                          setQuestion((prevState) => ({
                            ...prevState,
                            options: updatedOptions,
                          }));
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(index)}
                      >
                        <X />
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="add-option" disabled />
                    <button
                      type="button"
                      onClick={handleAddOption}
                      className="text-sm"
                    >
                      Add Option
                    </button>
                  </div>
                </RadioGroup>
              )}
              <Button
                onClick={handleAddQuestion}
                className="ml-auto"
                disabled={isEdit}
              >
                <Plus /> Add
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">
            <Save /> Create
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
