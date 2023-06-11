package server.handlers;

import spark.Request;
import spark.Response;
import spark.Route;
import server.handlers.HTTP.PlatformsProxy;
import server.utilities.Serialize;
import server.utilities.SneakerUtils.Platforms;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.nio.file.Files;
import java.nio.file.Paths;
import com.squareup.moshi.Moshi;


public class SneakerPlatformsHandler implements Route {
    
    private final Boolean mockingMode;
    private final PlatformsProxy platformsProxy = new PlatformsProxy();

    //constructor
    public SneakerPlatformsHandler(Boolean mokingMode) {
        this.mockingMode = mokingMode;
    }

    // Given the structure of the provided model, let moshi parse the data in the mock platforms file
    private static Platforms readAndParseJson(String fileName) throws IOException {
        String fileContent = new String(Files.readAllBytes(Paths.get(fileName)));
        Moshi moshi = new Moshi.Builder().build();
        return moshi.adapter(Platforms.class).fromJson(fileContent);
    }

    /**
     * HTTP Handler
     */
    public Object handle(Request request, Response response) throws Exception {

        try {

            Platforms platforms;
            
            if (mockingMode) {
                platforms = readAndParseJson("./mockdata/platforms.json");
            } else {
                platforms = platformsProxy.getPlatforms();
            }

            Map<String, Object> successResponse = new HashMap<>();
            successResponse.put("result", "success");
            successResponse.put("data", platforms);

            if (mockingMode)
                successResponse.put("mockingMode", mockingMode);

            return Serialize.success(successResponse);

        } catch (Exception e) {
            return Serialize.error("bad_request", e.getMessage());
        }
    }
}
