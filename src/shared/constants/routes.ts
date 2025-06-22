type Category = "locations" | "episodes" | "characters";

interface AppRoutes {
  home: string;
  category: (name: Category) => string;
  item: (name: Category, id: string) => string;
}

export const internalPaths: AppRoutes = {
  home: "/",
  category: (name: string): string => `/${name}`,
  item: (name: string, id: string): string => `/${name}/${id}`,
};
