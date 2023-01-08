
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost/mongo-exercises').then(() => console.log("connected")).catch(err => console.log(err));



const CourceSchema = new mongoose.Schema({
    name: String,
    author: String,
    //validation
    price: {
        type: Number,
        required: function () { return this.isPublished },
        get: v => Math.round(v),
        set:v=>Math.round(v) 
    },
    //to create an category chooser
    category:{
        type: String,
        required: true,
        enum: ["A", 'b', 'c'],
        lowercase: true,
        //uppercase: true,
        trim:true
    },
    //enum is choices only from that as input else error
    tags:[String],
    isPublished: Boolean,
    date: { type: Date, default: Date.now }
    
})







const Cource =  mongoose.model("Course", CourceSchema);






async function updateCource(id) {
    const cource = await Cource.findById(id);
    if (!cource) {
        console.log("cant find");
        return ;
    } 
    cource.set({
        isPublished: true,
        author:"Ayush"
    })
    const result = await cource.save();
    console.log(result);
}


updateCource("5a68fde3f09ad7646ddec17e");





async function getCources() {
    //Q1
//     const cource = await Cource.find({ isPublished: true })
//         .and({ tags: "backend" })
//         .sort({name:1})
//         .select({name:1,author:1});

// //Q2
//     const cource = await Cource.find({ isPublished: true })
//         .or([{ tags: 'frontend' }, { tags: "backend" }])
//         .sort({ price: -1 })
//         .select({ name: 1, author: 1 });
    
    
    //q3
    const cource = await Cource.find({ isPublished: true })
        .or([{ price: { $gte: 15 } }, { name: /.*by.*/ }])
    .select({name:1,author:1})
    
    console.log(cource);
}
//getCources();