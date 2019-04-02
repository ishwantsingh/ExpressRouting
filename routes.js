const express = require("express");
const routes = express.Router();
const db = require("./data/db");

routes.use(express.json());

// routes.get("/", (req, res) => {
//   res.json("Hello to the other side");
// });

routes.get("/", (req, res) => {
  db.find()
    .then(data => {
      if (data) {
        res.json(data);
      } else {
        res
          .status(500)
          .json({ errorMessage: `looks like there was an error ${data}` });
      }
    })
    .catch(error => {
      res.status(500).json("argrhrgrhr", error);
    });
});
routes.get("/:id", (req, res) => {
  db.findById(req.params.id)
    .then(data => {
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res
          .status(404)
          .json({ error: `The post with the specified ID does not exist.` });
      }
      console.log(data);
      // res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({
        error: `The post information could not be retrieved, ${error}`
      });
    });
});

routes.post("/", (req, res) => {
  db.insert({ title: req.body.title, contents: req.body.contents })
    .then(data => {
      res.json({ message: ` Post of id ${data.id} was added to the server` });
    })
    .catch(error => {
      res.json("argrhrgrhr", error);
    });
});

routes.put("/:id", (req, res) => {
  const { id } = req.params;
  if (req.body.title && req.body.contents) {
    db.update(id, { title: req.body.title, contents: req.body.contents })
      .then(data => {
        if (data == 1) {
          res.json({
            successMessage: ` Post of id ${id} was updated on the server`
          });
        } else {
          res.status(404).json({
            errorMessage: ` Post of id ${id} does not exist on the server.`
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          error: ` Post of id ${id} couldn't be updated on the server, ${error}`
        });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: `Please provide title and contents for the post` });
  }
});

routes.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(data => {
      if (data == 1) {
        res.json({
          successMessage: ` Post of id ${id} was deleted from the server`
        });
      } else {
        res.status(404).json({
          errorMessage: ` Post of id ${id} does not exist on the server.`
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: ` Post of id ${id} couldn't be deleted from the server, ${error}`
      });
    });
});

module.exports = routes;
