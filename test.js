var db_mysql = require('./index.js').db_mysql;
var db_neo4j = require('./index.js').db_neo4j;
var chai = require("chai");
var expect = chai.expect;
var superagent = require("superagent");
var should = require("should");

/* ================= mysql =================*/
describe('MySql Database', function () {
  it('should create the things table', function () {
    db_mysql.schema.hasTable('things').then(function (exists) {
      expect(exists).to.equal(true);
    });
  });
  it('should save a new name', function () {
    db_mysql('things')
      .insert({ name: 'Johnson' })
      .exec(function (err) {
        expect(err).to.equal(null);
      });
  });
  it('should retrieve that name', function () {
    db_mysql('things')
      .where({ name: 'Johnson' })
      .select('name')
      .then(function (name) {
        expect(name[0].name).to.equal('Johnson');
      });
  });
});


/* ================= mongo =================*/
describe("Index", function () {
  it("renders HTML", function (done) {
    superagent.get("http://localhost:3000/")
      .end(function (e, res) {
        (e === null).should.equal(true);
        res.text.should.equal("Hey buddy!");
        done();
      });
  });
});

describe("Persistence", function () {
  it("should create a thing", function (done) {
    superagent.get("http://localhost:3000/doobie")
      .end(function (e, res) {
        (e === null).should.equal(true);
        var response = res.body;
        expect(response.created).to.equal(true);
        done();
      });
  });
  it("should retrieve a thing", function (done) {
    superagent.get("http://localhost:3000/doobie")
      .end(function (e, res) {
        (e === null).should.equal(true);
        var response = res.body;
        expect(response.created).to.equal(false);
        response = response.returnObj;
        response.should.have.property("name", "doobie");
        done();
      });
  });
});

/* ================= neo4j =================*/
describe('Neo4j database', function () {
  it('should save a node', function () {
    var node = db_neo4j.createNode({ name: 'test' });
    node.save(function (err, node) {
      expect(err).to.equal(null);
      expect(node).to.have.property('id');
    });
  });
  it('should retrieve a node', function () {
    db_neo4j.getIndexedNodes('node_auto_index', 'name', 'test', function (nodes) {
      expect(nodes).to.be.an('array');
      expect(nodes.length).to.equal(1);
      expect(nodes[0].name).to.equal('test');
    });
  });
});

