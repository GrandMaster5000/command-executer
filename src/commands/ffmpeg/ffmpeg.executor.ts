import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { CommandExecutor } from '../../core/executor/command.executor';
import { FileService } from '../../core/files/files.service';
import { StreamLogger } from '../../core/handlers/stream-logger.interface';
import { StreamHandler } from '../../core/handlers/stream.handler';
import { PromptService } from '../../core/prompt/prompt.service';
import { FfmpegBuilder } from './ffmpeg.builder';
import { CommandExecFfmpeg, FfmpegInput } from './ffmpeg.types';

export class FFmpegExecutor extends CommandExecutor<FfmpegInput> {
	private fileService: FileService = new FileService();
	private promptService: PromptService = new PromptService();

	constructor(logger: StreamLogger) {
		super(logger)
	}

	protected async prompt(): Promise<FfmpegInput> {
		const width = await this.promptService.input<number>('Ширина', 'number');
		const height = await this.promptService.input<number>('Высота', 'number');
		const path = await this.promptService.input<string>('Путь до файла', 'input');
		const name = await this.promptService.input<string>('Имя файла', 'input');

		return { width, height, path, name }
	}
	protected build({ path, width, height, name }: FfmpegInput): CommandExecFfmpeg {
		const output = this.fileService.getFilePath(path, name, 'mp4');
		const args = (new FfmpegBuilder())
		.input(path)
		.setVideoSize(width, height)
		.output(output)

		return { command: 'ffmpeg', args, output }
	}
	protected spawn({ output, command, args }: CommandExecFfmpeg): ChildProcessWithoutNullStreams {
		this.fileService.deleteFileIfExists(output);

		return spawn(command, args);
	}
	protected processStream(stream: ChildProcessWithoutNullStreams, logger: StreamLogger): void {
		const handler = new StreamHandler(logger);
		handler.processOutput(stream);
	}

}