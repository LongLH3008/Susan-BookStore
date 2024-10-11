import { Request, Response } from "express";
import { SuccessResponse } from "../../cores/succes.response";
import {
  FireworksService,
  QdrantService,
} from "../../Services/advancedSearch.service";
import { v4 as uuidv4 } from "uuid";
export default class VectorSearchController {
  static async advancedSearch(req: Request, res: Response): Promise<any> {
    try {
      const fireworksData = await new FireworksService().getData(req.body);
      const query = {
        vector: fireworksData?.data[0]?.embedding,
        limit: 5,
        with_payload: true,
      };

      const qdrantResponse = await new QdrantService().searchProductByQdrant(
        query
      );

      return res.status(200).json(qdrantResponse);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async loadData(req: Request, res: Response): Promise<any> {
    try {

      const fireworksData = await (new FireworksService).getData(req.body);
      console.log("fireworksData", fireworksData);

      const points = fireworksData.data.map((item: any, index: number) => ({
        id: uuidv4(),
        vector: item.embedding,
        payload: { object: req.body.input[index] },
      }));

      const qdrantResponse = await (new QdrantService).addProductToQdrant(points);

      return res.status(200).json(qdrantResponse);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

}
