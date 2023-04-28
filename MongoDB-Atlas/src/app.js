import dotenv from "dotenv"
dotenv.config()

import express from "express"
import userRouter from "./routes/views.router.js"
import mongoose from "mongoose"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

void (async () => {
  try {

    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const SERVER_PORT = 8082;

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/', userRouter)

    app.listen(SERVER_PORT, () => {
      console.log(`Conectado al server en el puerto: ${SERVER_PORT}`);
    });
  }
  catch (e) {
    console.log(e);
  }
})();