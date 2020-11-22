
class Room {
  private rooms: any = new Object();

  public initRoom(roomId: string, socketId: string): void {
    if(!this.rooms[roomId]) {
      this.rooms[roomId] = {
        users: []
      };
    };

    this.rooms[roomId].users.push(socketId);

    console.log(this.rooms[roomId])
  }
}

export default new Room();
