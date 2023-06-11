package server.utilities;

import com.squareup.moshi.Json;

import java.util.List;

public class SneakerUtils {

        public record Platform(
                @Json(name = "id") String id,
                @Json(name = "name") String name
        ){}

        public record Platforms(
                @Json(name = "count") Integer count,
                @Json(name = "error") String error,
                @Json(name = "data") List<Platform> data
        ){}

        public record SneakerData(
                @Json(name = "count") String count,
                @Json(name = "data") List<SneakerInfo> data,
                @Json(name = "error") String error
        ){}

        public record SneakerInfo(
                @Json(name = "id") String id,
                @Json(name = "name") String name,
                @Json(name = "image") String image,
                @Json(name = "releasedAt") String released,
                @Json(name = "sizing") String sizing,
                @Json(name = "initialPrice") Double initialPrice,
                @Json(name = "colorway") String colorway,
                @Json(name = "sku") String sku,
                @Json(name = "createdAt") String createdAt,
                @Json(name = "updatedAt") String updatedAt,
                @Json(name = "brand") Brand brandMap
        ){}

        public record Brand(
                @Json(name = "id") String brandID,
                @Json(name = "name") String brandName

        ){}

        public record RTPdata(
                @Json(name = "data") List<RTPdtypes> data,
                @Json(name = "error") String error
        ){}

        public record RTPdtypes(
                @Json(name = "platformName") String platformName,
                
                @Json(name = "maxPriceEur") int maxPriceEur, // todo : to change
                //@Json(name = "maxPriceEur") int maxPriceEur, // todo : to change
                @Json(name = "minPriceEur") int minPriceEur,
                @Json(name = "avgPriceEur") int avgPriceEur,

                @Json(name = "maxPriceUsd") int maxPriceUsd, // todo : to change
                //@Json(name = "maxPriceUsd") int maxPriceUsd, // todo : to change
                @Json(name = "minPriceUsd") int minPriceUsd,
                @Json(name = "avgPriceUsd") int avgPriceUsd
        ){}

}
