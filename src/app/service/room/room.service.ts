import {IRoomService} from "./room.interface";
import axios from '../axios';

class RoomService implements IRoomService{
    connectToRoom(): boolean {
        throw new Error('not implement')
    }

    createRoom(): string {
        throw new Error('not implement')
    }

}

export default new RoomService();
