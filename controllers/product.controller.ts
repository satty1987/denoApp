import db from "../database/db.ts";
import { RouterContext } from "https://deno.land/x/oak/mod.ts";

const database = db.getDatabase;
const accounts = database.collection("accounts");
console.log(database);


const getaccount = async (ctx: RouterContext) => {
    // Get account from MongoDB
    try {
        const account = await accounts.find();
        ctx.response.body = account;
        ctx.response.status = 200; 
    } catch (error) {
        ctx.response.body = {error: error};
        ctx.response.status = 500; 
    }
};

const getAccountbyId = async (ctx: RouterContext) => {

    try {
        const id= ctx.params.accountid
        const response = await accounts.findOne({ 'accounts_id': id});
        ctx.response.body = response;
        ctx.response.status = 200; 
    } catch (error) {
        ctx.response.body = {error: error};
        ctx.response.status = 500;  
    }

};


const getSingleNote = async (ctx: RouterContext) => {
    const id = ctx.params.id;
    // Get single note
    const note = await accounts.findOne({ _id: { $oid: id } });

    // Return output
    ctx.response.body = note;
};

const createNote = async (ctx: RouterContext) => {
    // Get title and body from request
    const { value: { title, body } } = await ctx.request.body();
    // Create Note object
    const note: any = {
        title,
        body,
        date: new Date(),
    };
    // Insert Note in MongoDB
    const id = await accounts.insertOne(note);

    note._id = id;
    // Return with success response
    ctx.response.status = 201;
    ctx.response.body = note;
};

const updateNote = async (ctx: RouterContext) => {
    const id = ctx.params.id;
    // Get title and body from request
    const { value: { title, body } } = await ctx.request.body();

    const { modifiedCount } = await accounts.updateOne(
        { _id: { $oid: id } },
        {
            $set: {
                title,
                body,
            },
        },
    );

    if (!modifiedCount) {
        ctx.response.status = 404;
        ctx.response.body = { message: "Note does not exist" };
        return;
    }

    ctx.response.body = await accounts.findOne({ _id: { $oid: id } });
};

const deleteNote = async (ctx: RouterContext) => {
    const id = ctx.params.id;
    const count = await accounts.deleteOne({ _id: { $oid: id } });
    if (!count) {
        ctx.response.status = 404;
        ctx.response.body = { message: "Note does not exist" };
        return;
    }

    ctx.response.status = 204;
};

export { getaccount,getAccountbyId,  createNote, getSingleNote, updateNote, deleteNote };