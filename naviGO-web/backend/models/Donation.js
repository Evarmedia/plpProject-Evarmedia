const { DataTypes } = require('sequelize');
const sequelize = require('../config/db').sequelize;
const User = require('./User');
const Community = require('./Community');

const Donation = sequelize.define('Donation', {
  donation_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  item_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  item_type: {
    type: DataTypes.ENUM('monetary', 'in-kind'),
    allowNull: false
  },
  value: {
    type: DataTypes.DECIMAL(10, 2)
  },
  quantity: {
    type: DataTypes.INTEGER
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'user_id'
    }
  },
  community_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Communities',
      key: 'community_id'
    }
  },
  donation_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  remaining_quantity: {
    type: DataTypes.INTEGER
  },
  status: {
    type: DataTypes.ENUM('pending', 'received', 'not_received'),
    allowNull: false
  }
}, {
  tableName: 'Donations',
  timestamps: false
});

// Establish relationships
Donation.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Donation, { foreignKey: 'user_id' });

Donation.belongsTo(Community, { foreignKey: 'community_id' });
Community.hasMany(Donation, { foreignKey: 'community_id' });

module.exports = Donation;
