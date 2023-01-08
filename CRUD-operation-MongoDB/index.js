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
    //validation
    name: {type:String,required:true},
    author: String,
    tags: {
        type: Array,
        //to convert sync validator to async
        validate: {
            isAsync:true,
            validator: function (v,callback) {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 2000);
            },
            message: "Size should be greater than 0."
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

//model => instance of schema

const Cource = mongoose.model('Cource', courceSchema);
async function CreateCource() {
    
    //this can also be blank so has to implement input validation.
    const cource = new Cource({
        name: "Cource2",
        author: "Ayush Baluni",
        tags: ['C++', 'Backend'],
        isPublished: true
    });


    try {
    
    const result = await cource.save();
    console.log(result);
    }
    catch (err) {
      //  console.log(err);
        //if there are multiple errors
        for (i in err.errors) {
            console.log(err.errors[i].message);
        }
    }

}


//update cources approach 1
async function updateCource(id) {
    const cource = await Cource.findById(id);
    if (!cource) {
        console.log("cant find");
        return ;
    } 
    cource.set({
        isPublished: true,
        author:"Astha"
    })
    const result = await cource.save();
    console.log(result);
}
//updaing data approach 2

async function updateCource2(id) {
    const result = await Cource.update({ _id: id }, {
        $set: {
            author: "Ayush",
            isPublished: false
        }
    });
    console.log(result);
    
}
//updateCource2("63ba5993b95bd1aa698442e6");




//deletion:

async function deleteCource(id) {
    const result = await Cource.deleteOne({ _id: id });
    console.log(result);
}


deleteCource("63ba5993b95bd1aa698442e6");



//to perform pagination  we do .skip((pangeno-1)*pgsize);

async function getCources() {
    //eq (equal to)
    //ne (not equal)
    //gt (greater than)
    //gte (greater than or equal to)
    //lt (lower than)
    //the (lower than or equal to)
    //in 
    //nin (not in)
    const pageno = 2;
    const pagsiz = 10;

    const cources = await Cource
        //.find({price:{$gt : 10 , $lte :20}})
        //if either of 10 20 or 30
        //.find({ price: { $in: [10, 20, 30] } });




        //to find author whose name starts with ayu
        //find({ author: /^ayu/i })
        // ^->start

        //i represents not  case sensitive

        // / / this represents regular expressions

        //ends with sh;
        // .find({ author: /sh$/i });
        // $->end
        
        //constians yu
        //.find({ author: /.*yu.*/i })
        //.* means anything
        
        .find()
        //logical operator
        .or([{ author: "Ayush" }, { isPublished: true }])
        //also use and instead of or;

        //to perform pagening
        .skip((pageno-1)*pagsiz)
        .limit(pagsiz)
        .sort({ name: -1 })
        .count();
        //.select({name:1,tags:-1});
    
    
    console.log(cources);


}
//getCources();