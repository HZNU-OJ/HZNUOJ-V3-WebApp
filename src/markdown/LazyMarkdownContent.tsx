import React, { lazy, Suspense } from "react";
import { Skeleton } from "antd";
import type { MarkdownContentProps } from "./MarkdownContent";

export type {
  MarkdownContentPatcher,
  MarkdownContentProps,
} from "./MarkdownContent";

const load = () => import("./MarkdownContent");
const MarkdownContent = lazy(load);

export interface LazyMarkdownContentProps extends MarkdownContentProps {
  placeholderLines?: number;
  loading?: boolean;
}

const LazyMarkdownContent: React.FC<LazyMarkdownContentProps> = (props) => {
  const loading = (
    <Skeleton
      active
      title={true}
      paragraph={{ rows: props.placeholderLines || 4 }}
    />
  );
  return (
    <Suspense fallback={loading}>
      {props.loading === true && loading}
      {props.loading !== true && <MarkdownContent {...props} />}
    </Suspense>
  );
};

export default Object.assign(LazyMarkdownContent, {
  load,
});
