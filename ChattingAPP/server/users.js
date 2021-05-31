var users = [];
var rooms = ["mitro7", "mitro"];
const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  var roomFlag = false;

  for (var rm of rooms) {
    if (rm === room) {
      roomFlag = true;
      break;
    }
  }

  if (roomFlag === false)
    return { error: "Entered room is not active. Please, enter active room" };

  const existingUser = users.find(
    (user) => user.name === name && user.room === room
  );

  if (existingUser) return { error: "UserName is already taken" };

  var user = { id, name, room };
  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1);
  }
  return [{}];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
