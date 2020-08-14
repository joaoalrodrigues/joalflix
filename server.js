const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const dotenv = require('dotenv');
const middlewares = jsonServer.defaults();
const channelRouter = require('./router/channelRouter');

dotenv.config({ path: './config.env' });

server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
	next();
});

server.use("/channel", channelRouter);
server.use(middlewares);
server.use(router);


const port = process.env.PORT || 8080;
server.listen(port, () => {
	console.log(`JSON Server is running in ${port}`);
});