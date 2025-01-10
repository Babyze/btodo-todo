import { TODO_STATUS } from 'src/common/constants/todo.constant';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from './task.entity';

@Entity('todo')
export class TodoEntity {
  @PrimaryGeneratedColumn({ name: 'todo_id' })
  todoID: number;

  @Column({ name: 'todo_name' })
  todoName: string;

  @Column({ name: 'account_id' })
  accountID: number;

  @Column({ name: 'status' })
  status: TODO_STATUS;

  @OneToMany(() => TaskEntity, (task) => task.todo)
  tasks: TaskEntity[];

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;
}
