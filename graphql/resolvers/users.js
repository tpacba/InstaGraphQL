const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { SECRET_KEY } = require('../../config');
const { UserInputError } = require('apollo-server');
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators');

const generateToken = (user) => {
    return jwt.sign({
                id: user.id,
                email: user.email,
                username: user.username
            }, SECRET_KEY, { expiresIn: "1h" });
}

const users = {
    Mutation: {
        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);
            
            if(!valid) {
                throw new UserInputError("Errors detected", { errors });
            }

            const user = await User.findOne({ username });

            if(!user) {
                errors.general = "User not found";
                throw new UserInputError("User is not found", { errors })
            }

            const match = await bcrypt.compare(password, user.password);
            if(!match) {
                errors.general = "Wrong password";
                throw new UserInputError("Password is wrong", { errors })            
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
        async register(_, { registerInput: { username, password, confirmPassword, email } }) {
            //Validate user data
            const { errors, valid } = validateRegisterInput(username, password, confirmPassword, email);
            if(!valid) {
                throw new UserInputError("Errors detected", { errors });
            }

            //Make sure user doesn't already exist
            const user = await User.findOne({ username });
            if(user) {
                throw new UserInputError("This username is taken.", {
                    errors: {
                        username: "Sorry, this username is taken."
                    }
                })
            }

            //Hash password and create authentication token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                username,
                password,
                email,
                createdAt: new Date().toISOString()
            })

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}

module.exports = users;