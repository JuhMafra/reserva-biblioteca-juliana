import { useContext, useEffect } from "react";
import "./App.css";
import Panel from "./components/panel";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import { BooksContext } from "./context/BooksContext";

export default function App() {
  const booksContext = useContext(BooksContext);

if (!booksContext) {
 throw new Error("BookForm precisa estar dentro de BooksProvider.");
 }
 const { livro, completedCount, pesquisa, setPesquisa } = booksContext;


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
        <BookForm />
      </Panel>
      <Panel title="Livros">
        <input
          type="search"
          placeholder="Buscar por título ou autor..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          className="search-input"
        />
         <BookList />
      </Panel>
    </main>
  );
}
