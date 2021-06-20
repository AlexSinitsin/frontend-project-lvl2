#!/usr/bin/env node
import { Command, Option } from 'commander/esm.mjs';
import gendiff from '../formatters/index.js';

const program = new Command();

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the current version')
  .addOption(
    new Option('-f, --format <type>', 'output format').default(
      'stylish',
      'stylish',
    ),
  )
  .action((filepath1, filepath2, options) => {
    const param = options.format;
    gendiff(filepath1, filepath2, param);
  })
  .parse();
