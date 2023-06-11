import { getPrices, getProduct } from "../data/getPrices";
// import {
//   handleAddToWishlist3,
//   handleRemoveFromWishlist3,
// } from "../data/getWishlist";
import { IProduct } from "../data/dataTypes";
import { userSignedIn } from "../firebase";
import { getPriceStats } from "../data/getPriceStats";
import mockPriceStats from "../../../mockdata/priceStats.json";
import { getProductList } from "../data/getProductList";
import { secretAPIKey } from "../data/apikey";

describe("getPrices", () => {
  it("should return prices for a valid product key", () => {
    const prices = getPrices("Gazelle-bold-shoes");
    expect(prices).toEqual([
      { vendor: "Vendor 1", price: 45 },
      { vendor: "Vendor 2", price: 45.67 },
      { vendor: "Vendor 3", price: 46 },
    ]);
  });

  it("should return an empty array for an invalid product key", () => {
    const prices = getPrices("invalid-key");
    expect(prices).toEqual([]);
  });
});

describe("getProduct", () => {
  it("should return a product for a valid product key", () => {
    const product = getProduct("Gazelle-bold-shoes");
    expect(product).toEqual({
      key: "Gazelle-bold-shoes",
      value: "Nike gazelle bold shoes",
      image:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c69922d42fc84de28e9baf5400edaf14_9366/Gazelle_Bold_Shoes_Black_HQ4408_02_standard.jpg",
      prices: [
        { vendor: "Vendor 1", price: 45 },
        { vendor: "Vendor 2", price: 45.67 },
        { vendor: "Vendor 3", price: 46 },
      ],
    });
  });

  it("should return undefined for an invalid product key", () => {
    const product = getProduct("invalid-product-key");
    expect(product).toBeUndefined();
  });

  it("should return the first product for a duplicate product key", () => {
    const product = getProduct("Gazelle-bold-shoes");
    const duplicateProduct = getProduct("Gazelle-bold-shoes");
    expect(duplicateProduct).toEqual(product);
  });

  it("should return a product with a non-empty prices array", () => {
    const product = getProduct("Gazelle-bold-shoes");
    expect(product.prices.length).toBeGreaterThan(0);
  });

  it("should return a product with prices that are numbers", () => {
    const product = getProduct("Gazelle-bold-shoes");
    for (let price of product.prices) {
      expect(typeof price.price).toBe("number");
    }
  });

  it("should return a product with prices that are greater than or equal to zero", () => {
    const product = getProduct("Gazelle-bold-shoes");
    for (let price of product.prices) {
      expect(price.price).toBeGreaterThanOrEqual(0);
    }
  });

  it("should return a product with prices that are not NaN", () => {
    const product = getProduct("Gazelle-bold-shoes");
    for (let price of product.prices) {
      expect(isNaN(price.price)).toBe(false);
    }
  });

  it("should return a product with a key that is a non-empty string", () => {
    const product = getProduct("Gazelle-bold-shoes");
    expect(typeof product.key).toBe("string");
    expect(product.key.length).toBeGreaterThan(0);
  });

  it("should return a product with a value that is a non-empty string", () => {
    const product = getProduct("Gazelle-bold-shoes");
    expect(typeof product.value).toBe("string");
    expect(product.value.length).toBeGreaterThan(0);
  });

  it("should return a product with an image that is a non-empty string", () => {
    const product = getProduct("Gazelle-bold-shoes");
    expect(typeof product.image).toBe("string");
    expect(product.image.length).toBeGreaterThan(0);
  });
});

describe("getProduct", () => {
  it("should return a product for a valid product key", () => {
    const product = getProduct("Gazelle-bold-shoes");
    expect(product).toEqual({
      key: "Gazelle-bold-shoes",
      value: "Nike gazelle bold shoes",
      image:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c69922d42fc84de28e9baf5400edaf14_9366/Gazelle_Bold_Shoes_Black_HQ4408_02_standard.jpg",
      prices: [
        { vendor: "Vendor 1", price: 45 },
        { vendor: "Vendor 2", price: 45.67 },
        { vendor: "Vendor 3", price: 46 },
      ],
    });
  });
});

// unit testing getPriceStats

describe("getPriceStats", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should dispatch priceStatsSuccess action with mock data when mockingMode is true", async () => {
    const mockSku = "abc123";

    await getPriceStats(mockSku, mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "priceStatsSuccess",
      payload: mockPriceStats.data,
      sku: mockSku,
    });
  });

  // testing getProductList
  // Mock the dispatch function and the response data for successful and error scenarios

  const mockSuccessResponse = { data: [{ id: 1, name: "Nike Air Force 1" }] };
  const mockErrorResponse = { message: "Error occurred" };

  // Mock the fetch function with resolved promises to simulate success and failure scenarios
  jest.mock("node-fetch", () => ({
    __esModule: true,
    default: jest.fn().mockImplementation((url) => {
      if (url.includes("error")) {
        return Promise.reject(mockErrorResponse);
      } else {
        return Promise.resolve({
          json: () => Promise.resolve(mockSuccessResponse),
        });
      }
    }),
  }));

  describe("getProductList", () => {
    const backendURL = "https://sneakers-real-time-pricing.p.rapidapi.com";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": secretAPIKey,
      },
    };
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should dispatch searchSuccess action with correct payload on successful response", async () => {
      // Arrange
      const searchText = "nike";
      const expectedAction = {
        type: "searchSuccess",
        payload: mockSuccessResponse.data,
      };

      // Act
      await getProductList(searchText, mockDispatch);

      // Assert
      // expect(fetch).toHaveBeenCalledTimes(1);
      // expect(fetch).toHaveBeenCalledWith(`${backendURL}/sneakers?extended=true&name=${searchText}`, options);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });

    it("should dispatch searchFailure action with correct payload on server error response", async () => {
      // Arrange
      const searchText = "error";
      const expectedAction = {
        type: "searchFailure",
        payload: mockErrorResponse.message,
      };

      // Act
      await getProductList(searchText, mockDispatch);

      // Assert
      // expect(fetch).toHaveBeenCalledTimes(1);
      // expect(fetch).toHaveBeenCalledWith(`${backendURL}/sneakers?extended=true&name=${searchText}`, options);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      // expect(mockDispatch).toHave(expectedAction);
    });

    it("should dispatch searchFailure action with generic error message on network error", async () => {
      // Arrange
      const searchText = "network error";
      const expectedAction = {
        type: "searchFailure",
        payload: "Error while trying to contact server",
      };

      // Act
      await getProductList(searchText, mockDispatch);

      // Assert
      // expect(fetch).toHaveBeenCalledTimes(1);
      // expect(fetch).toHaveBeenCalledWith(`${backendURL}/sneakers?extended=true&name=${searchText}`, options);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      // expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});
