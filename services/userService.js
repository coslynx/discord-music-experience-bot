const UserModel = require('../models/userModel');

class UserService {
    static async createUser(userId, username) {
        const existingUser = await UserModel.findOne({ userId });
        if (existingUser) {
            throw new Error(`User with ID "${userId}" already exists.`);
        }

        const user = new UserModel({
            userId,
            username,
            listeningHistory: [],
        });

        return await user.save();
    }

    static async getUser(userId) {
        const user = await UserModel.findOne({ userId });
        if (!user) {
            throw new Error(`User with ID "${userId}" not found.`);
        }
        return user;
    }

    static async updateListeningHistory(userId, songId) {
        const user = await UserModel.findOne({ userId });
        if (!user) {
            throw new Error(`User with ID "${userId}" not found.`);
        }

        if (!user.listeningHistory.includes(songId)) {
            user.listeningHistory.push(songId);
            await user.save();
        }
    }

    static async getListeningHistory(userId) {
        const user = await UserModel.findOne({ userId });
        if (!user) {
            throw new Error(`User with ID "${userId}" not found.`);
        }
        return user.listeningHistory;
    }

    static async deleteUser(userId) {
        const result = await UserModel.deleteOne({ userId });
        if (result.deletedCount === 0) {
            throw new Error(`User with ID "${userId}" not found.`);
        }
        return `User with ID "${userId}" deleted successfully.`;
    }
}

module.exports = UserService;