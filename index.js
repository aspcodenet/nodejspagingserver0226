const express = require('express')
const {check} = require('express-validator')
const cors = require('cors')
const {Product} = require('./models')

const migrationhelper = require('./migrationhelper')
const app = express()
const port = 3000 // "Radiofrekvens"

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5500",
    credentials:true 
}))

app.get('/products',async(req,res)=>{
    //console.log(req.query.sortCol)
    //console.log(req.query.sortOrder)
    const sortCol =  req.query.sortCol || 'id';
    const sortOrder =  req.query.sortOrder || 'asc';
    // if(req.query.sortCol === undefined){
    //     sortCol = 'id'
    // }else{
    //     sortCol = req.query.sortCol
    // }

    const allProducts = await Product.findAll({
        order: [ 
            [sortCol, sortOrder]
         ]
    })
    const result = allProducts.map(p=>{
        return {
           id:p.id,
           name:p.name,
           unitPrice:p.unitPrice,
           stockLevel:p.stockLevel
       }
    })
    return res.json(result)
})


app.listen(port, async () => {
    await migrationhelper.migrate()
    console.log(`Example app listening2 on port ${port}`)
})

