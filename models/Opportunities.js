const mongoose = require("mongoose");
const OpportunitySchema = new mongoose.Schema({
    userId:{
        type:String,
        required: true,
    }
    ,
    title:{
        type: String,
    }
    ,
    desc:{
        type:String,
    }
    ,
    link:{
        type:String,
    }
    ,
    googlelink:{
        type:String
    }
},
{timestamps: true}
);

module.exports = mongoose.model("Opportunity", OpportunitySchema);