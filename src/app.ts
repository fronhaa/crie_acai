import express, { Express } from 'express';
import router from './routes';
import cors from 'cors';

const port: number = 3000;
const server: Express = express();

server.use(cors());
server.use(express.json());
server.use('/', router);

export { server };

server.listen(port, () => {
    console.log('Server started on port 3000!');
});

