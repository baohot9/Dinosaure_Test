module.exports = postdata = (req, res, MongoClient, url, dbName, collection) => {
    let payload = req.body;
    MongoClient.connect(url, function (err, client) {

        // Check error
        if (err) throw err;

        let db = client.db(dbName);

        //find client exists
        let query = { name: req.body.name };
        db.collection(collection).findOne(query, function (err, result) {

            if (err) throw err;
           
            if (result) {
                client.close();
                res.status(409).send("User exists");
                console.log("User exists");
            } else {
                db.collection(collection).insertOne(payload, function (err2, result) {
                    if (err2) throw err2;
                    console.log("1 document inserted");
                    client.close();
                    res.sendStatus(200);
                });
            }
        });

    });

}