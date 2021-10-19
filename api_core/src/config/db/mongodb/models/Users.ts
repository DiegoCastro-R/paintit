import { Schema, model, connect } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  rooms: any[];
}

const schema = new Schema<User>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  rooms: { type: [] },
});

const UserModel = model<User>("User", schema);

export default UserModel;
