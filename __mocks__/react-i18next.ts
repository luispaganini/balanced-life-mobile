module.exports = {
    useTranslation: () => ({
        t: (key: any) => key, // Retorna a própria chave como valor traduzido
        i18n: {
            changeLanguage: jest.fn(),
        },
    }),
};
