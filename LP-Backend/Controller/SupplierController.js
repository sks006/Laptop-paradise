const models = require('./../models');

//all

const index = async (req, res) => {
    try {
        const suppliers = await models.Supplier.findAll();
        res.status(200).json(suppliers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//create

const save = async (req, res) => {
    try {
        const newSupplier = await models.Supplier.create(req.body);
        res.status(201).json(newSupplier);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//get by id

const getById = async (req, res) => {
    try {
        const supplier = await models.Supplier.findByPk(req.params.id, {
            include: [models.User]
        });
        if (blog) {
            res.status(200).json({ supplier });
        } else {
            res.status(404).json({ message: 'Supplier not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
//update

const update = async (req, res) => {
    try {
        const supplier = await models.Supplier.findByPk(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        await supplier.update(req.body);
        res.status(200).json(supplier);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//delete



const deleteById= async (req, res) => {
    try {

        const supplier = await models.Supplier.findByPk(req.params.id);
        if (supplier) {
            await supplier.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Supplier not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = { index, save, getById, update, deleteById };