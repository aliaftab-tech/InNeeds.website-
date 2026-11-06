import fs from 'node:fs';
import path from 'node:path';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

export const PROJECT_ROOT = path.resolve(process.cwd());

export function checkFileExists(relPath) {
  const fullPath = path.join(PROJECT_ROOT, relPath);
  return fs.existsSync(fullPath);
}

export function readFileContent(relPath) {
  const fullPath = path.join(PROJECT_ROOT, relPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${relPath} (resolved at ${fullPath})`);
  }
  return fs.readFileSync(fullPath, 'utf8');
}

export function stripComments(code) {
  return code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
}

export function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

export async function runCommand(command, options = {}) {
  try {
    const { stdout, stderr } = await execAsync(command, {
      cwd: PROJECT_ROOT,
      ...options,
    });
    return {
      success: true,
      code: 0,
      stdout: stdout.toString(),
      stderr: stderr.toString(),
    };
  } catch (err) {
    return {
      success: false,
      code: err.code || 1,
      stdout: (err.stdout || '').toString(),
      stderr: (err.stderr || err.message || '').toString(),
    };
  }
}

export async function runBuildWithRetry(maxRetries = 2, delayMs = 2000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const result = await runCommand('npm run build');
    if (result.code === 0) {
      return result;
    }
    // If locked by another concurrent process, wait and retry
    if (result.stderr.includes('Another next build process is already running') && attempt < maxRetries) {
      await new Promise(r => setTimeout(r, delayMs));
      continue;
    }
    return result;
  }
}

export class TestSuiteRunner {
  constructor(name) {
    this.name = name;
    this.tests = [];
    this.results = [];
  }

  test(description, fn) {
    this.tests.push({ description, fn });
  }

  async run() {
    console.log(`\n======================================================`);
    console.log(` RUNNING SUITE: ${this.name}`);
    console.log(`======================================================`);
    this.results = [];
    let passed = 0;
    let failed = 0;

    for (const { description, fn } of this.tests) {
      const startTime = performance.now();
      try {
        await fn();
        const duration = (performance.now() - startTime).toFixed(1);
        console.log(`  ✓ PASS: ${description} (${duration}ms)`);
        this.results.push({ description, status: 'PASS', duration });
        passed++;
      } catch (error) {
        const duration = (performance.now() - startTime).toFixed(1);
        console.error(`  ✗ FAIL: ${description} (${duration}ms)`);
        console.error(`     Error: ${error.message}`);
        this.results.push({ description, status: 'FAIL', duration, error: error.message });
        failed++;
      }
    }

    console.log(`------------------------------------------------------`);
    console.log(` Suite ${this.name} Results: ${passed} passed, ${failed} failed, ${this.tests.length} total.`);
    return {
      name: this.name,
      total: this.tests.length,
      passed,
      failed,
      results: this.results,
    };
  }
}
