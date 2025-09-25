export interface Message {
  from: "me" | "them";
  message: string;
  time: string;
}

export interface RawSocketMessage {
  fromUserId: string;
  toUserId: number;
  message: string;
  time: string;
}