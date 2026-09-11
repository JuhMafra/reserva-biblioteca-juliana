import BookCard from "./BookCard";
export default function BookList({books}) {
 if (books.length === 0) {
 return <p>Nenhum hábito cadastrado.</p>;
 }
 return (
 <section className="book-list" aria-label="Livros">
 {books.map((book) => (
 <BookCard
 key={book.id}
 {...book}
 />
 ))}
 </section>
 );
}
