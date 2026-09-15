import { useEffect, useState } from "react";
import "./App.css";
import { books } from "./data/books";
import Panel from "./components/panel";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

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

export default function App() {
  const [livro, setLivro] = useState(loadBooks);
  const [pesquisa, setPesquisa] = useState("");

  const completedCount = livro.filter(
    (book) => book.available,
  ).length;
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(livro));
  }, [livro]);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${completedCount}/${livro.length} livros reservados`;
    return () => {
      document.title = previousTitle;
    };
  }, [completedCount, livro.length]);



  function handleAddBook(newBook) {
    setLivro((prevLivros) => [...prevLivros, newBook]);
  }

  function handleReserve(bookId) {
    setLivro((currentBook) =>
      currentBook.map((book) =>
        book.id === bookId
          ? { ...book, available: !book.available }
          : book,
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

  return (
    <main className="app">
      <header className="hero">
        <p className="eyebrow">BIBLIOTECA ITEAM</p>
        <h1>Reserva de livros do acervo.</h1>
        <p>Consulte a disponibilidade e reserve o que precisar.</p>
        <p>
          {completedCount} de {livro.length} livros disponiveis.
        </p>
      </header>
      <Panel title="Novo livro">
        <BookForm onAddBook={handleAddBook} />
      </Panel>
      <Panel title="Livros">
        <div className="search-box">
          <input
            type="text"
            placeholder="Pesquisar por título ou autor..."
            value={pesquisa}
            onChange={(pesquisar) => setPesquisa(pesquisar.target.value)}
          />
        </div>
        <br />
        <BookList books={filteredBooks} onToggle={handleReserve} />
      </Panel>
    </main>
  );
}
