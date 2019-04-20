export const LOCALE_DEFAULT = 'en_US';

export const getLocale = () => {
    return (
        (navigator.languages && navigator.languages[0]) ||
        navigator.language ||
        navigator.userLanguage ||
        LOCALE_DEFAULT
    );
};

export const locales = [
    {
        locale: 'en_US',
        label: 'label.en_US'
    },
    {
        locale: 'pt_BR',
        label: 'label.pt_BR'
    }
];
