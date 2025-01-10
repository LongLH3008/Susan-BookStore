import mongoose from "mongoose";
import { IContact } from "../interfaces/models/IContact";

const COLLECTION_NAME = "Contact";
const DOCUMENT_NAME = "Contacts";

export interface IContactModel extends IContact, mongoose.Document { }

const ContactSchema = new mongoose.Schema<IContactModel>(
    {
        full_name : { type : String, required : true },
        email : {type : String, required : true},
        subject : {type : String, required : true},
        content : { type : String, required : true}
    },
    {
        timestamps: { createdAt: true, updatedAt: true },
        collection: COLLECTION_NAME,
    }
)

const Contact = mongoose.model<IContactModel>(DOCUMENT_NAME, ContactSchema);
export default Contact;
