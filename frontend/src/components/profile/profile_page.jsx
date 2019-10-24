import React from 'react';
import ReactLoading from 'react-loading';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  componentDidMount() {
    this.props.fetchUserByHandle(this.props.match.params.handle)
      .then(this.setState({ loaded: true }))
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.handle !== prevProps.match.params.handle) {
      this.setState({ loaded: false });
      this.props.fetchUserByHandle(this.props.match.params.handle)
        .then(this.setState({ loaded: true }))
    }
  }
  
  render() {
    if (!this.state.loaded) {
      return <ReactLoading 
        type={"white"} 
        color={"white"} 
        height={700} 
        width={400} />
    } else if (!this.props.profileUser) {
      return <h2 className="profile-error">Profile does not exist</h2>
    }

    const { handle } = this.props.profileUser;

    return (
      <section className="profile-page">
        <header>
          <div className="profile-name-container">
            <h1>{handle}</h1>
            <button>Button</button>
          </div>
          <div className="profile-image-container">
            <img src="https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2018/09/dog-landing-hero-lg.jpg?bust=1536935129&width=1080" />
          </div>
        </header>
        <main>

        </main>
      </section>
    )
  }
}

export default ProfilePage