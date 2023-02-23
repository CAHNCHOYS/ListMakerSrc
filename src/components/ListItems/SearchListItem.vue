<template>
    <div class="search-item">
        <div class="search-item__row">
            <div class="search-item__picture list-item-image">
                <img v-if="item.image" :src="item.image" :alt="item.image" />
                <img v-else="item.image" src="@/assets/Images/NoImage.png" alt="No picture" />
            </div>
            <div class="search-item__info">
                <div class="search-item__title">{{ item.title }}</div>
                <div class="search-item__date" v-if="item.creationDate">
                    Дата выпуска - {{ item.creationDate }}
                </div>
                <div class="search-item__description" v-if="item.description">
                    {{ item.description }}
                </div>
            </div>
            <div class="search-item__add-btn">
                <button class="btn" @click="addNewItem">Добавить</button>
                <Transition name="message">
                    <p class="search-item__action-message search-item__action-message_success" v-show="isItemAdded">
                        Элемент добавлен в список
                    </p>
                </Transition>

                <Transition name="message">
                    <p class="search-item__action-message search-item__action-message_err" v-show="isSameItem">
                        Такой элемент уже есть в списке!
                    </p>
                </Transition>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserListsStore } from "@/stores/userLists";
import type { ListItem } from "@/types/index";

const props = defineProps<{
    item: ListItem;
    listName: string;
}>();


const { addItemToList } = useUserListsStore();

const isItemAdded = ref(false);
const isSameItem = ref(false);

const addNewItem = () => {
    if (addItemToList(props.listName, props.item).isAdded) {
        isItemAdded.value = true;
        setTimeout(() => (isItemAdded.value = false), 1500);
    } else {
        isSameItem.value = true;
        setTimeout(() => (isSameItem.value = false), 1500);
    }
};



</script>

<style lang="scss" scoped>
@import "@/assets/adaptive-value.scss";

.search-item {

    // .search-item__row
    &__row {
        padding: rem(10) rem(20);
        border-bottom: rem(1) solid lightgrey;
        display: flex;
        align-items: center;

        column-gap: 10px;

        @media (max-width: #{$mobile+px}) {
            flex-wrap: wrap;
            row-gap: 10px;
        }
    }

    // .search-item__picture
    &__picture {
    
    }

    // .search-item__info

    &__info {
        flex: 1 1 auto;

        >*:last-child {
            margin-bottom: 0;
        }
    }

    // .search-item__title

    &__title {
        font-size: rem(26);
        font-weight: 600;
        margin: 0px 0px rem(8) 0px;

        @media (max-width: #{$mobile+px}) {
            font-size: rem(20);
        }
    }

    // .search-item__date

    &__date {
        font-size: rem(20);

        @media (max-width: #{$mobile+px}) {
            font-size: rem(16);
        }
    }

    // .search-item__description

    &__description {
        font-size: rem(20);

        @media (max-width: #{$mobile+px}) {
            font-size: rem(16);
        }
    }

    // .search-item__add-btn
    &__add-btn {
    

        button {
            border-radius: rem(10);
            padding: 0 rem(15);
        }
    }


    // .search-item__action-message

    &__action-message {

        margin: rem(10) 0px 0px 0px;
        font-size: rem(20);
        font-weight: 500;
        // .search-item__action-message_success

        &_success {
            color: rgb(57, 238, 57);
        }

        // .search-item__action-message_err

        &_err {
            color: crimson;
        }
    }
}





</style>

