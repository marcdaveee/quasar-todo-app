const routes = [
  {
    path: "/onboarding",
    name: "onboarding",
    redirect: {
      name: "onboarding",
    },
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        path: "elements",
        name: "elements",
        component: () => import("../pages/Elements.vue"),
      },
      {
        path: "my-page",
        name: "my-page",
        component: () => import("../pages/MyPage/MyPage.vue"),
      },
      {
        path: "upload-file",
        name: "upload-file",
        component: () => import("../pages/MyPage/UploadFile/ImportFile.vue"),
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("../pages/Dashboard/Dashboard.vue"),
      },
      {
        path: "menu",
        name: "main",
        component: () => import("../pages/Main.vue"),
        children: [
          {
            path: "add-user/:id?",
            name: "add-user",
            component: () => import("../pages/UserManagement/AddUser.vue"),
          },
          {
            path: "users",
            name: "users",
            component: () => import("../pages/UserManagement/Users.vue"),
          },
          {
            path: "todo-list",
            name: "todo-list",
            component: () => import("../pages/Onboarding/TodoList.vue"),
          },

          {
            path: "create-task/:id?",
            name: "create-task",
            component: () => import("../pages/Onboarding/CreateTask.vue"),
          },

          // {
          //   path: "edit-task/:task-id",
          //   name: "edit-task",
          //   component: () => import("../pages/Onboarding/EditTask.vue"),
          // },

          {
            path: "or-numbers",
            name: "or-numbers",
            component: () => import("../pages/ORNumbers/ORNumbers.vue"),
          },
          {
            path: "add-new-range/:id?",
            name: "add-new-range",
            component: () => import("../pages/ORNumbers/AddNewRange.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../pages/Login.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
