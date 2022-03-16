const Post = require('../../models/Post');
const checkAuth = require('../../middleware/auth')
const { ApolloError } = require('apollo-server-errors');
const { UserInputError } = require('apollo-server');
const {
    validatePost
  } = require('../../middleware/validator');
const { truncate } = require('fs');
module.exports ={
    Query: {
        async getPosts() {
            try {
              const posts = await Post.find({isAvailable:true});
              return posts;
            } catch (err) {
              console.log(err.message)
            }
 },
   async getPost(_,{ postId }) {
       try{
           const post = await Post.findById(postId);
           if(post){
               return post;
           }else{
               throw new Error('Post not found')
           }
       }catch(err){
           throw new Error(err)
       }
   }
},
Mutation :{
async createPost(_, {ISNB,title,author,genres,url,PickUPAddress},context){
    const user = checkAuth(context);
     const { valid, errors } = validatePost(
        title,author,ISNB,genres,url,PickUPAddress
    );
    if (!valid) {
        throw new UserInputError('Invalid user input', { errors });
        console.log("User Input error", errors)
    }
    const newPost = new Post({
        ISNB,title,author,genres,url,PickUPAddress,
        createdAt: new Date().toISOString(),
        isAvailable:true,
        username:user.username
    });
    const post = await newPost.save();
    return post;
},
async updatePost(_,{idnum, isAvailable}){
const post = await Post.findOneAndUpdate(
    {"_id": idnum},
   { "$set":{isAvailable: isAvailable}},
    {"new": true} //returns new document
);
 return post;
},
async deletePost(_, { postId }) {
      const post = await Post.findById(postId);
        await post.delete();
        return 'Post deleted successfully';
}
}
};