const { ApolloServer, gql } = require('apollo-server-express')
module.exports = gql`
type Post {
    id: ID!
    content: String!
    createdAt: String!
    username: String!
    comments:[Comment]!
    commentCount: Int!
  }
type Comment{
    id:ID!
    createdAt: String!
    username: String!
    content: String!
}

type User {
    username: String!
    email: String!
    password: String!
    token: String!
}

input RegisterInput {
    username: String!
    email: String!
    password: String!
    reEnterPassword: String!
}

input LoginInput {
    email: String!
    password: String!
}

type Query{
 user(id: ID!): User
 getPosts: [Post]
 getPost(postId: ID!): Post
}
type Mutation{
    registerUser(registerInput : RegisterInput): User
    loginUser(loginInput : LoginInput): User
    createPost(content: String!): Post
    deletePost(postId: ID!): String!
    createComment(postId: String!, content: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
}
`;