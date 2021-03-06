import React, { lazy, Suspense } from "react";
import type { CodeEditorProps } from "./CodeEditor";
import LoadingStyle from "@/less/Loading.module.less";
import Loading from "@/components/Loading";

export type { CodeEditorProps } from "./CodeEditor";

const load = () => import("./CodeEditor");
const CodeEditor = lazy(load);

export interface LazyCodeEditorProps extends CodeEditorProps {
  loading?: boolean;
}

const LazyCodeEditor: React.FC<LazyCodeEditorProps> = (props) => {
  const loading = (
    <div
      className={LoadingStyle.center}
      style={{
        height: parseInt(props.height) ?? 480,
      }}
    >
      <Loading />
    </div>
  );
  return (
    <Suspense fallback={loading}>
      <CodeEditor {...props} />
    </Suspense>
  );
};

export default Object.assign(LazyCodeEditor, {
  load,
});

// DO NOT USE ABANDON
// const CodeEditorLoading = () => {
//   return (
//     <div
//       className={LoadingStyle.center}
//       style={{
//         height: height,
//       }}
//     >
//       <Loading />
//     </div>
//   );
// };

// const CodeEditor: React.FC<CodeEditorProps> = dynamic({
//   loading: CodeEditorLoading,
//   loader: async function () {
//     const { CodeEditor } = await import("@/components/Editor");
//     return CodeEditor;
//   },
// });
