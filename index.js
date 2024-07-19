import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import { connectToDb } from './src/db.config.js';
import {
  addHabit,
  deleteHabit,
  getAllHabits,
  updateStatusHabits,
} from './src/controllers/habits.controller.js';
import {
  getAllHabitsDate,
  updateStatusHabitsDate,
} from './src/controllers/habitStatus.controller.js';
import { createDailyHabitStatus } from './src/models/createDailyHabitStatus.js';
// default
const app = express();
app.use(express.static('public'));
app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));

//create daily habits document in habit status model
createDailyHabitStatus();

//routes
app.get('/', getAllHabits); //habits view
app.post('/', addHabit); //add habit in habits view
app.post('/update/:habitId', updateStatusHabits); // update status of the habit from habit view
app.get('/delete/:habitId', deleteHabit); // delete habit from habit view
app.get('/calendarView', getAllHabitsDate); // calendar view
app.post('/calendarView/update/:habitStatusId', updateStatusHabitsDate); // update status from calendar view

// server listenting
app.listen(3000, () => {
  console.log('Server listening at port 3000');
  connectToDb();
});
