'use strict';
const { cart } = require('../models');

// Get all carts
const index = async (req, res) => {
  try {
    const carts = await cart.findAll();
    res.status(200).json(carts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a specific cart by ID
const getById = async (req, res) => {
  try {
    const cartItem = await cart.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new cart
const save = async (req, res) => {
  try {
    const { customer_id, status } = req.body;
    const newCart = await cart.create({
      customer_id,
      status
    });
    res.status(201).json({
      message: 'Cart created successfully',
      cart: newCart
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing cart
const update = async (req, res) => {
  try {
    const cartItem = await cart.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    await cart.update(req.body, {
      where: { id: req.params.id }
    });
    const updatedCart = await cart.findByPk(req.params.id);
    res.status(200).json({
      message: 'Cart updated successfully',
      cart: updatedCart
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a cart by ID
const deletebyId = async (req, res) => {
  try {
    const cartItem = await cart.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    await cartItem.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Export all functions
module.exports = {save,index,getById,update,deletebyId};
