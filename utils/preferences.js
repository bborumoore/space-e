const updatePref = router.put('/:user_id', (req, res, next) => {
        User.update(
          {
            // All the fields you can update and the data attached to the request body.
            name: req.body.name,
            spaceX: req.body.spaceX,
            iss: req.body.iss,
            snapi: req.body.snapi
          },
          {
        
            where: {
              user_id: req.params.user_id,
            },
          }
        )
          .then((updatedUser) => {
            // Sends the updated user as a json response
            res.json(updatedUser);
          })
          .catch((err) => res.json(err));
      next();
  });
  
  module.exports = updatePref;