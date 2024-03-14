import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const User = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Please enter your username"],
	},
	email: {
		type: String,
		required: [true, "Please enter your email"],
	},
	password: {
		type: String,
		required: [true, "Please enter your password"],
		minLength: [6, "Password should be more than 6 characters"],
		select: false,
	},
	avatar: {
		type: String,
		required: true,
	},
	favorites: [
		{
			type: String,
		},
	],
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	resetPasswordToken: String,
	resetPasswordTime: Date,
});

const UserSchema = mongoose.model("User", User);

export default UserSchema;
