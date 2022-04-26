import { StreamLogger } from '../../core/handlers/stream-logger.interface';

export class ConsoleLogger implements StreamLogger {
	private static inctance: ConsoleLogger;

	constructor() {
		if (ConsoleLogger.inctance) {
			return ConsoleLogger.inctance
		}

		ConsoleLogger.inctance = this;
	}

	public log(...args: any[]): void {
		console.log(...args);
	}
	public error(...args: any[]): void {
		console.log(...args);
	}
	public end(): void {
		console.log('Ready');
	}

}

