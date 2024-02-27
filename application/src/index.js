const React = require("react");
const ReactDOM = require("react-dom/client");
require("./index.css");
const App = require("./App").default;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  React.createElement(React.StrictMode, null, React.createElement(App, null))
);
