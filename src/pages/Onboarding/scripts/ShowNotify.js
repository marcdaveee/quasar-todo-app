import { useQuasar } from "quasar";

const $q = useQuasar();

const ShowNotify = (message, caption) => {
  let status = true;

  $q.notify({
    position: $q.screen.width < 767 ? "top" : "bottom-right",
    classes: `${
      status ? "onboarding-success-notif" : "onboarding-error-notif"
    } q-px-lg q-pt-none q-pb-none`,
    html: true,
    message: `<div class="text-bold">${message}</div>`,
    caption: `${caption}`,
    closeBtn: true,
  });
};
export { ShowNotify };
