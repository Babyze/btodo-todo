import {
  Controller,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AllExceptionFilter } from 'src/common/filters/rpc-to-http-exception.filter';
import { GrpcDataTransformInterceptor } from 'src/common/interceptors/grpc-data-transform-interceptor.interceptor';
import { GrpcDataTransformPipe } from 'src/common/pipes/grpc-data-transform-pipe.pipe';
import { CreateTaskRequestDto } from './dto/create-task.dto';
import { CreateTodoRequestDTO } from './dto/create-todo.dto';
import { DeleteTaskRequestDto } from './dto/delete-task.dto';
import { DeleteTodoRequestDto } from './dto/delete-todo.dto';
import { GetTaskListRequestDto } from './dto/get-task-list.dto';
import { GetTodoListRequestDTO } from './dto/get-todo-list.dto';
import { GetTodoRequestDto } from './dto/get-todo.dto';
import { UpdateTaskRequestDto } from './dto/update-task.dto';
import { TODO_SERVICE_NAME } from './pb/todo.pb';
import { TodoService } from './todo.service';

@UsePipes(GrpcDataTransformPipe, ValidationPipe)
@UseInterceptors(GrpcDataTransformInterceptor)
@UseFilters(AllExceptionFilter)
@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @GrpcMethod(TODO_SERVICE_NAME, 'GetTodoList')
  async getTodoList(payload: GetTodoListRequestDTO) {
    return this.todoService.getTodoList(payload);
  }

  @GrpcMethod(TODO_SERVICE_NAME, 'CreateTodo')
  createTodo(payload: CreateTodoRequestDTO) {
    return this.todoService.createTodo(payload);
  }

  @GrpcMethod(TODO_SERVICE_NAME, 'GetTodo')
  getTodo(payload: GetTodoRequestDto) {
    return this.todoService.getTodo(payload);
  }

  @GrpcMethod(TODO_SERVICE_NAME, 'DeleteTodo')
  deleteTodo(payload: DeleteTodoRequestDto) {
    return this.todoService.deleteTodo(payload);
  }

  @GrpcMethod(TODO_SERVICE_NAME, 'CreateTask')
  createTask(payload: CreateTaskRequestDto) {
    return this.todoService.createTask(payload);
  }

  @GrpcMethod(TODO_SERVICE_NAME, 'GetTaskList')
  getTaskList(payload: GetTaskListRequestDto) {
    return this.todoService.getTaskList(payload);
  }

  @GrpcMethod(TODO_SERVICE_NAME, 'UpdateTask')
  updateTask(payload: UpdateTaskRequestDto) {
    return this.todoService.updateTask(payload);
  }

  @GrpcMethod(TODO_SERVICE_NAME, 'DeleteTask')
  deleteTask(payload: DeleteTaskRequestDto) {
    return this.todoService.deleteTask(payload);
  }
}
