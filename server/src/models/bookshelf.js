import { DataTypes, Model } from "sequelize";

export class Book extends Model {}

export default function BookFactory(sequelize) {
  Book.init(
    {
      book_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      author: {
        type: DataTypes.STRING,
      },
      categories: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      language: {
        type: DataTypes.STRING,
      },
      maturity_rating: {
        type: DataTypes.BOOLEAN,
      },
      preview_link: {
        type: DataTypes.STRING,
      },
      thumbnail: {
        type: DataTypes.STRING,
      },
      // ISBN
      industry_identifiers: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      freezeTableName: true,
    }
  );
  return Book;
}
