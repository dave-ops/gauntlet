import express from 'express';
import path from 'path';

const app: express.Application = express();
const port: number = 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});