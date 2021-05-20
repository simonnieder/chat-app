const users = [];

// Join user to chat
function userJoin(id, username) {
  const user = { id, username};
  users.push(user);
  return user;
}


function getUsers() {
  return users;
}
// Get current user
function getUserById(id) {
  return users.find(user => user.id === id);
}

function getUserByUsername(username) {
    return users.find(user => user.username === username);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}


module.exports = {
  userJoin,
  getUserById,
  getUserByUsername,
  userLeave,
  getUsers,
};
