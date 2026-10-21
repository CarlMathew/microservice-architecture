import * as postService from "../services/post.service.js";

export const createPost = async (req, res) => {
  try {
    const { title } = req.body;

    const post = await postService.createPost({
      title,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create post",
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await postService.getPosts();

    if (posts.length == 0) {
      res.status(404).json({
        message: "No Post found",
      });
    }
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get posts",
    });
  }
};
