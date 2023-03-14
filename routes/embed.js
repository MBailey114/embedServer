const express = require('express');
const router = express.Router();
const Embed = require('../db/schema');

// Fetch all embeds
router.get('/', async (req, res) => {
  try {
    const embeds = await Embed.find();
    res.send(embeds);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete an embed
router.delete('/:id', async (req, res) => {
  try {
    const embed = await Embed.findByIdAndDelete(req.params.id);
    res.send(embed);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete multiple embeds
router.delete('/', async (req, res) => {
  try {
    await Embed.deleteMany({ _id: { $in: req.body.ids } });
    res.send({ message: 'Embeds deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Edit an embed
router.put('/:id', async (req, res) => {
  try {
    const embed = await Embed.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(embed);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get all embeds by category
router.get('/category/:category', async (req, res) => {
  try {
    const embeds = await Embed.find({ category: req.params.category });
    res.send(embeds);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
    try {
    const indicators = req.body.core.parameters.indicators;
    const mappedIndicators = indicators.map(indicator => {
        const keys = Object.keys(indicator);
        return { name: keys[0], value: indicator[keys[0]] };
        });
    req.body.core.parameters.indicators = mappedIndicators;
    const newEmbed = new Embed(req.body);
    const savedEmbed = await newEmbed.save();
    res.send(savedEmbed);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Search all embeds by query
router.get('/search/:query', async (req, res) => {
  try {
    const embeds = await Embed.find({
      $text: { $search: req.params.query }
    });
    res.send(embeds);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Search all embeds by category and query
router.get('/search/:query/:category', async (req, res) => {
  try {
    const embeds = await Embed.find({
      category: req.params.category,
      $text: { $search: req.params.query }
    });
    res.send(embeds);
  } catch (err) {
    res.status(500).send(err);
  }
});


module.exports = router;
