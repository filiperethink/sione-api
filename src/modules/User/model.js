/* eslint-disable func-names */
/* eslint-disable import/no-mutable-exports */

import mongoose, { Schema } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

import CONSTANTS from '../../config/constants';

const UserSchema = new Schema(
  {
    email: {
      type: Schema.Types.String,
      unique: true,
      required: [true, 'Email is required!'],
      trim: true,
      validate: {
        validator(email) {
          const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
          return emailRegex.test(email);
        },
        message: '{VALUE} is not a valid email!',
      },
    },
    firstName: {
      type: Schema.Types.String,
      trim: true,
    },
    lastName: {
      type: Schema.Types.String,
      trim: true,
    },
    admin_pelada: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Pelada',
      },
    ],
    pro: {
      type: Schema.Types.Boolean,
      default: false,
    },
    password: {
      type: Schema.Types.String,
      required: [true, 'Password is required!'],
      trim: true,
      minlength: [6, 'Password need to be longer!'],
      validate: {
        validator(password) {
          return password.length >= 6 && password.match(/\d+/g);
        },
      },
    },
  },
  { timestamps: true },
);

UserSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

// Hash the user password on creation
// eslint-disable-next-line func-names
UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    return next();
  }
  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },

  toAuthJSON() {
    return {
      _id: this._id,
      token: `${this.createToken()}`,
    };
  },

  createToken() {
    return jwt.sign(
      {
        _id: this._id,
      },
      CONSTANTS.JWT_SECRET,
    );
  },

  toJSON() {
    return {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      pro: this.pro,
      admin_pelada: this.admin_pelada,
    };
  },

  authenticateUser(password) {
    const isAuth = compareSync(password, this.password);
    return isAuth;
  },
};

let User;

try {
  User = mongoose.model('User');
} catch (e) {
  User = mongoose.model('User', UserSchema);
}

export default User;
