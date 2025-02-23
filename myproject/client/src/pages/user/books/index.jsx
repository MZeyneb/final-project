import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./index.module.scss";

const Books = ({ darkMode }) => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async (page = 1) => {
    if (!query) return;

    setSearchQuery(query); 
    setSelectedCategory("");
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyAztV8IainJOGwMX-nwwtlypzLZPDYrZss&startIndex=${(page - 1) * 12}&maxResults=12`
      );
      setBooks(response.data.items);
    } catch (error) {
      console.error("Xəta baş verdi:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRandomBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&key=AIzaSyAztV8IainJOGwMX-nwwtlypzLZPDYrZss&startIndex=${(page - 1) * 24}&maxResults=24`
      );
      setBooks(response.data.items);
    } catch (error) {
      console.error("Xəta baş verdi:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = async (category, page = 1) => {
    setSelectedCategory(category); // Kateqoriyanı saxla
    setSearchQuery(""); // Axtarış sorğusunu təmizlə
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&key=AIzaSyAztV8IainJOGwMX-nwwtlypzLZPDYrZss&startIndex=${(page - 1) * 12}&maxResults=12`
      );
      setBooks(response.data.items);
    } catch (error) {
      console.error("Xəta baş verdi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      handleCategoryChange(selectedCategory, page);
    } else if (searchQuery) {
      handleSearch(page);
    } else {
      getRandomBooks();
    }
  }, [page]);

  const Modal = ({ book, onClose }) => {
    if (!book) return null;
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
          <img
            src={
              book.volumeInfo.imageLinks?.large ||
              book.volumeInfo.imageLinks?.thumbnail ||
              "https://via.placeholder.com/150"
            }
            alt={book.volumeInfo.title}
            className={styles.modalImage}
          />
          <h2>{book.volumeInfo.title}</h2>
          <p>
            <strong>Müəllif(lər):</strong> {book.volumeInfo.authors?.join(", ")}
          </p>
          <p>
            <strong>Nəşriyyat:</strong> {book.volumeInfo.publisher || "Məlumat yoxdur"}
          </p>
          <p>
            <strong>Nəşr tarixi:</strong> {book.volumeInfo.publishedDate || "Məlumat yoxdur"}
          </p>
          <p>
            <strong>Səhifə sayı:</strong> {book.volumeInfo.pageCount || "Məlumat yoxdur"}
          </p>
          <p>
            <strong>Kateqoriyalar:</strong>{" "}
            {book.volumeInfo.categories?.join(", ") || "Məlumat yoxdur"}
          </p>
          <p>
            <strong>Qiymətləndirmə:</strong>{" "}
            {book.volumeInfo.averageRating || "Qiymətləndirmə yoxdur"} (
            {book.volumeInfo.ratingsCount || 0} qiymətləndirmə)
          </p>
          <p>
            <strong>Dil:</strong> {book.volumeInfo.language || "Məlumat yoxdur"}
          </p>
          <p>
            <strong>Təsvir:</strong>{" "}
            {book.volumeInfo.description || "Təsvir yoxdur"}
          </p>
          <a
            href={book.volumeInfo.previewLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.previewLink}
          >
            Kitabı önizlə
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className={`${styles["books"]} ${darkMode ? styles["dark-mode"] : ""}`}>
      <div className="container">
        <h1>Kitablar</h1>
        <input
          type="text"
          className={styles["search-input"]}
          placeholder="Kitab adı və ya müəllif..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={styles["search-button"]} onClick={() => handleSearch(1)}>
          Axtar
        </button>

        <div>
          <select onChange={(e) => handleCategoryChange(e.target.value, 1)}>
            <option value="">Kateqoriya seçin</option>
            <option value="fiction">Bədii</option>
            <option value="education">Təhsil</option>
            <option value="children">Uşaqlar</option>
            <option value="sports">İdman</option>
            <option value="cooking">Yemək</option>
            <option value="science">Elmi</option>
            <option value="fantastic">Fantastik</option>
            <option value="philosophy">Fəlsəfə</option>
            <option value="art">İncəsənət</option>
            <option value="thriller">Həyəcan</option>
            <option value="science+fiction">Elmi - bədii</option>
            <option value="psychology">Psixologiya</option>
            <option value="history">Tarix</option>
            <option value="computer">Kompüter</option>
            <option value="comics">Əyləncə</option>
            <option value="mystery">Detektiv</option>
            <option value="romance">Romantik</option>
          </select>
        </div>

        {loading ? (
          <div className={styles.loading}>Yüklənir...</div>
        ) : (
          <div className={styles["books-list"]}>
            {books.length > 0 ? (
              books.map((book) => (
                <div
                  key={book.id}
                  className={styles["book-card"]}
                  onClick={() => {
                    setSelectedBook(book);
                    setIsModalOpen(true);
                  }}
                >
                  <img
                    src={
                      book.volumeInfo.imageLinks?.large ||
                      book.volumeInfo.imageLinks?.thumbnail ||
                      "https://via.placeholder.com/150"
                    }
                    alt={book.volumeInfo.title}
                  />
                  <div className={styles.content}>
                    <h3>{book.volumeInfo.title}</h3>
                    <p>{book.volumeInfo.authors?.join(", ")}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.loading}>Heç bir nəticə tapılmadı...</div>
            )}
          </div>
        )}

        <div className={styles.pagination}>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Əvvəlki
          </button>
          <span>{page}</span>
          <button onClick={() => setPage(page + 1)}>Sonrakı</button>
        </div>
      </div>

      {isModalOpen && (
        <Modal book={selectedBook} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default Books;