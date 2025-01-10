import { InjectRepository } from '@nestjs/typeorm';
import { BaseAbstractRepository } from 'btodo-utils';
import { Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';

export class TodoRepository extends BaseAbstractRepository<TodoEntity> {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {
    super(todoRepository);
  }
}
