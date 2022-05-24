"use strict";
const dbConn = require("../config/config.js");
//User object create
class User {
  constructor(user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  static create(newUser, result) {
    dbConn.query("INSERT INTO users set ?", newUser, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.insertId, "aaaaaaaaaaaaaaaa");
        result(null, res.insertId);
      }
    });
  }
  static findById(id, result) {
    dbConn.query(
      "Select * from employees where id = ? ",
      id,
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          result(null, res);
        }
      }
    );
  }
  static findAll(result) {
    dbConn.query("Select * from users", function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("users : ", res);
        result(null, res);
      }
    });
  }
  static update(id, employee, result) {
    dbConn.query(
      "UPDATE employees SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?",
      [
        employee.first_name,
        employee.last_name,
        employee.email,
        employee.phone,
        employee.organization,
        employee.designation,
        employee.salary,
        id,
      ],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          result(null, res);
        }
      }
    );
  }
  static delete(id, result) {
    console.log(id, "***");
    dbConn.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    });
  }
}

module.exports = User;
// CREATE  TABLE IF NOT EXISTS mydb.users (
//   `id` INT UNSIGNED AUTO_INCREMENT,
//   `first_name` VARCHAR(255) NOT NULL,
//   `last_name` VARCHAR(255) NOT NULL,
//   `email` VARCHAR(255) NOT NULL,
//   `created_at` DATETIME NOT NULL,
//   `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//   PRIMARY KEY (`id`))
