import express from 'express';
import routes from './routes/index';
//Creating the Express Instance and defing port as 3000
const app = express();
const port = 3000;
//Setting app to use Express router locates in the routes folder
app.use(routes);
//starting the server
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
export default app;
