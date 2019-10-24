import { connect } from 'react-redux';
import HomePage from './home_page';
import { fetchArticles } from '../../actions/article_actions';

const mapStateToProps = state => ({
  articles: Object.values(state.entities.articles).sort((a, b) => new Date(b.date) - new Date(a.date))
});

const mapDispatchToProps = dispatch => ({
  fetchArticles: () => dispatch(fetchArticles())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);