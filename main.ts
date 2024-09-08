import path from "node:path";
import {dirname, importx} from "@discordx/importer";
import {bot} from "./bot.js";
import env from "./start/env.js";

async function run(): Promise<void> {
  const modulesPath = path.join(dirname(import.meta.url), "modules");
  await importx(`${modulesPath}/**/events/**/*.{ts,js}`);
  await importx(`${modulesPath}/**/commands/**/*.{ts,js}`);

  await bot.login(env.BOT_TOKEN);
}

void run();
