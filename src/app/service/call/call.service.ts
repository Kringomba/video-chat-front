import Peer from "peerjs";
import { pushRemoteStream, sliceRemoteStream, store } from "../../store";

export class CallService {
  peer: Peer;
  private peers: any = {};
  stream?: MediaStream;
  remoteStreams: Array<MediaStream> = [];

  static instance: CallService;

  static createInstance() {
      this.instance = new CallService();
      return this.instance;
  }

  private constructor() {
    this.peer = new Peer();
    this.connectToCall();
  }

  async createMediaStream() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      return this.stream;
    } catch (e) {
      return null;
    }
  }

  async connectToNewUser(id: string) {
    const call = this.peer.call(id, this.stream!);
    const removeId = Object.keys(this.peers).length;
    call.on("stream", (stream) =>
      this.addRemoteStream(stream));
    call.on("close", () =>
      this.removeStream(removeId)
    );
    this.peers[id] = call;
  }

  connectToCall() {
    this.peer.on("call", (call) => {
      call.answer(this.stream!);
      call.on("stream", (stream) => {
        this.addRemoteStream(stream);
      });
    });
  }

  disconnectUser(id: string) {
    this.peers[id]?.close();
  }

  addRemoteStream(remoteStream: MediaStream) {
    if (
      this.remoteStreams.findIndex(
        (stream) => stream.id === remoteStream.id
      ) === -1
    ) {
      this.remoteStreams.push(remoteStream);
      store.dispatch(pushRemoteStream(remoteStream));
    }
  }

  removeStream(removeId: number) {
    store.dispatch(sliceRemoteStream(removeId));
  }

  changeMicroStatus(status: boolean) {
    this.stream!.getAudioTracks().forEach((track) => (track.enabled = status));
  }

  changeVideoStatus(status: boolean) {
    this.stream!.getVideoTracks().forEach((track) => (track.enabled = status));
  }
}
