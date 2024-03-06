import sqlite3 from 'sqlite3';
//import { LoremIpsum } from 'lorem-ipsum';

export class DB_dispatcher {

    SQLite3 = null
    db = null
    prm = null

    constructor() {
        this.SQLite3 = sqlite3.verbose();
        this.db = new this.SQLite3.Database('./db/yandex_gpt.db');
        this.prm = ['333', 345, new Date().toISOString().slice(0, 19).replace('T', ' '), 'user', 'query', 'answer', 33, 44, 55]
        //console.log(this.prm)
    }

    query(command, method = 'all') {
        return new Promise((resolve, reject) => {
            this.db[method](command, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
            })
        })
    };

    async jornal_add_record() {

        /* CREATE TABLE "tbl_ya_gpt_log" (
            "chat_id"	TEXT,
            "user_id"	INTEGER,
            "use_date"	TEXT,
            "dialog_role"	TEXT,
            "query"	TEXT,
            "answer"	TEXT,
            "usage_inputTextTokens"	INTEGER,
            "usage_completionTokens"	INTEGER,
            "usage_totalTokens"	INTEGER
        )
        */
         
        await this.query(`INSERT INTO tbl_ya_gpt_log VALUES ('${this.prm[0]}', ${this.prm[1]}, '${this.prm[2]}', '${this.prm[3]}', '${this.prm[4]}', '${this.prm[5]}', ${this.prm[6]}, ${this.prm[7]}, ${this.prm[8]});`, 'run');
    };

    async serialize() {
        //await query("CREATE TABLE IF NOT EXISTS posts (date text, title text, author text, content text, tags text)", 'run');
        await this.jornal_add_record();
    }
}