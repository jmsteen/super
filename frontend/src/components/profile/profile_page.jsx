import React from 'react';

class ProfilePage extends React.Component {

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
  }
  
  render() {
    return (
      <section className="profile-page">
        <header>
          <div className="profile-info-container">

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