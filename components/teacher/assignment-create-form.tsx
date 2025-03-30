"use client";

import { useActionState, useState, useEffect } from "react";
import { Plus, X, Trash2, Save, Loader2, Copy } from "lucide-react";
import { toast } from "sonner";
import { createActivity } from "@/app/(dashboard)/_activity/actions";

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

  useEffect(() => {
    if (!state.success) {
      toast.error(state.message);
    }
  }, [state]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  // Add new question
  const handleAddQuestion = () => {
    const newQuestion: Question = {
      name: "",
      type: "text",
      is_require: true,
      correct_answer: "",
      points: 0,
      options: [],
    };
    setQuestions([...questions, newQuestion]);
  };

  // Duplicate question
  const handleDuplicateQuestion = (index: number) => {
    const questionToDuplicate = { ...questions[index] };
    setQuestions([
      ...questions.slice(0, index + 1),
      questionToDuplicate,
      ...questions.slice(index + 1),
    ]);
  };

  // Remove question
  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  // Update question
  const handleQuestionChange = (index: number, field: string, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value,
    };
    setQuestions(updatedQuestions);
  };

  // Handle options
  const handleAddOption = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    const question = updatedQuestions[questionIndex];
    question.options = [
      ...(question.options || []),
      { name: "", is_correct: false },
    ];
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...questions];
    const question = updatedQuestions[questionIndex];
    if (question.options) {
      question.options[optionIndex] = {
        ...question.options[optionIndex],
        name: value,
      };
    }
    setQuestions(updatedQuestions);
  };

  const handleCorrectOptionChange = (
    questionIndex: number,
    optionIndex: number
  ) => {
    const updatedQuestions = [...questions];
    const question = updatedQuestions[questionIndex];
    if (question.options) {
      question.options = question.options.map((opt, i) => ({
        ...opt,
        is_correct: i === optionIndex,
      }));
    }
    setQuestions(updatedQuestions);
  };

  const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    const question = updatedQuestions[questionIndex];
    if (question.options) {
      question.options = question.options.filter((_, i) => i !== optionIndex);
    }
    setQuestions(updatedQuestions);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Assignment Title"
            className="w-full text-2xl font-bold border-none focus:outline-none mb-4"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Assignment Description"
            className="w-full border-none focus:outline-none"
          />
        </div>
      </div>

      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="bg-white rounded-lg shadow-sm">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <input
                value={question.name}
                onChange={(e) =>
                  handleQuestionChange(questionIndex, "name", e.target.value)
                }
                placeholder="Question"
                className="w-full text-lg px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDuplicateQuestion(questionIndex)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleRemoveQuestion(questionIndex)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-4/5">
                <label
                  htmlFor="questionType"
                  className="block mb-2 text-sm font-medium"
                >
                  Question Type
                </label>
                <select
                  onChange={(e) =>
                    handleQuestionChange(questionIndex, "type", e.target.value)
                  }
                  value={question.type}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="text">Text</option>
                  <option value="multiple">Multiple Choice</option>
                </select>
              </div>
              <div className="w-1/5">
                <label
                  htmlFor="questionPoints"
                  className="block mb-2 text-sm font-medium"
                >
                  Points
                </label>
                <input
                  type="number"
                  value={question.points}
                  onChange={(e) =>
                    handleQuestionChange(
                      questionIndex,
                      "points",
                      parseInt(e.target.value)
                    )
                  }
                  placeholder="Points"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            {question.type === "text" ? (
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-gray-500">
                  Text answer will be provided here
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {question.options?.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={option.is_correct}
                      onChange={() =>
                        handleCorrectOptionChange(questionIndex, optionIndex)
                      }
                      className="w-4 h-4"
                    />
                    <input
                      value={option.name}
                      onChange={(e) =>
                        handleOptionChange(
                          questionIndex,
                          optionIndex,
                          e.target.value
                        )
                      }
                      placeholder="Option"
                      className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() =>
                        handleRemoveOption(questionIndex, optionIndex)
                      }
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddOption(questionIndex)}
                  className="flex items-center text-gray-600 hover:text-gray-900 mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Option
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      <button
        onClick={handleAddQuestion}
        className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 flex items-center justify-center"
      >
        <Plus className="h-4 w-4 mr-2" /> Add Question
      </button>

      <form action={formAction}>
        <input name="subject_id" value={subjectId} hidden readOnly />
        <input name="group_id" value={groupId} hidden readOnly />
        <input name="activity_type" value={type} hidden readOnly />
        <input name="title" value={title} hidden readOnly />
        <input name="description" value={description} hidden readOnly />
        <input
          name="questions"
          value={JSON.stringify(questions)}
          hidden
          readOnly
        />

        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-2 px-4 bg-blue-600 text-white rounded-lg flex items-center justify-center ${
            isPending ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin mr-2" /> Creating...
            </>
          ) : (
            <>
              <Save className="mr-2" /> Create Assignment
            </>
          )}
        </button>
      </form>
    </div>
  );
}
