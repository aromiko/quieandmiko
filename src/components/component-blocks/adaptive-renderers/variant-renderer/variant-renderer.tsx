import { ComponentType } from "react";

type VariantMap<TProps> = Record<string, ComponentType<TProps>>;

interface VariantRendererProps<
  TVariants extends VariantMap<TProps>,
  TProps extends object
> {
  variants: TVariants;
  componentData: TProps;
  variantSelected: keyof TVariants;
}

export default function VariantRenderer<
  TVariants extends VariantMap<TProps>,
  TProps extends object
>({
  variants,
  componentData,
  variantSelected
}: VariantRendererProps<TVariants, TProps>) {
  try {
    const Variant = variants[variantSelected];

    // @ts-expect-error JSX cannot safely render a generic union of ComponentType<TProps>.
    return <Variant {...componentData} />;
  } catch (error) {
    throw new Error(
      `[VariantRenderer]: An error occurred while adaptively rendering variant ${variants[variantSelected]} \n${error instanceof Error ? error.stack : String(error)}`
    );
  }
}
