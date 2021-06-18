#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import gendiff from '../src/main.js';

const program = new Command();

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the current version')
  .option('-f, --format [type]', 'output format')
  .action(gendiff);

program.parse(process.argv);
