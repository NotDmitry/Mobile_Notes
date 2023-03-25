import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('expoNotesAppDatabase.db');

export function createTable() {
    db.transaction((trs) => {
        trs.executeSql(
            'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, time TEXT, body TEXT)',
            [],
            () => {
                console.log('Table created successfully!');
            },
            (trsObj, error) => {
                console.log(`Error: ${error.message}`);
            }
        );
    });
}

export function getAllNotes() {
    return new Promise((resolve, reject) => {
        db.transaction((trs) => {
            trs.executeSql(
                'SELECT * FROM notes',
                [],
                (trsObj, { rows: { _array } }) => {
                    resolve(_array);
                },
                (trsObj, error) => {
                    reject(error);
                }
            );
        });
    });
}

function addNote(note) {
    return new Promise((resolve, reject) => {
        db.transaction((trs) => {
            trs.executeSql(
                'INSERT INTO notes (title, time, body) VALUES (?, ?, ?)',
                [note.title, note.time, note.body],
                (trsObj, resultSet) => {
                    resolve(resultSet.insertId);
                },
                (trsObj, error) => {
                    reject(error);
                }
            );
        });
    });
}

function updateNote(note) {
    return new Promise((resolve, reject) => {
        db.transaction((trs) => {
            trs.executeSql(
                'UPDATE notes SET title=?, time=?, body=? WHERE id=?',
                [note.title, note.time, note.body, note.id],
                () => {
                    resolve(note.id);
                },
                (trsObj, error) => {
                    reject(error);
                }
            );
        });
    });
}

export async function addOrUpdateNote(note) {
    if (note.id === -1) {
        return await addNote(note).catch((e) => console.log(e));
    } else {
        return await updateNote(note).catch((e) => console.log(e));
    }
}

export function removeNote(note) {
    return new Promise((resolve, reject) => {
        db.transaction((trs) => {
            trs.executeSql(
                'DELETE FROM notes WHERE id=?',
                [note.id],
                () => {
                    resolve();
                },
                (trsObj, error) => {
                    reject(error);
                }
            );
        });
    });
}