import React, { useEffect, useState } from "react";
import { Spin, message } from "antd";
import { useModel, history } from "umi";
import { useAuthToken, useRedirectLogin } from "@/utils/hooks";
import style from "./SubmitTab.module.less";
import LazyCodeBoxEditor from "@/components/Editor/LazyCodeBoxEditor";
import { useScreenWidthWithin } from "@/utils/hooks";
import { useRecaptcha } from "@/utils/hooks";
import api from "@/api";
import SubmissionsTable from "@/pages/submission/components/SubmissionsTable";

const languageCompileOptions = {
  c: {
    language: "c",
    compileAndRunOptions: {
      compiler: "gcc",
      std: "c11",
      O: "2",
      m: "64",
    },
  },
  cpp: {
    language: "cpp",
    compileAndRunOptions: {
      compiler: "g++",
      std: "c++17",
      O: "2",
      m: "64",
    },
  },
  java: {
    language: "java",
    compileAndRunOptions: {},
  },
  python: {
    language: "python",
    compileAndRunOptions: {
      version: "3.9",
    },
  },
};

interface SubmitTabProps {
  problemId: number;
  contestId?: number;
  lastSubmissionContent?: any;
}

const SubmitTab: React.FC<SubmitTabProps> = (props) => {
  const { initialState, loading } = useModel("@@initialState");
  const { getToken } = useAuthToken();
  const redirectLogin = useRedirectLogin();

  useEffect(() => {
    if (loading === false) {
      if (getToken() === "") {
        redirectLogin();
      }
    }
  }, [loading]);

  const [codeValue, setCodeValue] = useState(
    props.lastSubmissionContent?.code ?? "",
  );

  const [language, setLanguage] = useState(
    props.lastSubmissionContent?.language ?? "cpp",
  );

  const isMobile = useScreenWidthWithin(0, 577);
  const recaptcha = useRecaptcha();

  const [submitLoading, setSubmitLoading] = useState(false);
  async function onSubmit() {
    setSubmitLoading(true);

    const { requestError, response } = await api.submission.submit(
      {
        problemId: props.problemId,
        contestId: props.contestId,
        content: {
          code: codeValue,
          ...languageCompileOptions[language],
          skipSamples: true,
        },
      },
      recaptcha("SubmitProblem"),
    );

    if (requestError) message.error(requestError);
    else if (response.error) message.error(response.error);
    else {
      message.success("Submit Successfully!");
    }
    setSubmitLoading(false);
  }

  return (
    <div className={style.root}>
      <div style={{ marginBottom: 10 }}>
        <SubmissionsTable
          query={{
            submitter: initialState?.userMeta?.username,
            problemId: props.problemId,
            contestId: props.contestId,
          }}
          pagination={{
            defaultPageSize: 2,
            position: ["topRight"],
          }}
          excludeColumns={["problem"]}
          scroll={{ x: 780 }}
        />
      </div>
      <LazyCodeBoxEditor
        height={isMobile ? "220" : "480"}
        value={codeValue}
        language={language}
        setLanguage={setLanguage}
        onSubmit={onSubmit}
        submitButtonLoading={submitLoading}
        onChange={(e) => {
          setCodeValue(e);
        }}
      />
    </div>
  );
};

export { SubmitTab };
