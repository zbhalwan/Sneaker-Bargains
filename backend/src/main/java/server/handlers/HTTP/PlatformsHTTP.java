package server.handlers.HTTP;

import server.utilities.SneakerUtils.Platforms;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.IOException;
import com.squareup.moshi.Moshi;

/**
 * Helper class to get platforms by making HTTP requests to rapidAPI servers
 */
public class PlatformsHTTP {
  
  public static Platforms getPlatforms() throws Exception{

    try {
        // Compose URL
        URL request = new URL("https://sneakers-real-time-pricing.p.rapidapi.com/platforms");

        HttpURLConnection urlConnection = (HttpURLConnection) request.openConnection();
        urlConnection.setRequestProperty("X-RapidAPI-Key", rapidapi.apiKey);

        if (urlConnection.getResponseCode() == 200) {
            urlConnection.connect();
            String strResponse = getHTTPResponseString(urlConnection);
            urlConnection.disconnect();
            Moshi moshi = new Moshi.Builder().build();
            return moshi.adapter(Platforms.class).fromJson(strResponse);
        }

      throw new Exception("RAPIDAPI server response code was " + urlConnection.getResponseCode());

    } catch (Exception e) {
      throw new Exception("Error while retrieving platforms: " + e.getMessage());
    }
  }
  /**
   * Get the HTTP string response from a connection.
   * @param connection: Connection object
   * @return: Response string
   * @throws IOException
   */
  private static String getHTTPResponseString(HttpURLConnection connection) throws IOException{
    InputStream is = connection.getInputStream();
    BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(is), 1);
    String line;
    String strResponse = "";

    //reading in the weather.api Json data into a string
    while ((line = bufferedReader.readLine()) != null) {
      strResponse = strResponse + line + "\n";
    }
    is.close();
    bufferedReader.close();

    return strResponse;
  }

}