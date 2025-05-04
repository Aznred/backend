const Bar = require("../models/bar.js");

exports.createBar = async (req, res) => {
    try {
        const bar = await Bar.create(req.body);
        res.status(201).json(bar);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getBar = async (req, res) => {
    try {
        const bar = await Bar.findById(req.params.id);
        if (!bar) return res.status(404).json({ error: "Bar not found" });
        res.json(bar);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.listBars = async (req, res) => {
    try {
        const bars = await Bar.find();
        res.json(bars);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateBar = async (req, res) => {
    try {
        const updated = await Bar.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteBar = async (req, res) => {
    try {
        await Bar.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
