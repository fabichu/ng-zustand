import express from 'express';
import fs from 'fs';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

import { User } from './types/user.interface';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.get('/users', (req, res) => {
  const users: User[] = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  res.send(users);
});

app.post('/users', (req, res) => {
  const users: User[] = JSON.parse(fs.readFileSync('./users.json', 'utf8'));

  let { body: user } = req;
  user = { ...user, id: uuidv4() };

  const final = JSON.stringify([...users, user]);

  fs.writeFileSync('./users.json', final, 'utf-8');

  res.send(true);
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  const users: User[] = JSON.parse(fs.readFileSync('./users.json', 'utf8'));

  const index = users.findIndex((user) => user.id === id);
  users.splice(index, 1);

  const final = JSON.stringify(users);

  fs.writeFileSync('./users.json', final, 'utf-8');

  res.send(true);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
