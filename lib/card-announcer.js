const fetch = require("node-fetch");

function createCard(title, subtitle, body) {
  return {
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    themeColor: "0076D7",
    summary: "Release xyz",
    sections: [
      {
        activityTitle: title,
        activitySubtitle: subtitle,
        activityImage: "https://raw.githubusercontent.com/gurayyarar/NodeJsPackageManager/master/images/app.png",
        markdown: true,
      },
      {
        text: body,
        markdown: true,
      },
    ],
  };
}

async function announceCard(pluginConfig, context, card) {
  const { logger } = context;
  const { teamsWebhook } = pluginConfig;

  if (teamsWebhook) {
    const res = await fetch(teamsWebhook, {
      method: "POST",
      body: JSON.stringify(card),
    });

    if (res.status !== 200) {
      logger.log(res.status, res.message);
      logger.log("request failed");
      throw new Error(res.message);
    }
  }
}

module.exports = { createCard, announceCard };
