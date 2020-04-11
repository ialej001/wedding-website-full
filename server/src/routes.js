const RsvpController = require("./controllers/RsvpController");
const RsvpControllerPolicy = require("./policies/RsvpControllerPolicy.js");

module.exports = app => {
  app.post("/rsvp", RsvpControllerPolicy.register, RsvpController.register);
  app.post("/rsvpSubmit", RsvpControllerPolicy.submit, RsvpController.rsvpSubmit);
};
