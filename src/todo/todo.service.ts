import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'btodo-utils';
import { TASK_STATUS } from 'src/common/constants/task.constant';
import { TODO_STATUS } from 'src/common/constants/todo.constant';
import {
  CreateTaskRequestDto,
  CreateTaskResponseDto,
} from './dto/create-task.dto';
import {
  CreateTodoRequestDTO,
  CreateTodoResponseDto,
} from './dto/create-todo.dto';
import {
  DeleteTaskRequestDto,
  DeleteTaskResponseDto,
} from './dto/delete-task.dto';
import {
  DeleteTodoRequestDto,
  DeleteTodoResponseDto,
} from './dto/delete-todo.dto';
import {
  GetTaskListRequestDto,
  GetTaskListResponseDto,
} from './dto/get-task-list.dto';
import {
  GetTodoListRequestDTO,
  GetTodoListResponseDto,
} from './dto/get-todo-list.dto';
import { GetTodoRequestDto, GetTodoResponseDto } from './dto/get-todo.dto';
import { TaskDto } from './dto/task.dto';
import { TodoDto } from './dto/todo.dto';
import {
  UpdateTaskRequestDto,
  UpdateTaskResponseDto,
} from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { TodoEntity } from './entities/todo.entity';
import { TaskRepository } from './task.repository';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  public constructor(
    private readonly todoRepository: TodoRepository,
    private readonly taskRepository: TaskRepository,
  ) {}

  async getTodoList(
    payload: GetTodoListRequestDTO,
  ): Promise<GetTodoListResponseDto> {
    const result = await this.todoRepository.find({
      where: { accountID: payload.accountID },
    });

    return {
      todo: this.formatTodoListResponse(result),
    };
  }

  private formatTodoListResponse(result: TodoEntity[]): TodoDto[] {
    return result.map((item) => this.formatTodoResponse(item));
  }

  private formatTodoResponse(result: TodoEntity): TodoDto {
    return {
      todoID: result.todoID,
      todoName: result.todoName,
      status: result.status,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  async createTodo(
    payload: CreateTodoRequestDTO,
  ): Promise<CreateTodoResponseDto> {
    const result = await this.todoRepository.createAndSave({
      todoName: payload.name,
      accountID: payload.accountID,
      status: TODO_STATUS.CREATE,
    });

    return {
      todoID: result.todoID,
      todoName: result.todoName,
      status: result.status,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  async getTodo(payload: GetTodoRequestDto): Promise<GetTodoResponseDto> {
    const todo = await this.todoRepository.findOne({
      where: {
        accountID: payload.accountID,
        todoID: payload.todoID,
      },
    });

    if (!todo) {
      throw new NotFoundError(`Todo ID: ${payload.todoID} not found`);
    }

    return {
      todoID: todo.todoID,
      todoName: todo.todoName,
      status: todo.status,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };
  }

  async deleteTodo(
    payload: DeleteTodoRequestDto,
  ): Promise<DeleteTodoResponseDto> {
    const todo = await this.todoRepository.findOne({
      where: {
        accountID: payload.accountID,
        todoID: payload.todoID,
      },
    });

    if (!todo) {
      throw new NotFoundError(`Todo ID: ${payload.todoID} not found`);
    }

    await this.taskRepository.delete({
      todo,
    });

    await this.todoRepository.delete({ todoID: payload.todoID });
    return {
      todoID: todo.todoID,
      todoName: todo.todoName,
      status: todo.status,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };
  }

  async createTask(
    payload: CreateTaskRequestDto,
  ): Promise<CreateTaskResponseDto> {
    const todo = await this.todoRepository.findOne({
      where: {
        accountID: payload.accountID,
        todoID: payload.todoID,
      },
    });

    if (!todo) {
      throw new NotFoundError(`Todo ID: ${payload.todoID} not found`);
    }

    const result = await this.taskRepository.createAndSave({
      taskName: payload.name,
      todo: todo,
      status: TASK_STATUS.CREATE,
    });

    return {
      taskID: result.taskID,
      taskName: result.taskName,
      status: result.status,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  async getTaskList(
    payload: GetTaskListRequestDto,
  ): Promise<GetTaskListResponseDto> {
    const todo = await this.todoRepository.findOne({
      where: {
        todoID: payload.todoID,
      },
    });

    if (!todo) {
      throw new NotFoundError(`Todo ID: ${payload.todoID} not found`);
    }

    const tasks = await this.taskRepository.findAll({
      where: {
        todo: {
          todoID: todo.todoID,
        },
      },
    });

    return {
      tasks: this.formatTaskListResponse(tasks),
    };
  }

  private formatTaskListResponse(result: TaskEntity[]): TaskDto[] {
    return result.map((item) => this.formatTaskResponse(item));
  }

  private formatTaskResponse(result: TaskEntity): TaskDto {
    return {
      taskID: result.taskID,
      taskName: result.taskName,
      status: result.status,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  async updateTask(
    payload: UpdateTaskRequestDto,
  ): Promise<UpdateTaskResponseDto> {
    const todo = await this.todoRepository.findOne({
      where: {
        accountID: payload.accountID,
        todoID: payload.todoID,
      },
    });

    if (!todo) {
      throw new NotFoundError(`Todo ID: ${payload.todoID} not found`);
    }

    let task = await this.taskRepository.findOne({
      where: {
        taskID: payload.taskID,
        todo: {
          todoID: todo.todoID,
        },
      },
    });

    if (!task) {
      throw new NotFoundError(`Task ID: ${payload.taskID} not found`);
    }

    task = {
      ...task,
      status: payload.status,
      updatedAt: new Date(),
    };

    await this.taskRepository.save(task);

    return {
      taskID: task.taskID,
      taskName: task.taskName,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }

  async deleteTask(
    payload: DeleteTaskRequestDto,
  ): Promise<DeleteTaskResponseDto> {
    const todo = await this.todoRepository.findOne({
      where: {
        accountID: payload.accountID,
        todoID: payload.todoID,
      },
    });

    if (!todo) {
      throw new NotFoundError(`Todo ID: ${payload.todoID} not found`);
    }

    const task = await this.taskRepository.findOne({
      where: {
        taskID: payload.taskID,
        todo: {
          todoID: todo.todoID,
        },
      },
    });

    if (!task) {
      throw new NotFoundError(`Task ID: ${payload.taskID} not found`);
    }

    await this.taskRepository.delete({
      taskID: task.taskID,
    });

    return {
      taskID: task.taskID,
      taskName: task.taskName,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
