const { DataTypes } = require('sequelize');
const sequelize = require('../config/db').sequelize;
const User = require('./User');

const Community = sequelize.define('Community', {
  community_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  community_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Communities',
  timestamps: false
});

// Establish relationships
Community.belongsTo(User, { foreignKey: 'community_manager_id' });
User.hasOne(Community, { foreignKey: 'community_manager_id' });

module.exports = Community;
