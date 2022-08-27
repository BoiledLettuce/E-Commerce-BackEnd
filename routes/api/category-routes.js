const router = require('express').Router();
const { Category, Product } = require('../../models');

const { models } = require('../../models');
const { getIdParam } = require('../helpers');

// The `/api/categories` endpoint

// async function getAll(req, res) {
//   const categories = await models.Category.findAll();
//   res.status(200).json(categories);
// };



router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(dbCatData => {
      if(!dbCatData) {
        res.status(404).json({message: 'No categories found'});
        return;
      }
      res.json(dbCatData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});


router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;


// module.exports = {
//   getAll,
//   // getById,
//   // create,
//   // update,
//   // remove,
// };