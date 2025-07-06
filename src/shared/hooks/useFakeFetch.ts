import { useEffect, useState } from "react";
import EpisodesMockData from "../mocks/episode.json";
import CharactersMockData from "../mocks/characters.json";
import LocationsMockData from "../mocks/location.json";
import { getRandomTimeoutMs } from "../utils/delay";

interface ReturnValue<T> {
  data: T[] | null;
  isLoading: boolean;
}

export function useFakeFetch<T extends { id: number }>(
  url: string | undefined,
  itemID: string | null = null
): ReturnValue<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    console.info("loading...");

    const timeoutId = setTimeout(() => {
      try {
        let dataResponse: T[];

        switch (url) {
          case "characters":
            dataResponse = CharactersMockData as unknown as T[];
            break;

          case "locations":
            dataResponse = LocationsMockData as unknown as T[];
            break;

          case "episodes":
            dataResponse = EpisodesMockData as unknown as T[];
            break;

          default:
            throw new Error("URL doesn't exist");
        }

        if (itemID !== null) {
          dataResponse = dataResponse.filter((item) => String(item.id) === String(itemID));
        }

        setData(dataResponse as T[]);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

        console.error("error has occurred while loading data");
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
        console.info("data loaded successfully");
      }
    }, getRandomTimeoutMs());

    return () => clearTimeout(timeoutId);
  }, [url, itemID]);

  return {
    data: data,
    isLoading: isLoading,
  };
}
