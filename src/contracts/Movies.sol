pragma solidity ^0.5.0;

contract Movies {
    string public name;
    uint256 public movieCount = 0;
    mapping(uint256 => Movie) public movies;

    struct Movie {
        uint256 id;
        string title;
        uint256 rating;
        address author;
    }

    constructor() public {
        name = 'Prototipo RTVC';
    }

    event MovieCreated(
        uint256 id,
        string title,
        uint256 rating,
        address author
    );

    function createMovie(string memory _title) public {
        //Require valid title
        require(bytes(_title).length > 0);

        //Increase movie count
        movieCount++;

        //create the movie

        //Movie (id, title, rating, author)
        Movie memory newMovie = Movie(movieCount, _title, 0, msg.sender);
        movies[movieCount] = newMovie;

        emit MovieCreated(
            newMovie.id,
            newMovie.title,
            newMovie.rating,
            newMovie.author
        );
    }
}
