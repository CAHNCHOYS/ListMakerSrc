import type { List, ListItem } from "@/types/index";
import { useUserListsStore } from "@/stores/userLists";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useListItemsActions = (props: {
  name: string;
  list: List | undefined;
}) => {

  const router = useRouter();



  const userListsStore = useUserListsStore();
  const isNameEditing = ref(false);
  const newListName = ref(props.name);

  const updateListName = ():void => {
    if(newListName.value.length < 4) return;
    userListsStore.updateListName(props.name, newListName.value);
    isNameEditing.value = false;
    router.push({
      name: "single-list",
      params: {
        name: newListName.value,
      },
    });
  };

  //Смена мест двух любых элементов в списке
  const moveItem = (newIndex: number, oldIndex: number):void => {
    if (newIndex < 0 || newIndex >= props.list!.listItems.length) return;
    
    [props.list!.listItems[newIndex], props.list!.listItems[oldIndex]] = [
      props.list!.listItems[oldIndex],
      props.list!.listItems[newIndex],
    ];
  };

  //Меняем местами 2 соседних   элемента списка
  const swapItems = (type: "down" | "up", index: number):void => {
    if (type === "up") {
      [props.list!.listItems[index - 1], props.list!.listItems[index]] = [
        props.list!.listItems[index],
        props.list!.listItems[index - 1],
      ];
    } else {
      [props.list!.listItems[index + 1], props.list!.listItems[index]] = [
        props.list!.listItems[index],
        props.list!.listItems[index + 1],
      ];
    }
    userListsStore.saveListsInStorage();
  };

  const goToAddInput = (): void => {
    document.querySelector(".add-form")!.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  

  return {
    goToAddInput,

    swapItems,
    updateListName,
    moveItem,

    isNameEditing,
    newListName,
  };
};
