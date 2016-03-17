/* globals UI */

var C = UI.Views.Connector;

class EditForm extends React.Component {
  constructor (props) {
    super(props);
    this.browse = this.browse.bind(this);
    if (!props.connector) {
      this.state = {
        mode: 'connect'
      };
    }
  }
  connect () {
    console.log('calling on connect');
    this.props.onConnect();
  }
  browse () {
    this.props.onBrowse();
  }
  render () {
    return (
      <C.Page default="setup" onBrowse={this.browse}>
        <C.Panel name="Setup" slug="setup">
          <UI.FormElements.Button text="Connect" type="large" onClick={()=>{
              return this.connect();
            }} />
        </C.Panel>
        <C.Panel name="Advanced" slug="advanced">
          <C.List>
            <C.Item>Register for MYOB developer access at http://developer.myob.com/contact/register-for-myobapi-access/</C.Item>
            <C.Item>Log into your my.myob.com account and choose the correct country.</C.Item>
            <C.Item>Select 'Developer' from the top menu on the page.</C.Item>
            <C.Item>Click on 'Register App'.</C.Item>
            <C.Item>In Redirect URL use https://bouncer.hoist.io/bounce, fill out the rest of the form and click Register App.</C.Item>
            <C.Item>Copy the API Key into here:</C.Item>
            <C.Item>Copy the Secret from 'API Secret' into here:</C.Item>
          </C.List>
        </C.Panel>
      </C.Page>
    );
  }
}


window.EditForm = EditForm;
