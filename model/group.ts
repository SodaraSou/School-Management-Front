import { Subject } from "@/model/subject";
import { Department } from "@/model/department";
import { User } from "@/model/user";

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
