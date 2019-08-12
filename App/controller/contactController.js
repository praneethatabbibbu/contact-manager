const express=require('express')
const router=express.Router()
const Contact=require('../model/contact')
const { authenticateUser }=require('../middleware/authentication')

router.get('/', authenticateUser,(req,res)=>{
    const {user}=req
    console.log(req.user)
    Contact.find({
        user:user._id
    })
    .sort({createdAt:-1})
    .then((contacts)=>{
        console.log("after sort")
        res.json(contacts)
    })
    .catch((err)=>{
        res.json(err)
    })
})

router.post('/', authenticateUser,(req,res)=>{
    const {user}=req
    const body=req.body
    const contact=new Contact(body)
    contact.user=user._id
    contact.save()
    .then((contact)=>{
        res.json(contact)
    })
    .catch((err)=>{
        res.json(err)
    })
})

router.get('/:id', authenticateUser,(req,res)=>{
    const {user}=req
    const id=req.params.id
    Contact.findOne({
        _id:id,
        user:req.user._id
    })
    .then((contact)=>{
        if(!contact){
            res.json({})
        }
        res.json(contact)
    })
    .catch((err)=>{
        res.json(err)
    })
})

router.put('/:id', authenticateUser,(req,res)=>{
    const id=req.params.id
    const body=req.body
    Contact.findOneAndUpdate({
        _id:id,
        user:req.user._id},
        {$set:body},
        {new:true,
        runValidators:true})
    .then((contact)=>{
        if(!contact){
            res.json({})
        }
        res.json(contact)
    })
    .catch((err)=>{
        res.json(err)
    })
})

router.delete('/:id', authenticateUser,(req,res)=>{
    const id=req.params.id
    Contact.findOneAndDelete({
        _id:id,
        user:req.user._id
    })
    .then((contact)=>{
        if(!contact){
            res.json({})
        }
        res.json(contact)
    })
    .catch((err)=>{
        res.json(err)
    })
})

module.exports=router