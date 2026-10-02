import { useRender } from "@base-ui/react/use-render";
import { cn } from "@design-system/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

export interface LabelProps extends useRender.ComponentProps<"label">, VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, render, ...props }, ref) => {
  const element = useRender({
    defaultTagName: "label",
    ref,
    render,
    props: { ...props, className: cn(labelVariants(), className) },
  });

  return element;
});
Label.displayName = "Label";

export { Label };
