const { Categories } = require('../models'); // Import the Categories model
const path = require('path');
const multer = require('multer');

// Set up Multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/categories'); // Specify the directory for image uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // File name format: timestamp.extension
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

// Controller functions

// Create a new category
exports.createCategory = (req, res) => {
    
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    
    
  });
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll();
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while retrieving categories' });
  }
};

// Get a category by ID
exports.getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Categories.findByPk(id);
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    return res.status(200).json({ category });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while retrieving the category' });
  }
};

// Update a category
exports.updateCategory = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { id } = req.params;
    const { category_name, status } = req.body;

    try {
      const category = await Categories.findByPk(id);

      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      // Update the category details
      category.category_name = category_name || category.category_name;
      category.status = status || category.status;

      if (req.file) {
        category.category_image = req.file.path; // Update the image path if a new image was uploaded
      }

      await category.save();

      return res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while updating the category' });
    }
  });
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Categories.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await category.destroy();

    return res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while deleting the category' });
  }
};
