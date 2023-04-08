import express from 'express';
import { engine } from 'express-handlebars';
import { resolve } from 'path';
import viewsRouter from './routes/views.router.js';
import { Server } from "socket.io"

void (async () => {
  try {
    const app = express();

    const SERVER_PORT = 8083;

    const httpServer = app.listen(SERVER_PORT, () => {
      console.log(`Conectado al server en el puerto: ${SERVER_PORT}`);
    });

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(resolve('src/public')));

    const viewsPath = resolve('src/views');

    app.engine('handlebars', engine({
      layoutsDir: `${viewsPath}/layouts`,
      defaultLayout: `${viewsPath}/layouts/main.handlebars`,
    }));
    app.set('view engine', 'handlebars');
    app.set('views', viewsPath);

    const socketServer = new Server(httpServer)

    socketServer.on("connection", socket => {
      console.log("Nuevo cliente conectado")

      socket.on("chat", data =>{
        socketServer.emit("chat", data)
      })
    })

    app.use('/', viewsRouter)
  }
  catch (e) {
    console.log(e);
  }
})();
