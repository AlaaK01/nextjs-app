import { Schema, models, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
    },

    phone: {
      type: String,
    },

    birthday: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },

    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// const User = models.User || mongoose.model("User", UserSchema);

const Users = models.user || model("user", userSchema);
export default Users;





// import mongoose, { models } from "mongoose";

// const UserSchema = new mongoose.Schema(
//   {
//     name: { type: String },
//     username: { type: String },
//     password: { type: String },
//     email: { type: String },
//     gender: { type: String },
//     phone: { type: String },
//     role: { type: String },
//     image: { type: String },
//   },
//   { timestamps: true }
// );

// const User = models.User || mongoose.model("User", UserSchema);

// export default User;
