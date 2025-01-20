import { User } from "@/models/user";

export type Subject = {
  id: number;
  name: string;
  abbr: string;
  teacher: User;
};
