<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { ToggleMainDialogState } from "../../../composables/Triggers";
import {
  Tasks,
  TaskToDelete,
  RemoveTask,
  RemoveTodos,
} from "../composables/TodoList.js";
// import { ORNumberDetails, DeleteORRange } from "../../../composables/ORNumber";

const $q = useQuasar();
const closeDialog = () => {
  ToggleMainDialogState();
};

const deleteTask = async () => {
  Tasks.value = Tasks.value.filter((task) => task.id != TaskToDelete.value);

  await RemoveTask(TaskToDelete.value);

  TaskToDelete.value = "";

  ToggleMainDialogState();
};
</script>

<template>
  <div class="width-300">
    <div class="full-width flex justify-center q-mb-md">
      <div class="onboarding-border-radius-10 bg-white width-auto q-pa-sm">
        <q-icon
          name="iconfont icon-delete-fill"
          class="onboarding-text-accent-0"
          size="30px"
        />
      </div>
    </div>
    <h4
      :class="`text-semibold text-32 q-my-none ${
        $q.screen.width < 768 ? 'q-mb-sm' : 'q-mb-lg'
      }`"
    >
      Are you sure you want to delete this To-Do List?
    </h4>
    <p class="text-24 text-weight-light">This process cannot be undone.</p>
    <p class="text-24 text-weight-light">
      By confirming, this task item will be deleted. To go back Click "Cancel"
    </p>

    <q-btn
      @click="deleteTask()"
      :loading="btnLoadingState"
      flat
      no-caps
      label="Yes, I'm sure"
      dense
      :class="`onboarding-bg-accent-0 onboarding-text-accent-1 text-white full-width q-py-sm q-mb-s onboarding-border-radius-${
        $q.screen.width < 768 ? '10' : '50'
      }`"
    />
    <div
      @click="closeDialog()"
      class="full-width q-py-sm cursor-pointer text-14"
    >
      Cancel
    </div>
  </div>
</template>
