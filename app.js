const express = require('express');
const app = express()
const fs = require('fs');
const path = require('path');
const port = 8000;
// const bodyparser = require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
}
  
  // Define mongoose scheme
  const contactSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    address: String,
    desc: String
  });
const Contact = mongoose.model('Contact', contactSchema);

//Express specific stuff
app.use('/static', express.static('static'));
app.use(express.urlencoded());
app.use(express.json());

// pug specific stuff
app.set('view engine', 'pug');     // Set the template engine for pub
app.set('views', path.join(__dirname, 'views'));   // set views directory

//endpoints
app.get('/', (req, res) => {
    const params = { };
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res) => {
    const params = { };
    // const  prData =  Contact.find();
    res.status(200).render('contact.pug', params);
});
app.post('/contact', (req, res) => {
    const myData = new Contact(req.body);
     const user = myData.save().then(() =>{
        res.status(201).send('Item has been sent')
    }).catch((err) => {
        res.status(400).send('Item was not saved to the database')
    })

    // res.status(200).render('contact.pug');
});
// start the server
app.listen(port, () => {
    console.log(`listning to the port no. ${port}`);
});
