import { IsNumber } from 'class-validator';
import { DeleteTaskRequest, DeleteTaskResponse } from '../pb/todo.pb';
import { TimestampToDate } from './date.dto';

export class DeleteTaskRequestDto implements DeleteTaskRequest {
  @IsNumber()
  accountID: number;
  @IsNumber()
  todoID: number;
  @IsNumber()
  taskID: number;
}

export type DeleteTaskResponseDto = TimestampToDate<DeleteTaskResponse>;
