import { BadRequestError, ResourceNotFoundError } from "../cores/error.response";
import Contact from "../models/Contact.model";

class ContactService 
{
    static async createContact(req : any)
    {
        const { full_name, email, subject, content} = req
        const NewContact = await Contact.create({
            full_name : full_name,
            email : email,
            subject : subject,
            content : content
        })

        if(!NewContact) throw new BadRequestError("Error")
        return NewContact
    }
    
    static async ListContact(pageNumber : number, pageSize : number)
    {
        let ListContact = [];
        ListContact = await Contact.find().skip((pageNumber -1) * pageSize).limit(pageSize).lean();
        const total = await Contact.countDocuments();
        
        return {
            pageNumber : pageNumber,
            pageSize : pageSize,
            total : total,
            data : ListContact
        }
    }

    static async DetailContact(contact_id : string)
    {
        const data = await Contact.findById(contact_id);
        if(!data) throw new ResourceNotFoundError("không tin thấy liên hệ này");
        return data
    }
}

export default ContactService