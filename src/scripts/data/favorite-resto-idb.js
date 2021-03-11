import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteRestoIdb = {
  async getResto(id) {
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async getAllRestoes() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putResto(Resto) {
    return (await dbPromise).put(OBJECT_STORE_NAME, Resto);
  },
  async deleteResto(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
  async getByName(data, keyword) {
    return (await data).filter((resto) => resto.name.toUpperCase()
      .includes(keyword.toUpperCase()));
  },
  async getCount() {
    return (await dbPromise).count(OBJECT_STORE_NAME);
  },
};

export default FavoriteRestoIdb;
