const models = require('./../models');
const path = require('path');
const multer = require('multer');

// Set up Multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, './../uploads/stock')); // Use absolute path for image uploads
  },
  filename: (req, file, cb) => {
    const img_name = req.body.stock_name + Date.now();
    cb(null, img_name + path.extname(file.originalname)); // File name format: stockName-timestamp.extension
    req.body.stock_image = img_name + path.extname(file.originalname); // Save file name in req.body
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
}).single('stock_image'); // Accept only a single file upload

// Get all stocks
const index = async (req, res) => {
  try {
    const stocks = await models.Stock.findAll();
    return res.status(200).json(stocks);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Create a new stock
const save = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const newStock = await models.Stock.create(req.body);
      return res.status(201).json({
        message: 'Stock created successfully',
        stock: newStock,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });
};

// Get stock by ID
const getById = async (req, res) => {
  try {
    const stock = await models.Stock.findByPk(req.params.id);
    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }
    return res.status(200).json(stock);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Update stock by ID
const update = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const stock = await models.Stock.findByPk(req.params.id);
      if (!stock) {
        return res.status(404).json({ error: 'Stock not found' });
      }

      await stock.update(req.body);
      return res.status(200).json({
        message: 'Stock updated successfully',
        stock,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });
};

// Delete stock by ID
const deleteById = async (req, res) => {
  try {
    const stock = await models.Stock.findByPk(req.params.id);
    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }

    await stock.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { index, save, getById, update, deleteById };
