package server.handlers;

import JsonHandlers.JSONParser;
import server.utilities.SneakerUtils;
import spark.Request;
import spark.Response;
import spark.Route;

import server.utilities.Serialize;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/*
 * Omer
 */
public class SneakerSKUHandler implements Route {
    private SneakerUtils.SneakerInfo sneakerInfo;
    private SneakerUtils.SneakerData data;


    //gives the sneaker SKU
    public SneakerSKUHandler(String sneakerJSON) {
        try {
//            System.out.println(sneakerJSON);
            this.data = JSONParser.fromSneakerJson(sneakerJSON);
//            System.out.println(this.data);

        } catch (IOException e) {
            System.err.println("Sneaker Data couldn't be deserialized.");
        }
    }

    private static String findSneakerSKU(SneakerUtils.SneakerData sneakerData, String sneakerName) {
        for (SneakerUtils.SneakerInfo datum : sneakerData.data()) {
            if (sneakerName.toLowerCase().equals(datum.name().toLowerCase())) {
                return datum.sku();
            }
        }
        return null;
    }

    private static String findSneakerImage(SneakerUtils.SneakerData sneakerData, String sneakerName) {
        for (SneakerUtils.SneakerInfo datum : sneakerData.data()) {
            if (sneakerName.toLowerCase().equals(datum.name().toLowerCase())) {
                return datum.image();
            }
        }
        return null;
    }


    @Override
    public Object handle(Request request, Response response) throws Exception {
        System.out.println(data);

        String sneakerName = request.queryParams("name");

        if (sneakerName == null || sneakerName.isBlank() || sneakerName == "") {
            return server.utilities.Serialize.error("error_bad_request", "keyword parameter is missing");
        }

        String skuNumber = findSneakerSKU(data, sneakerName);
        System.out.println(skuNumber);

        String sneakerImage = findSneakerSKU(data, sneakerName);


        if (skuNumber.isBlank()) {
            return Serialize.error("error_bad_request", "sku number does not exist. try a more specific sneaker name");
        }


        Map<String, Object> successResponse = new HashMap<>();
        successResponse.put("result", "success");
        successResponse.put("sku", skuNumber);
        successResponse.put("image", sneakerImage);

        return Serialize.success(successResponse);


    }
}
