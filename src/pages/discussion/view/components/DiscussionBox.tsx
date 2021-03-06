import React, { useEffect, useState } from "react";

import { Row, Col, Button } from "antd";
import style from "./DiscussionBox.module.less";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { formatDateTime } from "@/utils/formatDateTime";
import { useScreenWidthWithin } from "@/utils/hooks";
import LazyMarkdownContent from "@/markdown/LazyMarkdownContent";
import ReplyModel from "@/pages/contest/clarifications/components/ReplyModel";

interface DiscussionBoxProps {
  content: string;
  username: string;
  publishTime: string;
  onReply?: any;
}

const DiscussionBox: React.FC<DiscussionBoxProps> = (props) => {
  const isMobile = useScreenWidthWithin(0, 577);
  const [replyModelVisible, setReplyModelVisible] = useState(false);

  const replyButton = (
    <Button
      type={"primary"}
      style={{
        height: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: isMobile ? 2 : -2,
        width: isMobile ? "100%" : 80,
      }}
      onClick={() => setReplyModelVisible(true)}
    >
      Reply
    </Button>
  );

  return (
    <>
      <div className={style.root}>
        <div className={`am-panel am-panel-primary ${style.panel}`}>
          <div className={`${style["panel-header"]}`}>
            <Row gutter={16} align={"top"}>
              <Col xs={24} sm={18} md={20}>
                <span>
                  <a href={`/user/${props.username}`}>{props.username}</a>
                  &nbsp; commented {formatDateTime(props.publishTime)[1]}
                </span>
              </Col>
              {props.onReply && (
                <Col xs={24} sm={6} md={4}>
                  <div
                    style={{
                      width: isMobile ? "100%" : "",
                      float: "right",
                    }}
                  >
                    {replyButton}
                  </div>
                </Col>
              )}
            </Row>
          </div>
          <div className={`${style["panel-body"]}`}>
            <LazyMarkdownContent content={props.content} noSanitize={true} />
          </div>
        </div>
      </div>

      <ReplyModel
        visible={replyModelVisible}
        onCancel={() => {
          setReplyModelVisible(false);
        }}
        onOk={props.onReply}
        username={props.username}
      />
    </>
  );
};

export { DiscussionBox };
