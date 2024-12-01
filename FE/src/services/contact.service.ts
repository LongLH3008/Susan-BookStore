import { SendRequest } from "@/config";

export const sendContactFromUser = async (arg: { full_name: string, email: string, subject: string, content: string }) => {
    return await SendRequest('POST', 'contact/create', arg);
}