import chalk from "chalk";

function success(message) {
  console.log(chalk.greenBright(message));
}
function error(message) {
  console.log(chalk.redBright(message));
}
function warn() {
  console.log(chalk.yellowBright(message));
}

export { success, error, warn };
