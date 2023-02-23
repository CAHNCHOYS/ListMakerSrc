import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { List, ListItem } from "@/types/index";

export const useUserListsStore = defineStore("lists", () => {


  const userLists = ref<Map<string, List>>(
    new Map(JSON.parse(localStorage.getItem("userLists") || "[]"))
  );

  const saveListsInStorage = (): void => {
    localStorage.setItem(
      "userLists",
      JSON.stringify(Array.from(userLists.value.entries()))
    );
  };

  const createNewList = (name: string, category: string): void => {
    userLists.value.set(name, { category, listItems: [] });
    saveListsInStorage();
  };

  const deleteList = (name: string): void => {
    userLists.value.delete(name);
    saveListsInStorage();
  };

  const addItemToList = (listName: string, item: ListItem) => {
    const items = userLists.value.get(listName)!;
    if (!items.listItems.find((element) => element.title === item.title)) {
      items.listItems.push(item);
      saveListsInStorage();
      return {
        isAdded: true,
      };
    } else
      return {
        isSameItem: true,
      };
  };

  const removeItemFromList = (listName: string, index: number): void => {
    userLists.value.get(listName)?.listItems.splice(index, 1);
    saveListsInStorage();
  };

  const updateListName = (oldName: string, newName: string): void => {
    if (oldName === newName) return;

    const oldList = userLists.value.get(oldName);
    if (oldList) {
      userLists.value.set(newName, oldList);
      userLists.value.delete(oldName);

      saveListsInStorage();
    }
  };

  const filterListsByCategory = computed(() => {
    return function (category: string) {
      return Array.from(userLists.value.entries()).filter(
        ([key, item]) => item.category === category
      );
    };
  });

  const getListByName = computed(() => {
    return function (name: string) {
      return userLists.value.get(name);
    };
  });

  return {
    createNewList,
    deleteList,
    addItemToList,
    removeItemFromList,
    saveListsInStorage,
    updateListName,

    filterListsByCategory,
    getListByName,
  };
});
