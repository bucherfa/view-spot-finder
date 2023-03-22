const utils = require('./utils');

module.exports.handler = async (data) => {
  try {
    const viewSpots = await utils(data);
    return {
      statusCode: 200,
      body: JSON.stringify(viewSpots),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: error.toString(),
      }),
    };
  }
};
