const PostModel = require("./../model/Post.model");
const { QueryTypes } = require("sequelize");
const sequelize = require("../db/connect");
const time = require("./../helpers/format_time");
class PostService {
  createPost = async ({ status, postContent, accountId, images }) => {
    try {
      await PostModel.create({
        status,
        postContent,
        accountId,
        images,
        time: time(),
      });
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
        `SELECT * ,posts.id as postId, posts.postContent as postContent, posts.time as time,accounts.id as accountId,  accounts.username as username, accounts.avatar as avatar from posts LEFT JOIN accounts on accounts.id = posts.accountId `,
        {
          type: QueryTypes.SELECT,
          nest: true,
        }
      );
      const commentList = await sequelize.query(
        `SELECT *,comments.time as timeComment, comments.id as commentId  from comments LEFT JOIN posts on comments.postId = posts.id 
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
      const commentChildLists = await sequelize.query(
        "SELECT *, commentchildrens.comment as commentChild, commentchildrens.id as commentchildrensId,commentchildrens.time as timeChild  from commentchildrens LEFT JOIN comments on commentchildrens.commentParentId = comments.id LEFT JOIN accounts on commentchildrens.accountId = accounts.id ORDER BY commentchildrens.id DESC ",
        {
          type: QueryTypes.SELECT,
          nest: true,
        }
      );
      const commentLikeList = await sequelize.query(
        "SELECT * from commentlikes LEFT JOIN accounts on commentlikes.accountId = accounts.id",
        {
          type: QueryTypes.SELECT,
          nest: true,
        }
      );
      const commentLikeChildList = await sequelize.query(
        "SELECT * FROM  CommentLikesChilds LEFT JOIN accounts on CommentLikesChilds.accountId = accounts.id",
        {
          type: QueryTypes.SELECT,
          nest: true,
        }
      );
      // return {
      //   commentList,
      //   commentChildLists,
      // };
      const newPostList = postList.map((post) => {
        const comments = [];
        const likes = [];
        commentList.forEach((comment) => {
          const commentChildList = [];
          const commentLikes = [];
          commentChildLists.forEach((commentChil) => {
            const commentLikeChildArr = [];
            commentLikeChildList.forEach((commentLikeChild) => {
              if (
                commentLikeChild.commentChildId ==
                commentChil.commentchildrensId
              ) {
                commentLikeChildArr.push(commentLikeChild);
              }
              commentChil.commentLikeChildArr = commentLikeChildArr;
            });
            if (comment.commentId === commentChil.commentParentId) {
              commentChildList.push(commentChil);
            }
            comment.commentChildList = commentChildList;
          });
          commentLikeList.forEach((commentLike) => {
            if (comment.commentId === commentLike.commentId) {
              commentLikes.push(commentLike);
            }
            comment.commentLikes = commentLikes;
          });
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
