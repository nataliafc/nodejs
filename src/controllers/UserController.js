const users = require("../mocks/data");

module.exports = {
  listUsers(req, res) {
    const { order } = req.query;

    const sortedUsers = users.sort((prevState, actualState) => {
      if (order === "desc") {
        return prevState.id < actualState.id ? 1 : -1;
      }
      return prevState.id > actualState.id ? 1 : -1;
    });
    res.send(200, sortedUsers);
  },

  listUsersById(req, res) {
    const { id } = req.params;

    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      return res.send(400, { error: "user not found" });
    }
    res.send(200, user);
  },
};
