
// have to dp trafeoff between

//using referace(Normalized)   have consistency
let author = {
    name:"Ayush"
}

let cources = {
    author:"id"
}


//using embedded docs(Denormalized)    have performance edge

let cource = {
    author:"Ayush"
}

//using hybrid

let course = {
    author: {
        id: "ref",
        name:"Ayush"
        
    }

}



//Referance
const mongoose=require('mongoose')

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author =  mongoose.model("Author", authorSchema);

//referance
const Cource = mongoose.model("Cource", new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Author"
    }
}))


//here to load whole author documenr we use population
Cource.find().populate("author").select("name author")



//enbedding
const Course = mongoose.model("Cource", new mongoose.Schema({
    name: String,
  //  author: authorSchema or
    author: {
        type: authorSchema,
        required:true
    }
}))





