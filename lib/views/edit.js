"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditForm = (function (_React$Component) {
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
      var _this2 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "button", onClick: function onClick() {
              _this2.connect();
            } },
          "connect"
        )
      );
    }
  }]);

  return EditForm;
})(React.Component);

window.EditForm = EditForm;
//# sourceMappingURL=edit.js.map
