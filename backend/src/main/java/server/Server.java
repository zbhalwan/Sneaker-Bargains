package server;

import spark.Spark;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import server.handlers.SneakerPlatformsHandler;
import server.handlers.SneakerPriceHandler;
import server.handlers.SneakerPriceStatsHandler;
import server.handlers.SneakerProductListHandler;
import server.handlers.SneakerSKUHandler;

import static spark.Spark.after;

/**
 * Top-level class for this demo. Contains the main() method which starts Spark and runs the various handlers.
 *
 * We have two endpoints in this demo. They need to share state (a menu).
 * This is a great chance to use dependency injection, as we do here with the menu set. If we needed more endpoints,
 * more functionality classes, etc. we could make sure they all had the same shared state.
 */
public class Server {
    public static void main(String[] args) {

        // True if we want to respond to RAPIDAPI calls in Mocking Mode
        final Boolean mockingMode = true;

        Spark.port(3232);
        /*
            Setting CORS headers to allow cross-origin requests from the client; this is necessary for the client to
            be able to make requests to the server.

            By setting the Access-Control-Allow-Origin header to "*", we allow requests from any origin.
            This is not a good idea in real-world applications, since it opens up your server to cross-origin requests
            from any website. Instead, you should set this header to the origin of your client, or a list of origins
            that you trust.

            By setting the Access-Control-Allow-Methods header to "*", we allow requests with any HTTP method.
            Again, it's generally better to be more specific here and only allow the methods you need, but for
            this demo we'll allow all methods.

            We recommend you learn more about CORS with these resources:
                - https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
                - https://portswigger.net/web-security/cors
         */
        after((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Methods", "*");
        });

        String data = "";
        try {
            Reader reader = new FileReader("backend/src/main/data/mockJ4sSearchResponse.json", StandardCharsets.UTF_8);
            BufferedReader bf = new BufferedReader(reader);
            data = bf.readLine();
            //System.out.println(data + "this is data");
            bf.close();
        } catch (IOException e) {
            System.err.println("Could Not read JSON Data."); // todo - change this
        }

        String ddata = "";
        try {
            Reader rreader = new FileReader("backend/src/main/data/mockJ4sRTPResponse.json", StandardCharsets.UTF_8);
            BufferedReader bff = new BufferedReader(rreader);
            ddata = bff.readLine();
            //System.out.println(data + "this is data");
            bff.close();
        } catch (IOException e) {
            System.err.println("Could Not read JSON Data."); // todo - change this
        }

    // Setting up the handler for the GET endpoints
    // Spark.get("bounds", new BoundaryHandler(data));
    // Spark.get("query", new QueryHandler(data));
    // Spark.get("sneakers", new SneakerRTPHandler(data))
    
        // omer
        Spark.get("sneakersku", new SneakerSKUHandler(data));
        Spark.get("sneakersprice", new SneakerPriceHandler(ddata)); 

        // safae
        Spark.get("platforms", new SneakerPlatformsHandler(mockingMode));
        Spark.get("sneakers", new SneakerProductListHandler(mockingMode));
        Spark.get("price_stats", new SneakerPriceStatsHandler(mockingMode));
        
        Spark.init();
        Spark.awaitInitialization();
        System.out.println("Server started.");
    }
}
