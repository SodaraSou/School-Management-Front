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

export default function AssignmentEditForm({ activity }: { activity: any }) {
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

  const [title, setTitle] = useState(activity.forms.title);
  const [description, setDescription] = useState(activity.forms.description);
  const [questions, setQuestions] = useState<Question[]>(
    activity.forms.questions
  );

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

  // Add option to question
  const handleAddOption = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    const question = updatedQuestions[questionIndex];
    question.options = [
      ...(question.options || []),
      { name: "", is_correct: false },
    ];
    setQuestions(updatedQuestions);
  };

  // Remove option from question
  const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    const question = updatedQuestions[questionIndex];
    question.options = question.options?.filter((_, i) => i !== optionIndex);
    setQuestions(updatedQuestions);
  };

  // Update option
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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          {questions.map((question, questionIndex) => (
            <div
              key={questionIndex}
              className="p-6 border border-gray-200 rounded-lg space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Question
                    </label>
                    <input
                      type="text"
                      value={question.name}
                      onChange={(e) =>
                        handleQuestionChange(
                          questionIndex,
                          "name",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type
                      </label>
                      <select
                        value={question.type}
                        onChange={(e) =>
                          handleQuestionChange(
                            questionIndex,
                            "type",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="text">Text</option>
                        <option value="multiple_choice">Multiple Choice</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Points
                      </label>
                      <input
                        type="number"
                        value={question.points}
                        onChange={(e) =>
                          handleQuestionChange(
                            questionIndex,
                            "points",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {question.type === "multiple_choice" && (
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Options
                      </label>
                      {question.options?.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="text"
                            value={option.name}
                            onChange={(e) =>
                              handleOptionChange(
                                questionIndex,
                                optionIndex,
                                e.target.value
                              )
                            }
                            placeholder="Option"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() =>
                              handleRemoveOption(questionIndex, optionIndex)
                            }
                            className="p-2 text-gray-500 hover:text-red-500 rounded-full transition-colors"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => handleAddOption(questionIndex)}
                        className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Option
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleDuplicateQuestion(questionIndex)}
                    className="p-2 text-gray-500 hover:text-blue-500 rounded-full transition-colors"
                    title="Duplicate question"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleRemoveQuestion(questionIndex)}
                    className="p-2 text-gray-500 hover:text-red-500 rounded-full transition-colors"
                    title="Remove question"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={handleAddQuestion}
            className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-900 hover:border-gray-400 flex items-center justify-center transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" /> Add New Question
          </button>
        </div>

        <form action={formAction}>
          <input name="activity_id" value={activity.id} hidden readOnly />
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
            className={`w-full py-3 px-4 bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors ${
              isPending ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" /> Updating
                Assignment...
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-2" /> Update Assignment
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
