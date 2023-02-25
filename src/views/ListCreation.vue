<template>
    <div class="list-creation">
        <form name="name-form" class="list-creation__name-form name-form" v-if="!isListNameAdded">
            <div class="name-form__title">Имя списка: </div>
            <div class="name-form__input">
                <input type="text" v-model="listName" placeholder="Введите имя списка сюда">
                <div class="name-form__wrong-name" v-show="isWrongName">
                    Название списка должно содержать минимум 4 символов !
                </div>
            </div>
            <button @click.prevent="createNewList" class="name-form__btn btn">
                Далее
            </button>
        </form>

        
        <Transition name="scale">

            <div class="list-creation__user-list" v-if="isListNameAdded">
                <UserList :list="userListsStore.getListByName(listName)!" :name="listName" />
            </div>

            
        </Transition>


    </div>
</template>

<script setup lang="ts">
import { useUserListsStore } from '@/stores/userLists';
import { ref,  watchEffect } from 'vue';
import UserList from '../components/UserList.vue';


const props = defineProps<{
     category: string,

}>();

const userListsStore = useUserListsStore();


const listName = ref("");
const isWrongName = ref(false);
const isListNameAdded = ref(false);


watchEffect(()=> {
    if (listName.value.length < 4) {
        isWrongName.value = true;
    } else isWrongName.value = false;
});




const createNewList = ():void => {
    if (isWrongName.value) return;
      
    userListsStore.createNewList(listName.value, props.category);
    isListNameAdded.value = true;
}











</script>

<style lang="scss" scoped>
@import "@/assets/scss/adaptive-value.scss";


.list-creation {


    // .list-creation__name-form
    &__name-form {}

    

    &__user-list {
        flex: 1 1 auto;
    }

 

    &__title {

        font-weight: 500;
        font-size: rem(28);
        margin: 0px 0px rem(10) 0px;
    }
}

.name-form {

    // .name-form__title

    &__title {
        font-size: rem(40);

        margin: 0px 0px rem(10) 0px;

    }

    // .name-form__input

    &__input {
        input {
            width: 100%;
            height: rem(55);
            padding: 0px rem(20);
            font-size: rem(24);
            color: black;
            border: 1px solid lightgrey;

            &:focus{
                border: 1px solid black;
            }
        }

        margin: 0px 0px rem(20) 0px;
    }

    // .name-form__wrong-name

    &__wrong-name {
        margin: rem(5) 0px 0px 0px;
        color: crimson;

    }

    // .name-form__btn

    &__btn {}
}


.scale-enter-active, .scale-leave-active{
    transition: all 0.5s ease 0s;
}

.scale-enter-from{
    transform: scale(0);
     opacity: 0;
}
.scale-enter-to{
    transform: scale(1);
    opacity: 1;
}


</style>