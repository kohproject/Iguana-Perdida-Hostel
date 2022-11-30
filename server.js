const express = require('express');
const cors = require('cors');
// const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Phutawan:$Phutawan939@phutawancluster.p9idk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'))
app.use(cors({ origin: ['http://localhost:8080'] }))


app.post('/api/setstay', (req,res) =>{
    const guestParams = req.body.params;
   // console.log(guestParams);
    const setOccupy = async () =>{
      try{
        await client.connect();
        let db = client.db("iguana").collection("bookings");
            db.insertOne({
              date: new Date(),
              name: guestParams.name,
              rmtype:guestParams.rmType,
              checkin: guestParams.checkin,
              checkout: guestParams.checkout,
              numadults:guestParams.numAdults,
              child:guestParams.child
          });
          res.json({resp:true})
      }
      catch(err){
        console.log(err);
      }
    }
    setOccupy();
});


app.get('/api/availrooms', (req, res) =>{
    const params = req.query.staydates;
    console.log('stayDatesXXX'+params);
    const getRooms = async () => {
        let availRooms= [];
        try {
          await client.connect();
          let db = client.db("iguana");
          let rooms = db.collection("rooms");
          let bookings = db.collection("bookings");
          let books = bookings.find();
          let rms =  rooms.find().sort( { price : -1 } );
          let bookArr =[];

          await books.forEach( book =>{
            bookArr.push(book);
          });
          
          await rms.forEach(room =>{
            availRooms.push(room);
          });
    
          availRooms.filter((room) =>{
              let rmQty = room.qty;
              let bookRmQty = 0;
              let rmAvailBool = true;
              
              bookArr.forEach(book =>{
                if(room.name === book.rmtype){
                  let bookCheckin = book.checkin;
                  let bookCheckout = book.checkout;
                  let rmCheckin = room.checkin;
                  let rmCheckout = room.checkout;
                  let overlapVal = Math.max(0, Math.min(rmCheckin, rmCheckout) - Math.max(bookCheckin, bookCheckout));
                  
                  console.log('xx'+overlapVal);

                  if (overlapVal > 0) { 
                    bookRmQty++;
                  }
                  if(rmQty <= bookRmQty){
                    rmAvailBool = false;
                  }
                }
              });

              if(rmAvailBool){
                room.rowSelected = false;
                return room;
              }
          })


          res.json({"rooms":availRooms});
          // database and collection code goes here
          // find code goes here
          // iterate code goes here
        } finally {
          // Ensures that the client will close when you finish/error
          await client.close();
        }
    }
    getRooms().catch(console.dir);
});

// // sendFile will go here
// app.get('/', function(req, res) {
//     res.sendFile('/public/express.html');
// });

app.listen(port, ()=>{
    console.log(`server running on port: ${port}`);
})