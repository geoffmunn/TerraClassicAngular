export class LocalStorage {
    public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
    }

    public getData(key: string) {
    return localStorage.getItem(key);
    }
    
    public removeData(key: string) {
    localStorage.removeItem(key);
    }

    public clearData() {
    localStorage.clear();
    }
}
