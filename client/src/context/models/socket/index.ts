export interface SocketContextData {
  connect: (roomName: string) => void;
  stream: MediaStream | null;
  mediaAvailable: {
    video: boolean;
    audio: boolean;
  }
}
