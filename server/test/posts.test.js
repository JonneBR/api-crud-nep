const crypto = require("crypto");
const axios = require("axios");
const postsService = require("../service/postsService");

const generate = function () {
  return crypto.randomBytes(20).toString("hex");
};

test("Should get posts", async function () {
  //given - dado que
  const post1 = await postsService.savePost({
    title: generate(),
    content: generate(),
  });
  //when - quando acontecer
  const response = await axios({
    url: "http://localhost:3333/posts",
    method: "get",
  });
  const posts = response.data;
  //   then - então
  expect(posts).toEqual(expect.any(Array));
});
