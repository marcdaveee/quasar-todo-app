import { ref } from 'vue';
import { useQuasar } from 'quasar';
import Filters from '../../../components/Filters.vue';
import Pagination from '../../../components/Pagination.vue';
import MainDialog from '../../../components/MainDialog.vue';
import { ToggleMainDialogState } from '../../../composables/Triggers.js';
import DeleteConfirmation from '../components/DeleteConfirmation.vue';
import MobileFilter from '../../../components/MobileFilter.vue';
import UserCard from '../components/UserCard.vue';
import { FetchORNumbers } from '../../../composables/ORNumber';
import { SearchList } from '../../../composables/Search';
export default {
	components: {
		Filters,
		Pagination,
		MainDialog,
		DeleteConfirmation,
		MobileFilter,
		UserCard,
	},
	setup() {
		const $q = useQuasar();

		// For table rows
		let orNUmberList = ref([
			{
				form_type: 'Police Clearance',
				fund_type: 'General Fund',
				from: 10,
				to: 29,
				quantity: 10,
				used: 0,
			},
		]);

		// For page loading
		let pageLoadingState = ref(false);

		// For pagination
		let pagination = ref({
			sortBy: 'desc',
			descending: false,
			page: 1,
			rowsPerPage: 10,
		});

		// For table column
		let columns = [
			{
				name: 'form_type',
				required: true,
				label: 'Form Type',
				align: 'left',
				field: 'form_type',
				sortable: true,
			},
			{
				name: 'from',
				align: 'left',
				label: 'From',
				field: 'from',
			},
			{
				name: 'to',
				align: 'left',
				label: 'To',
				field: 'to',
			},
			{
				name: 'fund_type',
				align: 'left',
				label: 'Fund Type',
				field: 'fund_type',
			},

			{
				name: 'quantity',
				align: 'left',
				label: 'Qty',
				field: 'quantity',
			},
			{
				name: 'used',
				align: 'left',
				label: 'Used',
				field: 'used',
			},
			{
				name: 'action',
				align: 'left',
				label: '',
				field: 'action',
				style: 'width: 10%',
			},
		];

		// Delete function
		const deleteORNumber = (row) => {
			ORNumberDetails.value = row;
			ToggleMainDialogState();
		};
		return { pagination, columns, orNUmberList, deleteORNumber, pageLoadingState };
	},
};
