"use client";

import { use, useState, useActionState } from "react";
import { useUser } from "@/contexts/user-context";
import { postAnnouncement } from "@/app/(dashboard)/subject/[subjectId]/@teacher/actions";

import { Bold, Italic, Loader2, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface State {
  message: string;
  errors: {
    caption?: string[];
  };
}

export default function PostCreateForm({
  groupId,
  subjectId,
}: {
  groupId: string;
  subjectId: string;
}) {
  const { userPromise } = useUser();
  const user = use(userPromise);
  const initialState: State = { message: "", errors: {} };
  const [state, formAction, isPending] = useActionState(
    postAnnouncement,
    initialState
  );
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {!showForm ? (
        <button className="w-full" onClick={() => setShowForm(!showForm)}>
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="cursor-pointer size-9">
                  <AvatarImage alt={user?.name || ""} />
                  <AvatarFallback>
                    {user?.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <p className="text-gray-400">Announce something to the class</p>
              </div>
            </CardHeader>
          </Card>
        </button>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Announcement</CardTitle>
          </CardHeader>
          <form action={formAction}>
            <CardContent>
              <input
                id="groupId"
                name="groupId"
                defaultValue={groupId}
                hidden
              />
              <input
                id="subjectId"
                name="subjectId"
                defaultValue={subjectId}
                hidden
              />
              <div>
                <Textarea
                  id="caption"
                  name="caption"
                  placeholder="Annonuce something to the class"
                />
                <div id="caption-error">
                  {state?.errors?.caption &&
                    state.errors.caption.map((error: string) => (
                      <p key={error} className="mt-2 text-sm text-red-500">
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full flex justify-between">
                <ToggleGroup type="multiple">
                  <ToggleGroupItem value="bold" aria-label="Toggle bold">
                    <Bold className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic" aria-label="Toggle italic">
                    <Italic className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="underline"
                    aria-label="Toggle underline"
                  >
                    <Underline className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
                <div className="space-x-2">
                  <Button
                    onClick={() => setShowForm(!showForm)}
                    variant="ghost"
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant={"outline"}
                    className="bg-blue-500 text-white"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="animate-spin" /> Posting
                      </>
                    ) : (
                      <>Post</>
                    )}
                  </Button>
                </div>
              </div>
            </CardFooter>
          </form>
        </Card>
      )}
    </>
  );
}
