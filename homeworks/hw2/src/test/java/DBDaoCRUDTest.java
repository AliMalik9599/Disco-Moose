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

//        String sql = "DROP TABLE IF EXISTS Authors; DROP TABLE IF EXISTS Books;";
//        try (Connection con = sql2o.open()) {
//            Query query = con.createQuery(sql);
//            query.executeUpdate();
//        }
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

    // Not passing for some reason?
    @Test
    public void testBookAdd() throws IOException {
        Author author = new Author("George Orwell", 3, "British");
        int authorId = authorDao.add(author);
        Book book = new Book("1984", "12345", "Penguin", 1920, 3);
        int bookId = bookDao.add(book);

        String sql = "SELECT id FROM Books WHERE isbn = '12345'";

        List<Integer> resultList;
        try(Connection con = sql2o.open()) {
            resultList = con.createQuery(sql).executeAndFetch(Integer.class);
        }
        assertEquals((int) resultList.size(), (int) 1);
        assertEquals((int) bookId, (int) resultList.get(0));
    }

    @Test
    public void testAuthorAdd() throws IOException {
        Author author = new Author("George Orwell", 3, "British");
        int id = authorDao.add(author);

        String sql = "SELECT id FROM Authors WHERE name = 'George Orwell'";

        List<Integer> resultList;
        try(Connection con = sql2o.open()) {
            resultList = con.createQuery(sql).executeAndFetch(Integer.class);
        }
        assertEquals((int) resultList.size(), (int) 1);
        assertEquals((int) id, (int) resultList.get(0));
    }

    @Test
    public void testBookReturn() throws IOException {

    }

    @Test
    public void testAuthorReturn() throws IOException {

    }

    @Test
    public void testBookUpdate() throws IOException {

    }

    @Test
    public void testAuthorUpdate() throws IOException {

    }

    @Test
    public void testBookDelete() throws IOException {

    }

    @Test
    public void testAuthorDelete() throws IOException {

    }

}
