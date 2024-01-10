<script setup>
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { ref } from "vue";
import { ToggleMainDialogState } from "../../../composables/Triggers";
import { ORNumberDetails, DeleteORRange } from "../../../composables/ORNumber";

const $q = useQuasar();
const store = useStore();
let btnLoadingState = ref(false);
const closeDialog = () => {
  ToggleMainDialogState();
};

const deleteORNumnber = () => {
  ToggleMainDialogState();
};
</script>

<template>
	<div class="width-300">
		<div class="full-width flex justify-center q-mb-md">
			<div class="onboarding-border-radius-10 bg-white width-auto q-pa-sm">
				<q-icon name="iconfont icon-delete-fill" class="onboarding-text-accent-0" size="30px" />
			</div>
		</div>
		<h4 :class="`text-semibold text-32 q-my-none ${$q.screen.width < 768 ? 'q-mb-sm' : 'q-mb-lg'}`">
			Are you sure?
		</h4>
		<p class="text-24 text-weight-light">
			You're about to delete Range
			<span class="text-bold">{{ ORNumberDetails.from }}-{{ ORNumberDetails.to }}</span> that has
			<span class="text-bold">{{ ORNumberDetails.used }}</span> used ORs
		</p>
		<q-btn
			@click="deleteORNumnber()"
			:loading="btnLoadingState"
			flat
			no-caps
			label="Yes, I'm sure"
			dense
			:class="`onboarding-bg-accent-0 onboarding-text-accent-1 text-white full-width q-py-sm q-mb-s onboarding-border-radius-${
				$q.screen.width < 768 ? '10' : '50'
			}`"
		/>
		<div @click="closeDialog()" class="full-width q-py-sm cursor-pointer text-14">Cancel</div>
	</div>
</template>
