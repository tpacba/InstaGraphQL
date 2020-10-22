const { UserInputError } = require('apollo-server');
const Post = require('../../models/Post');
const checkAuth = require('../../utils/check-auth');

const comments = {
    Mutation: {
        async createComment(_, { postId, body }, context) {
            const user = checkAuth(context);
            if(body.trim() == "") {
                throw new UserInputError("Empty comment", {
                    errors: {
                        body: "Body must not be empty"
                    }
                });
            } else {
                const post = await Post.findById(postId);
                if(post) {
                    post.comments.unshift({
                        body,
                        username: user.username,
                        createdAt: new Date().toISOString()
                    })

                    await post.save();

                    return post;
                } else {
                    throw new UserInputError("Post is not found.")
                }
            }
        },
        deleteComment() {

        }
    }
}

module.exports = comments;