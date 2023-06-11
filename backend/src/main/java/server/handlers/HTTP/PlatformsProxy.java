package server.handlers.HTTP;

import server.utilities.SneakerUtils.Platforms;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import java.util.concurrent.TimeUnit;

/**
 * This is the class which handles the WeatherProxy which is primarily called by our WeatherHandler
 * this mainly creates the cache and relative to the arguments that user user wants relative to
 * relative size and time and units.
 */
public class PlatformsProxy {
  LoadingCache<String, Platforms> platformsCache;

  /**
   * Constructor creates an instance of the Platforms Cache
   */
  public PlatformsProxy() {

    platformsCache = CacheBuilder.newBuilder()
        .maximumSize(100)                                // maximum 100 records can be cached
        .expireAfterAccess(60, TimeUnit.MINUTES)            // cache will expire after 60 minutes of access
        .recordStats()
        .build(new CacheLoader<String, Platforms>() {                // build the cacheloader
          @Override
          public Platforms load(String dummy) throws Exception {
            //make the expensive call
            return PlatformsHTTP.getPlatforms();
          }
        });
  }

  public Platforms getPlatforms() throws Exception {
    return platformsCache.get("");
  }

  public Long getCacheHitCount() {
    return platformsCache.stats().hitCount();
  }


}