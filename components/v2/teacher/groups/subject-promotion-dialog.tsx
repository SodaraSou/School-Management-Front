"use client";

import { useEffect, useActionState } from "react";
import { useToast } from "@/hooks/use-toast";
import { subjectPromotion } from "@/app/v2/(dashboard)/@teacher/activities/actions";

import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function SubjectPromotionDialog({
  subject_id,
  group_id,
}: {
  subject_id: string;
  group_id: string;
}) {
  const initialState = { isSuccess: false, isError: false, message: "" };
  const [state, formAction, isPending] = useActionState(
    subjectPromotion,
    initialState
  );

  const { toast } = useToast();
  useEffect(() => {
    if (state.isSuccess) {
      toast({
        variant: "success",
        title: state.message,
      });
    } else if (state.isError) {
      toast({
        variant: "destructive",
        title: state.message,
      });
    }
  }, [state]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <GraduationCap /> Promotion
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Passing Score</DialogTitle>
        </DialogHeader>
        <form action={formAction}>
          <input type="hidden" name="group_id" defaultValue={group_id} />
          <input type="hidden" name="subject_id" defaultValue={subject_id} />
          <div className="space-y-4">
            <Input id="score_pass" name="score_pass" />
            <DialogFooter>
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                disabled={isPending}
              >
                Continue
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
