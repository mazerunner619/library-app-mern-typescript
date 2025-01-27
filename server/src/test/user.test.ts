import mongoose from "mongoose";
import app, { connectDataBase } from "../app";
import request, { Request } from "supertest";
import { clearAll } from "../controllers/UserController";
import { assert, expect } from "chai";
import UserDao from "../daos/UserDao";

describe("Testing Book Routes", function () {
  this.timeout(10000);

  let testUser = {
    type: "PATRON",
    email: "testuser@gmail.com",
    firstName: "Test",
    lastName: "User",
    password: "testuser@password",
  };

  let testuserId: string = "";

  before(async () => {
    await connectDataBase();
    const testuserfound = await UserDao.findOne(
      { email: testUser.email },
      { _id: 1 }
    );
    if (testuserfound) await UserDao.deleteOne({ email: testUser.email });
  });

  it("should register a user", async () => {
    const res = await request(app).post("/api/auth/register").send(testUser);
    const { user } = res.body;
    assert.isNotNull(user);
    assert.property(user, "_id");
    testuserId = user._id;
    assert.equal(
      user.firstName + user.lastName,
      testUser.firstName + testUser.lastName
    );
  });

  it("should login a user if correct credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: testUser.password });
    const { user } = res.body;
    assert.equal(res.status, 200);
    assert.isNotNull(user);
    assert.property(user, "_id");
    assert.equal(
      user.firstName + user.lastName,
      testUser.firstName + testUser.lastName
    );
  });

  it("should not login if username/password is incorrect", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: "atifansr" });
    assert.equal(res.status, 401);
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property(
      "message",
      "Username of password incorrect!"
    );
  });

  after(async () => {
    await UserDao.deleteOne({ email: testUser.email });
    await mongoose.disconnect();
  });
});
