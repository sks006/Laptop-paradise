const models = require('./../models');

// Get all categories
const index = async (req, res) => {
  
  try {
    const categories = await models.product.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Create a new ProductController
const save = async (req, res) => {
  try {
    const newProductController = await models.product.create(req.body);
    return res.status(201).json({
      message: 'ProductController created successfully',
      ProductController: newProductController,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Get ProductController by ID
const getById = async (req, res) => {
  try {
    const ProductController = await models.product.findByPk(req.params.id);
    if (!ProductController) {
      return res.status(404).json({ error: 'ProductController not found' });
    }
    return res.status(200).json(ProductController);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Update ProductController by ID
const update = async (req, res) => {
  try {
    const ProductController = await models.product.findByPk(req.params.id);
    if (!ProductController) {
      return res.status(404).json({ error: 'ProductController not found' });
    }

    await ProductController.update(req.body);
    return res.status(200).json({
      message: 'ProductController updated successfully',
      ProductController,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Delete ProductController by ID
const deleteById = async (req, res) => {
  try {
    const ProductController = await models.product.findByPk(req.params.id);
    if (!ProductController) {
      return res.status(404).json({ error: 'ProductController not found' });
    }

    await ProductController.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {index,save,getById,update,deleteById,};
