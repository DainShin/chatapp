require("dotenv").config();

const globals = {
    ConnectionString: {
        MongoDB: process.env.CONNECTION_STRING_MONGODB,
        PORT: process.env.PORT
    },
}

// export the configuration object
module.exports = globals;