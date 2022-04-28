import { CommandExec } from '../../core/executor/command.types';

export interface FfmpegInput {
	width: number;
	height: number;
	path: string;
	name: string;
}

export interface CommandExecFfmpeg extends CommandExec {
	output: string;
}