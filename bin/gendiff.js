#!/usr/bin/env node
import path from 'path';
import * as fs from 'fs';
import _ from 'lodash';
import { Command } from 'commander/esm.mjs';

const gendiff = (filepath1, filepath2) => {
  const path1 = path.resolve(filepath1);
  console.log(path1 + '&');

  const unionArr = _.union(arrJson1, arrJson2).sort();
  const resultArr = unionArr.reduce((acc, key) => {
    if (arrJson1.includes(key) && arrJson2.includes(key)) {
      if (json1[key] === json2[key]) {
        acc.push(`    ${key}: ${json1[key]}`);
        return acc;
      }
      acc.push(`  - ${key}: ${json1[key]}`);
      acc.push(`  + ${key}: ${json2[key]}`);
      return acc;
    }
    if (arrJson1.includes(key) && !arrJson2.includes(key)) {
      acc.push(`  - ${key}: ${json1[key]}`);
      return acc;
    }
    acc.push(`  + ${key}: ${json2[key]}`);
    return acc;
  }, []);
  const result = `{\r\n${resultArr.join('\r\n')}\r\n}`;
  console.log(result);
  return result;
};

const program = new Command();

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the current version')
  .option('-f, --format [type]', 'output format')
  .action(gendiff);

program.parse(process.argv);
