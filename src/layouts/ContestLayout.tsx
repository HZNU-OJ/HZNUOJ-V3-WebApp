import { useModel, useParams } from "umi";
import React, { useEffect } from "react";

import Footer from "@/components/Footer";
import Loading from "@/components/Loading";

import style from "./ContestLayout.module.less";

import { menuItem } from "@/interface/menu.interface";

function topBarItemRender(current: string, itemList: menuItem[]): string {
  let html = "";
  itemList.forEach((item: menuItem) => {
    html += `<li class="${current === item.id ? "am-active" : ""}"><a href="${
      item.link
    }">${item.name}</a></li>`;
  });
  return html;
}

function userItemListRender(itemList: menuItem[][], username: string): string {
  let html = "";
  html += `<li class="am-dropdown" data-am-dropdown>`;
  html += `
  <a class='am-dropdown-toggle' data-am-dropdown-toggle href='javascript:;'>
  <span class='am-icon-user'></span>&nbsp;Dup4&nbsp;<span class='am-icon-caret-down'></span>
  </a>`;
  html += `<ul class="am-dropdown-content">`;
  for (let i = 0; i < itemList.length; ++i) {
    itemList[i].forEach((item: menuItem) => {
      html += `<li><a href="${item.link}">${item.name}</a></li>`;
    });
    if (i < itemList.length - 1) html += `<li class="am-divider"></li>`;
  }
  html += `</ul>`;
  html += `</li>`;
  return html;
}

function topBar(
  brand: string,
  current: string,
  contestId: number,
  username?: string | null,
) {
  const leftItemList = [
    { id: "dashboard", name: "Dashboard", link: `/contest/${contestId}` },
    {
      id: "submissions",
      name: "Submission",
      link: `/contest/submissions/${contestId}`,
    },
    {
      id: "standings",
      name: "Standings",
      link: `/contest/standings/${contestId}`,
    },
    {
      id: "clarifications",
      name: "Clarifications",
      link: `/contest/clarifications/${contestId}`,
    },
    { id: "print", name: "Print", link: `/contest/print/${contestId}` },
  ];
  const enterItemList = [{ id: "enter", name: "Enter", link: "/login" }];

  const userItemList = [
    [
      {
        id: "my_profile",
        name: "My Profile",
        link: `/user/${username}`,
      },
      {
        id: "my_submissions",
        name: "My Submissions",
        link: "/",
      },
    ],
    [
      {
        id: "polygon",
        name: "Polygon",
        link: "/polygon",
      },
      {
        id: "admin",
        name: "Admin",
        link: "/admin",
      },
    ],
    [
      {
        id: "settings",
        name: "Settings",
        link: "/settings",
      },
      {
        id: "logout",
        name: "Logout",
        link: "/logout",
      },
    ],
  ] as menuItem[][];

  return {
    __html: `
    <header class="am-topbar-inverse am-topbar-fixed-toped" style="font-size: 16px; margin-top: 0px;">
    <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-primary am-show-sm-only"
      data-am-collapse="{target: '#collapse-head'}">
      <span class="am-sr-only">导航切换</span>
      <span class="am-icon-bars"></span>
    </button>
    <div class="am-container ${style["h-header"]}">
      <div class="am-collapse am-topbar-collapse" id="collapse-head">
      <ul class="am-nav am-nav-pills am-topbar-nav">
        <li>
          <a class="am-icon-chevron-left" href="/contests"> Back</a>
        </li>
          ${topBarItemRender(current, leftItemList)}
        </ul>
        <div class="am-topbar-right" style="padding-right: 0px;">
          <ul class="am-nav am-nav-pills am-topbar-nav">
          ${
            username
              ? userItemListRender(userItemList, username)
              : topBarItemRender(current, enterItemList)
          }
          </ul>
        </div>
      </div>
    </div>
  </header>
    `,
  };
}
interface HeaderProps {
  current: string;
  contestId: number;
  username?: string | null;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div
      dangerouslySetInnerHTML={topBar(
        "Back",
        props.current,
        props.contestId,
        props.username,
      )}
    ></div>
  );
};

interface ContestLayoutProps {
  current: string;
  maxWidth?: string;
}

interface ContestLayoutParams {
  id: string;
}

const ContestLayout: React.FC<ContestLayoutProps> = (props) => {
  const { initialState, loading } = useModel("@@initialState");
  const params: ContestLayoutParams = useParams();

  useEffect(() => {
    window.$(".am-dropdown").dropdown();
  });

  return (
    <>
      {loading === true && (
        <div
          style={{
            height: "calc(100vh)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loading />
        </div>
      )}
      {loading === false && (
        <>
          <Header
            current={props.current}
            contestId={parseInt(params.id)}
            username={initialState?.userMeta?.username}
          />
          <div
            className={style.root}
            style={{
              maxWidth: props.maxWidth ? props.maxWidth : "",
            }}
          >
            <div className={style.secondRoot}>
              <div className={style.main}>{props.children}</div>
              <Footer />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ContestLayout;