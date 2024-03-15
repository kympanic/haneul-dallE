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

// Hash password
userSchema.pre("save", async function () {
	if (!this.isModified("password")) {
		return;
	}
	this.password = await bcrypt.hash(this.password, 10);
});

// JWT token
userSchema.methods.getJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRES,
	});
};

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

const UserSchema = mongoose.model("User", User);

export default UserSchema;
