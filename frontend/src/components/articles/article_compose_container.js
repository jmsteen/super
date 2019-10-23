import Article from './article';
import { connect } from 'react-redux';
import { composeArticle } from '../../actions/article_actions'

const mapStateToProps = ({session: { user }}) => ({
    author: user.id
})

const mapDispatchToProps = dispatch => {
    return {
        composeArticle: (article) => dispatch(composeArticle(article))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Article)
