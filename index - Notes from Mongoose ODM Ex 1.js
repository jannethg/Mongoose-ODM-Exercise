//require the mongoose and the Campsite model
const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

// connect to nucampsite DB in the mongo campsite server
// connect method with url argument and useCreate, newurlParser and useunifiedTopology
const url = 'mongodb://127.0.0.1:27017/nucampsite';
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Then method wiht a Promise
connect.then(() => {

    console.log('Connected correctly to server');
    
    //We'll create a new Document with a model named Campsite   
    const newCampsite = new Campsite({
        name: 'React Lake Campground',
        description: 'test'
    });

    //Mongoose method with Save method with a Promise
    // React Lake Campground documents logged as object inside of the array
    newCampsite.save()
    .then(campsite => {
        console.log(campsite);
        //find a Campsite Model will look for all documents that are based on this campsite model
        // return the result as Promise which if successful, we'll return the found documents inside an array of objects
        return Campsite.find();
    })

    //We're taking that array of objecs and loggin it to the console
    .then(campsites => {
        console.log(campsites);
        return Campsite.deleteMany();
    })
    
    //close the connection.
    .then(() => {
        return mongoose.connection.close();
    })

    // Catch errors for this promise chain in a catch block
    // we'll close the connection if theres an error
    .catch(err => {
        console.log(err);
        mongoose.connection.close();
    });
});

//This are all done with a Promise chain.  All happen in sequence after the previous operation has finished

// Resultes from NPM Start
// the document will have an object name, description, createAT (timestamp), updateAT (timestamp) properties that will auto Generate by Mongoose
// __v: 0 will auto generate by MongoDB  -- this is use by Mongoose for internal versioning