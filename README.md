# super

## Background and Overview 
  Super is a content production platform for junior web developers inspired by Medium. Super is built with the MERN Stack and enables basic functionality of creating, editing and categorizing articles. 

## Functionality and MVPs 
  1. User authentication
      * Authorized users can create, edit, comment on and like articles.
      * Unauthorized users can only read articles.
  2. Articles 
      * Articles allow for basic text processing.
      * Content can include text, images and code snippets.
  3. Commenting on articles 
      * Users can leave comments on articles and reply to comments.
  4. Follows and feed 
      * Users can follow authors
      * Feeds display articles by category
  5. Likes 
      * Users can like articles

  BONUS: Text Editing Toolbar
      * Allows for more advanced and preview features in the text editor.

## Technologies and Technical Challenges

Super will use the MERN stack, which includes MongoDb, Express, React and Node.js.

### Front End (React/Node.js)
Super uses React for front end client-side rendering and an external library
for text processing.

Technical challenges:
    * Utilization of library for text processsing of articles and comments
    * Implementing infinite scroll for the article feed, while maintaining an acceptable render speed.

### Backend (MongoDb, Express)
Super uses MongoDB for its database and Express as its server framework.



## Group Members and Work Breakdown

**John Steen**, **Alexander Crisel**, **Josh Kim**

### Day 1
    * User authentication (all)
### Day 2
    * Back end articles (John)
    * Back end comments (Alexander)
    * Back end likes (Josh)
    * Meet and decide roles for future days. 
### Day 3
    * Front end articles (John)
    * Front end comments (Alexander)
    * Front end likes (Josh)
### Day 4
    * Finalize front for respective MVP features (All)
### Day 5
    * Review and debug
