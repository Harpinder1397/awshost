module.exports = {
    startdate : {
        required: {
            errorMsg: 'From date is required.'
        }
    },  
    leaveType : {
        required : {
            errorMsg: 'Leave type is required.'
        }
    }, 
    reason: {
        required : {
            errorMsg: 'Please provide reason for leave'
        }
    },
    status : {
        required:  {
            errorMsg: 'Please provide leave status.'
        }
    }
}