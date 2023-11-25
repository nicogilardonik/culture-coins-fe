<template>
    <CRow>
        <CCol v-if="requiredFilter" xs="6" class="d-flex align-items-center">
            <div class="mr-2">
                <select v-model="localFilterSelected" class="form-control w-auto d-inline-block" @change="filterItems">
                    <option value="">Sort by</option>
                    <option v-for="filter in filters" :value="filter.value" :key="filter.value">
                        {{ filter.name }}
                    </option>
                </select>
            </div>

            <div class="ml-auto">
                <IconSortDescending2 v-if="localFilterSelected && !ascendingSort" @click="toggleSortOrder('descending')"
                    color="#0054a6" size="1.8rem" class="m-1 icon-sort-descending2" />
                <IconSortAscending2 v-if="localFilterSelected && ascendingSort" @click="toggleSortOrder('ascending')"
                    color="#0054a6" size="1.8rem" class="m-1 icon-sort-ascending2" />
            </div>
        </CCol>

        <CCol v-if="requiredCancelButton" xs="6" class="d-flex align-items-center">
            <div class="d-flex justify-content-end">
                <CButton color="danger" :size="buttonSize" class="kibana-font-weight" @click="fnCancelButton">
                    <IconX size="1.2rem" />
                    Cancel
                </CButton>
            </div>

        </CCol>

        <CCol v-if="requiredButton" :cols="requiredFilter ? 6 : 12" class="d-flex justify-content-end"
>
            <div>
                <CButton v-if="action == 'create'" :size="buttonSize" color="primary" class="kibana-font-weight" @click="fnButton">
                    <IconFilePlus size="1.2rem" />
                    {{ textButton }}
                </CButton>

                <CButton v-else-if="action == 'save'" :size="buttonSize" color="primary" class="kibana-font-weight" @click="fnButton">
                    <IconDeviceFloppy color="#fff" size="1.2rem" />
                    {{ textButton }}
                </CButton>

                <CButton v-else color="primary" :size="buttonSize" class="kibana-font-weight" @click="fnButton">
                    {{ textButton }}
                </CButton>
            </div>
        </CCol>
    </CRow>
</template>
  
<script>

import { mapState } from 'vuex';
import { IconSortDescending2, IconSortAscending2 } from '@tabler/icons-vue';
import { IconDeviceFloppy, IconFilePlus, IconX } from '@tabler/icons-vue';

export default {

    emits: ['filter-changed'],

    components: {
        IconSortDescending2,
        IconSortAscending2,
        IconFilePlus,
        IconDeviceFloppy,
        IconX 

    },

    watch: {
        filterSelected: function (val) {
            this.localFilterSelected = val;
        },
        items: function (val) {
            this.localItems = val;
        }
    },

    props: {
        requiredFilter: {
            type: Boolean,
            default: false
        },
        filters: Array,
        items: Array,

        requiredCancelButton:{
            type: Boolean,
            default: false
        },
        fnCancelButton:{
            type: Function,
            required: false,
        },

        requiredButton: {
            type: Boolean,
            default: false
        },
        textButton: {
            type: String,
            required: false,
        },
        fnButton: {
            type: Function,
            required: false,
        },
        action: {
            type: String, //create, save
            required: false,
        },

    },

    computed: mapState(['pageTitle']),

    data() {
        return {
            ascendingSort: true,
            filterSelected: '',
            localFilterSelected: "",
            localItems: this.items,
            buttonSize: 'sm',
        }
    },

    mounted() {
        this.adjustSizeButton();
    },

    methods: {
        filterItems() {
            if(this.localFilterSelected == '' || this.localFilterSelected == null){
                this.localItems = this.items;
                this.$emit('filter-changed', this.localItems);
                return;
            }
            this.localItems.sort((a, b) => {
                if (this.ascendingSort) {
                    return a[this.localFilterSelected].localeCompare(b[this.localFilterSelected]); //asc
                } else {
                    return b[this.localFilterSelected].localeCompare(a[this.localFilterSelected]); //desc
                }
            });
            this.$emit('filter-changed', this.localItems);
        },
        toggleSortOrder(sortOrder) {
            if (sortOrder === 'ascending') {
                this.ascendingSort = !this.ascendingSort;
            } else if (sortOrder === 'descending') {
                this.ascendingSort = !this.ascendingSort;
            }
            this.filterItems();
        },
        adjustSizeButton(){
            let isMobile = window.innerWidth <= 768;
            if(!isMobile){
                this.buttonSize = null;
            }
        }
    }
}

</script>
<style></style>