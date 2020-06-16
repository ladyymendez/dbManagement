/* eslint-disable class-methods-use-this */
const { Users } = require('../models');

class UsersController {
  getAll(req, res) {
    Users.find()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({
          message: err
        });
      });
  }

  get({ params: { id } }, res) {
    Users.findOne({
      _id: id
    })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(404).json({
          message: err
        });
      });
  }

  add({ body: { name, type } }, res) {
    const user = new Users({
      name,
      type
    });
    user.save()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({
          message: err
        });
      });
  }

  update({ params: { id }, body: { name } }, res) {
    Users.updateOne(
      { _id: id },
      { $set: { name } }
    )
      .then((updateUser) => {
        res.status(200).json(updateUser);
      })
      .catch((err) => {
        res.status(404).json({
          message: err
        });
      });
  }

  remove({ params: { id } }, res) {
    Users.deleteOne({
      _id: id
    })
      .then((removedUser) => {
        res.status(200).json(removedUser);
      })
      .catch((err) => {
        res.status(404).json({
          message: err
        });
      });
  }
}

module.exports = UsersController;
