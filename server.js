import express from 'express';
import cors from 'cors'; 
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
app.use(cors());
app.use(express.json());

const dbPromise = open({
    filename: './database.db',
    driver: sqlite3.Database
});

const initializeDatabase = async () => {
    const db = await dbPromise;
    await db.exec('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY, title TEXT, author TEXT, description TEXT)');
};

initializeDatabase();

app.post('/books', async (request, response) => {
    try{
        const db = await dbPromise;
        const { title, author, description } = request.body;    
        const result = await db.run('INSERT INTO books (title, author, description) VALUES (?, ?, ?)', [title, author, description]);
        const book = await db.get('SELECT * FROM books WHERE id = ?', [result.lastID]);
        
        response.status(201).json(book);
    } catch(e) {
        response.status(500).send(e.message);
    }
});

app.get('/books', async (request, response) => {
    try{
        const db = await dbPromise;
        const books = await db.all('SELECT * FROM books');
        response.json(books);
    } catch(e) {
        response.status(500).send(e.message);
    }
});

app.get('/books/:id', async (request, response ) => {
    try {
        const db = await dbPromise;
        const {id} = request.params;
        const book = await db.get('SELECT * FROM books WHERE id = ?', [id]);
    
        if (book) {
            response.json(book);
        } else {
            response.status(404).json({message: 'Book not found'});
        }
    } catch(e) {
        response.status(500).send(e.message);
    }
    

});

app.put('/books/:id', async (request, response) => {
    try {
        const db = await dbPromise;
        const { id } = request.params;
        const { title, author, description } = request.body;

        await db.run('UPDATE books SET title = ?, author = ?, description = ? WHERE id = ?', [title, author, description, id]);
        const book = await db.get('SELECT * FROM books WHERE id = ?', [id]);

        response.json(book);
    } catch(e) {
        response.status(500).send(e.message);
    }
});

app.delete('/books/:id', async (request, response) => {
    try {
        const db = await dbPromise;
        const { id } = request.params;
    
        const book = await db.get('SELECT * FROM books WHERE id = ?', [id]);
    
        if (!book) {
            response.status(404).json({message: 'Book not found'});
            return;
        }
    
        await db.run('DELETE FROM books WHERE id = ?', [id]);
    
        response.status(204).send();
    } catch(e) {
        response.status(500).send(e.message);
    }

});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});