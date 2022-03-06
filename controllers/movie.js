// create a reference to the model
let Movie = require("../models/movie");

// Gets all movies from the Database and renders the page to list all movies.
module.exports.movieList = function (req, res, next) {
  Movie.find((err, movieList) => {
    // console.log(movieList);
    if (err) {
      return console.error(err);
    } else {
      res.render("movie/list", {
        title: "Movie List",
        movies: movieList,
      });
    }
  });
};

// Gets a movie by id and renders the details page.
module.exports.details = (req, res, next) => {
  let id = req.params.id;

  Movie.findById(id, (err, movieToShow) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("movie/details", {
        title: "Movie Details",
        movie: movieToShow,
      });
    }
  });
};

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
  // ADD YOUR CODE HERE
  res.render("movie/add_edit", { title: "Add Movie", movie: "" });
};

// Processes the data submitted from the Add form to create a new movie
module.exports.processAddPage = (req, res, next) => {
  // ADD YOUR CODE HERE
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }
  const movies = new Movie({
    Title: req.body.Title,
    Synopsis: req.body.Synopsis,
    Year: req.body.Year,
    Director: req.body.Director,
    Genre: req.body.Genre,
  });
  movies
    .save(movies)
    .then((movies) => {
      res.redirect("/movie/list");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
};

// Gets a movie by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {
  // ADD YOUR CODE HERE
  const id = req.params.id;

  Movie.findById(id)
    .then((movies) => {
      if (!movies) {
        res.status(404).send({ message: "Not found movies with id " + id });
      } else {
        res.render("movie/add_edit", {
          title: "Edit Movie",
          movie: movies,
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving movies with id " + id });
    });
};

// Processes the data submitted from the Edit form to update a movie
module.exports.processEditPage = (req, res, next) => {
  // ADD YOUR CODE HERE
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
  const id = req.params.id;
  Movie.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update movie with ${id}. Maybe movie not found!`,
        });
      } else {
        if (!req.body) {
          return res
            .status(400)
            .send({ message: "Data to update can not be empty" });
        }
        const id = req.params.id;
        Movie.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
          .then((data) => {
            if (!data) {
              res.status(404).send({
                message: `Cannot Update movie with ${id}. Maybe movie not found!`,
              });
            } else {
              res.redirect("/movie/list");
            }
          })
          .catch((err) => {
            res.status(500).send({ message: "Error Update movie information" });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update movie information" });
    });
};

// Deletes a movie based on its id.
module.exports.performDelete = (req, res, next) => {
  // ADD YOUR CODE HERE
  const id = req.params.id;

  Movie.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "Movie is deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Movie with id=" + id,
      });
    });
};
