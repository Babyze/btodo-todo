import { IsEnum, IsNumber } from 'class-validator';
import { UpdateTaskRequest, UpdateTaskResponse } from '../pb/todo.pb';
import { TASK_STATUS } from 'src/common/constants/task.constant';
import { TimestampToDate } from './date.dto';

export class UpdateTaskRequestDto implements UpdateTaskRequest {
  @IsNumber()
  accountID: number;

  @IsEnum(TASK_STATUS)
  status: TASK_STATUS;

  @IsNumber()
  taskID: number;

  @IsNumber()
  todoID: number;
}

export type UpdateTaskResponseDto = TimestampToDate<UpdateTaskResponse>;
