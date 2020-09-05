const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');

const Registration = require('../../models/Registration');

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is Required').isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let registration = await Registration.findOne({ email });

      if (registration) {
        return res
          .status(422)
          .json({ errors: [{ msg: 'Invalid User Credentials' }] });
      }

      registration = new Registration({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      registration.password = await bcrypt.hash(password, salt);

      await registration.save();

      res.status(201).send(req.body);
      // res.send('Account Created');
    } catch (err) {
      console.error(err.message);
      res.status(422).send(err.message);
    }
  }
);

module.exports = router;
