import { IsNumber } from 'class-validator';
import { DeleteTodoRequest, DeleteTodoResponse } from '../pb/todo.pb';
import { TimestampToDate } from './date.dto';

export class DeleteTodoRequestDto implements DeleteTodoRequest {
  @IsNumber()
  accountID: number;

  @IsNumber()
  todoID: number;
}

export type DeleteTodoResponseDto = TimestampToDate<DeleteTodoResponse>;
