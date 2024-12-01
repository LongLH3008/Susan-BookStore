import mongoose from "mongoose";

export interface IContact 
{
    full_name : string,
    email : string,
    subject : string,
    content : string 
    createdAt: Date | string
    updatedAt: Date | string
}