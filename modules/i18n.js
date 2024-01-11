const i18n = require('i18n');
const fs = require('fs');
const cookieParser = require('cookie-parser');

// Get locales by scanning .json files in locales directory
const locales = fs.readdirSync('./locales').map(file => file.split('.')[0]);

// Setup i18n
i18n.configure({
    locales: locales,
    directory: './locales',
    defaultLocale: 'et',
    cookie: 'locale',
});
const setupI18n = (app) => {
    // Setup cookie parser (required for i18n)
    app.use(cookieParser());

    // Initialize i18n
    app.use(i18n.init);

    // Set locale based on query parameter or cookie
    app.use((req, res, next) => {
        let currentLocale = req.query.locale || req.cookies?.locale || 'et';

        if (req.query.locale) {
            res.cookie('locale', req.query.locale, {maxAge: 900000, httpOnly: true});
        }
        req.setLocale(currentLocale);
        res.locals.currentLocale = currentLocale;
        res.locals.locales = i18n.getLocales();

        next();
    });
};

module.exports = setupI18n;
