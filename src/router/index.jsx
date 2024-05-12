import Dashboard from "@/pages/dashboard/Dashboard";
import Articles from "@/pages/articles/Articles";
import NewArticle from "@/pages/articles/NewArticle";
import Tables from "@/pages/tables/Tables";
import Tag from "@/pages/settings/tags";
import Users from "@/pages/settings/users";
import Buttons from "@/pages/buttons/Buttons";
import Charts from "@/pages/charts/Charts";
import Icons from "@/pages/icons/Icons";
import Typography from "@/pages/typography/Typography";
import Notifications from "@/pages/notifications/Notifications";
import Posts from "@/pages/posts/Posts";
import Profile from "@/pages/profile/Profile";
import Privacy from "@/pages/privacy/Privacy";
const links = [
  {
    path: "main",
    headerLink: "/app/main",
    title: "Dashboard",
    element: <Dashboard />,
  },
  {
    header: "Articles",
    path: "articles",
    headerLink: "/app/articles",
    glyph: "typography",
    title: "Articles",
    children: [
      {
        title: "Articles",
        index: true,
        element: <Articles />,
      },
      {
        path: "new",
        headerLink: "/app/articles/new",
        title: "NewArticle",
        show: false,
        element: <NewArticle />,
      },
      {
        path: "edit/:id",
        headerLink: "/app/articles/edit",
        title: "EditArticle",
        show: false,
        element: <NewArticle />,
      },
    ],
  },
  {
    header: "Manage",
    headerLink: "/app/settings",
    path: "settings",
    glyph: "settings",
    title: "Settings",
    children: [
      {
        path: "tags",
        headerLink: "/app/settings/tags",
        show: true,
        title: "Tags",
        element: <Tag />,
      },
      {
        path: "users",
        headerLink: "/app/settings/users",
        show: true,
        title: "Users",
        element: <Users />,
      },
    ],
  },
  {
    header: "Tables Basic",
    headerLink: "/app/tables",
    path: "tables",
    glyph: "tables",
    title: "tables",
    element: <Tables />,
  },
  //   {
  //     header: "Typography",
  //     headerLink: "/app/typography",
  //     glyph: "typography",
  //   },
  //   {
  //     header: "Notifications",
  //     headerLink: "/app/notifications",
  //     glyph: "notifications",
  //   },
  //   {
  //     header: "Components",
  //     headerLink: "/app/components",
  //     glyph: "components",
  //     childrenLinks: [
  //       {
  //         name: "Buttons",
  //         link: "/app/components/buttons",
  //       },
  //       {
  //         name: "Charts",
  //         link: "/app/components/charts",
  //       },
  //       {
  //         name: "Icons",
  //         link: "/app/components/icons",
  //       },
  //       {
  //         name: "Maps",
  //         link: "/app/components/maps",
  //       },
  //     ],
  //   },
];

export function findTitleByPath(path) {
  // 忽略 "/app" 这部分路径
  path = path.replace("/app", "");

  // 将路径分解成多个部分
  const parts = path.split("/").filter(Boolean);

  // 遍历链接数组进行搜索
  const titles = [];
  let currentLinks = links;
  let currentPath = "";

  for (const part of parts) {
    // 在当前链接中找到匹配的链接
    const link = currentLinks.find(
      (link) =>
        link.headerLink === currentPath + "/" + part ||
        (link.path && link.path.startsWith(part))
    );

    if (!link) {
      throw new Error(`Path not found: ${currentPath + "/" + part}`);
    }

    // 将当前链接的标题和完整路径添加到标题列表中
    titles.push({ title: link.title, path: currentPath + "/" + part });

    // 如果当前链接有子链接，将它们作为下一轮的当前链接
    // 否则，下一轮的当前链接为空数组
    currentLinks = link.children || [];
    currentPath += "/" + part;
  }

  return titles;
}
export default links;
