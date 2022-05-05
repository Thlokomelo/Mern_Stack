//this file pulls data from the database and displays it in JSON format

import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let movies                    //movies stores the reference to the database.


export default class MoviesDAO {    //makes the injectDB importable/exportable
    static async injectDB(conn) {      //
        if (movies) {                       //If the reference already exists, we return
            return
        }
        try {                              //Else, we go ahead to connect to the database name (process.env.MOVIEREVIEWS_NS) and movies collection
            movies = await conn.db(process.env.MOVIEREVIEWS_NS)
                .collection('movies')
        }
        catch (e) {                    //if we fail to get the reference, we send an error message to the console
            console.error(`unable to connect in MoviesDAO: ${e}`)   //preventative method (for program not to crash)
        }
    }

    static async getMovies({    //default filter : The getMovies method accepts a filter object as its first argument
        filters = null,         //The default filter has no filters, retrieves results at page 0 and retrieves 20 movies per page
        page = 0,
        moviesPerPage = 20, // will only get 20 movies at once
    } = {}) {

        let query          //query construction
        if (filters) {
            if ("title" in filters) {      //t check if the filters object contains the property title
                query = { $text: { $search: filters['title'] } }
            } else if ("rated" in filters) {
                query = { "rated": { $eq: filters['rated'] } }
            }
        }

        let cursor
        try {
            cursor = await movies
                .find(query)
                .limit(moviesPerPage)
                .skip(moviesPerPage * page)
            const moviesList = await cursor.toArray()
            const totalNumMovies = await movies.countDocuments(query)
            return { moviesList, totalNumMovies }
        }
        catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { moviesList: [], totalNumMovies: 0 }
        }
    }

    static async getRatings() {
        let ratings = []
        try {
            ratings = await movies.distinct("rated")
            return ratings
        }
        catch (e) {
            console.error(`unable to get ratings, $(e)`)
            return ratings
        }
    }
    static async getMovieById(id) {
        try {
            return await movies.aggregate([
                {
                    $match: {
                        _id: new ObjectId(id), 
                    }
                },
                {
                    $lookup:
                    {
                        from: 'reviews',
                        localField: '_id',
                        foreignField: 'movie_id',
                        as: 'reviews',
                    }
                }
            ]).next()
        }
        catch (e) {
            console.error(`something went wrong in getMovieById: ${e}`)
            throw e
        }
    }
}

