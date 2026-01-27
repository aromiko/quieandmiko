import { TypeComponentSimpleBlock } from "@/lib/types";

import VariantRenderer from "../adaptive-renderers/variant-renderer/variant-renderer";
import { SimpleBlockVariants } from "./variants/variants";

export default function SimpleBlock(data: TypeComponentSimpleBlock) {
  if (!data) return null;
  return (
    <VariantRenderer
      variants={SimpleBlockVariants}
      componentData={data}
      variantSelected={data.simpleBlockVariant || "image"}
    />
  );
}
