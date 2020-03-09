// Get data
module.exports = getdata = (req, res, MongoClient, url, dbName, collection) => {

    // Connect to mongodb
    MongoClient.connect(url, function (err, client) {
        // Check error
        if (err) throw err;

        let db = client.db(dbName);

        db.collection(collection).find({}).toArray((err, result) => {
            // Check error
            if (err) throw err;

            // Return data
            res.send(result);

            client.close();
        });
    });
}