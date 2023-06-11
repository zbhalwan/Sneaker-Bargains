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
public class SneakerPriceHandler implements Route {
    private SneakerUtils.RTPdata RTPdata;
    private SneakerUtils.RTPdtypes RTPdtypes;

    // we must not Serialize the success response in SKUHandler - we could just simply include a call to Sneaker price Handler in the previous handler and
    // return the cheapest price using a simple logic algo
    public SneakerPriceHandler(String data){
        try {
            //            System.out.println(sneakerJSON);
                        this.RTPdata = JSONParser.fromRTPSneakerJson(data);
            //            System.out.println(this.data);
            
                    } catch (IOException e) {
                        System.err.println("RTPData couldn't be deserialized.");
                    }
                }
            
                private static String findLowestMaxPrice(SneakerUtils.RTPdata RTPData) {
                    int i = 1000000000;
                    SneakerUtils.RTPdtypes d = RTPData.data().get(0);

                    for (SneakerUtils.RTPdtypes datum : RTPData.data()) {
                        if (datum.maxPriceUsd()<i) {
                            d = datum;
                        }
                    }
                    return String.valueOf(d.maxPriceUsd());
    }

    @Override
    public Object handle(Request request, Response response) throws Exception {
        // System.out.println(data);

        // String sneaker = request.queryParams("name");

        // if (sneakerName == null || sneakerName.isBlank() || sneakerName == "") {
        //     return server.utilities.Serialize.error("error_bad_request", "keyword parameter is missing");
        // }

        String product = findLowestMaxPrice(RTPdata);
        // System.out.println(skuNumber);


        if (product.isBlank()) {
            return Serialize.error("error_bad_request", "product does not exist. try a product that has a sku");
        }


        Map<String, Object> successResponse = new HashMap<>();
        successResponse.put("result", "success");
        successResponse.put("prodWithLowestPrice", product);

        return Serialize.success(successResponse);


    }
    
}
