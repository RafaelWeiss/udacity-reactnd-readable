export function updateItemInArray(array, itemId, updateItemCallback) {
    return array.map(item => {
        if (item.id !== itemId) {
            return item;
        }
        return updateItemCallback(item);
    });
}