<template>
  <div class="list-item">
    <div class="list-item__row">
      <div
        class="list-item__index"
        :class="[top3Items, isUserEditing ? 'edit' : '']"
      >
        <span v-if="!isUserEditing"> {{ index + 1 }} </span>
        <span v-else>
          <input type="number" v-model.number="newIndex" tabindex="0" />
        </span>
      </div>

      <div class="list-item__arrows">
        <div
          v-if="index != 0"
          @click="$emit('swap', 'up', index)"
          class="list-item__arrow icon-arrow-up"
        ></div>
        <div
          v-if="!isLast"
          class="list-item__arrow icon-arrow-down"
          @click="$emit('swap', 'down', index)"
        ></div>
      </div>

      <div class="list-item__picture list-item-image">
        <img
          v-if="listItem.image"
          :src="listItem.image"
          :alt="listItem.image"
        />
        <img
          v-else="item.image"
          src="@/assets/Images/NoImage.png"
          alt="No picture"
        />
      </div>

      <div class="list-item__info">
        <div class="list-item__name">
          {{ listItem.title }}
        </div>
        <div class="list-item__date" v-if="listItem.creationDate">
          Дата выпуска - {{ listItem.creationDate }}
        </div>

        <div class="list-item__desc" v-if="listItem.description">
          {{ listItem.description }}
        </div>
      </div>

      <div class="list-item__all-actions">
        <ul class="list-item__actions-list">
          <li>
            <span
              class="list-item__action icon-edit"
              @click="isUserEditing = !isUserEditing"
            ></span>
          </li>
          <li>
            <span
              class="list-item__action icon-trash-can"
              @click="$emit('deleteItem', index)"
            ></span>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="list-item__comment"
      v-show="listItem.userComment && !isUserEditing"
    >
      <span> {{ listItem.userComment }} </span>
    </div>
    <div class="list-item__create-comment" v-show="isUserEditing">
      <p>Ваш комментарий:</p>
      <input type="text" v-model="listItem.userComment" tabindex="1" />
      <button class="btn" @click="saveChanges">Сохранить</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ListItem } from "@/types/index";
import { computed } from "@vue/reactivity";
import { ref, watch } from "vue";
import { useUserListsStore } from "@/stores/userLists";

const props = defineProps<{
  listItem: ListItem;
  index: number;
  isLast: boolean;
}>();

const emit = defineEmits<{
  (e: "deleteItem", index: number): void;
  (e: "swap", type: "up" | "down", index: number): void;
  (e: "moveItem", index: number, oldIndex: number): void;
}>();


watch(
  () => props.index,
  () => {
    newIndex.value = props.index + 1;
  }
);


const userListsStore = useUserListsStore();
const isUserEditing = ref(false);
const newIndex = ref(props.index + 1);

const saveChanges = () => {
  isUserEditing.value = false;
  emit("moveItem", newIndex.value - 1, props.index);
  userListsStore.saveListsInStorage();
};

const top3Items = computed(() => {
  return {
    gold: props.index === 0,
    silver: props.index === 1,
    cuprum: props.index === 2,
  };
});



</script>

<style lang="scss" scoped>
@import "@/assets/adaptive-value.scss";

