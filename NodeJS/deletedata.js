module.exports = deletedata = (req, res, MongoClient, url, dbName, collection) => {
    // console.log(req.body);
    let payload = req.body;
    MongoClient.connect(url, function (err, client) {

        // Check error
        if (err) throw err;

        let db = client.db(dbName);

        db.collection(collection).deleteOne(payload, function (err2, result) {
            if (err2) throw err2;
            console.log("1 document deleted");

            client.close();

            res.sendStatus(200);
        });
    });

}
