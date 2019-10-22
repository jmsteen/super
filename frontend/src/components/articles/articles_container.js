import { connect } from "react-redux";
import { fetchArticles } from "../../actions/article_actions";
import Articles from "./articles";

const mapStateToProps = state => {
  return {
    articles: Object.values(state.articles)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchArticles: () => dispatch(fetchArticles())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Articles);
