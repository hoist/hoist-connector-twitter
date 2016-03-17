'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* globals UI */

var C = UI.Views.Connector;

var EditForm = function (_React$Component) {
  _inherits(EditForm, _React$Component);

  function EditForm(props) {
    _classCallCheck(this, EditForm);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EditForm).call(this, props));

    _this.browse = _this.browse.bind(_this);
    if (!props.connector) {
      _this.state = {
        mode: 'connect'
      };
    }
    return _this;
  }

  _createClass(EditForm, [{
    key: 'connect',
    value: function connect() {
      console.log('calling on connect');
      this.props.onConnect();
    }
  }, {
    key: 'browse',
    value: function browse() {
      this.props.onBrowse();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        C.Page,
        { 'default': 'setup', onBrowse: this.browse },
        React.createElement(
          C.Panel,
          { name: 'Setup', slug: 'setup' },
          React.createElement(UI.FormElements.Button, { text: 'Connect', type: 'large', onClick: function onClick() {
              return _this2.connect();
            } })
        ),
        React.createElement(
          C.Panel,
          { name: 'Advanced', slug: 'advanced' },
          React.createElement(
            C.List,
            null,
            React.createElement(
              C.Item,
              null,
              'Register for MYOB developer access at http://developer.myob.com/contact/register-for-myobapi-access/'
            ),
            React.createElement(
              C.Item,
              null,
              'Log into your my.myob.com account and choose the correct country.'
            ),
            React.createElement(
              C.Item,
              null,
              'Select \'Developer\' from the top menu on the page.'
            ),
            React.createElement(
              C.Item,
              null,
              'Click on \'Register App\'.'
            ),
            React.createElement(
              C.Item,
              null,
              'In Redirect URL use https://bouncer.hoist.io/bounce, fill out the rest of the form and click Register App.'
            ),
            React.createElement(
              C.Item,
              null,
              'Copy the API Key into here:'
            ),
            React.createElement(
              C.Item,
              null,
              'Copy the Secret from \'API Secret\' into here:'
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
