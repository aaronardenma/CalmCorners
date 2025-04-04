import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.send('Hello from Express API!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});