import Locals from "../providers/Locals";
import axios from "axios";

class FireworksService {
  private baseUrl: string;
  private token: string;

  constructor() {
    this.baseUrl = Locals.config().fireworkUrl;
    this.token = Locals.config().fireworkToken;
  }

  public async getData(mydata: any): Promise<any> {
    try {
      const { data } = await axios.post(`${this.baseUrl}`, mydata, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error: any) {
      throw new Error(`Fireworks data retrieval failed: ${error.message}`);
    }
  }
}

class QdrantService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = Locals.config().qdrantUrl;
  }

  public async searchProductByQdrant(query: any): Promise<any> {
    try {
      const { data } = await axios.post(
        `${this.baseUrl}/collections/products/points/search`,
        {
          ...query,
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
        }
      );

      return data;
    } catch (error: any) {
      throw new Error(`Qdrant add data failed: ${error.message}`);
    }
  }
}

class AdvancedSearch {
  static async advancedSearch(query: any): Promise<any> {
    return query;
  }
}

// export default AdvancedSearch;
