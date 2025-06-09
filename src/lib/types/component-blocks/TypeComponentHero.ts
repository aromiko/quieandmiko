import { TypeComponentBase } from "@/lib/types";

export interface TypeComponentHero extends TypeComponentBase {
  __typename: "ComponentHero";
  sys: { id: string };
  heroName: string;
}
