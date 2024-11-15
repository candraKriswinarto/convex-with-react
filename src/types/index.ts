import { Id } from "../../convex/_generated/dataModel";

export interface Task {
  _id: Id<'tasks'>;
  title: string,
  description: string,
  completed: boolean
}

export interface FormData {
  title: string,
  description: string
}