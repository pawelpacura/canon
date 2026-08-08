import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const npmrcPath = path.join(root, ".npmrc");
const npmrcBackupPath = path.join(root, ".npmrc.figma-backup");
const npmRegistry = "https://registry.npmjs.org/";

function run(command, options = {}) {
  return execSync(command, {
    cwd: root,
    stdio: options.inherit ? "inherit" : "pipe",
    encoding: "utf8",
    env: {
      ...process.env,
      npm_config_registry: npmRegistry,
    },
  });
}

function assertLoggedIn() {
  try {
    const user = run(`npm whoami --registry=${npmRegistry}`, { inherit: false }).trim();
    console.log(`npm: logged in as "${user}"`);
    return;
  } catch {
    console.error(`
Publish failed: brak ważnej sesji na registry.npmjs.org (npm zwraca 404 bez auth).

Zaloguj się ponownie:
  npm logout --registry=${npmRegistry}
  npm login --registry=${npmRegistry} --auth-type=web

Potem:
  npm run publish:public
`);
    process.exit(1);
  }
}

function runPublish() {
  run("npm publish --access public", { inherit: true });
}

let movedNpmrc = false;

try {
  assertLoggedIn();

  if (fs.existsSync(npmrcPath)) {
    fs.renameSync(npmrcPath, npmrcBackupPath);
    movedNpmrc = true;
    console.log("Temporarily moved .npmrc (Figma registry) out of the way for npm publish.");
  }

  runPublish();
} finally {
  if (movedNpmrc && fs.existsSync(npmrcBackupPath)) {
    fs.renameSync(npmrcBackupPath, npmrcPath);
    console.log("Restored .npmrc.");
  }
}
