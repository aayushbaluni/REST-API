const mongoose=require('mongoose');
mongoose.set('strictQuery', true);

//to start a database in a folder:

//sudo mkdir -p /data/db

//give permission:
//sudo chown -R `id -un` /data/db

// then run 
//mongod

mongoose.connect('mongodb://localhost/playground').then(() => {
    console.log("Connected to Mongodb");
}).catch(err => console.log(err)); 



//schema is used to define shape of document within the collection in mongodb

const courceSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

//model => instance of schema

const Cource = mongoose.model('Cource', courceSchema);
async function CreateCource() {
    

    const cource = new Cource({
        name: "Cource2",
        author: "Ayush Baluni",
        tags: ['C++', 'Backend'],
        isPublished: true
    });



    const result = await cource.save();
    console.log(result);

}

async function getCources() {
    const cources = await Cource.find().limit(10)
        .sort({ name: -1 })
        .select({name:1,tags:-1});
    console.log(cources);
}
getCources();