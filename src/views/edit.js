/* globals UI */

var C = UI.Views.Connector;

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
    if (!props.connector) {
      this.state.mode = 'connect';
    }
    this.update = this.update.bind(this);
  }
  connect() {
    this.props.onConnect();
  }
  update(event) {
    this.props.onSubscribe({name: event.target.name, subscribed: event.target.checked});
  }
  render() {
    return (
      <C.Page default="setup" {...this.props}>
        <C.Panel name="Setup" slug="setup">
          <UI.FormElements.Button text={this.props.connectorInstance ? 'Reauthorize' : 'Connect'} type="large" onClick={()=>{
              return this.connect();
            }} />
        </C.Panel>
        {this.props.connectorInstance ? <C.Panel name="Events" slug="events">
          <span>Check the boxes of the events you want to subscribe to.</span>
          <form>
            <table onChange={this.update}>
              <tbody>
                <tr>
                  <td><input type="checkbox" name="twitter:new:mention"/></td>
                  <td>twitter:new:mention</td>
                </tr>
                <tr>
                  <td><input type="checkbox" name="twitter:new:tweet"/></td>
                  <td>twitter:new:tweet</td>
                </tr>
              </tbody>
            </table>
          </form>
        </C.Panel> : <C.Panel name="Events" slug="events">
          Come back later for Events
        </C.Panel>}
      </C.Page>
    );
  }
}

export default EditForm;
global.EditForm = EditForm;

//
// <C.Panel name="Advanced" slug="advanced">
//   <C.List>
//     <C.Item>Register for MYOB developer access at http://developer.myob.com/contact/register-for-myobapi-access/</C.Item>
//     <C.Item>Log into your my.myob.com account and choose the correct country.</C.Item>
//     <C.Item>Select 'Developer' from the top menu on the page.</C.Item>
//     <C.Item>Click on 'Register App'.</C.Item>
//     <C.Item>In Redirect URL use https://bouncer.hoist.io/bounce, fill out the rest of the form and click Register App.</C.Item>
//     <C.Item>Copy the API Key into here:</C.Item>
//     <C.Item>Copy the Secret from 'API Secret' into here:</C.Item>
//   </C.List>
// </C.Panel>
