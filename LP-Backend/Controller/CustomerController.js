const models = require('../models');
const path = require('path');
const multer = require('multer');

// Set up Multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, './../uploads/customers')); // Use absolute path for image uploads
  },
  filename: (req, file, cb) => {
    const img_name = req.body.customer_name + Date.now(); // Use customer name and timestamp
    cb(null, img_name + path.extname(file.originalname)); // Save file name with extension
    req.body.customer_image = img_name + path.extname(file.originalname); // Store image name in req.body
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images are allowed'));
  }
}).single('customer_image'); // Single file upload for customer image

// Get all customers
const index = async (req, res) => {
  try {
    const customers = await models.Customer.findAll();
    return res.status(200).json(customers);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Create a new customer with image upload
const save = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const newCustomer = await models.Customer.create(req.body);
      return res.status(201).json({
        message: 'Customer created successfully',
        customer: newCustomer,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });
};

// Get customer by ID
const getById = async (req, res) => {
  try {
    const customer = await models.Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    return res.status(200).json(customer);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Update customer by ID with image upload
const update = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const customer = await models.Customer.findByPk(req.params.id);
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }

      await customer.update(req.body);
      return res.status(200).json({
        message: 'Customer updated successfully',
        customer,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });
};

// Delete customer by ID
const deleteById = async (req, res) => {
  try {
    const customer = await models.Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    await customer.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { index, save, getById, update, deleteById };
