import styles from "./category.module.css";
import type { Location } from "../../entities/location";
import type { Character } from "../../entities/character";
import type { Episode } from "../../entities/episode";
import type { SingleValue } from "react-select";
import { useCallback, useEffect, useState } from "react";
import { formatDate } from "../../shared/utils/date";
import { Link, useParams } from "react-router";
import { Grid, Item } from "../../widgets/grid/grid";
import { useFakeFetch } from "../../shared/hooks/useFakeFetch";
import { Loader } from "../../shared/components/loader/loader";
import { internalPaths } from "../../shared/constants/routes";
import { Select, type Option } from "../../shared/components/select/select";

type Entity = Character | Location | Episode;

const entities = ["characters", "locations", "episodes"];
const sortingOptions: Option[] = [
  { value: "", label: "none" },
  { value: "create_asc", label: "create date ASC" },
  { value: "create_desc", label: "create date DESC" },
];

export const Category = () => {
  const { category } = useParams();
  const { data, isLoading } = useFakeFetch<Entity>(category);
  const [sortedData, setSortedData] = useState<Entity[] | null>(null);
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<Option>>(null);

  useEffect(() => {
    let sorted = data;

    if (data) {
      switch (selectedOption?.value) {
        case "create_asc":
          sorted = data.sort(
            (cur, next) =>
              new Date(next.created).getTime() - new Date(cur.created).getTime()
          );
          break;

        case "create_desc":
          sorted = data.sort(
            (cur, next) =>
              new Date(cur.created).getTime() - new Date(next.created).getTime()
          );
          break;

        default:
          break;
      }
    }

    setSortedData(sorted);
  }, [data, selectedOption?.value]);

  const handleFilterUpdate = useCallback((newVal: SingleValue<Option>) => {
    console.log(newVal);
    setSelectedOption(newVal);
  }, []);

  const getContent = useCallback(() => {
    if (isLoading) {
      return (
        <div className={styles.loader_container}>
          <Loader />
        </div>
      );
    }

    if (sortedData === null || sortedData.length === 0) {
      return <p>Data Not Found</p>;
    }

    if (category === undefined || entities.indexOf(category) === -1) {
      return <p>Category {category} doesn't exist</p>;
    }

    return (
      <Grid className={styles.content}>
        {sortedData?.map((item) => {
          return (
            <Link
              key={item.id}
              to={internalPaths.item(category, String(item.id))}
            >
              <Item>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <h3>{item.name}</h3>
                    <p className={styles.item_id}>[{item.id}]</p>
                  </div>
                  <p className={styles.item_id}>
                    created: [{formatDate(item.created, "dd.mm.yyyy")}]
                  </p>
                </div>
              </Item>
            </Link>
          );
        })}
      </Grid>
    );
  }, [category, sortedData, isLoading]);

  return (
    <>
      <h1 className={styles.title}>{category}</h1>
      <div className={styles.select_wrapper}>
        <Select
          value={selectedOption}
          defaultValue={null}
          options={sortingOptions}
          onChange={handleFilterUpdate}
        />
      </div>
      <>{getContent()}</>
    </>
  );
};
