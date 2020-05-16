import io from "socket.io-client";
import config from '../../config';

let socket = io(config.api_url);

export default socket;