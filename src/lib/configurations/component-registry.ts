// Maps logical component names to their Contentful __typename values.
// Used for dynamic rendering and type safety when working with Contentful data.
export const ComponentRegistry = {
  // Building Blocks
  BasicLink: "ComponentBasicLink",
  BasicLinkList: "ComponentBasicLinkList",
  BasicMedia: "ComponentBasicMedia",

  // Component Blocks
  Footer: "ComponentFooter",
  Header: "ComponentHeader",
  Hero: "ComponentHero",
  MainHero: "ComponentMainHero"
} as const;

export type ComponentTypenames =
  | (typeof ComponentRegistry)[keyof typeof ComponentRegistry]
  | undefined;
