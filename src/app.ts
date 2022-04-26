import { PromptService } from './core/prompt/prompt.service';

class App {
	async run() {
		const result = await new PromptService().input<number>('Число', 'number');
		console.log(result);
	}
}

new App().run();