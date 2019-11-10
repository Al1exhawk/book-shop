export class ConfigService {
  get REACT_APP_API_ENDPOINT() {
    return process.env.REACT_APP_API_ENDPOINT;
  }

  get REACT_APP_SEND_GRID_PUBLIC_KEY() {
    return process.env.REACT_APP_SEND_GRID_PUBLIC_KEY;
  }
}
