const { DataTypes } = require('sequelize');
const sequelize = require('../config/db').sequelize;

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'donor', 'community_manager'),
    allowNull: false
  }
}, {
  tableName: 'Users',
  timestamps: false
});

module.exports = User;
