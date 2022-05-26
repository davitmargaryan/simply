const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const User = require("../models/user.model.js");

exports.findAll = async function (req, res) {
  const users = await prisma.user.findMany({
    include: {
      role: true,
    },
  });
  res.json(users);
  // User.findAll(function (err, user) {
  //   console.log("controller");
  //   if (err) res.send(err);
  //   console.log("res", user);
  //   res.json(user);
  // });
};
exports.create = async function (req, res) {
  console.log("usersController.create");
  try {
    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        roleId: req.body.roleId,
      },
    });
    res.send(newUser);
  } catch (e) {
    res.status(400).send({ error: true, message: e.message });
  }
  //handles null error
  // if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
  //   res
  //     .status(400)
  //     .send({ error: true, message: "Please provide all required field" });
  // } else {
  //   User.create(new_user, function (err, user) {
  //     if (err) res.send(err);
  //     res.json({
  //       error: false,
  //       message: "User added successfully!",
  //       data: user,
  //     });
  //   });
  // }
};
// exports.findById = function (req, res) {
//   Employee.findById(req.params.id, function (err, employee) {
//     if (err) res.send(err);
//     res.json(employee);
//   });
// };
exports.update = async function (req, res) {
  console.log(req.params.id, req);
  await prisma.user.update({
    where: {
      id: +req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      roleId: req.body.roleId,
    },
  });
  res.json({ error: false, message: "User successfully updated" });
};
exports.delete = async function (req, res) {
  await prisma.user.delete({
    where: {
      id: +req.params.id,
    },
  });
  res.json({ error: false, message: "User successfully deleted" });
};
