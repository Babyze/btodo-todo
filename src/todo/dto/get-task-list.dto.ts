import { IsNumber } from 'class-validator';
import { GetTaskListRequest, GetTaskListResponse } from '../pb/todo.pb';
import { TaskDto } from './task.dto';

export class GetTaskListRequestDto implements GetTaskListRequest {
  @IsNumber()
  todoID: number;

  @IsNumber()
  accountID: number;
}

export type GetTaskListResponseDto = Omit<GetTaskListResponse, 'tasks'> & {
  tasks: TaskDto[];
};
