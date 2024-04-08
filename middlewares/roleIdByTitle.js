const Role = require('../models/Role');

roleIdByTitle = async (title) => {
    try {
        const role = await Role.findOne({ title });
        
        if (!role) {
            console.log(`Role with title "${title}" not found.`);
            return null;
        }
        const roleId = role._id;

        console.log(`Role ID for "${title}": ${roleId}`);
        return roleId;
    } catch (error) {
        console.error('Error retrieving role ID:', error);
        return null;
    }
};

module.exports = {roleIdByTitle};