import BookCard from "./BookCard";
export default function BookList({books, onToggle}) {
 if (books.length === 0) {
 return <p>Nenhum livro no acervo.</p>;
 }
 return (
 <section className="book-list" aria-label="Livros">
 {books.map((book) => (
 <BookCard
 key={book.id}
 {...book}
 onToggle={onToggle}
 />
 ))}
 </section>
 );
}
