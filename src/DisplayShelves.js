import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import DisplayBook from "./DisplayBook";

const DisplayShelves = ({ shelves, UpdateBook }) => {
  //handle book shelf change
  const handleSelected = (value, book) => {
    UpdateBook(book, value);
  };

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map((shelf) => (
              <div className="bookshelf" key={shelf.name}>
                <h2 className="bookshelf-title">{shelf.name}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {shelf.books.map((book) => (
                      <DisplayBook
                        key={book.id}
                        book={book}
                        handleSelected={handleSelected}
                      />
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

DisplayShelves.propTypes = {
  shelves: PropTypes.array.isRequired,
  UpdateBook: PropTypes.func.isRequired,
};

export default DisplayShelves;
