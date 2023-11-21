const fs = require("fs");
const path = require("path");

function handler(bot) {
  const commandsPath = path.join(__dirname, '..', 'commands');
  const commandFiles = fs.readdirSync(commandsPath);

  commandFiles.forEach((file) => {
    const commandModule = require(path.join(commandsPath, file));

    if (commandModule.name && commandModule.execute) {
      bot.command(commandModule.name, async (ctx) => {
        try {
          await commandModule.execute(ctx);
        } catch (error) {
          console.error(
            `Erro ao executar comando ${commandModule.name}:`,
            error
          );
          ctx.reply("Desculpe, ocorreu um erro ao processar o comando.");
        }
      });
    } else {
      console.warn(
        `Arquivo ${file} não possui propriedades 'name' e 'execute', ignorado.`
      );
    }
  });
}

module.exports = { handler };
