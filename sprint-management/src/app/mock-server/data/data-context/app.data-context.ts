import { UsersTable } from '../tables/users.table';
import { TasksTable } from '../tables/tasks.table';
import { SchedulesTable } from '../tables/schedules.table';

// Wrapper class
export class AppDataContext {
	public static users: any = UsersTable.users;

	public static tasks: any = TasksTable.tasks;

	// e-commerce car remarks
	// one => many relations
	public static schedules: any = SchedulesTable.schedules;
}