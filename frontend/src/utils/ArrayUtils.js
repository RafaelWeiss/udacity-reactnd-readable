export function sortBy(array = [], attr = '') {
    return array.sort((a, b) => {
        const aValue = a[attr];
        const bValue = b[attr];

        if (typeof aValue === 'string') {
            return aValue.localeCompare(bValue);
        }
        return bValue - aValue;
    });
}