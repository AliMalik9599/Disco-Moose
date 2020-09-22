import model.Author;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import persistence.Persister;
import persistence.BookDao;
import persistence.AuthorDao;
import persistence.Sql2oAuthorDao;
import persistence.Sql2oBookDao;


import java.io.IOException;
import java.sql.*;

import static org.junit.Assert.*;
public class DBDaoCRUDTest {
    private Persister<Author> p;
    private static Author a1;
    private static Author a2;

    @BeforeClass
    public static void beforeTest() {
        a1 = new Author("J.D Salinger", 8, "American");
    }

    @Test
    public void testBookAdd() throws IOException {

    }

    @Test
    public void testAuthorAdd() throws IOException {

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
