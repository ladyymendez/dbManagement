const express = require('express');
const User = require('../../models/user');

const router = express.Router();

router.post('/', (req, res) => {
  const user = new User({
    name: req.body.name,
    type: req.body.type
  });
  user.save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        message: err
      });
    });
});

router.get('/', async (req, res) => {
  const user = await User.find();
  res.json(user);
});

router.patch('/:userId', async (req, res) => {
  try {
    const updateUser = await User.updateOne(
      { _id: req.params.userId },
      { $set: { name: req.body.name } }
    );
    res.json(updateUser);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete('/:userId', async (req, res) => {
  try {
    const removedUser = await User.remove({
      _id: req.params.userId
    });
    res.json(removedUser);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

module.exports = router;
