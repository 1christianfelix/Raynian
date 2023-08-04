export interface User {
  _id: string;
  username: string;
}

export interface JoinRoomData {
  room: string;
  user: User;
}
