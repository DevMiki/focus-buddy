import { spawnSync } from 'node:child_process';
import path from 'node:path';

function fail(message) {
	console.error(message);
	process.exit(1);
}

function ok(message) {
	console.log(message);
}

if (process.platform !== 'win32') {
	ok('doctor: ok');
	process.exit(0);
}

const esbuildExe = path.resolve('node_modules/@esbuild/win32-x64/esbuild.exe');
const result = spawnSync(esbuildExe, ['--version'], { encoding: 'utf8' });

if (result.error?.code === 'ENOENT') {
	fail(
		[
			'doctor: esbuild binary not found.',
			'Run `npm ci` to (re)install dependencies.',
		].join('\n')
	);
}

if (result.error?.code === 'EPERM') {
	fail(
		[
			'doctor: Node cannot spawn `esbuild.exe` (EPERM).',
			'This is almost always caused by Windows security policy / Exploit Protection blocking unsigned child processes from `node.exe`.',
			'Fix: Windows Security → App & browser control → Exploit protection → Program settings → add `node.exe` → disable “Block non‑Microsoft signed binaries”.',
			'Then re-run: `npm run dev`.',
		].join('\n')
	);
}

if (result.status !== 0) {
	fail(
		[
			'doctor: esbuild failed to run.',
			`exit code: ${result.status ?? 'unknown'}`,
			result.stderr?.trim() ? `stderr: ${result.stderr.trim()}` : '',
		]
			.filter(Boolean)
			.join('\n')
	);
}

ok(`doctor: esbuild ok (${result.stdout.trim()})`);
