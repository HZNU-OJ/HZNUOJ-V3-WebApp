import React from "react";
import { Row, Col, Statistic } from "antd";
import style from "./ProblemViewHeader.module.less";
import {
  ProblemStatusSolved,
  ProblemStatusUnSolved,
  ProblemSolvedStatus,
} from "@/components/ProblemSolvedStatus";

interface ProblemViewHeaderProps {
  isNotNumericId?: boolean;
  id: string;
  title: string;
  type: string;
  submissionCount: number;
  acceptedSubmissionCount: number;
  timeLimit: number;
  memoryLimit: number;
  problemSolvedStatus: ProblemSolvedStatus;
}

const ProblemViewHeader: React.FC<ProblemViewHeaderProps> = (props) => {
  return (
    <div className={style.problemViewHeader}>
      <Row gutter={16} align="top">
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <div className={style.left}>
            <div className={style.problemTitle}>
              <>
                {props.problemSolvedStatus === ProblemSolvedStatus.solved && (
                  <>
                    <ProblemStatusSolved />
                    &nbsp;
                  </>
                )}
                {props.problemSolvedStatus === ProblemSolvedStatus.unSolved && (
                  <>
                    <ProblemStatusUnSolved />
                    &nbsp;
                  </>
                )}
                {`${props.isNotNumericId ? "" : "#"}${props.id}. ${
                  props.title
                }`}
              </>
            </div>
            <div className={`${style.tag} ${style.type}`}>{props.type}</div>
            <div className={[style.tag, style.time].join(" ")}>
              {props.timeLimit} ms
            </div>
            <div className={[style.tag, style.memory].join(" ")}>
              {props.memoryLimit} MiB
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Row gutter={16} align="top">
            <Col span={12}>
              <Statistic title="AC." value={props.acceptedSubmissionCount} />
            </Col>
            <Col span={12}>
              <Statistic title="SUBS." value={props.submissionCount} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export { ProblemViewHeader };
