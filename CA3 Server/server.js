const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000

const Firebase = require('firebase');

Firebase.initializeApp({

  databaseURL: "https://ca3-app-default-rtdb.asia-southeast1.firebasedatabase.app/",

  serviceAccount: './firebaseservice.json', //this is file that I downloaded from Firebase Console

});
var db = Firebase.database();
var usersRef = db.ref("users");

app.get('/viewallpost', (req, res, next) => {
  //res.send('Hello World!')

  usersRef.once('value', function (snapshot) {
    if (snapshot.exists()) {
      res.send(snapshot.val());
    } else {
      //res.sendStatus('404').json({ error: "not found" });
      res.send({});
      //next();
    }
  })
})

app.post('/createpost/:keyid/:photourl/:email/:title/:description', (req, res) => {

  var getkey = req.params.keyid;
  var photo = req.params.photourl;
  var email = req.params.email;
  var title = req.params.title;
  var description = req.params.description;

  //console.log(photo);
 // console.log(email);

  let dataToSave = {
    id: getkey,
    title: title,
    email: email,
    description: description,
    photo: photo
  }

  db.ref('users/' + getkey).update(dataToSave, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "Success: User Save." });
    }
  })

})

app.get('/viewOwnPost/:email', (req, res,next) => {
  var email = req.params.email;
  //var email = "adrianhzx@hotmail.com";

  const query = usersRef.orderByChild("email").equalTo(email);

 // console.log(query);
  query.once('value', function (snapshot) {
    //console.log(snapshot);
    if (snapshot.exists()) {
      res.send(snapshot.val());
    } else {
      //res.sendStatus('404').json({ error: "not found" });
      res.send({});
      //next();
    }
  })
})

app.delete('/removepost/:id', function (req, res) {
  //var uid = "-MfPIubcd0nGGD6nTfVX";

  var id = req.params.id;

  db.ref('users/' + id).remove(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "Success: User deleted." });
    }
  })
});


app.listen(port, () => {
  console.log(`Example app listening at http://192.168.1.154:${port}`)
})