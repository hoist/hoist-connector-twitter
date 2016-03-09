"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* globals UI */

var C = UI.Connectors;

var EditForm = function (_React$Component) {
  _inherits(EditForm, _React$Component);

  function EditForm(props) {
    _classCallCheck(this, EditForm);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EditForm).call(this, props));

    if (!props.connector) {
      _this.state = {
        mode: 'connect'
      };
    }
    return _this;
  }

  _createClass(EditForm, [{
    key: "connect",
    value: function connect() {
      this.props.onConnect();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        C.View,
        null,
        React.createElement(
          C.View.Sidebar,
          null,
          React.createElement(UI.FormElements.Button, { text: "Save", onClick: this.connect })
        ),
        React.createElement(
          C.View.Content,
          null,
          React.createElement(
            "h1",
            null,
            "Adding a MYOB AccountRight Connector"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              "Register for MYOB developer access at http://developer.myob.com/contact/register-for-myobapi-access/"
            ),
            React.createElement(
              "li",
              null,
              "Log into your my.myob.com account and choose the correct country."
            ),
            React.createElement(
              "li",
              null,
              "Select 'Developer' from the top menu on the page."
            ),
            React.createElement(
              "li",
              null,
              "Click on 'Register App'."
            ),
            React.createElement(
              "li",
              null,
              "In Redirect URL use https://bouncer.hoist.io/bounce, fill out the rest of the form and click Register App."
            ),
            React.createElement(
              "li",
              null,
              "Copy the Key into here"
            )
          )
        )
      );
    }
  }]);

  return EditForm;
}(React.Component);

window.EditForm = EditForm;
//# sourceMappingURL=edit.js.map
