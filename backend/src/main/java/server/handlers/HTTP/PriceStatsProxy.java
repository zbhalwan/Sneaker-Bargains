package server.handlers.HTTP;

import server.utilities.SneakerUtils.RTPdata;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import java.util.concurrent.TimeUnit;

/**
 * This is the class which handles the WeatherProxy which is primarily called by our WeatherHandler
 * this mainly creates the cache and relative to the arguments that user user wants relative to
 * relative size and time and units.
 */
public class PriceStatsProxy {
  LoadingCache<String, RTPdata> priceStatsCache;

  /**
   * Constructor creates an instance of the Platforms Cache
   */
  public PriceStatsProxy() {

    priceStatsCache = CacheBuilder.newBuilder()
        .maximumSize(100)                          // maximum 100 records can be cached
        .expireAfterAccess(60, TimeUnit.MINUTES)      // cache will expire after 60 minutes of access
        .recordStats()
        .build(new CacheLoader<String, RTPdata>() {      // build the cacheloader
          @Override
          public RTPdata load(String sku) throws Exception {
            //make the expensive call
            return PriceStatsHTTP.getPriceStats(sku);
          }
        });
  }

  public  RTPdata getPriceStats(String sku) throws Exception {
    return priceStatsCache.get(sku);
  }

  public  Long getCacheHitCount() {
    return priceStatsCache.stats().hitCount();
  }


}