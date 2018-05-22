const menuJSON = require('./menu.json');
const menu = {};

menuJSON.forEach((menuItem) => {
    menu[menuItem.id] = menuItem;
});

module.exports = menu;