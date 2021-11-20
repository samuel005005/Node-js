const { inquirerMenu, pausa } = require("./helpers/inquirer");

const main = async ( ) => {
    let option;
    do {
        option = await inquirerMenu();
        if(option !== 0) await pausa();
    } while (option !== 0);
}

main();