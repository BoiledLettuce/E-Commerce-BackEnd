const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');
// The `/api/products` endpoint
// GET
router.get('/', (req, res) => {
  Product.findAll({
    include: [ { model: Category, attributes: ['id', 'category_name'] }, { model: Tag, attributes: ['id', 'tag_name'] } ] })
    .then(meow => res.json(meow))
    .catch(err => { if (err) throw err; res.status(500).json(err); });});
// GET ID
router.get('/:id', (req, res) => {
  Product.findOne({ where: { id: req.params.id }, attributes: ['id', 'product_name', 'price', 'stock'], include: [
      { model: Category, attributes: ['category_name'] },
      { model: Tag, attributes: ['tag_name'] } ] })
    .then(meow => { if (!meow) { res.status(400).json({ message: 'Does not exist' }); return; }
      res.json(meow); })
    .catch(err => {  if (err) throw err; res.status(500).json(err); });});
// UPDATE
router.put('/:id', (req, res) => {
  Product.update(req.body, { where: { id: req.params.id, },})
    .then((product) => { return ProductTag.findAll({ where: { product_id: req.params.id } }); })
    .then((productTags) => { const pTagIds = productTags.map(({ tag_id }) => tag_id);
      const meowTags = req.body.tagIds
        .filter((tag_id) => !pTagIds.includes(tag_id))
        .map((tag_id) => { return { product_id: req.params.id, tag_id, }; });
      const delProductTags = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);
      return Promise.all([  ProductTag.destroy({ where: { id: delProductTags } }), ProductTag.bulkCreate(meowTags), ]);
    })
    .then((meow2) => res.json(meow2))
    .catch((err) => { res.status(200).json(err); }); });
//DELETE
router.delete('/:id', (req, res) => {
  Product.destroy({
    where: { id: req.params.id } })
    .then(dbMeow => { if (!dbMeow) { res.status(400).json({ message: 'Does not exist'}); return; } res.json(dbMeow); })
      .catch(err => { if (err) throw err; res.status(500).json(err); }) });
// CREATE
router.post('/', (req, res) => {
  Product.create({ product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
    tagIds: req.body.tag_id
  })
    .then((product) => { if (req.body.tagIds) { const meowArray = req.body.tagIds.map((tag_id) => { return {  product_id: product.id, tag_id, }; });
        return ProductTag.bulkCreate(meowArray); }
      res.status(200).json(product);
    })
    .then((meowTags2) => res.status(200).json(meowTags2))
    .catch((err) => { if (err) throw err; res.status(400).json(err); }); });

module.exports = router;

//(req.body.tagIds.length)