import { connect } from 'react-redux';
import PermissionsConnectHeader from './permissions-connect-header.component';

const mapStateToProps = (state) => ({
  // Any state you need to map to props here
});

const mapDispatchToProps = (dispatch) => ({
  // Any actions you need to map to props here
});

export default connect(mapStateToProps, mapDispatchToProps)(PermissionsConnectHeader);
