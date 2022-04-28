import { ChildProcessWithoutNullStreams } from 'child_process';
import { StreamLogger } from '../handlers/stream-logger.interface';
import { CommandExec } from './command.types';

export abstract class CommandExecutor<Input> {
	constructor(private logger: StreamLogger) {}

	public async execute() {
		const input = await this.prompt();
		const command = this.build(input);
		const stream = this.spawn(command);
		this.processStream(stream, this.logger);
	}

	protected abstract prompt(): Promise<Input>;
	protected abstract build(input: Input): CommandExec;
	protected abstract spawn(command: CommandExec): ChildProcessWithoutNullStreams;
	protected abstract processStream(stream: ChildProcessWithoutNullStreams, logger: StreamLogger): void;
}

 