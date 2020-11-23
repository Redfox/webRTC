
class Room {
  private rooms: any = new Object();

  public initRoom(roomId: string, socketId: string): void {
    if(!this.rooms[roomId]) {
      this.rooms[roomId] = {
        users: []
      };
    };

    this.rooms[roomId].users.push(socketId);
  }

  public updateRooms(roomId: string, socketId: string) {
    if(this.rooms[roomId]) {
      const userPosition = this.rooms[roomId]
      .users
      .findIndex((user: any) => user === socketId);
    
      if(userPosition > -1) {
        this.rooms[roomId].users.splice(userPosition, 1);
      }
    }
  }
}

export default new Room();
