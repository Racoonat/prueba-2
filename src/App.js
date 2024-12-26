import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Componente principal
function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    status: 'Pendiente',
    rating: 1,
    review: ''
  });

  // Cargar libros desde el servidor
  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar los libros:', error);
      });
  }, [books]);

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/books', newBook)
      .then((response) => {
        setBooks([...books, response.data]);
        setNewBook({ title: '', author: '', status: 'Pendiente', rating: 1, review: '' });
      })
      .catch((error) => {
        console.error('Error al agregar el libro:', error);
      });
  };

  return (
    <div className="App">
      <h1>Tracker de Libros</h1>
      
      {/* Formulario para añadir un libro */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Autor"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <select
          value={newBook.status}
          onChange={(e) => setNewBook({ ...newBook, status: e.target.value })}
        >
          <option value="Leído">Leído</option>
          <option value="Pendiente">Pendiente</option>
        </select>
        <input
          type="number"
          min="1"
          max="5"
          value={newBook.rating}
          onChange={(e) => setNewBook({ ...newBook, rating: parseInt(e.target.value) })}
        />
        <textarea
          placeholder="Reseña"
          value={newBook.review}
          onChange={(e) => setNewBook({ ...newBook, review: e.target.value })}
        />
        <button type="submit">Añadir libro</button>
      </form>
      
      {/* Lista de libros */}
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <h3>{book.title} ({book.status})</h3>
            <p>{book.author}</p>
            <p>Rating: {book.rating} estrellas</p>
            <p>{book.review}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
