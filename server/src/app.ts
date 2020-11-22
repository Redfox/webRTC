import express, { Express } from 'express';
import { createServer, Server } from 'http';
import cors from 'cors';
import socketio from 'socket.io';

class App {
  private http!: Server;
  private app: Express;

  constructor() {
    this.app = express();
    this.app.use(cors());
  }

  public start() {
    this.http = createServer(this.app);

    this.http.listen(process.env.PORT || 3333, () => {
      console.log(`server running on :${process.env.PORT || 3333}`)
    });

    const io = socketio(this.http);
    // setup socket
  }
}

export default App;
