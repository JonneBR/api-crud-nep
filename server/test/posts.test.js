const crypto = require("crypto");
const axios = require("axios");
const postsService = require("../service/postsService");

const generate = function () {
  return crypto.randomBytes(20).toString("hex");
};

const request = function (url, method, data) {
  return axios({ url, method, data });
};

test("Should get posts", async function () {
  //given - dado que
  const post1 = await postsService.savePost({
    title: generate(),
    content: generate(),
  });
  //when - quando acontecer
  const response = await request("http://localhost:3333/posts", "get");

  const posts = response.data;
  //   then - então
  expect(posts).toEqual(expect.any(Array));

  await postsService.deletePost(post1.id);
});

test("Should save a post", async function () {
  const data = { title: generate(), content: generate() };
  const response = await request("http://localhost:3333/posts", "post", data);
  const post = response.data;

  expect(post.title).toBe(data.title);
  expect(post.content).toBe(data.content);

  await postsService.deletePost(post.id);
});

test("Should update a post", async function () {
  const post = await postsService.savePost({
    title: generate(),
    content: generate(),
  });
  post.title = generate();
  post.content = generate();
  await request(`http://localhost:3333/posts/${post.id}`, "put", post);

  const updatePost = await postsService.getPost(post.id);

  expect(updatePost.title).toBe(post.title);
  expect(updatePost.content).toBe(post.content);

  await postsService.deletePost(post.id);
});

test("Should delete a post", async function () {
  const post = await postsService.savePost({
    title: generate(),
    content: generate(),
  });

  await request(`http://localhost:3333/posts/${post.id}`, "delete");
  const posts = await postsService.getPosts();
  expect(posts).toHaveLength(0);
});
