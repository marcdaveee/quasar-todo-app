<template>
  <!-- START OF MENU TABLE -->
  <div class="main-menu q-mt-md">
    <div class="onboarding-menu-scroll">
      <q-list>
        <!-- OR NUMBERS -->
        <q-item clickable v-ripple :to="{ name: 'or-numbers' }">
          <q-item-section avatar class="margin-left-10">
            <q-icon name="fact_check" class="list-icon" />
          </q-item-section>
          <q-item-section class="list-text">OR-numbers</q-item-section>
        </q-item>

        <q-item clickable v-ripple :to="{ name: 'users' }">
          <q-item-section avatar class="margin-left-10">
            <q-icon name="fact_check" class="list-icon" />
          </q-item-section>
          <q-item-section class="list-text">User Management</q-item-section>
        </q-item>

        <q-item clickable v-ripple :to="{ name: 'todo-list' }">
          <q-item-section avatar class="margin-left-10">
            <q-icon name="fact_check" class="list-icon" />
          </q-item-section>
          <q-item-section class="list-text">To-Do-List</q-item-section>
        </q-item>
      </q-list>
      <div class="absolute-bottom">
        <q-list>
          <q-item class="logout-item" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="logout" class="list-icon" />
            </q-item-section>
            <q-item-section class="list-text onboarding-text-primary"
              >Logout</q-item-section
            >
          </q-item>
        </q-list>
      </div>
    </div>
  </div>

  <!-- END OF MENU -->
</template>

<script>
import { ref, computed } from "vue";
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
//IMPORTING SCSS STYLE
@import "../css/components/MainMenu.scss";
</style>
