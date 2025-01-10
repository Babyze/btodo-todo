import { TASK_STATUS } from 'src/common/constants/task.constant';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TodoEntity } from './todo.entity';

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn({ name: 'task_id' })
  taskID: number;

  @Column({ name: 'task_name' })
  taskName: string;

  @Column({ name: 'status' })
  status: TASK_STATUS;

  @ManyToOne(() => TodoEntity, (todo) => todo.tasks)
  @JoinColumn({ name: 'todo_id' })
  todo: TodoEntity;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;
}
