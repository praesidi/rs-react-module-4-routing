import styles from "./item.module.css";
import { useParams } from "react-router";
import { Loader } from "../../shared/components/loader/loader";
import { useFakeFetch } from "../../shared/hooks/useFakeFetch";
import { useCallback } from "react";
import type { Episode } from "../../entities/episode";
import type { Character } from "../../entities/character";
import type { Location } from "../../entities/location";
import PlaceholderImage from "/images/placeholder.webp";
import { formatDate } from "../../shared/utils/date";

type Entity = Character | Location | Episode;

export const Item = () => {
  const { category, id } = useParams();
  const { data, isLoading } = useFakeFetch<Entity>(category, id);

  const getContent = useCallback(() => {
    if (isLoading) {
      return (
        <div className={styles.loader_container}>
          <Loader />
        </div>
      );
    }

    if (data === null || data.length === 0) {
      return (
        <p>
          Item with category {category} and id {id} Not Found
        </p>
      );
    }

    let imgSrc = PlaceholderImage;
    const categoryItem = data[0];
    const filteredItemProperties = Object.keys(data[0]).filter(
      (key: string) => key !== "name" && key !== "image"
    );
    const hasImageProperty = Object.prototype.hasOwnProperty.call(
      categoryItem,
      "image"
    );

    if (hasImageProperty && categoryItem["image" as keyof Entity]) {
      imgSrc = categoryItem["image" as keyof Entity] as string;
    }

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.description}>
            <h3 className={styles.item_name}>{categoryItem.name}</h3>
            {filteredItemProperties.map((key: string) => {
              let value = categoryItem[key as keyof Entity];

              if (key === "created") {
                value = formatDate(value as string, "dd.mm.yyyy");
              }

              return (
                <p key={key}>
                  {key}: {value ? value : "-"}
                </p>
              );
            })}
          </div>
          <div className={styles.image}>
            <img src={imgSrc} alt="item image" />
          </div>
        </div>
      </div>
    );
  }, [category, data, id, isLoading]);

  return (
    <>
      <h1 className={styles.title}>{category}</h1>
      <>{getContent()}</>
    </>
  );
};
