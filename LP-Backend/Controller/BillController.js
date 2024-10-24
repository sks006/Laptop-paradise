'use strict';
const { bill } = require('../models');


// Get all bills
const index = async (req, res) => {
  try {
    const bills = await bill.findAll();
    res.status(200).json(bills);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a specific bill by ID
const getById = async (req, res) => {
  try {
    const foundBill = await bill.findByPk(req.params.id);
    if (!foundBill) {
      return res.status(404).json({ error: 'Bill not found' });
    }
    res.status(200).json(foundBill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new bill
const save = async (req, res) => {
  try {
    const { customer_id, cart_id, total_amount, payment_status, delivery_address, delivery_charge, status } = req.body;
    const newBill = await bill.create({
      customer_id,
      cart_id,
      total_amount,
      payment_status,
      delivery_address,
      delivery_charge,
      status
    });
    res.status(201).json({
      message: 'Bill created successfully',
      bill: newBill
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing bill
const update = async (req, res) => {
  try {
    const foundBill = await bill.findByPk(req.params.id);
    if (!foundBill) {
      return res.status(404).json({ error: 'Bill not found' });
    }
    await bill.update(req.body, {
      where: { id: req.params.id }
    });
    const updatedBill = await bill.findByPk(req.params.id);
    res.status(200).json({
      message: 'Bill updated successfully',
      bill: updatedBill
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a bill by ID
const deleteById = async (req, res) => {
  try {
    const foundBill = await bill.findByPk(req.params.id);
    if (!foundBill) {
      return res.status(404).json({ error: 'Bill not found' });
    }
    await foundBill.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Export all functions
module.exports = {
  index,save,getById,update,deleteById
};
