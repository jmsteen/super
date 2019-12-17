import { connect } from 'react-redux';
import HomePage from './home_page';
import { fetchArticlePage, clearArticles } from '../../actions/article_actions';

const mapStateToProps = state => ({
  articles: Object.values(state.entities.articles).sort((a, b) => new Date(b.date) - new Date(a.date))
});

const mapDispatchToProps = dispatch => ({
  fetchArticlePage: page => dispatch(fetchArticlePage(page)),
  clearArticles: () => dispatch(clearArticles())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);