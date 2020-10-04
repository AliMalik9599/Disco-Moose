import model.Author;
import model.Book;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import java.util.List;
import persistence.Persister;
import persistence.BookDao;
import persistence.AuthorDao;
import persistence.Sql2oAuthorDao;
import persistence.Sql2oBookDao;
import org.sql2o.Connection;
import org.sql2o.*;

import java.io.IOException;
import java.sql.SQLException;

import static org.junit.Assert.*;

public class DBDaoCRUDTest {

    private static Sql2o sql2o;
    private static String URI;
    private static AuthorDao authorDao;
    private static BookDao bookDao;

    @BeforeClass
    public static void beforeClassTests() throws SQLException {
        URI = "jdbc:sqlite:./MyBooksApp.db";
        sql2o = new Sql2o(URI, null, null);
        authorDao = new Sql2oAuthorDao(sql2o);
        bookDao = new Sql2oBookDao(sql2o);
    }

    @Before
    public void beforeEachTest() throws SQLException {
        //Probably a way to concatenate all of these into one - feel free to alter
        String sql = "DROP TABLE IF EXISTS Authors;";
        try (Connection con = sql2o.open()) {
            Query query = con.createQuery(sql);
            query.executeUpdate();
        }
        sql = "DROP TABLE IF EXISTS Books;";
        try (Connection con = sql2o.open()) {
            Query query = con.createQuery(sql);
            query.executeUpdate();
        }
        sql = "CREATE TABLE IF NOT EXISTS Authors (id INTEGER PRIMARY KEY, name VARCHAR(100) NOT NULL UNIQUE," +
                " numOfBooks INTEGER, nationality VARCHAR(30));";
        try (Connection con = sql2o.open()) {
            Query query = con.createQuery(sql);
            query.executeUpdate();
        }
        sql = "CREATE TABLE IF NOT EXISTS Books (id INTEGER PRIMARY KEY, title VARCHAR(200) NOT NULL," +
                " isbn VARCHAR(14) NOT NULL UNIQUE, publisher VARCHAR(14), year INTEGER, authorId INTEGER NOT NULL," +
                " FOREIGN KEY(authorId) REFERENCES Authors(id) ON UPDATE CASCADE ON DELETE CASCADE);";
        try (Connection con = sql2o.open()) {
            Query query = con.createQuery(sql);
            query.executeUpdate();
        }
    }

    @Test
    public void testBookAdd() throws IOException {
        Author author = new Author("George Orwell", 3, "British");
        int authorId = authorDao.add(author);
        Book book = new Book("1984", "12345", "Penguin", 1920, authorId);
        int bookId = bookDao.add(book);

        String sql = "SELECT * FROM Books WHERE isbn = '12345'";

        List<Book> resultList;
        try(Connection con = sql2o.open()) {
            resultList = con.createQuery(sql).executeAndFetch(Book.class);
        }
        assertEquals((int) resultList.size(), (int) 1);
        assertEquals((int) bookId, (int) resultList.get(0).getId());
        assertEquals("1984", resultList.get(0).getTitle());
        assertEquals("12345", resultList.get(0).getIsbn());
	    assertEquals("Penguin", resultList.get(0).getPublisher());
	    assertEquals(1920, resultList.get(0).getYear());
	    assertEquals((int) authorId, (int) resultList.get(0).getAuthorId());
    }

    @Test
    public void testAuthorAdd() throws IOException {
        Author author = new Author("George Orwell", 3, "British");
        int id = authorDao.add(author);

        String sql = "SELECT * FROM Authors WHERE name = 'George Orwell'";

        List<Author> resultList;
        try(Connection con = sql2o.open()) {
            resultList = con.createQuery(sql).executeAndFetch(Author.class);
        }
        assertEquals((int) resultList.size(), (int) 1);
        assertEquals((int) id, (int) resultList.get(0).getId());
        assertEquals("George Orwell", resultList.get(0).getName());
        assertEquals(3, resultList.get(0).getNumOfBooks());
        assertEquals("British", resultList.get(0).getNationality());
    }

    @Test
    public void testBookListAll() throws IOException {
        Book book1 = new Book("1984", "12345", "Penguin", 1920, 3);
        int book1_id = bookDao.add(book1);
        Book book2 = new Book("Metamorphasis", "67891", "Avon Books", 1900, 6);
        int book2_id = bookDao.add(book2);
        Book book3 = new Book("The Bible", "99999", "Random House", 1910, 9);
        int book3_id = bookDao.add(book3);

        String list_all = "[Book{title='1984', isbn='12345', publisher='Penguin', year=1920, authorId=3}, Book{title='Metamorphasis', isbn='67891', publisher='Avon Books', year=1900, authorId=6}, Book{title='The Bible', isbn='99999', publisher='Random House', year=1910, authorId=9}]";
        assertEquals(bookDao.listAll().toString(), list_all );
    }

