require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const sendGrid = require('@sendgrid/mail');
const port = process.env.PORT || 3030;

const app = express();
app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

app.use(bodyParser.json());
app.use(cors());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    // res.setHeader('Access-Control-Allow-Origin','GET, POST, PUT, PATCH ,DELETE');
    // res.setHeader('Access-Control-Allow-Origin','Content-Type, Authorization');
    next();
});

app.get('/api',(req,res,next)=>{
    res.send('Process Running');
});

app.post('/api/contact-us',(req,res,next)=>{
    sendGrid.setApiKey(process.env.REACT_APP_SENDGRID_API);
    const msg = {
        to: 'info@zotalabs.com',
        from: 'admin@zotalabs.com',
        subject: 'Contact Us',
        text: 'A new contact received',
        html: `<div style='text-align:center;background-color:#fcf8ec;padding:30px 10%; border-radius:10px;'>
                <h1>New Contact</h1>
                <h3>Name - ${req.body.name}</h3>
                <h3>Email ID - ${req.body.email}</h3>
                <h3>Mobile No - ${req.body.mobile}</h3>
                <h3 style='padding:30px 10%; color: #4e8d7c'>${req.body.message}</h3>
                </div>`
    }
    sendGrid.send(msg).then(result=>{
        res.status(200).json({
            success: true
        })
    }).catch(err=>{
        console.log('error: ',err);
        res.status(401).json({
            success: false
        });
    });
});

app.post('/api/register-demo',(req,res,next)=>{
    sendGrid.setApiKey(process.env.REACT_APP_SENDGRID_API);
    const msgDemo = {
        to: 'info@zotalabs.com',
        from: 'admin@zotalabs.com',
        subject: 'Demo Registration',
        text: 'A new user Signed Up for Demo Registration',
        html: `<div style='text-align:center;background-color:#d0e8f2;padding:30px 10%; border-radius:10px;'>
                <h1>Recipient registered for Demo</h1>
                <h3>Name - ${req.body.name}</h3>
                <h3>Email ID - ${req.body.email}</h3>
                <h3>Mobile No - ${req.body.mobile}</h3>
                <h3>Role - ${req.body.check}</h3>
                <h3>Organization - ${req.body.organization}</h3>
                </div>`
    }
    sendGrid.send(msgDemo).then(result=>{
        res.status(200).json({
            success: true
        })
    }).catch(err=>{
        console.log('error: ',err);
        res.status(401).json({
            success: false
        });
    });
});

app.post('/api/register-event',(req,res,next)=>{
    sendGrid.setApiKey(process.env.REACT_APP_SENDGRID_API);
    const msgEvent = {
        to: 'info@zotalabs.com',
        from: 'admin@zotalabs.com',
        subject: 'Event Registration',
        text: 'A new user Signed Up for an event',
        html: `<div style='text-align:center;background-color:#f8d49d;padding:30px 10%; border-radius:10px;'>
                <h1>Recipient registered for Event</h1>
                <h3>Name - ${req.body.name}</h3>
                <h3>Email ID - ${req.body.email}</h3>
                <h3>Mobile No - ${req.body.mobile}</h3>
                <h3>Role - ${req.body.check}</h3>
                <h3>Role (Other) - ${req.body.otherRole}</h3>
                <h3>Organization - ${req.body.organization}</h3>
                </div>`
    }
    sendGrid.send(msgEvent).then(result=>{
        res.status(200).json({
            success: true
        })
    }).catch(err=>{
        console.log('error: ',err);
        res.status(401).json({
            success: false
        });
    });
});

app.listen(port, ()=>{console.log('Running')});