import { Sequelize, DataTypes, Model } from 'sequelize'; 
import { User } from "./index.js";
import { Bookshelf } from "./bookshelf.js"; // Ensure to import the Bookshelf model
import { Music } from "./music.js"; // Ensure to import the Music model

export function Vibes(sequelize) {
    class Vibe extends Model {}

    Vibe.init(
        {
            vibe_id: {
                type: DataTypes.INTEGER, 
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.INTEGER, // Ensure this matches the type in User model
                references: {
                    model: User(sequelize), // Reference the User model
                    key: 'id', // The user id field in Users
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            book_id: {
                type: DataTypes.INTEGER, // Ensure this matches the type in Bookshelf model
                references: {
                    model: Bookshelf(sequelize), // Reference the Bookshelf model
                    key: 'book_id', 
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            music_id: {
                type: DataTypes.INTEGER, // Ensure this matches the type in Music model
                references: {
                    model: Music(sequelize), // Reference the Music model
                    key: 'music_id', 
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            sequelize,
            timestamps: false,
            underscored: true,
            freezeTableName: true,
        }
    );

    return Vibe;
}