export class Storage {

    static getItem(key) {
        return JSON.parse(localStorage.getItem(key));
      }
      
      static setItem(key, value) {
        const stringifiedValue = JSON.stringify(value);
        localStorage.setItem(key, stringifiedValue);
      }

      static removeItem(key) {
        // if (notify) {
        //   PosNotifier.emitEvent(key, 'removed');
        // }
        localStorage.removeItem(key);
      }
}