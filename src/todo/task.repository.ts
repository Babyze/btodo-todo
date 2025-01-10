import { InjectRepository } from '@nestjs/typeorm';
import { BaseAbstractRepository } from 'btodo-utils';
import { Repository } from 'typeorm';
import { TaskEntity } from './entities/task.entity';

export class TaskRepository extends BaseAbstractRepository<TaskEntity> {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {
    super(taskRepository);
  }
}
