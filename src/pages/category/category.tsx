import styles from "./category.module.css";
import { Link, useParams } from "react-router";
import { BasicLayout } from "../../shared/components/basic-layout/basic-layout";
import { Footer } from "../../widgets/footer/footer";
import { Header } from "../../widgets/header/header";
import { Grid, Item } from "../../widgets/grid/grid";
import { useFakeFetch } from "../../shared/hooks/useFakeFetch";
import { Loader } from "../../shared/components/loader/loader";
import { useCallback } from "react";
import type { Location } from "../../entities/location";
import type { Character } from "../../entities/character";
import type { Episode } from "../../entities/episode";

type Entity = Character | Location | Episode;

const entities = ["characters", "locations", "episodes"];

export const Category = () => {
  const { category } = useParams();
  const { data, isLoading } = useFakeFetch<Entity>(category);

  console.log(category);
  console.log(isLoading, data);

  const getContent = useCallback(() => {
    if (isLoading) {
      return <Loader />;
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
            <Link key={item.id} to={`${item.id}`}>
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
      <BasicLayout headerSlot={<Header />} footerSlot={<Footer />}>
        <h1 className={styles.title}>{category}</h1>
        <>{getContent()}</>
      </BasicLayout>
    </>
  );
};
