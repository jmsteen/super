import React from 'react';

class CommentForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      body: "",
      author: this.props.author,
      article: this.props.article
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  update() {
    return e => this.setState({
      body: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.composeComment(this.state);
    this.setState({body: ""})

  }
  
  render() {
      return (
        <div className="response-container">
          <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.body} placeholder="Write a response..." onChange={this.update()}/>
          <input type="submit" value="publish"/>
          </form>
        </div>
      )
  }
}

export default CommentForm;