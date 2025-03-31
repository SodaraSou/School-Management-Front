"use client";

import { useState, useEffect, useActionState } from "react";
import { format, parse } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TeacherAssignActivitiesDialog from "@/components/v2/teacher/activities/teacher-assign-activities-dialog";
import { updateActivity } from "@/app/v2/(dashboard)/@teacher/activities/actions";

interface Option {
  name: string;
  is_correct: boolean;
}

type QuestionType = "text" | "single_choice" | "multiple_choice";

interface Question {
  name: string;
  type: QuestionType;
  is_require: boolean;
  correct_answer: string;
  points: number;
  options?: Option[];
}

// interface Activity {
//   id: string;
//   activity_type: string;
//   title: string;
//   description: string;
//   due_date: string;
//   duration: string;
//   groups: number[];
//   questions: Question[];
// }

export default function TeacherEditActivitiesForm({
  activity,
  teacherGroups,
  activitiesType,
}: {
  activity: any;
  teacherGroups: any;
  activitiesType: any;
}) {
  if (activity.success === false) {
    throw new Error(activity.message);
  }

  const parsedDate = parse(
    activity.data.due_at,
    "yyyy-MM-dd HH:mm:ss",
    new Date()
  );
  const formattedDate = format(parsedDate, "yyyy-MM-dd HH:mm");
  const [activityType, setActivityType] = useState(
    activity.data.activity_type.id
  );
  const [title, setTitle] = useState(activity.data.title);
  const [description, setDescription] = useState(activity.data.description);
  const [dueDate, setDueDate] = useState(formattedDate);
  const [duration, setDuration] = useState(activity.data.duration);
  const [questions, setQuestions] = useState<Question[]>(
    activity.data.questions.length
      ? activity.data.questions
      : [
          {
            name: "",
            type: "text",
            is_require: false,
            correct_answer: "",
            points: 0,
            options: [],
          },
        ]
  );

  const [groups, setGroups] = useState(activity.data.groups);

  const handleAssignGroupsToActivity = (selectedGroups: any[]) => {
    setGroups([...selectedGroups]);
  };

  const handlePointsChange = (qIndex: number, value: number) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === qIndex ? { ...q, points: value } : q))
    );
  };

  const handleTypeChange = (qIndex: number, value: QuestionType) => {
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i !== qIndex) return q;
        if (value === "single_choice") {
          const newOptions = (
            q.options?.length ? q.options : [{ name: "", is_correct: false }]
          ).map((opt, idx) => ({
            ...opt,
            is_correct: idx === 0,
          }));
          return {
            ...q,
            type: value,
            options: newOptions,
            correct_answer: newOptions[0].name,
          };
        } else if (value === "multiple_choice") {
          return {
            ...q,
            type: value,
            options: q.options?.length
              ? q.options
              : [{ name: "", is_correct: false }],
            correct_answer: "",
          };
        } else {
          return { ...q, type: value, options: undefined, correct_answer: "" };
        }
      })
    );
  };

  const handleNameChange = (qIndex: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === qIndex ? { ...q, name: value } : q))
    );
  };

  const handleOptionChange = (
    qIndex: number,
    optionIndex: number,
    value: string
  ) => {
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i === qIndex && q.options) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = { ...newOptions[optionIndex], name: value };

          if (
            q.type === "single_choice" &&
            newOptions[optionIndex].is_correct
          ) {
            return { ...q, options: newOptions, correct_answer: value };
          }
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const handleAddOption = (qIndex: number) => {
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i === qIndex) {
          const newOptions = q.options
            ? [...q.options, { name: "", is_correct: false }]
            : [{ name: "", is_correct: false }];
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const handleRemoveOption = (qIndex: number, optionIndex: number) => {
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i !== qIndex || !q.options) return q;
        const newOptions = q.options.filter((_, idx) => idx !== optionIndex);
        let newCorrectAnswer = q.correct_answer;
        if (q.type === "single_choice") {
          if (!newOptions.some((opt) => opt.is_correct) && newOptions.length) {
            newOptions[0].is_correct = true;
            newCorrectAnswer = newOptions[0].name;
          } else if (!newOptions.length) {
            newCorrectAnswer = "";
          } else {
            const correctOpt = newOptions.find((opt) => opt.is_correct);
            newCorrectAnswer = correctOpt ? correctOpt.name : "";
          }
        } else if (q.type === "multiple_choice") {
          newCorrectAnswer = newOptions
            .filter((opt) => opt.is_correct)
            .map((opt) => opt.name)
            .join(",");
        }
        return { ...q, options: newOptions, correct_answer: newCorrectAnswer };
      })
    );
  };

  const handleSetCorrectOption = (qIndex: number, optionIndex: number) => {
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i !== qIndex || !q.options) return q;

        if (q.type === "single_choice") {
          const newOptions = q.options.map((opt, idx) => ({
            ...opt,
            is_correct: idx === optionIndex,
          }));
          return {
            ...q,
            options: newOptions,
            correct_answer: newOptions[optionIndex].name,
          };
        } else if (q.type === "multiple_choice") {
          const newOptions = q.options.map((option, idx) =>
            idx === optionIndex
              ? { ...option, is_correct: !option.is_correct }
              : option
          );
          const correctAnswers = newOptions
            .filter((option) => option.is_correct)
            .map((option) => option.name)
            .join(",");
          return { ...q, options: newOptions, correct_answer: correctAnswers };
        }
        return q;
      })
    );
  };

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        name: "",
        type: "text",
        is_require: false,
        correct_answer: "",
        points: 0,
        options: undefined,
      },
    ]);
  };

  const handleRemoveQuestion = (qIndex: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== qIndex));
  };

  const initialState = { success: true, message: "" };
  const [state, formAction, isPending] = useActionState(
    updateActivity,
    initialState
  );

  useEffect(() => {
    if (state.success === false) {
      alert(state.message);
    }
  }, [state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      activity_id: activity.id,
      dueDate: format(new Date(dueDate), "yyyy-MM-dd HH:mm"),
      duration,
      title,
      description,
      groups,
      questions,
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-indigo-100">
        <CardTitle className="text-3xl font-bold text-indigo-600">
          Edit Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Activity Title"
              className="w-full text-2xl font-bold border-none focus:outline-none mb-4"
            />
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Activity Description"
              className="w-full border-none focus:outline-none"
            />
          </div>
          <TeacherAssignActivitiesDialog
            groups={teacherGroups}
            handleAssignGroupToActivity={handleAssignGroupsToActivity}
            defaultGroups={activity.data.groups}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Activity Type:</label>
          <Select
            value={activityType}
            onValueChange={(value) => setActivityType(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Activity Type" />
            </SelectTrigger>
            <SelectContent>
              {activitiesType?.data.map((type: any) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Due Date:</label>
            <Input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Duration (minutes):
            </label>
            <Input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 60"
              className="w-full"
            />
          </div>
        </div>
        {questions.map((question, qIndex) => (
          <div
            key={qIndex}
            className="p-4 border-indigo-500 border-l-4 rounded-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Question {qIndex + 1}</h2>
              {questions.length > 1 && (
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => handleRemoveQuestion(qIndex)}
                >
                  Remove
                </Button>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Activity Type:</label>
              <Select
                value={question.type}
                onValueChange={(value: QuestionType) =>
                  handleTypeChange(qIndex, value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Activity Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="single_choice">Single Choice</SelectItem>
                  <SelectItem value="multiple_choice">
                    Multiple Choice
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Title:</label>
              <Input
                type="text"
                value={question.name}
                onChange={(e) => handleNameChange(qIndex, e.target.value)}
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Score:</label>
              <Input
                type="number"
                value={question.points}
                onChange={(e) =>
                  handlePointsChange(qIndex, parseFloat(e.target.value))
                }
                className="w-full"
              />
            </div>
            {(question.type === "single_choice" ||
              question.type === "multiple_choice") &&
              question.options && (
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Options:</label>
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className="flex items-center space-x-2 mb-2"
                    >
                      {question.type === "single_choice" ? (
                        <input
                          type="radio"
                          name={`correct-${qIndex}`}
                          checked={option.is_correct}
                          onChange={() =>
                            handleSetCorrectOption(qIndex, optionIndex)
                          }
                        />
                      ) : (
                        <input
                          type="checkbox"
                          checked={option.is_correct}
                          onChange={() =>
                            handleSetCorrectOption(qIndex, optionIndex)
                          }
                        />
                      )}
                      <Input
                        type="text"
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option.name}
                        onChange={(e) =>
                          handleOptionChange(
                            qIndex,
                            optionIndex,
                            e.target.value
                          )
                        }
                        className="flex-1"
                      />
                      <Button
                        variant="destructive"
                        type="button"
                        onClick={() => handleRemoveOption(qIndex, optionIndex)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => handleAddOption(qIndex)}
                    className="mt-2"
                  >
                    Add Option
                  </Button>
                </div>
              )}
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          type="button"
          className="bg-blue-500 hover:bg-blue-600"
          onClick={handleAddQuestion}
        >
          Add Question
        </Button>
        <form action={formAction}>
          <input name="activity_id" value={activity.data.id} type="hidden" />
          <input name="activity_type" value={activityType} type="hidden" />
          <input name="due_date" value={dueDate} type="hidden" />
          <input name="duration" value={duration} type="hidden" />
          <input name="title" value={title} type="hidden" />
          <input name="description" value={description} type="hidden" />
          <input name="groups" value={JSON.stringify(groups)} type="hidden" />
          <input
            name="questions"
            value={JSON.stringify(questions)}
            type="hidden"
          />
          <Button
            className="bg-indigo-600 text-white hover:bg-indigo-700"
            type="submit"
            disabled={isPending}
          >
            Save Changes
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
