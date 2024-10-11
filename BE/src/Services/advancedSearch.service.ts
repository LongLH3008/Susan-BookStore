import Locals from "../providers/Locals";
import axios from "axios";

export class FireworksService {
  private baseUrl: string;
  private fireworksToken: string;

  constructor() {
    this.baseUrl = Locals.config().fireworkUrl;
    this.fireworksToken = Locals.config().fireworkToken;
  }

  public async getData(mydata: any): Promise<any> {
    try {
      const { data } = await axios.post(`${this.baseUrl}`, mydata, {
        headers: {
          Authorization: `Bearer ${this.fireworksToken}`,
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error: any) {
      throw new Error(`Fireworks data retrieval failed: ${error.message}`);
    }
  }
}

export class QdrantService {
  private baseUrl: string;
  private qdrantApi: string;

  constructor() {
    this.baseUrl = Locals.config().qdrantUrl;
    this.qdrantApi = Locals.config().qdrantApi;
  }

  public async searchProductByQdrant(query: any): Promise<any> {
    try {
      const { data } = await axios.post(
        `${this.baseUrl}/collections/products/points/search`,
        {
          ...query,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": this.qdrantApi,
          },
        }
      );

      return data.result;
    } catch (error: any) {
      throw new Error(`Qdrant search failed: ${error.message}`);
    }
  }
  public async addProductToQdrant(points: any): Promise<any> {
    try {
      const { data } = await axios.put(
        `${this.baseUrl}/collections/products/points`,
        {
          points: points,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": this.qdrantApi,
          },
        }
      );

      return data;
    } catch (error: any) {
      throw new Error(`Qdrant add data failed: ${error.message}`);
    }
  }
}


// export default AdvancedSearch;
