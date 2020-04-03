const RsvpController = require("./controllers/RsvpController");

module.exports = app => {
  app.post("/rsvp", RsvpController.register);
};
