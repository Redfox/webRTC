export interface SocketContextData {
  connect: () => void;
  stream: MediaStream | null;
  mediaAvailable: {
    video: boolean;
    audio: boolean;
  }
}
