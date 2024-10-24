const models = require('./../models');

// Get all ordinary devices
const index = async (req, res) => {
  try {
    const devices = await models.ordinary_device.findAll();
    return res.status(200).json(devices);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Create a new ordinary device
const save = async (req, res) => {
  try {
    const newDevice = await models.ordinary_device.create(req.body);
    return res.status(201).json({
      message: 'Ordinary device created successfully',
      device: newDevice,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Get ordinary device by ID
const getById = async (req, res) => {
  try {
    const device = await models.ordinary_device.findByPk(req.params.id);
    if (!device) {
      return res.status(404).json({ error: 'Ordinary device not found' });
    }
    return res.status(200).json(device);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Update ordinary device by ID
const update = async (req, res) => {
  try {
    const device = await models.ordinary_device.findByPk(req.params.id);
    if (!device) {
      return res.status(404).json({ error: 'Ordinary device not found' });
    }

    await device.update(req.body);
    return res.status(200).json({
      message: 'Ordinary device updated successfully',
      device,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Delete ordinary device by ID
const deleteById = async (req, res) => {
  try {
    const device = await models.ordinary_device.findByPk(req.params.id);
    if (!device) {
      return res.status(404).json({ error: 'Ordinary device not found' });
    }

    await device.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {index,save,getById,update,deleteById,};
