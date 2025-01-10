import { CreatedResponse, OKResponse, SuccessResponse } from "../../cores/succes.response";
import ContactService from "../../Services/Contact.service";

class ContactController {
	static async create(req: Request | any, res: Response): Promise<any> {
		return new CreatedResponse({
			message: "Create Contact successFully !",
			metadata: await ContactService.createContact(req.body),
		}).send(res);
	}
	static async List(req: Request | any, res: Response): Promise<any> {
		return new SuccessResponse({
			message: "List Contact successFully !",
			metadata: await ContactService.ListContact(req.query.pageNumber, req.query.limit)
		}).send(res);
	}

    static async Detail(req: Request | any, res: Response): Promise<any> {
		return new SuccessResponse({
			message: "Detail Contact successFully !",
			metadata: await ContactService.DetailContact(req.params.id)
		}).send(res);
	}


    
}

export default ContactController;