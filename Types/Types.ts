export type task = {
  id: string;
  title: string;
  done: boolean;
};

export type taskCrudObj = {
  task: task;
  userId: string;
};

export type registerUser = {
  email:string;
  password:string;
  userName:string
}
export type loginUser = {
  email:string;
  password:string;
}
