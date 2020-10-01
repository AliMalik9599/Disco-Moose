import okhttp3.*;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.Before;
import java.io.IOException;
import java.sql.*;
import static org.junit.Assert.*;

public class RESTAPITest {

    static OkHttpClient client;
    @BeforeClass
    public static void beforeClassTests() throws SQLException {
        client = new OkHttpClient();
    }

    @Before
    public void beforeEach() throws IOException {
        Request request = new Request.Builder()
        .url("http://localhost:7000/newTables")
        .build();
        Response response = client.newCall(request).execute();
        assertEquals(200, response.code());
    }

    @Test
    public void testListAuthors() throws IOException {      //Don't even need this tbh as checked in test function below
        RequestBody postBody = new FormBody.Builder()
                .add("name", "Ali Hedayat")
                .add("numOfBooks", "26")
                .add("nationality", "Iranian")
                .build();
        Request request1 = new Request.Builder()
                .url("http://localhost:7000/addauthor")
                .post(postBody)
                .build();
        Response response1 = client.newCall(request1).execute();
        assertEquals(201, response1.code());


        Request request = new Request.Builder()
                .url("http://localhost:7000/authors")
                .build();
        Response response = client.newCall(request).execute();
        assertEquals(200, response.code());
        String text = response.body().string();
        System.out.println(text);
        assert(text.contains("Ali"));
    }

    @Test
    public void testAddAuthor_and_ListAuthors() throws IOException {
        RequestBody postBody = new FormBody.Builder()
                .add("name", "Ali Hedayat")
                .add("numOfBooks", "26")
                .add("nationality", "Iranian")
                .build();
        Request request1 = new Request.Builder()
                .url("http://localhost:7000/addauthor")
                .post(postBody)
                .build();
        Response response1 = client.newCall(request1).execute();
        assertEquals(201, response1.code());

        RequestBody postBody1 = new FormBody.Builder()
                .add("name", "Sadegh Hedayat")
                .add("numOfBooks", "26")
                .add("nationality", "Iranian")
                .build();
        Request request2 = new Request.Builder()
                .url("http://localhost:7000/addauthor")
                .post(postBody1)
                .build();
        Response response2 = client.newCall(request2).execute();
        assertEquals(201, response2.code());

        
        
        Request request = new Request.Builder()
                .url("http://localhost:7000/authors")
                .build();
        Response response = client.newCall(request).execute();
        assertEquals(200, response.code());
        String text = response.body().string();
        System.out.println(text);
        assert(text.contains("Ali"));
        assert(text.contains("Sadegh"));

    }

    @Test
    public void testAddBook_and_ListBooks() throws IOException {
        RequestBody postBody1 = new FormBody.Builder()
                .add("name", "Ali Hedayat")
                .add("numOfBooks", "26")
                .add("nationality", "Iranian")
                .build();
        Request request2 = new Request.Builder()
                .url("http://localhost:7000/addauthor")
                .post(postBody1)
                .build();
        Response response2 = client.newCall(request2).execute();
        assertEquals(201, response2.code());



        RequestBody postBody = new FormBody.Builder()
                .add("title", "This is a book")
                .add("isbn", "2635671")
                .add("publisher", "penguin")
                .add("year", "2020")
                .add("authorId", "1")
                .build();
        Request request1 = new Request.Builder()
                .url("http://localhost:7000/addbook")
                .post(postBody)
                .build();
        Response response1 = client.newCall(request1).execute();
        assertEquals(201, response1.code());

        /* RequestBody postBody1 = new FormBody.Builder()
                .add("title", "Another Book")
                .add("isbn", "1234567")
                .add("publisher", "penguin")
                .add("year", "2020")
                .add("authorId", "2")
                .build();
        Request request2 = new Request.Builder()
                .url("http://localhost:7000/addbook")
                .post(postBody1)
                .build();
        Response response2 = client.newCall(request2).execute();
        assertEquals(201, response2.code()); */



        Request request = new Request.Builder()
                .url("http://localhost:7000/books")
                .build();
        Response response = client.newCall(request).execute();
        assertEquals(200, response.code());
        String text = response.body().string();
        System.out.println(text);
        assert(text.contains("2635671"));
        

    }
}