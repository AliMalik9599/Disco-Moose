# Homework 2 - MyBooksApp

This is the extended MyBooks app for Homework 2. 
It is built off of the MyBooks app that we have been working on in fall 2020 OOSE class together.
We have added delete and update methods for the AuthorDao and BookDao interfaces for deleting books/authors and updating them.
The delete method takes in a Book or Author object and queries the database by isbn or name respectively, then deletes them from the database.
The Book update method takes a Book or Author object and queries by isbn and updates the year and publisher. 
The Author update method takes an Author object and queries by name and updates the nationality and number of books.
In addition, we wrote several unit tests for Sql2oAuthorDao and Sql2oAuthorDao to test each class's methods.
We assumed there were no duplicates in the database, but additional testing could account for edge cases like these in the future.

Over the course of this project, we encountered an issue with the getAuthorId method in the Book class that caused our testBookAdd test to fail.
The method was originally named getAuthor, but upon calling Book class was looking for a method named getAuthorId; when it couldn't find it, it returned null.
Once we fixed it, all tests passed.








