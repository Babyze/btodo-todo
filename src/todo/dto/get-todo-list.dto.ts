import { IsNumber } from 'class-validator';
import { GetTodoListRequest, GetTodoListResponse } from '../pb/todo.pb';
import { TodoDto } from './todo.dto';

export class GetTodoListRequestDTO implements GetTodoListRequest {
  @IsNumber()
  accountID: number;
}

export interface GetTodoListResponseDto
  extends Omit<GetTodoListResponse, 'todo'> {
  todo: TodoDto[];
}
