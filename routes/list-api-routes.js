const db = require("../models");

module.exports = app => {
  // Loads User's Full List
  app.get("/api/user_data/:user", (req, res) => {
     db.List.findAll({where: { UserId: req.params.user}})
    .then(dbList => {
      res.json(dbList)
    } )
  })

  // Loads User's List by Specified Status
  app.get("/api/user_data/:user/:status", (req, res) => {
    db.List.findAll({where: {
      UserId: req.params.user,
      status: req.params.status
    }}).then(dbList => {
      res.json(dbList)
    })
  })

  // Updates the Status of the selected game
  app.put("/api/game/:id", (req, res) => {
    db.List.update({status: req.body.status}, 
      {where: { id: req.params.id}}).then(dbList => {
        res.json(dbList)
        res.send(200)
      })
  })

  // Updates the Type of the selected game
  app.put("/api/game/:id", (req, res) => {
    db.List.update(req.body.type, 
      {where: { id: req.params.id}}).then(dbList => {
        res.json(dbList)
      })
  })

  // Updates the Rating of the selected game 
  app.put("/api/game/:id", (req, res) => {
    db.List.update(req.body.rating, 
      {where: {id : req.params.id}}).then(dbList => {
        res.json(dbList)
      })
  })

  // Updates the Hours Played of the selected game
  app.put("/api/game/:id", (req, res) => {
    db.List.update(req.body.hoursPlayed, 
      {where: {id: req.params.id
    }}).then(dbList => {
      res.json(dbList)
    })
  })

  // Posts game to List table and loads User's List
  app.post("/api/user_data/list/:user/:title/:status/:rating", (req, res) => {
    db.List.create({
      title: req.params.title,
      status: req.params.status,
      UserId: req.params.user,
      rating: req.params.type
    })
      .then(() => {
        res.send(200)
        alert(`${req.body.title} has been added to your list.`)
      })
    
  });

  // Deletes game from List table and load's User's List
  app.delete("/api/user_data/list/:id", (req, res) => {
    db.List.destroy({
        where: {
          id: req.params.id,
        },
      },
      console.log("deleting game...")
    )
      .then(() => {
        res.send(200)
        console.log("user data updated!");
      })
      
  });
};
