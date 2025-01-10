import { TaskEntity } from '../entities/task.entity';

export type TaskDto = Pick<
  TaskEntity,
  'taskID' | 'taskName' | 'status' | 'createdAt' | 'updatedAt'
>;
