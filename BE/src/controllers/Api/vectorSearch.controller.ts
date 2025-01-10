import { Request, Response } from "express";
import { SuccessResponse } from "../../cores/succes.response";
import BookService from "../../Services/Book.service";
import {
  FireworksService,
  QdrantService,
} from "../../Services/advancedSearch.service";
import { v4 as uuidv4 } from "uuid";
export default class VectorSearchController {
  static async advancedSearchBooks(req: Request, res: Response): Promise<any> {
    try {
      const fireworksData = await new FireworksService().getData(req.body);
      const query = {
        vector: fireworksData?.data[0]?.embedding,
        limit: 1000,
        with_payload: true,
      };

      const qdrantResponse = await new QdrantService().searchProductByQdrant(query);
      const filteredResults = qdrantResponse.filter(({score}:{score: number}) => score > 0.7);
      const arrList = filteredResults.map((res:any) => res.payload.object)

      const { page = 1, limit = 10 } = req.query;
      return new SuccessResponse({
        message: "Get books successfully",
        metadata: await BookService.getBookByNameArray(arrList,{ page: Number(page), limit: Number(limit) })
      }).send(res);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async suggestedBooks(req: Request, res: Response): Promise<any> {
    try {
      const fireworksData = await new FireworksService().getData(req.body);
      const query = {
        vector: fireworksData?.data[0]?.embedding,
        limit: 4,
        with_payload: true,
      };

      const qdrantResponse = await new QdrantService().searchProductByQdrant(query);
      const arrList = qdrantResponse.map((res:any) => res.payload.object)

      const page = 1, limit = 4;
      return new SuccessResponse({
        message: "Get books successfully",
        metadata: await BookService.getBookByNameArray(arrList,{ page: Number(page), limit: Number(limit) })
      }).send(res);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async advancedSearchKeywords(req: Request, res: Response): Promise<any> {
    try {
      const fireworksData = await new FireworksService().getData(req.body);
      const query = {
        vector: fireworksData?.data[0]?.embedding,
        limit: 10,
        with_payload: true,
      };

      const qdrantResponse = await new QdrantService().searchProductByQdrant(query);
      const arrList = qdrantResponse.map((res:any) => res.payload.object)
      return res.status(200).json(arrList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async loadData(req: Request, res: Response): Promise<any> {
    try {

      const fireworksData = await (new FireworksService).getData(req.body);
      // console.log("fireworksData", fireworksData);

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
