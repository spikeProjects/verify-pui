import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit} from '../actions';
// import Picker from '../components/Picker';
// import Posts from '../components/Posts';

class InnerComponent extends Component {
  static propTypes = {
    selectedSubreddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const {dispatch, selectedSubreddit} = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const {dispatch, selectedSubreddit} = this.props;
      dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }
  }

  handleChange = nextSubreddit => {
    this.props.dispatch(selectSubreddit(nextSubreddit));
  }

  handleRefreshClick = e => {
    e.preventDefault();

    const {dispatch, selectedSubreddit} = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  render() {
    // const {selectedSubreddit, posts, isFetching, lastUpdated} = this.props;
    // const isEmpty = posts.length === 0;
    return (
      <div>
        lazy loaded module
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {selectedSubreddit, postsBySubreddit} = state;
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  };

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  };
};

export default connect(mapStateToProps)(InnerComponent);