.list-item {
  border-bottom: rem(1) solid lightgrey;
  padding: 10px 0px;

  // .list-item__row
  &__row {
    display: flex;
    align-items: center;
    column-gap: 30px;
    position: relative;
    padding: 0px 20px;

    @media (max-width: #{$tablet+px}) {
      column-gap: 15px;
      padding: 0px;
    }

    @media (max-width: #{$mobileSmall+px}) {
      flex-wrap: wrap;
      row-gap: 8px;
      justify-content: center;
    }
  }

  // .list-item__arrows

  &__arrows {
    display: flex;
    flex-direction: column;
    row-gap: rem(10);

    @media (max-width: #{$mobile+px}) {
      align-self: flex-end;
    }
  }

  // .list-item__arrow

  &__arrow {
    cursor: pointer;

    &::before {
      font-weight: 600;
      transition: all 0.5s ease 0s;
      font-size: rem(24);
    }

    @media (any-hover: hover) {
      &.icon-arrow-up:hover::before {
        color: rgb(34, 212, 34);
      }

      &.icon-arrow-down:hover::before {
        color: crimson;
      }
    }
  }

  // .list-item__index

  &__index {
    flex: 0 0 rem(38);
    height: rem(38);
    border-radius: 50%;
    display: flex;
    background-color: black;
    color: white;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: rem(24);

    &.edit {
      border-radius: 0;
    }

    input {
      width: 100%;
      background-color: transparent;
      color: white;
      text-align: center;
      font-size: rem(24);
      font-weight: 700;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      @media (max-width: #{$mobile+px}) {
        font-size: rem(20);
      }
    }

    &.gold {
      background-color: rgb(207, 177, 2);
      font-weight: 900;
    }

    &.silver {
      background-color: silver;
      font-weight: 900;
    }

    &.cuprum {
      background-color: #b87333;
      font-weight: 900;
    }

    @media (max-width: #{$mobile+px}) {
      width: rem(30);
      height: rem(30);
      font-size: rem(18);
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  // .list-item__picture
  &__picture {
  }

  // .list-item__info

  &__info {
    flex: 1 1 auto;

    > *:last-child {
      margin-bottom: 0px;
    }

    @media (max-width: #{$mobileSmall+px}) {
      flex: 1 1 100%;
      order: 5;
      text-align: center;
    }
  }

  // .list-item__name

  &__name {
    font-weight: 600;
    font-size: rem(24);
    margin: 0px 0px rem(10) 0px;
    line-height: 1.1;

    @media (max-width: #{$mobile+px}) {
      font-size: rem(20);
    }
  }

  // .list-item__date

  &__date {
    @media (max-width: #{$mobile+px}) {
      font-size: rem(16);
    }
    margin: 0px 0px rem(5) 0px;
  }

  // .list-item__desc

  &__desc {
    @media (max-width: #{$mobile+px}) {
      font-size: rem(16);
    }
  }

  // .list-item__all-actions

  &__all-actions {
  }

  // .list-item__actions-list

  &__actions-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: rem(8);
    border: rem(2) solid black;
    border-radius: rem(10);

    @media (max-width: #{$mobile+px}) {
      padding: rem(5);
    }
  }

  // .list-item__action
  &__action {
    cursor: pointer;

    &::before {
      font-size: rem(24);
      font-weight: 600;
      transition: color 0.5s ease 0s;
    }

    &.icon-trash-can:hover {
      &::before {
        color: crimson;
      }
    }

    &.icon-edit:hover {
      &::before {
        color: cornflowerblue;
      }
    }
  }

  // .list-item__comment

  &__comment {
    text-align: center;
    font-size: rem(20);
    font-weight: 500;

    margin: rem(5) 0px 0 0px;

    @media (max-width: #{$mobileSmall+px}) {
      margin: rem(10) 0px 0 0px;

      font-size: rem(18);
    }
  }

  // .list-item__create-comment

  &__create-comment {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 15px;

    p {
      flex: 0 1 auto;
      line-height: 1.2;
      font-weight: 500;
    }

    input {
      flex: 1 1 auto;
      height: rem(40);
      padding: 0px rem(15);
      font-size: rem(20);
      border: rem(1) solid gray;
      width: 100%;

      &:focus {
        border: rem(1) solid black;
      }
    }

    margin: rem(5) 0px 0 0px;

    @media (max-width: #{$mobileSmall+px}) {
      margin: rem(10) 0px 0 0px;
      flex-direction: column;
      row-gap: rem(4);

      input {
        font-size: rem(16);
      }
    }

    button {
      @media (max-width: #{$mobile+px}) {
        padding: 0 rem(10);
      }
    }
  }
}
</style>
