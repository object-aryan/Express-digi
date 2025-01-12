import express from 'express';

const app=express();
const port =3000;

app.use(express.json());

let TeaData=[];
let nextId=1;


// To Post Request
app.post('/teas',(req,res)=>{
    const {name,price}=req.body;
    const newTea={id:nextId++,name,price};
    TeaData.push(newTea);
    res.status(201).send(newTea)

});

// To Get all data
app.get('/teas',(req,res)=>{
    res.status(200).send(TeaData);
})

// To find indivisual chaii 

app.get('/teas/:id',(req,res)=>{
 const Tea=TeaData.find(t=>t.id ===parseInt(req.params.id))
 if(!Tea){
    res.status(404).send('404 : Tea not found');
 }
    {
    res.status(200).send(Tea)
 }
})

// To update

app.put('/teas/:id',(req,res)=>{
    const Tea=TeaData.find(t=>t.id===parseInt(req.params.id));
    if(!Tea){
        res.status(404).send('Tea not found');
    }
    const {name,price}=req.body;
    Tea.price=price;
    Tea.name=name;
    res.send(202).send(Tea);
})

// To Delete Selected Chaii

app.delete('/teas/:id',(req,res)=>{
    const index=TeaData.findIndex(t=>t.id ===parseInt(req.params.id));
    if(index ===-1){
        return res.status(404).send('Data not Found');
    }   
    TeaData.splice(index,1)
    return res.status(203).send('deleted');
   

})


app.listen(port,()=>{
    console.log(`Server is listening on ${port}`);
    
})