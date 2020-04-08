const express = require("express");
const cors = require("cors");
const {uuid, isUuid} = require("uuidv4")

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title,url,techs} = request.body;
  const id = uuid();
  if(!isUuid(id)){
    return response.status(401).json({error: 'The Id is not valid'});
  }
  const repository= {id, title, url, techs,likes:0};
  repositories.push(repository);
  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex(
    repositories => repositories.id === id
  )
  if(repositoryIndex < 0){
    return response.status(401).json({erro:'Repository not found'})
  }
  const {title,url,techs} = request.body;
  const repository = {id,title,url,techs,likes:0};
  repositories[repositoryIndex] = repository;
  return response.json(repository)
});

app.delete("/repositories/:id", (req, res) => {
 
  const {id} = req.params;
  const repositoryIndex = repositories.findIndex(
    repositories => repositories.id === id
  )
  if(repositoryIndex < 0){
    return res.status(401).json({error:'Repository not found'})
  }
    repositories.splice(repositoryIndex,1)
    return res.status(201).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex(
    repositories => repositories.id === id
  )
  if(repositoryIndex < 0){
    return response.status(401).json({error:'Repository not found'})
  }
  
  const repository = repositories[repositoryIndex]
  repository.likes += 1
  return response.json("likes: "+ repository.likes)
});

module.exports = app;
