const { announceCard, createCard } = require("../lib/card-announcer");
const getPkg = require("../lib/get-pkg");
/**
 * A method to verify that the user has given us a slack webhook url to post to
 */
module.exports = async (pluginConfig, context) => {
  const { logger, nextRelease, options } = context;
  const { notes, version } = nextRelease;

  const errors = [];

  console.log("------- NOTES");
  console.log(notes);
  logger.log("------- NOTES");
  logger.log(notes);
  logger.log("------- API");
  logger.log(pluginConfig.teamsWebhook);

  const pkg = await getPkg(pluginConfig, context);
  const releaseName = `${pkg.name}@${version}`;
  logger.log(releaseName);

  if (notes) {
    const card = createCard(
      releaseName,
      `${context.nextRelease.type} release from ${context.lastRelease.name} to ${context.nextRelease.name}`,
      notes
    );

    try {
      await announceCard(pluginConfig, context, card);
    } catch (e) {
      errors.push(e);
    }
  }

  // Throw any errors we accumulated during the validation
  if (errors.length > 0) {
    throw new Error(errors);
  }

  return [];
};
