import { TodoEntity } from '../entities/todo.entity';

export type TodoDto = Pick<
  TodoEntity,
  'todoID' | 'todoName' | 'status' | 'createdAt' | 'updatedAt'
>;
