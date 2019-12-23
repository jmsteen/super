# super

Link: [The Super App](https://thesuperapp.herokuapp.com)

![Home Page](/assets/super-home-page.png)

## Background and Overview 
  Super is a content production platform for junior web developers inspired by Medium. Super is built with the MERN Stack and enables basic functionality of creating, editing and categorizing articles.  

## Technologies and Technical Challenges

Super uses the MERN stack, which includes MongoDB, Express, React and Node.js.

For text processing, the app utilizes Draft.js, a rich text editor framework.

In order to upload and store images, we utilized Amazon S3. We used React Image
Crop to allow users to resize images on upload.

### Challenges

#### State management
  In order to avoid errors related to empty state on mounting of React components,
  we used conditional statements and default values related to our current user,
  article, likes and comments until the asynchronous request had been fulfilled.


#### Populate with Mongoose
  In order to avoid having unnecessary population in the user backend GET route,
  we had to provide panel components in the user profile page with additional
  information on the front end related to the profile currently being rendered.

#### Multi-faceted API Call to Articles

```JavaScript
router.get('/:id', (req, res) => {
  Article.findById(req.params.id)
    .populate('likes')
    .populate({ path: "comments", populate: { path: "likes" } })
    .populate({ path: "comments", populate: { path: "author" } })
    .populate({ path: "author", populate: { path: "follows" } })
    .then(article => {
      Like.find({ '_id': { $in: article.likes }})
        .then(likes => {
          article.likes = likes
          return res.json(article);
        }).catch(err => res.status(404).json({ error: "Encountered issue populating article likes"}))
    })
    .catch(err =>
      res.status(404).json({ noarticlefound: 'No article found with that ID' })
    )
});
```

In order to minimize API calls for multiple resources, we used nested population
within our Article GET request. We wished to avoid cluttered Mongoose models,
so we utilized virtual population to prevent redundant foreign keys from being
stored in the database.

One tradeoff that we encountered was the decision to either use populate, which
entails multiple queries to the database, or multiple API calls, which would
also create loading speed issues. 

Although both affected speed negatively, we decided to use populate so that
API calls would be minimized and the logic would be handled in a single request. While this would mean a longer initial load time for the page, it would remove the necessity for additional API calls.

#### Integrating Draft.js as an external library for text processing

![Walkthrough](/assets/edit-article-walkthrough.gif)

We used Draft.js as our primary text-processing tool to create articles in rich
text format.

A separate editor state had to be created when the component mounted in order
to store and edit content in rich text format. When articles were posted or
fetched, content had to be converted into raw, stringified content and back.

## Functionality 
  1. User authentication
      * Authorized users can create, edit, comment on and like articles.
      * Unauthorized users can only read articles.
  2. Articles 
      * Articles allow for basic text processing and styling.
      * Content can include text, images and code snippets.
      * Articles contain an inline text-styling toolbar and image insertion.
  3. Commenting on articles 
      * Users can leave comments on articles.
  4. Follows and feed 
      * Users can follow authors.
  5. User profiles
      * Users can create and edit handle, profile image and display name.
      * Users can access other profiles via linked profile images and author name.
  6. Likes 
      * Users can like articles and comments.
      * Liked articles and comments appear on user's profile.
 


### Plans for Implementation

  * Categories for articles (e.g. "JavaScript, Front End, etc.")
  * Search bar for articles
  * Estimated reading times for articles
  * Bookmarks
  * Publications
