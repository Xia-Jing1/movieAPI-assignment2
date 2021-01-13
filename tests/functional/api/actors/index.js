import dotenv from 'dotenv';
import chai from "chai";
import request from "supertest";

let api;
let token = "eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M";
const expect = chai.expect;
dotenv.config();
const samplePeople = {
  id: 2932658,
  name: "Laasa Howard",
};

describe("actors endpoint", () => {
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

  describe("GET /actors ", () => {
    it("should return 1 latest actor and a status 200", (done) => {
       request(api)
        .get("/api/actors")
        .set("Authorization", "Bearer " + token)
        .set("Accept", "application/json")
        .expect(200)
        .end((req,res) => {
          console.log(res.body);
          expect(res.body.length).to.equal(1);
          done();
        });
    });
  });

  describe("GET /actors/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching latest actor", (done) => {
         request(api)
          .get(`/api/actors/${samplePeople.id}`)
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
          .get(`/api/actors/${samplePeople.id}`)
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
          .get("/api/actors/xxx")
          .set("Accept", "application/json")
          .set("Authorization", "Bearer" + token)
          .expect(500)
          .expect({
            success: false,
            status_code: 34,
            status_message: "The resource you requested could not be found.",
          });

          done();
      });
    });
  });
});



describe("POST /actors ", () => {
  it("should return a 201 status and the newly added latest actor", (done) => {
    request(api)
      .post("/api/actors")
      .send(samplePeople)
      .expect(201)
      .end((res) => {
        console.log(res.body);
        done();
      });
  });

  after(() => {
    request(api)
      .get(`/api/actors/${samplePeople.id}`)
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .then((res) => {
        expect(res.body).to.have.property("name", samplePeople.name);
      });
  });
}); // end-POST


describe("PUT /actors/:id", () => {
  describe("when a 200 status", () => {
    it("should return with a copy of the updated latest actor", (done) => {
      request(api)
        .put(`/api/actors/${samplePeople.id}`)
        .set("Authorization", "Bearer " + token)
        .send(samplePeople)
        .expect(200)
        .end((res) => {
          console.log(res.body);
          done();
        });
    });
  });
  describe("when a 404 status", () => {
    it("should with the message: 'Unable to find latest actor", (done) => {
      request(api)
        .put("/api/actors/9999")
        .set("Accept", "application/json")
        .set("Authorization", "Bearer " + token)
        .expect(404);
          done();
    });
  });
});


describe("Delete /actors/:id", () => {
  describe("when the id is valid", () => {
    it("should return a 200 status and confirmation message", (done) => {
      request(api)
        .delete(`/api/actors/${samplePeople.id}`)
        .set("Accept", "application/json")
        .set("Authorization", "Bearer " + token)
        .expect(200)
        .expect({
          message: `Deleted latest actor id: ${samplePeople.id}.`,
          status: 200,
        });
        done();
    });
    after(() => {
      request(api)
        .get(`/api/actors/${samplePeople.id}`)
        .set("Authorization", "Bearer " + token)
        .expect(404)
        .expect({
          message: `Unable to find latest actor with id: ${samplePeople.id}.`,
          status: 404,
        });
    });
  });
  describe("when the id is invalid", () => {
    it("should with the message: 'Unable to find latest People", () => {
      request(api)
        .delete("/api/actors/9999")
        .set("Accept", "application/json")
        .set("Authorization", "Bearer " + token)
        .expect(404);
      
  });
});
});
