const NEXT_PUBLIC_APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || "lcl";
const config = require(`./${NEXT_PUBLIC_APP_ENV}.json`);

export { config };
