const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");

const api = supertest(app);

const Blog = require("../models/blog");
const initialBlogs = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
    user: "6212890fe821a69dbc8ac95c",
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("blogs are returned as a json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

test("the first blog is about Go to Statements", async () => {
  const response = await api.get("/api/blogs");

  const titles = response.body.map((r) => r.title);
  expect(titles).toContain("Go To Statement Considered Harmful");
});

test("the unique identifier property of the blog is the id", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
});

test("a valid blog can be added", async () => {
  const loginInfo = {
    username: "mluukkai",
    password: "salainen",
  };

  const logIn = await api.post("/api/login").send(loginInfo);

  const newBlog = {
    id: "5a422b891b54a676234d13fa",
    title: "test",
    author: "Robert",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.xml",
    likes: 11,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `bearer ${logIn.body.token}`)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const titles = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(titles).toContain("test");
});

test("likes defaults to 0 likes", async () => {
  const loginInfo = {
    username: "mluukkai",
    password: "salainen",
  };

  const logIn = await api.post("/api/login").send(loginInfo);

  const newBlog = {
    id: "5a422b891b54a676234d13fa",
    user: "6212890fe821a69dbc8ac95c",
    title: "testLikes",
    author: "Robert",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.xml",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `bearer ${logIn.body.token}`)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const blogs = response.body;

  blogs.map((blog) => {
    if (blog.title === "testLikes") {
      expect(blog.likes).toEqual(0);
    }
  });
});

test("blog created without title and url", async () => {
  const newBlog = {
    id: "5a422b891b54a676234d13fa",
    author: "Robert",
  };

  await api.post("/api/blogs").send(newBlog).expect(400).expect("Bad Request");
});

test("succeds with status code 204 if id is valid", async () => {
  const loginInfo = {
    username: "mluukkai",
    password: "salainen",
  };

  const logIn = await api.post("/api/login").send(loginInfo);

  const intialDBBlogs = await helper.BlogsInDb();
  const blogToDelete = intialDBBlogs[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set("Authorization", `bearer ${logIn.body.token}`)
    .expect(204);

  const updatedDBBlogs = await helper.BlogsInDb();

  expect(updatedDBBlogs).toHaveLength(intialDBBlogs.length - 1);
});

test("succeds with status code 200 when updating a post", async () => {
  const newData = {
    title: "Updated Blog",
    author: "me",
    url: "www.url.com",
    likes: 44,
    id: "5a422aa71b54a676234d17f8",
  };

  await api.put(`/api/blogs/${newData.id}`).send(newData).expect(200);
});

afterAll(() => {
  mongoose.connection.close();
});
