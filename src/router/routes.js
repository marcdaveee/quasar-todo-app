const routes = [
  {
    path: "/",
    redirect: {
      name: "my-todos",
    },

    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "my-todos",
        name: "my-todos",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "my-tasks",
        name: "my-tasks",
        component: () => import("pages/MyTasks.vue"),
      },
      {
        path: "finished-tasks",
        name: "finished-tasks",
        component: () => import("pages/FinishedTasks.vue"),
      },
      {
        path: "deleted-tasks",
        name: "deleted-tasks",
        component: () => import("pages/DeletedTasks.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
