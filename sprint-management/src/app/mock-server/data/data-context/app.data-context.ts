import { UsersTable } from '../tables/users.table';
import { TasksTable } from '../tables/tasks.table';
import { SchedulesTable } from '../tables/schedules.table';

// Wrapper class
export class AppDataContext {
	public static users: any = UsersTable.users;

	public static tasks: any = TasksTable.tasks;

	public static schedules: any = SchedulesTable.schedules;
}