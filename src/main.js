/**
 * In this file, the only thing you need to do is to read the file
 * and call the functions on the COVID records
 * all functions should be defined in functions.js
 */

// TODO: Import csv parsing and file reading modules
import fs from 'node:fs';

import { parse } from 'csv-parse';

// TODO: import functions from `functions.js`
import {
    mergeLocation,
    mostConfirmedCases,
    averageRecoveryTime,
    percentages,
  } from './functions.js';
// DATASET link: https://www.kaggle.com/kimjihoo/coronavirusdataset?select=PatientInfo.csv
// (already included in the `data` folder)

// TODO: read the csv file
// hint: use `{ columns: true, skip_empty_lines: true }` as options for `parse` call
// check the `csv-parse` docs for usage examples! https://csv.js.org/parse/

// TODO: call functions on parsed data
let records = [];
let max_age = '';
let average_recovery_time = 0;
let percentagesDict = {}

fs.createReadStream('./data/PatientInfo.csv')
  .pipe(parse({ columns: true, skip_empty_lines: true }))
  .on('data', (row) => {
    records.push(row);
  })
  .on('end', () => {
    records = mergeLocation(records);

    max_age = mostConfirmedCases(records);
    console.log(max_age);

    average_recovery_time = averageRecoveryTime(records);
    console.log(average_recovery_time);

    percentagesDict = percentages(records);
    console.log(percentagesDict);

    // console.log(records[0]);
    // console.log(records.length);
  });