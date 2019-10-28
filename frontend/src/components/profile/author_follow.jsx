import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeFollow, unFollow } from '../../actions/follow_actions';

const mapStateToProps = ({entities: { articles }, session}, ownProps) => {
    return {
        currentUser: session.user,
        currentArticle: articles[ownProps.match.params.id]
    };
};

const mapDispatchToProps = dispatch => {
    return {
        makeFollow: follow => dispatch(makeFollow(follow)),
        unFollow: (id) => dispatch(unFollow(id))
    };
};

class AuthorFollow extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            currentFollow: null
        };
        this.handleFollow = this.handleFollow.bind(this);
        this.handleUnfollow = this.handleUnfollow.bind(this);
        this.renderButton = this.renderButton.bind(this);
    }

    componentDidMount() {
        if (this.props.currentArticle.author.follows) {
            const { currentUser, currentArticle } = this.props;
            
            this.setState({
                currentFollow: currentArticle.author.follows.find(follow => follow.user === currentUser)
            })
        }
    }
    
    handleFollow() {
        this.props.makeFollow({
            user: this.props.currentUser.id,
            author: this.props.currentArticle.author
        })
            .then((follow) => {
                this.setState({
                    currentFollow: follow
                })
            });
    }

    handleUnfollow() {
        if (this.state.currentFollow) {
            
            this.props.unFollow(this.state.currentFollow._id)
                .then(() => {
                    this.setState({
                        currentFollow: null
                    })
                });
        } else {
            return;
        }
    }

    renderButton() {
        if (this.state.currentFollow) {
            return <button onClick={this.handleUnfollow}>Following</button>
        } else {
            return <button onClick={this.handleFollow}>Follow</button>
        }
    }

    render() {
        return <div className="follow-container">
            {this.renderButton()}
        </div>
    }
}

export default withRouter(connect(
    mapStateToProps, 
    mapDispatchToProps)(AuthorFollow));