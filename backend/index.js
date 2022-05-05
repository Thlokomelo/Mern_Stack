import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"
import MoviesDAO from './dao/moviesDAO.js'
import ReviewsDAO from './dao/reviewsDAO.js'

async function main() {     //connect to our MongoDB cluster and call functions that access our database
    dotenv.config()          //to load in the environment variables

    const client = new mongodb.MongoClient(   //create an instance of MongoClient and pass in the database URI
        process.env.MOVIEREVIEWS_DB_URI
    )
    const port = process.env.PORT || 8000   //We retrieve the port from our environment variable. If we can’t access it, we use port 8000.
    try {
        // Connect to the MongoDB cluster
        await client.connect()                //We retrieve the port from our environment variable. If we can’t access it, we use port 8000.
        await MoviesDAO.injectDB(client)
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {               //starts the server and listens via the specified port
            console.log('server is running on port:' + port);
        })
    } catch (e) {
        console.error(e);
        process.exit(1)
    }
}

main().catch(console.error); //With the main() function implemented, we then call it and send any errors to the console


