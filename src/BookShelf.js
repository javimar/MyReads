import React from 'react';
import Book from './Book'

function BookShelf(props) // Stateless Functional Component
{
    const { books, changeShelf } = props

    return (
        <ol className="books-grid">
            {
                books.map((book) => (
                <Book
                    book={ book }
                    books={ books }
                    key={ book.id }
                    changeShelf={ changeShelf }
                />
                ))
            }
        </ol>
    )
}

export default BookShelf
