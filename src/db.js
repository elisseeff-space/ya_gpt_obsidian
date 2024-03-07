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

    async jornal_add_record(param_in=[]) {

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
        this.prm = param_in
        await this.query(`INSERT INTO tbl_ya_gpt_log VALUES ('${param_in[0]}', ${param_in[1]}, '${param_in[2]}', '${param_in[3]}', '${param_in[4]}', '${param_in[5]}', ${param_in[6]}, ${param_in[7]}, ${param_in[8]});`, 'run');
    };

    async serialize() {
        //await query("CREATE TABLE IF NOT EXISTS posts (date text, title text, author text, content text, tags text)", 'run');
        await this.jornal_add_record();
    }
}