import Dzhyun from "dzhyunjs";

import DzhYunTokenManager from "./dzhYunTokenManager";

const APP_ID = "2ca86d298f5311e6a8e20242ac110048";
const SECRET_KEY = "2JyBn4NCVymx";
const SHORT_ID = "00000055";

class Singleton {
  private static instance: any = null;
  private static tokenManager: DzhYunTokenManager;

  // Private constructor to prevent instantiation
  private constructor() {}

  // Static method to initialize the token manager
  private static initializeTokenManager() {
    if (!Singleton.tokenManager) {
      Singleton.tokenManager = new DzhYunTokenManager(
        APP_ID,
        SECRET_KEY,
        SHORT_ID
      );
    }
  }

  // Static method to get the singleton instance
  public static getInstance() {
    if (!Singleton.instance) {
      Singleton.initializeTokenManager();
      Singleton.instance = new Dzhyun({
        address: "wss://dev.qyyjt.cn:443/ws",
        dataType: "pb",
        token: Singleton.tokenManager.generateToken(),
        ping: true,
        reconnect: 3,
      });
    }
    return Singleton.instance;
  }
}

// Function to perform a query using the singleton instance
const dzhYunQuery = () => Singleton.getInstance();

export default dzhYunQuery;
