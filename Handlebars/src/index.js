import express from 'express';
import { engine } from 'express-handlebars';
import { resolve } from 'path';
import viewsRouter from './routes/views.router.js';

void (async () => {
  try {
    const SERVER_PORT = 8083;

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const viewsPath = resolve('src/views');

    app.engine('handlebars', engine({
      layoutsDir: `${viewsPath}/layouts`,
      defaultLayout: `${viewsPath}/layouts/main.handlebars`,
    }));
    app.set('view engine', 'handlebars');
    app.set('views', viewsPath);

    app.use('/', viewsRouter)

    app.listen(SERVER_PORT, () => {
      console.log(`Conectado al server en el puerto: ${SERVER_PORT}`);
    });
  }
  catch (e) {
    console.log("Error: ");
    console.log(e);
  }
})();
