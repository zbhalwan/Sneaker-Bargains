package server.handlers;

import spark.Request;
import spark.Response;
import spark.Route;
import server.handlers.HTTP.PriceStatsProxy;
import server.utilities.Serialize;
import server.utilities.SneakerUtils.RTPdata;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.nio.file.Files;
import java.nio.file.Paths;
import com.squareup.moshi.Moshi;

public class SneakerPriceStatsHandler implements Route {
    
    private final Boolean mockingMode;
    private final PriceStatsProxy priceStatsProxy = new PriceStatsProxy();

    public SneakerPriceStatsHandler(Boolean mokingMode) {
        this.mockingMode = mokingMode;
    }

    // Given the structure of the provided model, let moshi parse the data in the mock platforms file
    private static RTPdata readAndParseJson(String fileName) throws IOException {

        String fileContent = new String(Files.readAllBytes(Paths.get(fileName)));
        Moshi moshi = new Moshi.Builder().build();
        return moshi.adapter(RTPdata.class).fromJson(fileContent);
    }

    /**
     * HTTP Handler
     */
    public Object handle(Request request, Response response) throws Exception {

        try {
            String sku = request.queryParams("sku");
            if ((sku == null) || (sku.trim().length()==0))
                throw new Exception("Missing product sku search criteria.");

            RTPdata priceStats;
            
            if (mockingMode) {
                priceStats = readAndParseJson("./mockdata/priceStats.json");
            } else {
                priceStats = priceStatsProxy.getPriceStats(sku);
            }

            Map<String, Object> successResponse = new HashMap<>();
            successResponse.put("result", "success");
            successResponse.put("data", priceStats);

            if (mockingMode)
                successResponse.put("mockingMode", mockingMode);

            return Serialize.success(successResponse);

        } catch (Exception e) {
            return Serialize.error("bad_request", e.getMessage());
        }
    }
}
