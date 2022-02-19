const connectDB = require('./config/db'); 
const express = require('express');
const app = express();
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
//connect database
connectDB();

const typeDefs = require('./GraphQL/typeDefs')
const  resolvers = require('./GraphQL/Resolvers/server')

app.use(cors({
  origin: '*'
}));
app.use(express.json());

    const server = new ApolloServer({
       typeDefs,
       resolvers
   });

app.get('/', (req, res) => {
    res.send('Hello this is Auth!');
  });

app.use(express.static('public'));
const PORT = process.env.PORT || 4000;

server.start().then(() => {
server.applyMiddleware({ app, path: '/graphql' });
app.listen(PORT, function () {
  console.log(`server started on port ${PORT}`);
});
});

