import { Body, Controller, Get, Param, Post ,Delete, Patch,Query} from '@nestjs/common';
import { stringify } from 'node:querystring';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService : TasksService){

    }

    @Get()
    getTasks(@Query() filterDto : GetTaskFilterDto) : Task[]{
        if(Object.keys(filterDto).length){
          return this.tasksService.getTasksWithFilters(filterDto);
        }
        
        return this.tasksService.getAllTasks();
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string) : void {
      this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id:string,@Body('status') status:TaskStatus) : Task{
      return this.tasksService.updateTaskStatus(id,status);
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string) : Task{
      return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto : CreateTaskDto) : Task{
      return this.tasksService.createTask(createTaskDto);
    }
}
