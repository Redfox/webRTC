import { Server, Socket as Socketio } from 'socket.io';
import room from './room';

interface ISocket extends Socketio {
  roomId: string;
}

class Socket {
  public io!: Server;

  public setup(io: Server): void {
    io.on('connection', (socket: ISocket) => {
      socket.on('ready', (roomId: string) => {
        room.initRoom(roomId, socket.id);
        socket.roomId = roomId;
        socket.join(roomId);

        const roomSkt = io.sockets.adapter.rooms[roomId] || {};
        const sockets = roomSkt.sockets || {};
        Object.keys(sockets).forEach((socketId, index) => {
          if (socket.id !== socketId) {
            setTimeout(() => {
              socket.to(socketId).emit('join', socket.id);
            }, index * Number(process.env.DELAY))
          }
        }); 
      })
    })
  }
}

export default new Socket();
