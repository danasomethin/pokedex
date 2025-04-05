import { type Ref, ref } from "vue";
import { defineStore } from "pinia";

export const useUserData = defineStore("userData", () => {
  /*
    User's favourite pokemon
  */
  const favouritesById: Ref<FavouritesById> = ref({
    localStorageName: "userFavourites",
    val: JSON.parse(localStorage.getItem("userFavourites") ?? "[]"),
  });

  /*
    User to favourite a pokemon
  */
  function addPokemonToFavourites(id: string) {
    if (favouritesById.value.val.includes(id)) {
      return;
    }

    favouritesById.value.val.push(id);
    updateLocalStorage(
      favouritesById.value.localStorageName,
      favouritesById.value.val
    );
  }

  /*
    User to unfavourite a pokemon
  */
  function removePokemonFromFavourites(id: string) {
    if (!favouritesById.value.val.includes(id)) {
      return;
    }

    favouritesById.value.val = favouritesById.value.val.filter(
      (item) => item !== id
    );
    updateLocalStorage(
      favouritesById.value.localStorageName,
      favouritesById.value.val
    );
  }

  /*
    Check if Pokemon id is in favourites
  */
  function toggleFavourite(id: string | number): void {
    const idInString: string = id.toString();

    isPokemonInFavourites(idInString)
      ? removePokemonFromFavourites(idInString)
      : addPokemonToFavourites(idInString);
  }

  /*
    Check if Pokemon id is in favourites
  */
  function isPokemonInFavourites(id: string | number): boolean {
    const idInString: string = id.toString();
    return favouritesById.value.val.some((item) => item === idInString);
  }

  /*
    Update the local storage value with the itemName
  */
  function updateLocalStorage(itemName: string, value: any) {
    localStorage.setItem(itemName, JSON.stringify(value));
  }

  return {
    favouritesById,
    isPokemonInFavourites,
    toggleFavourite,
  };
});

/*
 */
interface FavouritesById {
  localStorageName: string;
  val: string[];
}
