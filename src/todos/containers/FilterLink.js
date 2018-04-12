import { connect } from 'react-redux';
import { actions } from '../todos';
import Link from '../components/Link';

export const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(actions.setVisibilityFilter(ownProps.filter))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Link);
