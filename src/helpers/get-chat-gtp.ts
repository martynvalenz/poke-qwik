import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: import.meta.env.PUBLIC_OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

export const chatGPTResponse = async (pokemonName: string):Promise<string> => {
  delete configuration.baseOptions.headers['User-Agent'];
  try {
    const response = await openai.createCompletion({
      model: "text-babbage-001",
      prompt: `Escribe datos interesantes del pokemón ${pokemonName}`,
      temperature: 1,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return response.data.choices[0].text || `No se encontraron datos interesantes del pokemón ${pokemonName}`;

  } catch (error) {
    return `No se encontraron datos interesantes del pokemón ${pokemonName}, o te pasaste de cuota, RATA PAGA!`;
  }
}
