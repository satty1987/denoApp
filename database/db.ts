import { init, MongoClient } from "https://deno.land/x/mongo@v0.6.0/mod.ts";
// import { config } from "https://deno.land/x/dotenv/mod.ts";
// const env = config()

// @ts-ignore
await init();

class DB {
    public client: MongoClient;
    constructor(public dbName: string, public url: string) {
        this.dbName = dbName;
        this.url = url;
        this.client = {} as MongoClient;
    }
    connect() {
        const client = new MongoClient();
        client.connectWithUri(this.url);
        this.client = client;
    }
    get getDatabase() {
        return this.client.database(this.dbName);
    }
}
// console.log(env);
const dbName = "bankmanagement" ;
const dbHostUrl = "mongodb://admin:admin123@ds137801.mlab.com:37801/bankmanagement";
const db = new DB(dbName, dbHostUrl);
db.connect();

export default db;