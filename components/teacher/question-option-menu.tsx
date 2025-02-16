import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function QuestionOptionMenu({
  defaultValue,
  handleOnChange,
}: {
  defaultValue: string;
  handleOnChange: (e: { target: { id: string; value: string } }) => void;
}) {
  return (
    <Select
      defaultValue={defaultValue}
      value={defaultValue}
      onValueChange={(value) =>
        handleOnChange({ target: { id: "type", value } })
      }
    >
      <SelectTrigger className="py-6 w-[180px]">
        <SelectValue id="type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="question">Question</SelectItem>
        <SelectItem value="qcm">QCM</SelectItem>
      </SelectContent>
    </Select>
  );
}
