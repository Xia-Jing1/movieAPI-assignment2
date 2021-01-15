import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import User from "../../../../api/users/userModel";

const expect = chai.expect;

let db;
let api;
let token = "eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M";

const users = [
  {
    username: "user1",
    password: "test1",
  },
];


describe("favourite movie of user endpoint", () => {
  before(() => {
    mongoose.connect(process.env.mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
  });

  after(async () => {
    try {
      await db.dropDatabase();
    } catch (error) {
      console.log(error);
    }
  });
  beforeEach(async () => {
    try {
      api = require("../../../../index");

      await User.deleteMany({});
      await User.collection.insertMany(users);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close();
    delete require.cache[require.resolve("../../../../index")];
  });

  //favourite list
  describe("favourite movie ", () => {
    it("should return the favourite list of user1 and a status 200", (done) => {
      request(api)
      .get(`/api/users/${users.username}/favourites`)
        .set("Accept", "application/json")
        .set("Authorization", "Bearer" + token)
        // .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          console.log(res.body);
          done();
        });
    });
  });



//add favourite
  describe("POST /favourite", () => {
//add favourite with invaild id
    it("should return a 401 status with invalid movie id", (done) => {
      request(api)
        .post(`/api/users/${users.username}/favourites`)
        .set("Accept", "application/json")
        .set("Authorization", "Bearer" + token)
        .send({
          id: "12345678",
        })
        .expect(401)
        .end((err, res) => {
          console.log(res.body);
          done();
        });
    });


//add favourite with vaild id

    it("should return a 200 status with valid movie id", (done) => {
       request(api)
       .post(`/api/users/${users.username}/favourites`)
        .send({
          id: "590706",
        })
        .expect(200)
        .expect({ success: true, token: "FakeTokenForNow" });
        done();
    });
    after(() => {
       request(api)
        .get(`/api/users/${users.username}/favourites`)
        .set("Accept", "application/json")
        .set("Authorization", "Bearer" + token)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(1);
        });
    });
  });
});
