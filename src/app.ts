import { FFmpegExecutor } from './commands/ffmpeg/ffmpeg.executor';
import { PromptService } from './core/prompt/prompt.service';
import { ConsoleLogger } from './out/console-logger/console-logger';

class App {
	async run() {
		new FFmpegExecutor(new ConsoleLogger()).execute();
	}
}

new App().run();