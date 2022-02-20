const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const notes = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(notes);
});

blogRouter.post("/", async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).send("Bad Request");
  }

  const user = request.user;
  const blog = new Blog({ ...request.body, user: user._id });

  const result = await blog.save();

  user.blogs = user.blogs.concat(result._id);
  await user.save();

  response.status(201).json(result);
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() === request.user.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      return response.status(401).json({ error: "Permission denied" });
    }
  } catch (exception) {
    next(exception);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const newData = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      newData,
      { new: true }
    );
    response.json(updatedBlog);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogRouter;
