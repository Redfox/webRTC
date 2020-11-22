import express, { Express } from 'express';
import fs from 'fs';
import { createServer as createHttpsServer, Server as ServerHttps } from 'https';
import { createServer as createHttpServer, Server as ServerHttp } from 'http';
import cors from 'cors';
import socketio from 'socket.io';
import dotenv from 'dotenv'

const key = fs.readFileSync('./ssl/key.pem');
const cert = fs.readFileSync('./ssl/cert.pem');

dotenv.config();

class App {
  private https!: ServerHttps;
  private http!: ServerHttp;
  private app: Express;

  constructor() {
    this.app = express();
    this.app.use(cors());

    this.app.get('/', (req, res) => {
      res.send('dale')
    });
  }

  public start() {
    this.https = createHttpsServer({ key: key, cert: cert }, this.app);
    this.https.listen(process.env.SSLPORT || 3334, () => {
      console.log(`https server running on :${process.env.SSLPORT || 3334}`)
    });

    this.http = createHttpServer(this.app);
    this.http.listen(process.env.PORT || 3333, () => {
      console.log(`http server running on :${process.env.PORT || 3333}`)
    });

    const io = socketio(this.http);
    const ios = socketio(this.https);
    // setup socket
  }
}

export default App;
