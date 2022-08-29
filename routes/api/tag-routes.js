const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
// The `/api/tags` endpoint
//GET
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({ include: [ { model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id'], } ] })
    .then(meow => res.json(meow))
    .catch(err => { if (err) throw err; res.status(500).json(err); }); });
//GET ID
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({ where: { id: req.params.id }, include: [ { model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id'], } ] })
    .then(meow => { if (!meow) { res.status(400).json({ message: 'Does not exist'}); return; } res.json(meow); })
    .catch(err => { if (err) throw err; res.status(500).json(err);});});
//CREATE
router.post('/', (req, res) => {
  // create a new tag
  Tag.create({ tag_name: req.body.tag_name })
    .then(meow => res.json(meow))
    .catch(err => { if (err) throw err; res.status(500).json(err); }); });
//UPDATE
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, { where: { id: req.params.id } })
    .then(meow => { if (!meow[0]) { res.status(400).json({ message: 'Does not exist/ wrong input'}); return; } res.json(meow); })
    .catch(err => { if (err) throw err; res.status(500).json(err); });});
//DELETE
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({ where: { id: req.params.id } })
    .then(meow => { if (!meow) { res.status(400).json({ message: 'Does not exist'}); return; } res.json(meow); })
    .catch(err => { if (err) throw err; res.status(500).json(err); }); });

module.exports = router;
