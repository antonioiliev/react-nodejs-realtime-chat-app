import express from 'express';
import http from 'http';
import io from 'socket.io';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import config from './config';
import User from './db/User';

// Load all .env variables to the process
dotenv.config();

global.knex = require('knex')({
	client: 'mysql',
	connection: {
	  host : process.env.DB_HOST,
	  user : process.env.DB_USER,
	  password : process.env.DB_PASSWORD,
	  database : process.env.DB_NAME
	}
});

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());

var indexRouter = express.Router();

indexRouter.post('/login', async (req, res) => {
	console.log('login', req.body);
	const userIsLoggedIn = await User.login(req.body);
	console.log('user is correct: ', userIsLoggedIn);

	if (userIsLoggedIn.status) {
		jwt.sign(req.body, process.env.JWT_SECRET, { expiresIn: 240}, (err, token) => {
			if (err) {
				console.log(err);
			}

			userIsLoggedIn.token = token;
			
			res.status(200).json(userIsLoggedIn);
		});
	} else {
		res.status(200).json(userIsLoggedIn);
	}
});

indexRouter.post('/register', async (req, res) => {
	console.log('register', req.body);
	const userIsRegistered = await User.register(req.body);
	console.log('user is registered: ', userIsRegistered.status);
	// res.status(200).json({user: userIsCorrect});
	res.status(200).json(userIsRegistered);
});

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
	console.log('authheader', authHeader);
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
				console.log('token verification error', err);
                return res.sendStatus(403);
			}
			console.log('USER', user);

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

indexRouter.get('/secret', authenticateJWT, (req, res) => {
	res.json({ secret: 'KUR' });
});


indexRouter.get('*', async (req, res) => {
	console.log('* reached');
});

app.use(config.baseUrl, indexRouter);

const ioServer = http.createServer(app);
const socketIO = io(ioServer);

socketIO.of('/api/').on('connection', (socket) => {
	console.log('a user connected');

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	socket.on('chat', (msg) => {
		console.log('message: ' + msg);
		socketIO.of('/api/').emit('chat', msg);
	});
});

ioServer.listen(process.env.PORT || port, () => console.log(`Example app listening at http://localhost:${port}`))