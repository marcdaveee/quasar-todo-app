<template>
  <div>
    <q-checkbox :val="task.isCompleted" :label="task.text" color="grey" />
  </div>
</template>

<script>
export default {
  name: "TaskItem",
  props: ["task"],
};
</script>

<style></style>
