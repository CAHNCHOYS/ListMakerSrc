<template>
    <div class="list-page">
       
        <UserList :list="userListsStore.getListByName(name)" :name="name"></UserList>
    </div>
</template>

<script lang="ts" setup>
import { useUserListsStore } from '@/stores/userLists';
import UserList from '../components/UserList.vue';

const userListsStore = useUserListsStore();


const props = defineProps<{
    name: string,
}>();









</script>

<style lang="scss" scoped></style>