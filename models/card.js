"use strict";
const { Model, STRING } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.card.belongsTo(models.deck);
    }
  }
  card.init(
    {
      cardid: DataTypes.INTEGER,
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      desc: DataTypes.STRING,
      atk: DataTypes.INTEGER,
      def: DataTypes.INTEGER,
      race: DataTypes.STRING,
      attribute: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      deckId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "card",
    }
  );
  return card;
};
