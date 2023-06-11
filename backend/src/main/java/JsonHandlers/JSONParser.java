package JsonHandlers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;


import server.utilities.SneakerUtils;

/**
 * class to parse JSON files
 */
public class JSONParser<T> {
    T toReturnJSON;
    Class<T> object;
    
    /**
     * Constructor for JSONParser
     * @param path to file
     * @param object class of object to be returned
     * @throws IOException
     */
    public JSONParser(Path path,Class<T>object) throws IOException {
        this.object= object;
        String json = new String(Files.readAllBytes(path));
        Moshi moshi = new Moshi.Builder().build();
        JsonAdapter<T> adapter = moshi.adapter(object);
        this.toReturnJSON = adapter.fromJson(json);
    }

    
    public T getJSON() {
        return this.toReturnJSON;
    }
    /**
     * Method to build JSON from an object
     * @param input object to be converted to JSON
     * @return JSON string
     * @throws IOException
     */
    public String buildJson(T input) throws IOException {
        Moshi moshi = new Moshi.Builder().build();
        return moshi.adapter(this.object).toJson(input);
    }



    public static SneakerUtils.SneakerData fromSneakerJson(String sneakerJSON) throws IOException {
        Moshi moshi = new Moshi.Builder().build();
        return  moshi.adapter(SneakerUtils.SneakerData.class).fromJson(sneakerJSON);
    }
    
    public static SneakerUtils.RTPdata fromRTPSneakerJson(String sneakerJSON) throws IOException {
        Moshi moshi = new Moshi.Builder().build();
        return  moshi.adapter(SneakerUtils.RTPdata.class).fromJson(sneakerJSON);
    }
}
