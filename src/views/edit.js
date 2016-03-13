/* globals UI */

var C = UI.Connectors;

class EditForm extends React.Component {
  constructor (props) {
    super(props);
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
  render () {
    return (
      <C.View>
        <C.View.Sidebar>
          <UI.FormElements.Button text="Save" onClick={()=>{
              return this.connect();
            }} />
        </C.View.Sidebar>
        <C.View.Content>
          <h1>Adding a MYOB AccountRight Connector</h1>
          <ul>
            <li>Register for MYOB developer access at http://developer.myob.com/contact/register-for-myobapi-access/</li>
            <li>Log into your my.myob.com account and choose the correct country.</li>
            <li>Select 'Developer' from the top menu on the page.</li>
            <li>Click on 'Register App'.</li>
            <li>In Redirect URL use https://bouncer.hoist.io/bounce, fill out the rest of the form and click Register App.</li>
            <li>Copy the Key into here</li>
          </ul>
        </C.View.Content>
      </C.View>
    );
  }
}

window.EditForm = EditForm;
