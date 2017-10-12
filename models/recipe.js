module.exports = function(sequelize, DataTypes) {
    var Recipe = sequelize.define("Recipe", {
        api_id : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        title : {
            type : DataTypes.STRING,
            allowNull : false
        },
        image_url : {
            type : DataTypes.STRING,
            allowNull : true
        }
    });
  
    Recipe.associate = function(models) {
      //A single query will have up to 10 recipes
      Recipe.belongsTo(models.Query, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    return Recipe;
  };
  