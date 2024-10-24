const models = require('./../models');




// Get all categories
const index = async (req, res) => {



  try {
    const categories = await models.processing_device.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Create a new Processing_deviceController
const save = async (req, res) => {
  try {
    const newProcessing_device = await models.processing_device.create(req.body);
    return res.status(201).json({
      message: 'Processing_deviceController created successfully',
      Processing_deviceController: newProcessing_device,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Get Processing_deviceController by ID
const getById = async (req, res) => {
  try {
    const Processing_device = await models.processing_device.findByPk(req.params.id);
    if (!Processing_device) {
      return res.status(404).json({ error: 'Processing_deviceController not found' });
    }
    return res.status(200).json(Processing_device);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Update Processing_deviceController by ID
const update = async (req, res) => {
  try {
    const Processing_device = await models.processing_device.findByPk(req.params.id);
    if (!Processing_device) {
      return res.status(404).json({ error: 'Processing_deviceController not found' });
    }

    await Processing_device.update(req.body);
    return res.status(200).json({
      message: 'Processing_deviceController updated successfully',
      Processing_deviceController,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Delete Processing_deviceController by ID
const deleteById = async (req, res) => {
  try {
    const Processing_device = await models.processing_device.findByPk(req.params.id);
    if (!Processing_device) {
      return res.status(404).json({ error: 'Processing_deviceController not found' });
    }

    await Processing_device.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {index,save,getById,update,deleteById,};



