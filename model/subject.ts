import { User } from "@/model/user";

export type Subject = {
  id: number;
  name: string;
  abbr: string;
  teacher: User;
};
