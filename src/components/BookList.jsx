import { useContext } from "react";
import { BooksContext } from "../context/BooksContext";
import BookCard from "./BookCard";

export default function BookList() {
 const booksContext = useContext(BooksContext);
 if (!booksContext) {
 throw new Error("BookList precisa estar dentro de BooksProvider.");
 }
 const { books, toggleBook } = booksContext;
 if (books.length === 0) {
 return <p>Nenhum livro cadastrado.</p>;
 }
 return (
 <section className="book-list" aria-label="Livros">
 {books.map((book) => (
 <BookCard
 key={book.id}
 {...book}
 onToggle={toggleBook}
 />
 ))}
 </section>
 )
}