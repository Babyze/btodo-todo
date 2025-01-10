import { IsNumber } from 'class-validator';
import { GetTodoRequest, GetTodoResponse } from '../pb/todo.pb';
import { TimestampToDate } from './date.dto';

export class GetTodoRequestDto implements GetTodoRequest {
  @IsNumber()
  todoID: number;

  @IsNumber()
  accountID: number;
}

export type GetTodoResponseDto = TimestampToDate<GetTodoResponse>;
