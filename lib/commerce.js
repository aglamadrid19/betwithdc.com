import Commerce from '@chec/commerce.js';

const checAPIKey = 'pk_188199d0388d32e454a134866ffadeb38f903911458f1';
const devEnvironment = process.env.NODE_ENV === 'development';

if (!checAPIKey) {
  throw Error('Your public API key must be provided as an environment variable named CHEC_PUBLIC_KEY. Obtain your Chec public key by logging into your Chec account and navigate to Setup > Developer, or can be obtained with the Chec CLI via with the command chec whoami, can you >?');
}

export const commerce = new Commerce(checAPIKey, true);
