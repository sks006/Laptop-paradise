const models = require('../models');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/brands'); // Specify the directory for image uploads
  },
  filename: (req, file, cb) => {
    const img_name = req.body.brand_name + Date.now();
    cb(null, img_name + path.extname(file.originalname)); // File name format: timestamp.extension
    req.body.brand_image = img_name + path.extname(file.originalname);
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
}).single('brand_image'); // Accept only a single file upload

// Get all brands
const index = async (req, res) => {
  try {
    const brands = await models.Brand.findAll();
    res.status(200).json(brands);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a specific brand by ID
const getById = async (req, res) => {
  try {
    const brand = await models.Brand.findByPk(req.params.id);
    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }
    res.status(200).json(brand);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new brand
const save = async (req, res) => {

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const { brand_name, brand_image, status } = req.body;
      console.log(req.body);

      const newBrand = await models.Brand.create({
        brand_name,
        brand_image,
        status
      });
      res.status(201).json({
        message: 'Brand created successfully',
        brand: newBrand
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

// Update an existing brand
const update = async (req, res) => {
  console.log(req.params.id);
 


  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }



    try {
      const brand = await models.Brand.findByPk(req.params.id);
      if (!brand) {
        return res.status(404).json({ error: 'Brand not found' });
      }

      await brand.update(req.body);

      const updatedBrand = await models.Brand.findByPk(req.params.id);
      res.status(200).json({
        message: 'Brand updated successfully',
        brand: updatedBrand
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

  })


};

// Delete a brand by ID
const deleteById = async (req, res) => {
  try {
    const brand = await models.Brand.findByPk(req.params.id);
    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }
    await brand.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Export all functions
module.exports = { index, save, deleteById, update, getById };
