module.exports = removefriend = (req, res, MongoClient, url, dbName, collection) => {
    // console.log(req.body);

    let payload = req.body;
    MongoClient.connect(url, function (err, client) {

        // Check error
        if (err) throw err;

        let db = client.db(dbName);

        let query = { name: req.body.name };
        let newFriend = req.body.friend;
        // Find account by name

        db.collection(collection).find(query).toArray(function (err2, result) {
            if (err) throw err;

            // 
            let tmp = result[0].ami_name;
            if (tmp !== undefined) {
                tmp = tmp.filter(item => item !== newFriend)
            }

            let newvalues = { $set: { ami_name: tmp } };

            // Update friend list of that account
            db.collection(collection).updateOne(query, newvalues, function (err3, result2) {
                if (err3) throw err3;
                console.log("1 document updated");

                client.close();

                res.sendStatus(200);
            });
        });
    });

}