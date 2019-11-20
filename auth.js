module.exports = {
     isUser:function(request, response){
        if(request.user){
            return true;
        }
        else{
            return false;
        }
    },
    
     authStatusUI:function(request, response){
        var authStatusUI = '<a href = "/login">login</a>'
        if(this.isUser(request, response)){
            authStatusUI = `${request.user.nickname} | <a href = "/logout">logout</a>`
        }
        return authStatusUI;
    
    }
}



