import { DataTypes, Model } from 'sequelize';

export class Playlist extends Model {}
 
    export default function MusicFactory(sequelize) {
        Playlist.init(
            {
                music_id: {
                    type: DataTypes.INTEGER, 
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING, // Playlist name
                    allowNull: false,
                },
                description: {
                    type: DataTypes.TEXT, // Playlist description
                },
                category: {
                    type: DataTypes.STRING, // Category of the playlist (e.g., love, chill, pop)
                },
                playlist_uri: {
                    type: DataTypes.STRING, // Spotify or another service playlist URI
                    unique: true,
                    allowNull: false,
                },
                total_tracks: {
                    type: DataTypes.INTEGER, // Number of tracks in the playlist
                },
                external_url: {
                    type: DataTypes.STRING, // External link to the playlist (e.g., Spotify link)
                },
                image_url: {
                    type: DataTypes.STRING, // URL for the playlist cover image
                },
            },
            {
                sequelize,
                timestamps: false, // Disable automatic timestamps
                underscored: true, // Use snake_case for column names
                freezeTableName: true, // Prevent Sequelize from pluralizing table names
            }
        );
        return Playlist;
    }


