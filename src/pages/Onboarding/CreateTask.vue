<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration="2000"
  >
    <div class="todo-list">
      <!-- <div class="text-24 text-bold onboarding-text-secondary">
        Create A New Task
      </div> -->

      <div class="flex justifty-start items-center onboarding-text-accent-0">
        <q-btn @click="$router.go(-1)" round dense flat icon="arrow_back" />
        <h5 class="text-24 text-bold q-my-none q-ml-sm">
          {{ !$route.params.id ? "Create A New Task" : "Update To-Do List" }}
        </h5>
      </div>

      <div class="form-width">
        <q-form @submit="onSubmit" class="q-gutter-md q-mt-lg">
          <q-item-label class="label key_result text-weight-bold q-mb-sm"
            >Task Title:
            <span class="required">*</span>
          </q-item-label>

          <!-- v-model="taskTitle" -->
          <q-input
            dense
            v-model="taskForm.taskTitle"
            borderless
            placeholder="Task Title"
            :rules="[(val) => (val !== null && val !== '') || '']"
            hide-bottom-space
            class="onboarding-input-field standard onboarding-border-accent-0 onboarding-border-radius-10 fit"
          />

          <!-- <q-input   
            filled
            type="number"
            v-model="age"
            label="Your age *"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Please type your age',
              (val) => (val > 0 && val < 100) || 'Please type a real age',
            ]"
          /> -->

          <!-- START - Standard infinite form -->

          <div
            v-for="(taskItem, index) in taskForm.taskList"
            :key="taskItem.id"
            class="onboarding-border-accent-0 onboarding-border-radius-15 q-px-md q-py-md q-mt-lg q-mb-lg fit"
          >
            <div class="top-actions row justify-end q-mb-md">
              <q-btn
                flat
                dense
                class="action-icons"
                icon="delete"
                @click="
                  !$route.params.id
                    ? removeKeyResult(index)
                    : removeKeyResult(taskItem.id)
                "
              />
              <q-btn flat dense class="action-icons" icon="arrow_drop_up" />
            </div>

            <div class="q-my-lg">
              <q-item-label class="label key_result text-weight-bold q-mb-sm"
                >Task Name:
                <span class="required">*</span>
              </q-item-label>

              <div class="field">
                <q-input
                  v-model="taskItem.taskDesc"
                  dense
                  borderless
                  placeholder="Enter your task..."
                  :rules="[(val) => (val !== null && val !== '') || '']"
                  hide-bottom-space
                  class="onboarding-input-field onboarding-border-accent-0 onboarding-border-radius-10"
                />
              </div>
            </div>

            <div class="q-my-lg">
              <!-- <q-item-label class="label key_result text-weight-bold q-mb-sm"
                >Time:
              </q-item-label> -->

              <q-input
                dense
                borderless
                v-model="taskItem.time"
                hide-bottom-space
                class="onboarding-input-field onboarding-border-accent-0 onboarding-border-radius-10 onboarding-text-accent-0"
              >
                <template v-slot:append>
                  <q-icon
                    name="access_time"
                    class="cursor-pointer onboarding-text-accent-0"
                  >
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                      class="onboarding-text-accent-0"
                    >
                      <q-time
                        v-model="taskItem.time"
                        color="blue"
                        mask="h:mm A"
                        text-color="white"
                        class="onboarding-border-radius-10 text-bold"
                      >
                        <div class="row items-center justify-center">
                          <q-btn
                            v-close-popup
                            label="Cancel"
                            color="accent-0"
                            flat
                            @click="taskItem.time = '00:00 AM'"
                          />
                          <q-btn
                            v-close-popup
                            label="Save"
                            color="accent-0"
                            flat
                          />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <!-- <div class="field">
                <q-input
                  v-model="taskName"
                  type="time"
                  dense
                  borderless
                  placeholder="How you'll measure your progress..."
                  :rules="[(val) => (val !== null && val !== '') || '']"
                  hide-bottom-space
                  class="onboarding-input-field onboarding-border-accent-0 onboarding-border-radius-10"
                />
              </div> -->
            </div>
          </div>

          <!-- Remove the style attribute and use a class border-dashed instead -->
          <div
            style="border: 1px dashed #249990"
            class="onboarding-border-radius-15 flex justify-center standard-form-width q-my-sm q-pa-md fit"
          >
            <q-btn
              flat
              round
              class="onboarding-bg-accent-0 text-white onboarding-text-accent-1"
              id="generateKeyInput"
              @click="addKeyResult(currentLength - 1)"
              no-caps
              icon="add"
            />
          </div>

          <div class="q-mt-xl row justify-start">
            <q-btn
              dense
              flat
              no-caps
              label="Cancel"
              class="onboarding-button text-20 onboarding-bg-primary q-px-sm"
              @click="!$route.params.id ? $router.go(-1) : cancelEdit()"
            />
            <q-btn
              dense
              flat
              no-caps
              rounded
              label="Save"
              class="save-button onboarding-border-accent-0 text-white text-20 onboarding-bg-accent-0 q-px-xl"
              type="submit"
            />
          </div>
        </q-form>
      </div>
    </div>
  </transition>
</template>

<script src="./scripts/CreateTask.js"></script>
<style>
@import "./styles/TodoList.scss";
@import "./styles/CreateTask.scss";
</style>
