import mongoose from "mongoose";
import { IMessage } from "../interfaces/models/IMessage";


const COLLECTION_NAME = "Message";
const DOCUMENT_NAME = "Messages";

export interface IMessageModel extends IMessage, mongoose.Document {}

const MessageSchema = new mongoose.Schema<IMessageModel>(
    {
        senderID : { type : String, required : true},
        receiverID : {type : String, required : true},
        content : {type : String, required : true},
        type : {type : String, required : true, enum : ['text', 'image', 'video'], default : 'text'},
        sendAt : {type : Date, default : Date.now}
    },
    {
        timestamps : { createdAt : true, updatedAt : true},
        collection : COLLECTION_NAME
    }
)

const Message = mongoose.model<IMessageModel>(DOCUMENT_NAME, MessageSchema);
export default Message;