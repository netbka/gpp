import { defineStore } from "pinia";
import { type City } from "~/types/cityType";
interface CityStoreState {
  selectedItem: City;
  itemArray: City[];
}

export const useCityStore = defineStore("city", {
  state: (): CityStoreState => ({
    itemArray: [],
    selectedItem: {
      _id: 0,
      city_code: 0,
      city_name_he: "",
      city_name_en: "",
      region_code: 0,
      region_name: "",
      PIBA_bureau_code: 0,
      PIBA_bureau_name: "",
      Regional_Council_code: 0,
      Regional_Council_name: "",
    } as City,
  }),
  actions: {
    async getCities(query) {
      query = query ? query : "";
      const uri = "https://data.gov.il/api/3/action/datastore_search?resource_id=8f714b6f-c35c-4b40-a0e7-547b675eee0e&limit=10&q=" + query;
      const { data } = await useLazyFetch(uri, {
        method: "get",
        server: false,
      });
      //console.log(toRaw(data));
      //itemArray = data.result.records;
    },
  },
});
