export const roles = ['guest', 'admin'];

export const roleRights = new Map();
roleRights.set(roles[0], []);
roleRights.set(roles[1], ['getProfile', 'updateProfile']);
