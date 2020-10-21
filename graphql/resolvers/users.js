const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { SECRET_KEY } = require('../../config');
const { UserInputError } = require('apollo-server');
const { validateRegisterInput } = require('../../utils/validators');

const users = {
    Mutation: {
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

            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
            }, SECRET_KEY, { expiresIn: "1h" });

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}

module.exports = users;