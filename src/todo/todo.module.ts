import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoRepository } from './todo.repository';
import { DatabaseModule } from 'btodo-utils';
import { TodoEntity } from './entities/todo.entity';
import { TaskRepository } from './task.repository';
import { TaskEntity } from './entities/task.entity';

@Module({
  imports: [DatabaseModule.forFeature([TodoEntity, TaskEntity])],
  controllers: [TodoController],
  providers: [TodoService, TodoRepository, TaskRepository],
})
export class TodoModule {}
