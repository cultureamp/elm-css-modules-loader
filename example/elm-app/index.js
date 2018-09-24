module.exports = function elmApp(div) {
  var { Elm } = require('./Main.elm');
  Elm.Main.init({ node: div });
};
