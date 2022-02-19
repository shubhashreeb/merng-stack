const Post = require('../../models/Post');
const user = require('../../models/user');
module.exports ={
    Query: {
        async getPosts() {
            try {
              const posts = await Post.find().sort({createdAt:-1});
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
async createPost(_, {content}){
    if (content.trim() === '') {
        throw new Error('Post body must not be empty');
      }
    const newPost = new Post({
        content,
        createdAt: new Date().toISOString(),
        user:user.id,
    });
    const post = await newPost.save();
    return post;
},
async deletePost(_, { postId }) {
      const post = await Post.findById(postId);
        await post.delete();
        return 'Post deleted successfully';
}
}
};