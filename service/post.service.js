const PostModel = require("./../model/Post.model");
const { QueryTypes } = require("sequelize");
const sequelize = require("../db/connect");
const time = require("./../helpers/format_time");
class PostService {
  createPost = async ({ status, postContent, accountId }) => {
    try {
      await PostModel.create({ status, postContent, accountId, time: time() });
      return {
        statusCode: 200,
        message: `Successful post creation !`,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 400,
        message: `Post creation failed !`,
      };
    }
  };
  getAllPost = async () => {
    try {
      const postList = await sequelize.query(
        `SELECT posts.id as postId, posts.postContent as postContent, posts.time as time,  accounts.username as username, accounts.avatar as avatar from posts LEFT JOIN accounts on accounts.id = posts.accountId `,
        {
          type: QueryTypes.SELECT,
          nest: true,
        }
      );
      const commentList = await sequelize.query(
        `SELECT *,comments.time as timeComment  from comments LEFT JOIN posts on comments.postId = posts.id 
LEFT JOIN accounts on comments.accountId = accounts.id ORDER BY comments.id DESC;`,
        {
          type: QueryTypes.SELECT,
          nest: true,
        }
      );
      const likeList = await sequelize.query(
        `SELECT * from likes LEFT JOIN accounts on likes.accountId = accounts.id`,
        {
          type: QueryTypes.SELECT,
          nest: true,
        }
      );
      const newPostList = postList.map((post) => {
        const comments = [];
        const likes = [];
        commentList.forEach((comment) => {
          if (post.postId === comment.postId) {
            comments.push(comment);
          }
        });
        likeList.forEach((like) => {
          if (post.postId === like.postId) {
            likes.push(like);
          }
        });
        post.likes = likes;
        post.comments = comments;
        return post;
      });
      newPostList.sort((a, b) => b.postId - a.postId);
      return {
        postList: newPostList,
      };
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = new PostService();
