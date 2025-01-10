import { IsNumber, IsString } from 'class-validator';
import { CreateTaskRequest, CreateTaskResponse } from '../pb/todo.pb';
import { TimestampToDate } from './date.dto';

export class CreateTaskRequestDto implements CreateTaskRequest {
  @IsNumber()
  todoID: number;

  @IsNumber()
  accountID: number;

  @IsString()
  name: string;
}

export type CreateTaskResponseDto = TimestampToDate<CreateTaskResponse>;
