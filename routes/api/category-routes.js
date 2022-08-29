const router = require('express').Router();
const { Category, Product } = require('../../models');
//ENDPOINT /api/categories
//GET
router.get('/', (req, res) => {
  Category.findAll( { include: [ { model: Product, attributes: [ 'id', 'product_name', 'price', 'stock', 'category_id' ] } ] })
    .then(meow => res.json(meow))
    .catch(err => { if (err) throw err; res.status(500).json(err); }); });
//GET ID
router.get('/:id', (req, res) => {
  Category.findOne({ where: { id: req.params.id }, include: [ { model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] } ] })
    .then(meow => {
      if (!meow) { res.status(400).json({ message : 'Does not exist' });
        return;
      }
      res.json(meow); }) .catch(err => { if (err) throw err; res.status(500).json(err); }); });
//UPDATE
router.put('/:id', (req, res) => {
  Category.update(req.body, { where: { id: req.params.id } })
    .then(meow => { if (!meow[0]) { res.status(400).json({ message: 'Does not exist/ No input'});
        return;  }
      res.json(meow); })
    .catch(err => { if (err) throw err; res.status(500).json(err);  }); });
//DELETE
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: { id: req.params.id }
  })
    .then(meow => { if (!meow) { res.status(400).json({ message: 'Does not exist'});
        return; } res.json(meow); })
      .catch(err => { if (err) throw err; res.status(500).json(err); }); });
//CREATE
router.post('/', (req, res) => {
  Category.create({ category_name: req.body.category_name })
    .then(meow => res.json(meow))
    .catch(err => { if (err) throw err; res.status(500).json(err); }) });

module.exports = router;

