const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.findAll = async function (req, res) {
  const roles = await prisma.role.findMany();
  res.json(roles);
};
exports.create = async function (req, res) {
  try {
    const newRole = await prisma.role.create({
      data: {
        name: req.body.name,
      },
    });
    res.send(newRole);
  } catch (e) {
    res.status(400).send({ error: true, message: e.message });
  }
};
// exports.findById = function (req, res) {
//   Employee.findById(req.params.id, function (err, employee) {
//     if (err) res.send(err);
//     res.json(employee);
//   });
// };
// exports.update = function (req, res) {
//   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
//     res
//       .status(400)
//       .send({ error: true, message: "Please provide all required field" });
//   } else {
//     Employee.update(
//       req.params.id,
//       new Employee(req.body),
//       function (err, employee) {
//         if (err) res.send(err);
//         res.json({ error: false, message: "Employee successfully updated" });
//       }
//     );
//   }
// };
// exports.delete = async function (req, res) {
//   await prisma.user.delete({
//     where: {
//       id: +req.params.id,
//     },
//   });
//   res.json({ error: false, message: "User successfully deleted" });
// };
