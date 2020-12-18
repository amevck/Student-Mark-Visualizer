import * as mongoose from "mongoose";
import chalk from "chalk";
import { matches } from "lodash";
import Item from "../server/MarkDetails/MarkDetail.model";

const url = process.env.MONGODB_URI || "mongodb://localhost:27018/test_database";
const port = process.env.PORT || 9000;

const populateDatabase = async () => {
  try {
    await insertRows();
  } catch (error) {
    console.log(chalk.red(error));
  }
};

const insertRows = async () => {
  console.log("inserting data ...");
  for (let id = 1; id <= 4600; id++) {
    const years = generateNumericArr(2010, 2020);
    const subjects = generateNamesArr("Subj", 10);
    const markRange: [number, number] = [generateRandom(5, 45), generateRandom(55, 100)];
    const rowsForStudent = generateRowsForStudent(id, `Std_${id}`, years, 2, 2, subjects, markRange);
    await Item.insertMany(rowsForStudent);
  }
  console.log("done...");
};

const generateRowsForStudent = (
  id: number,
  name: string,
  years: number[],
  semesters: number,
  gradeStart: number,
  subjects: string[],
  markRange: [number, number]
) => {
  const studentRows = [];
  for (let yearIndex = 0; yearIndex < years.length; yearIndex++) {
    for (let semester = 1; semester <= semesters; semester++) {
      for (let subject of subjects) {
        studentRows.push({
          name,
          studentId: id,
          year: years[yearIndex],
          semester,
          grade: gradeStart + yearIndex,
          subject,
          mark: generateRandom(...markRange),
        });
      }
    }
  }
  return studentRows;
};

const generateRandom = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateNamesArr = (prfix: string, count: number) => {
  const nameArr = [];
  for (let i = 1; i <= count; i++) {
    nameArr.push(`${prfix}_${i}`);
  }
  return nameArr;
};

const generateNumericArr = (start: number, end: number) => {
  const nameArr = [];
  for (let i = start; i <= end; i++) {
    nameArr.push(i);
  }
  return nameArr;
};

(async () => {
  // Connect to the database
  mongoose.set("useCreateIndex", true);
  await mongoose.connect(url, { useNewUrlParser: true });
  // Populate database with sample data if it's empty
  await populateDatabase();
  mongoose.disconnect();
})();
