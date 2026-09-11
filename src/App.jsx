import { useState } from "react";
import "./App.css";
import { books } from "./data/books";
import Panel from "./components/panel";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

export default function App() {
  const [livro, setLivro] = useState(books);
  const [pesquisa, setPesquisa] = useState("");

  const completedCount = livro.filter(
    (book) => book.available,
  ).length;

  function handleReserve(bookId) {
    setLivro((currentBook) =>
      currentBook.map((book) =>
        book.id === bookId
          ? { ...book, available: !book.available }
          : book,
      ),
    );
  }
  function handleAddBook(newBook) {
    setLivro((prevLivros) => [...prevLivros, newBook]);
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
        <br/>
        <BookList books={filteredBooks} onToggle={handleReserve} />
      </Panel>
    </main>
  );
}
