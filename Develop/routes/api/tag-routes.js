const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
// The `/api/tags` endpoint


  // find all tags - be sure to include its associated Product data
router.get('/', async (req, res) => {
try {
  const tagData = await Tag.findAll({ include: [{model: Product, as: 'tag_products'}] });
  res.status(200).json(tagData);
} catch (err) {
  res.status(500).json(err);
}
});

  // find a single tag by its `id` - be sure to include its associated Product data
router.get('/:id', async (req, res) => {
 try {
  const tagData = await Tag.findByPk(req.params.id, {
    include: [{ model: Product, as: 'tag_products'}]
  });
  if (!tagData) {
    res.status(404).json({ message: 'No tag found with this id!'});
    return;
  }
  res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // create a new tag
router.post('/', async (req, res) => {
try {
  const tagData = await Tag.create(req.body);
  res.status(200).json(tagData);
} catch (err) {
  res.status(400).json(err);
}
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
try {
  const { tag_name } = req.body; // extracting tag_name from req.body, since sequelize expects string value for 'update' operation
  const tagData = await Tag.update({ tag_name: tag_name } , {
    where: {
      id: req.params.id,
    },
  });
  // tagData[0] is the number of updated rows. If it's 0, no tag was found with the given id
 if (tagData[0] === 0) {
  res.status(404).json({ message: 'No tag found with this id!'});
  return;
 }
 res.status(200).json(tagData);
} catch (err) {
  res.status(500).json(err);
}
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {

});


module.exports = router;