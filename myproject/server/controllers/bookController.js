const axios = require('axios');

// Kitab axtarışını həyata keçirən funksiya
const searchBooks = async (req, res) => {
  const query = req.query.query || 'JavaScript'; // Parametr olaraq daxil edilən kitab axtarışını al
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  try {
    // Google Books API-yə sorğu göndəririk
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`);

    const books = response.data.items.map(item => ({
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || ['Məlumat yoxdur'],
      description: item.volumeInfo.description || 'Məlumat yoxdur',
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
    }));

    res.status(200).json(books); // Kitabları JSON formatında geri qaytarırıq
  } catch (error) {
    res.status(500).json({ message: 'API sorğusunda xəta baş verdi', error: error.message });
  }
};

module.exports = { searchBooks };
