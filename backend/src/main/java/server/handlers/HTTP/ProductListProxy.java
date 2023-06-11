package server.handlers.HTTP;

import server.utilities.SneakerUtils.SneakerData;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import java.util.concurrent.TimeUnit;

/**
 * This is the class which handles the WeatherProxy which is primarily called by our WeatherHandler
 * this mainly creates the cache and relative to the arguments that user user wants relative to
 * relative size and time and units.
 */
public class ProductListProxy {
  LoadingCache<String, SneakerData> productListCache;

  /**
   * Constructor creates an instance of the Platforms Cache
   */
  public ProductListProxy() {

    productListCache = CacheBuilder.newBuilder()
        .maximumSize(100)                          // maximum 100 records can be cached
        .expireAfterAccess(60, TimeUnit.MINUTES)      // cache will expire after 60 minutes of access
        .recordStats()
        .build(new CacheLoader<String, SneakerData>() {        // build the cacheloader
          @Override
          public SneakerData load(String productName) throws Exception {
            //make the expensive call
            return ProductListHTTP.getProductList(productName);
          }
        });
  }

  public  SneakerData getProductList(String productName) throws Exception {
    return productListCache.get(productName);
  }

  public  Long getCacheHitCount() {
    return productListCache.stats().hitCount();
  }


}