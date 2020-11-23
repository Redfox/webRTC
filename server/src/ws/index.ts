import { Server, Socket as Socketio } from 'socket.io';
import room from './room';

interface ISocket extends Socketio {
  roomId: string;
}

class Socket {
  public io!: Server;

  public setup(io: Server): void {
    io.on('connection', (socket: ISocket) => {
      socket.on('ready', (roomId: string) => {        room.initRoom(roomId, socket.id);
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
      });

      socket.on('offer', (id, data) => {
        socket.to(id).emit('offer', socket.id, data);
      });

      socket.on('candidate', (id, data) => {
        socket.to(id).emit('candidate', socket.id, data);
      });

      socket.on('answer', (id, data) => {
        socket.to(id).emit('answer', socket.id, data);
      });

      socket.on('leave', () => {
        room.updateRooms(socket.roomId, socket.id);
        io.emit('leave', socket.id);
        socket.leave(socket.roomId);
      });

      socket.on('disconnect', () => {
        if(socket.roomId) {
          room.updateRooms(socket.roomId, socket.id);
          io.emit('leave', socket.id);
          socket.leave(socket.roomId);
        }
      });
    });
  }
}

export default new Socket();
