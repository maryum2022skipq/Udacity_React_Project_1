import blankBackground from "./img/placeholder.png";
import PropTypes from "prop-types";

const DisplayBook = ({ book, handleSelected }) => {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                (book.imageLinks && book.imageLinks.thumbnail) ||
                blankBackground
              })`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              defaultValue={book.shelf ? book.shelf : ""}
              onChange={(e) => handleSelected(e.target.value, book)}
            >
              <option value="select" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors
          ? book.authors.map((author) => (
              <div key={author} className="book-authors">
                {author}
              </div>
            ))
          : ""}
      </div>
    </li>
  );
};

DisplayBook.propTypes = {
  book: PropTypes.object.isRequired,
  handleSelected: PropTypes.func.isRequired,
};

export default DisplayBook;
