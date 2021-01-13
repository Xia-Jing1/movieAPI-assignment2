import dotenv from 'dotenv';
import chai from "chai";
import request from "supertest";

let api;
let token = "eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M";
const expect = chai.expect;
dotenv.config();
const sampleMovie = {
  id: 464052,
  title: "Wonder Woman 1984",
};

describe("upcomingMovies endpoint", () => {
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

  describe("GET /upcomingmovies ", () => {
    it("should return 20 upcoming movies and a status 200", (done) => {
       request(api)
        .get("/api/upcoming")
        .set("Authorization", "Bearer " + token)
        .set("Accept", "application/json")
        .expect(200)
        .end((req,res) => {
          console.log(res.body);
          expect(res.body.length).to.equal(20);
          done();
        });
    });
  });

  describe("GET /upcomingmovies/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching upcoming movie", (done) => {
         request(api)
          .get(`/api/upcoming/${sampleMovie.id}`)
          .set("Accept", "application/json")
          .set("Authorization", "Bearer " + token)
          .expect(200)
          .end((req,res) => {
            console.log(res.body);
            expect(res.body).to.have.property("title", sampleMovie.title);
            done();
          });
      });
    });
//not have anthorization
    describe("when the id is valid but do not have anthorization", () => {
      it("should not return something", () => {
        request(api)
          .get(`/api/upcoming/${sampleMovie.id}`)
          .set("Accept", "application/json")
          .expect(401)
          .then((res) => {
            expect(res.body).to.be.empty;
            
          });
      });
    });


    describe("when the id is invalid", () => {
      it("should return the NOT found message", (done) => {
       request(api)
          .get("/api/upcoming/xxx")
          .set("Accept", "application/json")
          .set("Authorization", "Bearer" + token)
          .expect(500);
          done();
      });
    });
  });
});



describe("POST /upcomingmovies ", () => {
  it("should return a 201 status and the newly added upcoming movie", (done) => {
    request(api)
      .post("/api/upcoming")
      .send(sampleMovie)
      .expect(201)
      .end((res) => {
        console.log(res.body);
        done();
      });
  });

  after(() => {
    request(api)
      .get(`/api/upcoming/${sampleMovie.id}`)
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .then((res) => {
        expect(res.body).to.have.property("title", sampleMovie.title);
      });
  });
}); // end-POST


describe("PUT /upcomingmovies/:id", () => {
  describe("when a 200 status", () => {
    it("should return with a copy of the updated upcoming movie", (done) => {
      request(api)
        .put(`/api/upcoming/${sampleMovie.id}`)
        .set("Authorization", "Bearer " + token)
        .send(sampleMovie)
        .expect(200)
        .end((res) => {
          console.log(res.body);
          done();
        });
    });
  });
  describe("when a 404 status", () => {
    it("should with the message: 'Unable to find upcoming Movie", (done) => {
      request(api)
        .put("/api/upcoming/9999")
        .set("Accept", "application/json")
        .set("Authorization", "Bearer " + token)
        .expect(404);
          done();
    });
  });
});


describe("Delete /upcomingmovies/:id", () => {
  describe("when the id is valid", () => {
    it("should return a 200 status and confirmation message", (done) => {
      request(api)
        .delete(`/api/upcoming/${sampleMovie.id}`)
        .set("Accept", "application/json")
        .set("Authorization", "Bearer " + token)
        .expect(200)
        .expect({
          message: `Deleted upcoming movie id: ${sampleMovie.id}.`,
          status: 200,
        });
        done();
    });
    after(() => {
      request(api)
        .get(`/api/upcomingmovies/${sampleMovie.id}`)
        .set("Authorization", "Bearer " + token)
        .expect(404)
        .expect({
          message: `Unable to find upcoming movie with id: ${sampleMovie.id}.`,
          status: 404,
        });
    });
  });
  describe("when the id is invalid", () => {
    it("should with the message: 'Unable to find upcoming Movie", () => {
      request(api)
        .delete("/api/upcoming/9999")
        .set("Accept", "application/json")
        .set("Authorization", "Bearer " + token)
        .expect(404);
      
  });
});
});
