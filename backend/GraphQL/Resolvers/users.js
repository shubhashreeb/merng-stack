const User = require('../../models/user');
const { ApolloError } = require('apollo-server-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

module.exports = {
    Mutation: {
        async registerUser(_, {registerInput: {username, email, password} }) {
            //If any user already exists with the email id, throw error
            const oldUser = await User.findOne({ email });

            console.log("Request received for", username, email, password)
            if (oldUser) {
                throw new ApolloError("User already registered with the current email! " + email, 'USER-EXISTS')
            }

            //Encypt password
            var encryptedPassword = await bcrypt.hash(password, 10);

            //Build mongoose model
            const newUser = new User({
                username: username,
                email:  email.toLowerCase(),
                password: encryptedPassword
            })
                
            //Create JWT (attach to user model)
            const token = jwt.sign(
                { user_id : User._id, email },
                "MY_SECRET", 
                {
                    expiresIn: "1hr"
                }
            );

            newUser.token = token;

            //Save user in MongoDB
            const res = await newUser.save()
            return {
                id: res.id,
                ...res._doc
            };
        
        },
        async loginUser(_, {loginInput: {email, password} }) {

            //Check if an user exists with the given email

            console.log("inside login user")
            const user = await User.findOne({ email });
            if (!user){
                console.log("user not found")
            }
             console.log("Request received for", email, password)
            console.log("User is", user)
            //Check if the entered password equals to the encypted password
           
            if (user && (await bcrypt.compare(password, user.password))) {
                //Create a new token
                const token = jwt.sign(
                    { user_id : User._id, email },
                    "MY_SECRET", 
                    {
                        expiresIn: "1hr"
                    }
            );

            //Attach token to user model
            user.token = token
            return {
                id: user.id,
                ...user._doc
            }
        } else {

            //If user does not exits, the throw error
            throw new ApolloError('Incorrect Password', 'INCORRECT_PASSWORD');
        }
        }
    
},
Query: {
    user: (_, {ID}) => User.findById(ID)
}
}