    @Test
    public void testAuthorListAll() throws IOException {
        Author author1 = new Author("George Orwell", 3, "British");
        int author1_id = authorDao.add(author1);
        Author author2 = new Author("Franz Kafka", 8, "British");
        int author2_id = authorDao.add(author2);
        Author author3 = new Author("Dr Suess", 1, "American");
        int author3_id = authorDao.add(author3);
        String list_all = "[Author{id=1, name='George Orwell', numOfBooks=3, nationality='British'}, Author{id=2, " +
                "name='Franz Kafka', numOfBooks=8, nationality='British'}, Author{id=3, name='Dr Suess', " +
                "numOfBooks=1, nationality='American'}]";
        assertEquals(authorDao.listAll().toString(), list_all);
    }

    @Test
    public void testBookUpdate() throws IOException {
        Book book1 = new Book("1984", "12345", "Penguin", 1920, 1);
        int id1 = bookDao.add(book1);

        String sql = "SELECT * FROM Books WHERE title = '1984'";
        List<Book> resultList;
        try(Connection con = sql2o.open()) {
            resultList = con.createQuery(sql).executeAndFetch(Book.class);
        }
        assertEquals((int) resultList.size(), (int) 1);
        assertEquals(book1.getPublisher(), resultList.get(0).getPublisher());
        assertEquals(book1.getYear(), resultList.get(0).getYear());

        Book updated_book = new Book("1984", "12345", "Random", 1930, 1);
        boolean updated = bookDao.update(updated_book);
        assertEquals(updated, true);

        sql = "SELECT * FROM Books WHERE title = '1984'";
        try(Connection con = sql2o.open()) {
            resultList = con.createQuery(sql).executeAndFetch(Book.class);
        }
        assertEquals((int) resultList.size(), (int) 1);
        assertEquals(updated_book.getPublisher(), resultList.get(0).getPublisher());
        assertEquals(updated_book.getYear(), resultList.get(0).getYear());
    }

    @Test
    public void testAuthorUpdate() throws IOException {
        Author author = new Author("George Orwell", 3, "British");
        int id1 = authorDao.add(author);

        String sql = "SELECT * FROM Authors WHERE name = 'George Orwell'";
        List<Author> resultList;
        try(Connection con = sql2o.open()) {
            resultList = con.createQuery(sql).executeAndFetch(Author.class);
        }
        assertEquals((int) resultList.size(), (int) 1);
        assertEquals(author.getNumOfBooks(), resultList.get(0).getNumOfBooks());
        assertEquals(author.getNationality(), resultList.get(0).getNationality());

        Author updated_author = new Author("George Orwell", 7, "American");
        boolean updated = authorDao.update(updated_author);
        assertEquals(updated, true);

        sql = "SELECT * FROM Authors WHERE name = 'George Orwell'";
        try(Connection con = sql2o.open()) {
            resultList = con.createQuery(sql).executeAndFetch(Author.class);
        }
        assertEquals((int) resultList.size(), (int) 1);
        assertEquals(updated_author.getNumOfBooks(), resultList.get(0).getNumOfBooks());
        assertEquals(updated_author.getNationality(), resultList.get(0).getNationality());
    }

    @Test
    public void testBookDelete() throws IOException {
        Book book1 = new Book("1984", "12345", "Penguin", 1920, 1);
        int id1 = bookDao.add(book1);
        Book book2 = new Book("Metamorphasis", "67891", "Penguin", 1920, 1);
        int id2 = bookDao.add(book2);
        boolean deleted = bookDao.delete(book2);
        assertEquals(deleted, true);

        String sql = "SELECT id FROM Books WHERE title = '1984'";
        List<Integer> resultList;
        try(Connection con = sql2o.open()) {
            resultList = con.createQuery(sql).executeAndFetch(Integer.class);
        }
        assertEquals((int) resultList.size(), (int) 1);
        assertEquals((int) id1, (int) resultList.get(0));

        sql = "SELECT id FROM Books WHERE title = 'Metamorphasis'";
        try(Connection con = sql2o.open()) {
            resultList = con.createQuery(sql).executeAndFetch(Integer.class);
        }
        assertEquals((int) resultList.size(), (int) 0);
    }

    @Test
    public void testAuthorDelete() throws IOException {
        Author author1 = new Author("George Orwell", 3, "British");
        int id1 = authorDao.add(author1);
        Author author2 = new Author("Franz Kafka", 4, "British");
        int id2 = authorDao.add(author2);
        boolean deleted = authorDao.delete(author2);
        assertEquals(deleted, true);

        String sql = "SELECT id FROM Authors WHERE name = 'George Orwell'";
        List<Integer> resultList;
        try(Connection con = sql2o.open()) {
            resultList = con.createQuery(sql).executeAndFetch(Integer.class);
        }
        assertEquals((int) resultList.size(), (int) 1);
        assertEquals((int) id1, (int) resultList.get(0));

        sql = "SELECT id FROM Authors WHERE name = 'Franz Kafka'";
        try(Connection con = sql2o.open()) {
            resultList = con.createQuery(sql).executeAndFetch(Integer.class);
        }
        assertEquals((int) resultList.size(), (int) 0);
    }
}
