const lodash = require("lodash");

const dummy = (blogs) => {
  console.log(blogs);
  return 1;
};

const totalLikes = (blogs) => {
  let likes = 0;

  blogs.forEach((blog) => {
    likes += blog.likes;
  });
  return likes;
};

const favoriteBlog = (blogs) => {
  const max = blogs.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current
  );

  delete max.__v;
  delete max._id;
  delete max.url;
  return max;
};

const topWrtiter = (blogs) => {
  let result = null;
  const authors = lodash.countBy(blogs, "author");

  const max = Math.max.apply(
    null,
    Object.keys(authors).map((key) => authors[key])
  );

  Object.keys(authors).map((key) => {
    if (authors[key] === max) {
      result = {
        author: key,
        blogs: max,
      };
    }
  });

  return result;
};

const mostLiked = (blogs) => {
  const groups = lodash.groupBy(blogs, "author");
  let author = "";
  let max = 0;
  Object.keys(groups).map((key) => {
    let reduceLikes = groups[key].map((o) => o.likes).reduce((a, b) => a + b);
    if (reduceLikes > max) {
      author = key;
      max = reduceLikes;
    }
  });

  return { author, likes: max };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  topWrtiter,
  mostLiked,
};
