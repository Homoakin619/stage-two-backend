import Env from "@ioc:Adonis/Core/Env"
const appConfig = {
    tokenExpiryTimeFrame : Env.get("ACCESS_TOKEN_EXPIRY_TIMEFRAME")
}

export default appConfig