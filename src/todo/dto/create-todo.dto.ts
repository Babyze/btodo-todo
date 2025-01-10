import { IsNumber, IsString } from 'class-validator';
import { CreateTodoRequest, CreateTodoResponse } from '../pb/todo.pb';
import { TimestampToDate } from './date.dto';

export class CreateTodoRequestDTO implements CreateTodoRequest {
  @IsNumber()
  accountID: number;

  @IsString()
  name: string;
}

export type CreateTodoResponseDto = TimestampToDate<CreateTodoResponse>;
