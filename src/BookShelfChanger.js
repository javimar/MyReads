import React, { Component } from 'react';
import PropTypes from 'prop-types'

class BookShelfChanger extends Component
{
    static propTypes =
    {
        book: PropTypes.object.isRequired,
        books: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired
    }

    render()
    {
        const { book, books, changeShelf } = this.props

        // Default the current shelf to "none"
        let currentShelf = 'none'

        // Go through array of books and if book is in list, set the shelf and exit
        for(let elem of books)
        {
            if (elem.id === book.id)
            {
                currentShelf = elem.shelf
                break // exit for loop
            }
        }

        return (
            <div className="book-shelf-changer">
                <select onChange={ (evt) => changeShelf(book, evt.target.value) }
                    defaultValue={ currentShelf }>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default BookShelfChanger
