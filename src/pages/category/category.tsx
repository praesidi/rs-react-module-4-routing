import styles from "./category.module.css";
import { Link, useParams } from "react-router";
import { Grid, Item } from "../../widgets/grid/grid";
import { useFakeFetch } from "../../shared/hooks/useFakeFetch";
import { Loader } from "../../shared/components/loader/loader";
import { useCallback } from "react";
import type { Location } from "../../entities/location";
import type { Character } from "../../entities/character";
import type { Episode } from "../../entities/episode";
import { internalPaths } from "../../shared/constants/routes";

type Entity = Character | Location | Episode;

const entities = ["characters", "locations", "episodes"];

export const Category = () => {
  const { category } = useParams();
  const { data, isLoading } = useFakeFetch<Entity>(category);

  const getContent = useCallback(() => {
    if (isLoading) {
      return (
        <div className={styles.loader_container}>
          <Loader />
        </div>
      );
    }

    if (data === null || data.length === 0) {
      return <p>Data Not Found</p>;
    }

    if (category === undefined || entities.indexOf(category) === -1) {
      return <p>Category {category} doesn't exist</p>;
    }

    return (
      <Grid>
        {data.map((item) => {
          return (
            <Link
              key={item.id}
              to={internalPaths.item(category, String(item.id))}
            >
              <Item>
                <h3>{item.name}</h3>
                <p>{item.id}</p>
              </Item>
            </Link>
          );
        })}
      </Grid>
    );
  }, [category, data, isLoading]);

  return (
    <>
      <h1 className={styles.title}>{category}</h1>
      <>{getContent()}</>
    </>
  );
};
