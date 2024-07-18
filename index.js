const { defaultTo, castArray } = require("lodash");
const verifyConditions = require("./src/verify");

let verified;

/**
 * Called by semantic-release during the verification step
 * @param {*} pluginConfig The semantic-release plugin config
 * @param {*} context The context provided by semantic-release
 */
async function verify(pluginConfig, context) {
  const { logger, options } = context;

  console.log({ pluginConfig });

  if (options.prepare) {
    const preparePlugin =
      castArray(options.prepare).find((config) => config.path && config.path === "@semantic-release/teams-notifier") ||
      {};

    pluginConfig.teamsWebhook = defaultTo(pluginConfig.teamsWebhook, preparePlugin.teamsWebhook);
  }

  console.log({ pluginConfig });

  await verifyConditions(pluginConfig, context);
  verified = true;
}

// async function prepare(pluginConfig, context) {
//   const { logger } = context;
//   logger.log("@semantic-release/teams-release-notifier: prepare");
// }

// async function publish(pluginConfig, context) {
//   const { logger } = context;
//   logger.log("@semantic-release/teams-release-notifier: publish");
// }

async function success(pluginConfig, context) {
  const { logger } = context;
  logger.log("starting");
  require("./src/success")(pluginConfig, context);
}

// async function fail(pluginConfig, context) {
//   const { logger } = context;
//   logger.log("@semantic-release/teams-release-notifier: fail");
// }

module.exports = { verify, success };
