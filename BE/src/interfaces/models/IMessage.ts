import mongoose from "mongoose";

export interface IMessage
{
    senderID : string,
    receiverID : string,
    content : string,
    type : string,
    sendAt : Date | string
}