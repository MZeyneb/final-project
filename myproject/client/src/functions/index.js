const functions = require("firebase-functions");
const axios = require("axios");

exports.translateText = functions.https.onCall(async (data, context) => {
  const { text, targetLanguage } = data;
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
    text
  )}&langpair=en|${targetLanguage}`;

  try {
    const response = await axios.get(url);
    return { translatedText: response.data.responseData.translatedText };
  } catch (error) {
    console.error("Tərcümə xətası:", error);
    throw new functions.https.HttpsError("internal", "Tərcümə uğursuz oldu");
  }
});