import { useEffect, useState } from "react";
import EpisodesMockData from "../mocks/episode.json";
import CharactersMockData from "../mocks/characters.json";
import LocationsMockData from "../mocks/location.json";

interface ReturnValue<T> {
  data: T[] | null;
  isLoading: boolean;
}

// from 0.1s to 2s
const getRandomTimeoutMs = () => {
  const randomNum = Math.floor(Math.random() * 2000) + 1;
  const roundToHundredths = Math.ceil(randomNum * 100) / 100;

  return roundToHundredths;
};

export function useFakeFetch<T>(url: string | undefined): ReturnValue<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const timeoutId = setTimeout(() => {
      try {
        let dataResponse: unknown;

        switch (url) {
          case "characters":
            dataResponse = CharactersMockData;
            break;

          case "locations":
            dataResponse = LocationsMockData;
            break;

          case "episodes":
            dataResponse = EpisodesMockData;
            break;

          default:
            throw new Error("URL doesn't exist");
        }

        setData(dataResponse as T[]);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";

        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }, getRandomTimeoutMs());

    return () => clearTimeout(timeoutId);
  }, [url]);

  return {
    data: data,
    isLoading: isLoading,
  };
}
