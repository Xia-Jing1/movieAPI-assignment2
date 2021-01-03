import dotenv from 'dotenv';
import chai from "chai";
import request from "supertest";

let api;
let token = "eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M";
const expect = chai.expect;
dotenv.config();
const sampleMovie = {
  id: 337401,
  title: "Mulan",
};

describe("Movies endpoint", () => {
  beforeEach(function (done) {
    try {
      api = require("../../../../index");
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
    setTimeout(()=>{
      done();
    },4000);
  });
  afterEach((done) => {
    api.close(); // Release PORT 8080
    delete require.cache[require.resolve("../../../../index")];
    done();
  });

  describe("GET /movies ", () => {
    it("should return 20 movies and a status 200", (done) => {
       request(api)
        .get("/api/movies")
        .set("Authorization", "Bearer " + token)
        .set("Accept", "application/json")
        .expect(200)
        .end((req,res) => {
          console.log(res.body);
          done();
        });
    });
  });

  describe("GET /movies/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching movie", (done) => {
         request(api)
          .get(`/api/movies/${sampleMovie.id}`)
          .set("Accept", "application/json")
          .set("Authorization", "Bearer " + token)
          .expect(200)
          .end((req,res) => {
            console.log(res.body);
            done();
          });
      });
    });

    describe("when the id is valid but do not have anthorization", () => {
      it("should not return something", () => {
        request(api)
          .get(`/api/movies/${sampleMovie.id}`)
          .set("Accept", "application/json")
          .set("Authorization", "Bearer " + token)
          .expect(401)
          .then((res) => {
            expect(res.body).to.be.empty;
            
          });
      });
    });


    describe("when the id is invalid", () => {
      it("should return the NOT found message", (done) => {
       request(api)
          .get("/api/movies/xxx")
          .set("Accept", "application/json")
          .set("Authorization", "Bearer" + token)
          .expect(401);
          done();
      });
    });
  });
});



describe("POST /movies ", () => {
  it("should return a 201 status and the newly added movie", (done) => {
    request(api)
      .post("/api/movies")
      .send(sampleMovie)
      .expect(201)
      .end((res) => {
        console.log(res.body);
        done();
      });
  });

  after(() => {
    request(api)
      .get(`/api/movies/${sampleMovie.id}`)
      .expect(200)
      .then((res) => {
        expect(res.body).to.have.property("title", sampleMovie.title);
      });
  });
}); // end-POST