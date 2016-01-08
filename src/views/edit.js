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
    this.props.onConnect();
  }
  render () {
    return (
      <div>
        <div className="button" onClick={() => {
          this.connect();
        }}>connect</div>
      </div>
    );
  }
}

window.EditForm = EditForm;
