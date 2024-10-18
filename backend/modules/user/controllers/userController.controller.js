const User = require("../models/user.model");
const { CustomError } = require("../../../utils/CustomError");
const AsyncHandler = require("../../../utils/AsyncHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Bot = require("../models/bot.model");

const userSignup = AsyncHandler(async (req, res, next) => {
  const { Name, Email, Password } = req.body;
  if (
    !Name ||
    !Email ||
    !Password ||
    Name === "" ||
    Email === "" ||
    Password === ""
  ) {
    throw new CustomError("All fields are required!", 400);
  }
  const duplicateUser = await User.findOne({
    Email,
  });
  if (duplicateUser) {
    throw new CustomError("Already registered, please login!");
  }
  const salt = await bcrypt.genSalt(16);
  const CryptedPassword = await bcrypt.hash(Password, salt);
  const newUser = User({
    Name,
    Email,
    Password: CryptedPassword,
  });
  await newUser.save();
  return res.status(200).json({ message: "User registered!", status: true });
});

const userLogin = AsyncHandler(async (req, res, next) => {
  const { Password, Email } = req.body;
  if (!Email || !Password || Password === "" || Email === "") {
    throw new CustomError("Allfields are required", 400);
  }
  const user = await User.findOne({ Email });
  if (!user) {
    throw new CustomError("No account found!", 401);
  }
  const comparePassword = await bcrypt.compare(Password, user.Password);
  if (!comparePassword) {
    throw new CustomError("Invalid email or password !", 400);
  }
  const token = await jwt.sign({ id: user._id }, process.env.JWT_TOKEN_KEY, {
    expiresIn: "1d",
  });
  await res.cookie("authtoken", token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60), //60 mins
    sameSite: "lax",
    httpOnly: true,
    secure: true,
  });
  return res.json({ message: "Logged in successfully", status: true });
});

const cookieValidation = AsyncHandler(async (req, res, next) => {
  const cookie = req?.headers?.cookie;
  if (!cookie) {
    throw new CustomError("No cookie has found!", 401);
  }
  const token = cookie.split("authtoken=")[1];
  if (!token) {
    throw new CustomError("No valid token has found!", 401);
  }
  const { id } = await jwt.verify(token, process.env.JWT_TOKEN_KEY);
  req.id = id;
  next();
});

const getAllBots = AsyncHandler(async (req, res, next) => {
  const bots = await Bot.find({ Created_By: req.id });
  return res.status(200).json({
    message: "Data fetched!",
    bots,
  });
});

module.exports = {
  userSignup,
  userLogin,
  cookieValidation,
  getAllBots,
};
