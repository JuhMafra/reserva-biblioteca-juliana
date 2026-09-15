import { createContext, useEffect, useState } from "react";
import { books } from "../data/books";
const STORAGE_KEY = "reserva-biblioteca:books";

function loadBooks() {
  const savedBooks = localStorage.getItem(STORAGE_KEY);
  if (!savedBooks) return books;
  try {
    const parsedBooks = JSON.parse(savedBooks);
    return Array.isArray(parsedBooks) ? parsedBooks : books;
  } catch {
    return books;
  }
}
// eslint-disable-next-line react-refresh/only-export-components
export const BooksContext = createContext(null);

export function BooksProvider({ children }) {
const [livro, setLivro] = useState(loadBooks);
const [pesquisa, setPesquisa] = useState("");

 const completedCount = livro.filter(
 (book) => book.available,
 ).length;
 useEffect(() => {
     localStorage.setItem(STORAGE_KEY, JSON.stringify(livro));
   }, [livro]);
   useEffect(() => {
    document.title = `${completedCount}/${livro.length} livros reservados`;
      }, [completedCount, livro.length]);

 function addBook(newBook) {
 setLivro((current) => [...current, newBook]);
 }
 function toggleBook(bookId) {
 setLivro((current) =>
 current.map((book) =>
 book.id === bookId
 ? { ...book, available: !book.available }
 : book
 ),
 );
 }

  const filteredBooks = livro.filter((book) => {
    const query = pesquisa.toLowerCase().trim();
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    );
  });


 const value = {
 livro,
 books:filteredBooks,
 pesquisa,
 setPesquisa,
completedCount,
addBook,
toggleBook,
 };
 return (
 <BooksContext.Provider value={value}>
 {children}
 </BooksContext.Provider>
 );
}