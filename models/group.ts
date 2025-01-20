import { Subject } from "@/models/subject";
import { Department } from "@/models/department";
import { User } from "@/models/user";

export type Group = {
  id: number;
  name: string;
  year: string;
  academic_year: string;
  semester: number;
  department: Department;
  users: User[];
  subjects: Subject[];
};
