const { user } = require('../routes/user')
const {token}=require('../routes/user')
const {APP}=require ('../config/Keys')
// This file is exporting an Object with a single key/value pair.
// However, because this is not a part of the logic of the application
// it makes sense to abstract it to another file. Plus, it is now easily 
// extensible if the application needs to send different email templates

// (eg. unsubscribe) in the future.
const client="localhost:3000"
module.exports = {

  confirm: token => ({
    subject: 'Loca Confirm Email',
    html: `
  
      <a href="${APP}/confirm/${token}">
        click to confirm email
      </a>
    `,      
    text: `Copy and paste this link: ${APP}/confirm/${token}`
  })
  
}