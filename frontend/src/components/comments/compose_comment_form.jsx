import React from 'react';
import './compose_comment.scss';

class CommentForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      body: "",
      author: this.props.author,
      article: this.props.article._id,
      clicked: false
    }
    this.largeForm = this.largeForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clickListener = this.clickListener.bind(this);
  }

  clickListener(e) {
    e.stopPropagation();
    if (e.target.classList[0] !== "large-response" && e.target.classList[0] !== "response" && e.target.classList[0] !=='comment-submit') {
      this.setState({ clicked: false })
    }
  }

  componentDidMount() {
    document.addEventListener("click", this.clickListener);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.clickListener);
  }
 
  update() {
    return e => this.setState({
      body: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.composeComment({
      body: this.state.body,
      author: this.state.author,
      article: this.state.article
    });
    
      this.setState({ body: "", clicked: false })
  
    
  }

  largeForm() {
    if(this.state.clicked === false) {
      //console.log(this.state.clicked)
      this.setState({
        clicked: true
      })
     
    } 
  }

  render() {
    if( this.state.clicked === true) {
      return (
        <div className="large-response-container">
          <div className="response-author">{this.state.author}</div>
          <form onSubmit={this.handleSubmit}>
            <textarea className="large-response" cols="30" rows="10" value={this.state.body} onChange={this.update()}></textarea>
          <input className="comment-submit" type="submit" value="Publish"/>
          </form>
        </div>
      )
    } else {
      return(
        <div className="response-container">
          <img  src={this.props.image || require('../../assets/images/default_profile.svg')} /> 
          <div className="response-inner-container">
            <div>{this.state.author}</div>
            <input onClick={this.largeForm} className="response" type="text" value={this.state.body} placeholder="Write a response..." onChange={this.update()} />
          </div>
        </div>
      )
    }
  }
}

export default CommentForm;