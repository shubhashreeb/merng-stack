const Post = require('../../models/Post')
module.exports = {
    Mutation:{
        createComment: async (_, { postId, content }, context) => {
            if (content.trim() === '') {
              throw new UserInputError('Empty comment', {
                errors: {
                  body: 'Comment body must not empty'
                }
              });
            }
      
            const post = await Post.findById(postId);
      
            if (post) {
              post.comments.unshift({
                content,
                //username,
                createdAt: new Date().toISOString()
              });
              await post.save();
              return post;
            } else throw new UserInputError('Post not found');
          },
          async deleteComment(_, { postId, commentId }) {
            //const { username } = checkAuth(context);
      
            const post = await Post.findById(postId);
      
            if (post) {
              const commentIndex = post.comments.findIndex((c) => c.id === commentId);
                post.comments.splice(commentIndex, 1);
                await post.save();
                return post;
            }
          }
        }
    }