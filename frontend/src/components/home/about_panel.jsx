import React from 'react';

const AboutPanel = props => {
  return (
    <div id="about-panel">
      <h3>About Super</h3>
      <p>
        Super is a forum for software engineers to discuss work, new
        technologies and their varied experiences in the industry.
      </p>
      <p>
        You can post and edit articles, follow your favorite authors and leave a
        comment to continue the conversation.
      </p>
      <h3>GITHUB AND TEAM</h3>
      <div className="about-team">
        <a
          href="https://github.com/jmsteen/super"
          target="_blank"
          className="git"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 117">
            <title>GitHub-Mark-120px-plus</title>
            <path
              d="M268.87,204.9c-.66,2.36-1.31,4.73-2,7.09-5.48,19.61-17.71,33.2-36.52,40.86-5.23,2.13-6.48,1.17-6.52-4.56,0-3.5.25-7-.05-10.49-.41-4.69-1.25-9.35-2-14.52,1.76-.43,4.61-.95,7.36-1.81,15.82-5,23.41-25.24,14.66-39.71a14.49,14.49,0,0,1-2-8.7c.11-3.66-1.14-7.35-1.8-11-3.48.83-7.4.91-10.33,2.66-4.19,2.5-8.08,2.43-12.66,2-6.39-.56-12.9.23-19.35.17a31.47,31.47,0,0,1-7.36-1.23c-4.24-1.09-8.43-2.38-12.64-3.59-.54,4.51-1.06,9-1.63,13.52-.15,1.23-.09,2.63-.67,3.64-11.62,20.11-2.89,39.31,20,43.85a10.63,10.63,0,0,1,1.67.71c-2.48,3.29-1.65,8.68-7.75,9.11-5.86.4-9.74-2-12.9-6.73-3.54-5.3-7-6.55-10.72-5,3.13,4.64,6.18,9.48,9.56,14.07s8.19,5.39,13.37,5.28c1.49,0,3-.3,5.28-.55a102.88,102.88,0,0,1-.08,10.85c-.44,4.14-3.33,3.28-6,2.24q-28.61-11.37-37-41c-.67-2.36-1.32-4.73-2-7.09v-16a25.06,25.06,0,0,0,1-3.21c5.22-27,28.31-47.33,55.21-48.71,28.13-1.43,52.91,15.77,61.09,42.45,1,3.13,1.77,6.31,2.65,9.47Z"
              transform="translate(-148.87 -136.89)"
            />
          </svg>
          <span className="git-text">Super Github</span>
        </a>
        <div className="about-team-member tooltip-josh">
          <a
            id="linkedin"
            href="https://www.linkedin.com/in/joshhk72/"
            target="_blank"
          >
            <img
              className="about-team-member-img"
              alt="josh"
              src={require("../../assets/images/josh.jpeg")}
            ></img>
          </a>
          <span className="josh">Josh Kim</span>
        </div>
        <div className="about-team-member tooltip-alex">
          <a
            id="linkedin"
            href="https://www.linkedin.com/in/alexander-crisel-316b79121/"
            target="_blank"
          >
            <img
              className="about-team-member-img"
              alt="alex"
              src={require("../../assets/images/alex.jpeg")}
            ></img>
          </a>
          <span className="alex">Alexander Crisel</span>
        </div>
        <div className="about-team-member tooltip-john">
          <a
            href="https://www.linkedin.com/in/johnmsteen/"
            target="_blank"
            id="linkedin"
          >
            <img
              className="about-team-member-img"
              alt="john"
              src={require("../../assets/images/john.jpeg")}
            ></img>
          </a>
          <span className="john">John Steen</span>
        </div>
      </div>
    </div>
  );
};

export default AboutPanel;