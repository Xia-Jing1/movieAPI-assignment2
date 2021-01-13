import dotenv from 'dotenv';
import chai from "chai";
import request from "supertest";

let api;
let token = "eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M";
const expect = chai.expect;
dotenv.config();
const sampleMovie = {
  id: 785108,
  title: "Brandobong: Not Hot Enough For TV",
};

describe("latestMovies endpoint", () => {
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

  describe("GET /latestmovies ", () => {
    it("should return 1 latest movie and a status 200", (done) => {
       request(api)
        .get("/api/latest")
        .set("Authorization", "Bearer " + token)
        .set("Accept", "application/json")
        .expect(200)
        .end((req,res) => {
          console.log(res.body);
          expect(res.body.length).to.equal(1);
          done();
        });
    });


//not have anthorization
it("should not return any movies because do not have anthorization", () => {
  request(api)
   .get("/api/latest")
   .set("Accept", "application/json")
   .expect(401)
      .then((res) => {
        expect(res.body).to.be.empty;
      });
});

  });

  describe("GET /latestmovies/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching latest movie", (done) => {
         request(api)
          .get(`/api/latest/${sampleMovie.id}`)
          .set("Accept", "application/json")
          .set("Authorization", "Bearer " + token)
          .expect(200)
          .end((req,res) => {
            console.log(res.body);
            done();
          });
      });
    });
//not have anthorization
    describe("when the id is valid but do not have anthorization", () => {
      it("should not return something", () => {
        request(api)
          .get(`/api/latest/${sampleMovie.id}`)
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
          .get("/api/latest/xxx")
          .set("Accept", "application/json")
          .set("Authorization", "Bearer" + token)
          .expect(500);
          done();
      });
    });
  });
});



describe("POST /latestmovies ", () => {
  it("should return a 201 status and the newly added latest movie", (done) => {
    request(api)
      .post("/api/latest")
      .send(sampleMovie)
      .expect(201)
      .end((res) => {
        console.log(res.body);
        done();
      });
  });

  after(() => {
    request(api)
      .get(`/api/latest/${sampleMovie.id}`)
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .then((res) => {
        expect(res.body).to.have.property("title", sampleMovie.title);
      });
  });



  //not have anthorization
  it("should return a 401 status because do not have anthorization", (done) => {
    request(api)
      .post("/api/latest")
      .send(sampleMovie)
      .expect(201)
      .end((res) => {
        console.log(res.body);
        done();
      });
  });

  after(() => {
    request(api)
      .get(`/api/latest/${sampleMovie.id}`)
      .expect(401)
      .then((res) => {
        expect(res.body).to.be.empty;
      });
  });
}); // end-POST


describe("PUT /latestmovies/:id", () => {
  describe("when a 200 status", () => {
    it("should return with a copy of the updated latest movie", (done) => {
      request(api)
        .put(`/api/latest/${sampleMovie.id}`)
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
    it("should with the message: 'Unable to find latest Movie", (done) => {
      request(api)
        .put("/api/latest/9999")
        .set("Accept", "application/json")
        .set("Authorization", "Bearer " + token)
        .expect(404);
          done();
    });
  });


//not have anthorization
describe("when a 401 status", () => {
  it("should do not have anthorization", () => {
    request(api)
      .put(`/api/latest/${sampleMovie.id}`)
      .send(sampleMovie)
      .expect(401)
        .then((res) => {
          expect(res.body).to.be.empty;
        });
  });
});
});


describe("Delete /latestmovies/:id", () => {
  describe("when the id is valid", () => {
    it("should return a 200 status and confirmation message", (done) => {
      request(api)
        .delete(`/api/latest/${sampleMovie.id}`)
        .set("Accept", "application/json")
        .set("Authorization", "Bearer " + token)
        .expect(200)
        .expect({
          message: `Deleted latest movie id: ${sampleMovie.id}.`,
          status: 200,
        });
        done();
    });
    after(() => {
      request(api)
        .get(`/api/latest/${sampleMovie.id}`)
        .set("Authorization", "Bearer " + token)
        .expect(404)
        .expect({
          message: `Unable to find latest movie with id: ${sampleMovie.id}.`,
          status: 404,
        });
    });
  });


//not have anthorization
describe("when the id is valid but do not have anthorization", () => {
  it("should not return something", () => {
    request(api)
      .delete(`/api/latest/${sampleMovie.id}`)
      .set("Accept", "application/json")
      .expect(401)
      .then((res) => {
        expect(res.body).to.be.empty;
        
      });
  });
});

  describe("when the id is invalid", () => {
    it("should with the message: 'Unable to find latest Movie", () => {
      request(api)
        .delete("/api/latest/9999")
        .set("Accept", "application/json")
        .set("Authorization", "Bearer " + token)
        .expect(404);
      
  });
});
});
