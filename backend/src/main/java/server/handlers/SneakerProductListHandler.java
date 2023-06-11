package server.handlers;

import spark.Request;
import spark.Response;
import spark.Route;
import server.handlers.HTTP.ProductListProxy;
import server.utilities.Serialize;
import server.utilities.SneakerUtils.SneakerData;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.nio.file.Files;
import java.nio.file.Paths;
import com.squareup.moshi.Moshi;

public class SneakerProductListHandler implements Route {
    
    private final Boolean mockingMode;
    private final ProductListProxy productListProxy = new ProductListProxy();

    public SneakerProductListHandler(Boolean mokingMode) {
        this.mockingMode = mokingMode;
    }

    // Given the structure of the provided model, let moshi parse the data in the mock platforms file
    private static SneakerData readAndParseJson(String fileName) throws IOException {

        String fileContent = new String(Files.readAllBytes(Paths.get(fileName)));
        Moshi moshi = new Moshi.Builder().build();
        return moshi.adapter(SneakerData.class).fromJson(fileContent);
    }

    /**
     * HTTP Handler
     */
    public Object handle(Request request, Response response) throws Exception {

        try {


            String productName = request.queryParams("name");
            if ((productName == null) || (productName.trim().length()==0))
                throw new Exception("Missing product name search criteria.");

            SneakerData productList;
            
            if (mockingMode) {
                productList = readAndParseJson("./mockdata/platforms.json");
            } else {
                productList = productListProxy.getProductList(productName);
            }

            Map<String, Object> successResponse = new HashMap<>();
            successResponse.put("result", "success");
            successResponse.put("data", productList);

            if (mockingMode)
                successResponse.put("mockingMode", mockingMode);

            return Serialize.success(successResponse);

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("result", "error");
            errorResponse.put("message", e.getMessage());

            return Serialize.success(errorResponse);

        }
    }
}
