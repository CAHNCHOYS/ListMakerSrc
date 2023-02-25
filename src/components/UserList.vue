<template>
  <div class="list">
    <div class="list__body" v-if="list">
      <div class="list__name">
        <div class="list__name-edit" v-show="isNameEditing">
          <p>
            <input
              type="text"
              v-model="newListName"
              placeholder="Введите новое имя списка"
              class="list__edit-name-input"
              @keyup.enter="updateListName"
            />
          </p>

          <button class="btn" @click="updateListName">Сохранить</button>
        </div>
        <div class="list__current-name" v-show="!isNameEditing">
          <span class="icon-edit" @click="isNameEditing = true"></span>
          <span> {{ name }} </span>
        </div>
      </div>

      <div
        class="list__goto-add"
        v-if="list.listItems.length > 10"
        @click="goToAddInput"
      >
        <button class="btn">Перейти к добавлению элементов</button>
      </div>

      <div class="list__list-items" v-if="list.listItems.length">
        <TransitionGroup name="list-anim">
          <UserListItem
            v-for="(item, index) in list.listItems"
            :key="item.id"
            :is-last="index === list.listItems.length - 1"
            :index="index"
            :list-item="item"
            @delete-item="userListsStore.removeItemFromList(name, $event)"
            @swap="swapItems"
            @move-item="moveItem"
          />
        </TransitionGroup>
      </div>

      <div class="list__no-items" v-else>
        В списке пока нет элементов , исправьте это !
      </div>

      <form @submit.prevent="" class="list__add-form add-form">
        <div class="add-form__input">
          <span
            class="icon-close"
            @click="searchQuery = ''"
            v-show="searchQuery.length"
          >
          </span>
          <input
            v-model="searchQuery"
            :placeholder="hintsForUser.placeholderHint"
            type="text"
          />
        </div>

        <div
          class="add-form__search-elements search-elems"
          v-show="searchQuery.length > 0"
        >
          <div class="search-elems__searching" v-show="isSearching">
            <VLoading :message="hintsForUser.searchHint + searchQuery + '...'">
            </VLoading>
          </div>

          <div class="search-elems__error" v-if="isError">
            Произошла ошибка + {{ errorMessage }}
          </div>

          <div class="search-elems__all-elems" v-else-if="searchItems.length">
            <SearchListItem
              v-for="item in searchItems"
              :list-name="name"
              :key="item.title"
              :item="item"
            />
          </div>

          <div
            class="search-elems__no-items"
            v-else-if="!isSearching && !isTyping"
          >
            Не удалось найти ничего похожего на {{ searchQuery }}. Попробуйте
            начти что-нибудь другое
          </div>

        </div>
      </form>

      
    </div>
    <div class="list__no-list" v-else="!list">
      <p>Не удалось найти список с таким названием :(</p>
      <p>
        <RouterLink :to="{ name: 'all-lists' }" class="btn"
          >На страницу списков
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SearchListItem from "./SearchListItem.vue";
import UserListItem from "./UserListItem.vue";

import type { List } from "@/types/index";
import { useListItemsSearch } from "@/composables/useListItemsSearch";
import { useListItemsActions } from "@/composables/useListActions";
import { useUserListsStore } from "@/stores/userLists";

const props = defineProps<{
  name: string;
  list: List | undefined;
}>();

const userListsStore = useUserListsStore();

const {
  isNameEditing,
  newListName,

  moveItem,
  swapItems,
  goToAddInput,
  updateListName,
} = useListItemsActions(props);

const {
  isSearching,
  searchQuery,
  searchItems,
  hintsForUser,
  isError,
  errorMessage,
  isTyping,
} = useListItemsSearch(props)
</script>

<style lang="scss" scoped>
@import "@/assets/scss/adaptive-value.scss";

.list {
  padding: 0px 0px rem(40) 0px;
  // cursor: grab;

  // .list__name

  &__name {
    margin: 0px 0px rem(20) 0px;
  }

  // .list__name-edit

  &__name-edit {
    p {
      margin-bottom: rem(10);
    }
  }

  // .list__edit-name-input

  &__edit-name-input {
    border-bottom: rem(2) solid rgba($color: #000000, $alpha: 0.6);
    height: rem(40);

    width: 100%;
    max-width: rem(400);
    font-size: rem(20);

    &:focus {
      border-bottom: rem(2) solid rgba($color: #000000, $alpha: 1);
    }
  }

  // .list__current-name

  &__current-name {
    font-size: rem(42);
    font-weight: 600;
    display: inline-block;
    position: relative;
    padding: 0px rem(48) 0px 0px;

    span.icon-edit {
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(0, -50%);
      display: block;

      &::before {
        transition: color 0.5s ease 0s;
      }

      @media (any-hover: hover) {
        &:hover {
          &::before {
            color: cornflowerblue;
          }
        }
      }
    }

    @media (max-width: #{$tablet+px}) {
      font-size: rem(34);
    }
  }

  // .list__goto-add

  &__goto-add {
    margin: 0px 0px rem(10) 0px;

    button {
      border: rem(1) solid #8e44ad;
      border-radius: 0;
      line-height: 1.2;
      color: #8e44ad;
      background-color: transparent;

      transition: all 0.5s ease 0s;

      @media (any-hover: hover) {
        &:hover {
          background-color: #8e44ad;
          color: white;
        }
      }

      @media (max-width: #{$mobileSmall+px}) {
        font-size: rem(16);
        padding: 0px rem(10);
      }
    }
  }

  // .list__add-form
  &__add-form {
  }

  // .list__list-items
  &__list-items {
    margin: 0px 0px rem(40) 0px;
  }

  // .list__no-items
  &__no-items {
    margin: 0px 0px rem(10) 0px;
    font-size: rem(20);
  }

  // .list__no-list

  &__no-list {
    font-size: rem(20);

    p:not(:last-child) {
      margin-bottom: rem(10);
    }
  }
}

.add-form {
  // .add-form__input

  &__input {
    position: relative;
    z-index: 1;

    input {
      font-size: rem(24);
      width: 100%;
      height: rem(60);
      border: rem(2) solid rgba($color: black, $alpha: 0.5);
      padding: 0px rem(30) 0px rem(20);

      &:focus {
        border: rem(2) solid rgba($color: black, $alpha: 1);
      }

      &::placeholder {
        color: #111;
        opacity: 0.7;
      }
    }

    span {
      position: absolute;
      z-index: 2;
      font-size: rem(28);
      right: rem(5);
      top: 50%;
      display: block;
      transform: translate(0, -50%);
      cursor: pointer;

      &::before {
        font-size: rem(28);
      }
    }
  }

  // .add-form__search-elements

  &__search-elements {
    max-height: 700px;
    overflow-y: auto;

    border-left: rem(2) solid rgba($color: black, $alpha: 0.5);
    border-right: rem(2) solid rgba($color: black, $alpha: 0.5);
    border-bottom: rem(2) solid rgba($color: black, $alpha: 0.5);
  }
}

.search-elems {
  // .search-elems__searching

  &__searching {
    padding: 10px 0px 10px 0px;
  }

  // .search-elems__all-elems

  &__all-elems {
  }

  // .search-elems__no-items

  &__no-items {
    text-align: center;
    margin: rem(10) 0px;
    font-size: rem(20);
    font-weight: 500;
    line-height: 1.2;
  }

  // .search-elems__error
  &__error {
    padding: rem(10) 0px;
    text-align: center;
    color: crimson;
    font-size: rem(20);
  }
}

.list-anim-enter-active,
.list-anim-move,
.list-anim-leave-active {
  transition: all 0.6s ease 0s;
}

.list-anim-enter-from {
  transform: translate(0, -50%);
  opacity: 0;
}

.list-anim-enter-to {
  transform: translate(0, 0%);
  opacity: 1;
}

.list-anim-leave-to {
  transform: translate(0, 50%);
  opacity: 0;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.flip-list-move {
  transition: transform 5s;
}
</style>
