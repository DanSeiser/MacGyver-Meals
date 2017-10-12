module.exports = function(sequelize, DataTypes) {
  var Query = sequelize.define("Query", {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1]
      }
    },
    ingredient1: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    ingredient2: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    ingredient3: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }
  });

  Query.associate = function(models) {
    Query.hasMany(models.Recipe, {
      onDelete: "cascade"
    });
  };
  return Query;
};