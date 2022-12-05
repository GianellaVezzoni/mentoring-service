require('dotenv').config()

const configs = {
    api: {
        port: process.env.PORT,
        uri: process.env.URI,
        default_page_count: process.env.DEFAULT_PAGE_COUNT,
    },
    secret_key: process.env.SECRETPRIVATEKEY

}

export default configs