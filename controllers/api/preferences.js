const router = require('express').Router();
const { Preference } = require('../../models');

router.put('/:id', async (req, res) => {
    try {
        //const allPrefData = await Preference.findAll();

        const prefData = await Preference.update(req.body, {
            where: {id: req.params.id},
            });
  
        if (!prefData[0]) {
            res.status(404).json({message: "No preference with this id!"});
            return;
        }
      
        res.status(200).json(prefData);
    } catch (err) {
        res.status(400).json(err)
    }
  });

module.exports = router;