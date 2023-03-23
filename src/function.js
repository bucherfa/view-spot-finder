const findViewSpots = require('./main');

module.exports.handler = async (data) => {
  try {
    const viewSpots = await findViewSpots(data);
    return {
      statusCode: 200,
      body: JSON.stringify(viewSpots)
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: error.toString()
      })
    };
  }
};
