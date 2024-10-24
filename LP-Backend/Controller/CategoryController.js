const models = require('./../models');
const path = require('path');
const multer = require('multer');


// Set up Multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/categories'); // Specify the directory for image uploads
  },
  filename: (req, file, cb) => {
    const img_name = req.body.category_name + Date.now();
    cb(null, img_name + path.extname(file.originalname)); // File name format: timestamp.extension
    req.body.category_image=img_name;
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    // Only allow image file types (jpeg, jpg, png, gif)
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images are allowed'));
  }
}).single('category_image'); // Accept only a single file upload



// Get all categories
const index = async (req, res) => {



  try {
    const categories = await models.Categories.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};



// Create a new category
const save = async (req, res) => {

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const newCategory = await models.Categories.create(req.body);
      return res.status(201).json({
        message: 'Category created successfully',
        category: newCategory,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }



  })

};

// Get category by ID
const getById = async (req, res) => {
  try {
    const category = await models.Categories.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    return res.status(200).json(category);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Update category by ID
const update = async (req, res) => {
  try {
    const category = await models.Categories.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await category.update(req.body);
    return res.status(200).json({
      message: 'Category updated successfully',
      category,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Delete category by ID
const deleteById = async (req, res) => {
  try {
    const category = await models.Categories.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await category.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { index, save, getById, update, deleteById, };
