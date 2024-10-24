'use strict';
const { cart_item } = require('../models');

// Get all cart items
const index = async (req, res) => {
  try {
    const cartItems = await cart_item.findAll();
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a specific cart item by ID
const getById = async (req, res) => {
  try {
    const cartItem = await cart_item.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new cart item
const save = async (req, res) => {
  try {
    const { cart_id, product_id, quantity, price, status } = req.body;
    const newCartItem = await cart_item.create({
      cart_id,
      product_id,
      quantity,
      price,
      status
    });
    res.status(201).json({
      message: 'Cart item created successfully',
      cartItem: newCartItem
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing cart item
const update = async (req, res) => {
  try {
    const cartItem = await cart_item.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    await cart_item.update(req.body, {
      where: { id: req.params.id }
    });
    const updatedCartItem = await cart_item.findByPk(req.params.id);
    res.status(200).json({
      message: 'Cart item updated successfully',
      cartItem: updatedCartItem
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a cart item by ID
const deleteById = async (req, res) => {
  try {
    const cartItem = await cart_item.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    await cartItem.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Export all functions
module.exports = {save, index,update,getById,deleteById};
