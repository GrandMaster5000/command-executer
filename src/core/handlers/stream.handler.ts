import { ChildProcessWithoutNullStreams } from 'child_process';
import { StreamLogger } from './stream-logger.interface';

export class StreamHandler {
	constructor(private logger: StreamLogger) {}

	processOutput(stream: ChildProcessWithoutNullStreams) {
		stream.stdout.on('data', (data: any) => {
			this.logger.log(data);
		});

		stream.stderr.on('data', (data: any) => {
			this.logger.error(data)
		});

		stream.on('close', () => {
			this.logger.end();
		})
	}
}