var PARSE_APP_ID = "AMTCl5CtNxKZwCew2RvcNuGWgYWF7kOcLEZEuCOB";
var PARSE_JS_ID = "FqBCWVjMEPLFHU2K3KGIuoWxeFH2T22PQnLZputc";
var currentUser;
var Message;
var Group;

function init() {
    document.addEventListener('deviceready', deviceready, false);
}

function deviceready() {
    console.log("device ready to roll");
    if(navigator.connection.type === Connection.UNKNOWN ||
        navigator.connection.type === Connection.NONE) {
        //handle user being offline
    } else {
        console.log("Initialize Parse");
        appReady();
    }
}

 $(document).ready(function(){    

    //registration user
    $("#registrationButton").click(function(){
        Parse.initialize(PARSE_APP_ID,PARSE_JS_ID);
        var name = $("#firstName").val();
        var lastName = $("#lastName").val();
        var registrationLogin = $("#registrationLogin").val();
        var registrationPassword = $("#registrationPassword").val();
        var confirmPassword = $("#confirmPassword").val();
        var email = $("#email").val();
        var groupVk = $("#group").val();

        //do some basic validation here
        var errors = "";
        if(name === "") errors += "Name required.<br/>";
        if(lastName === "") errors += "Lastname required.<br/>";
        if(registrationLogin === "") errors += "RegistrationLogin required.<br/>";
        if(registrationPassword === "") errors += "RegistrationPassword required.<br/>";
        if(confirmPassword === "") errors += "ConfirmPassword required.<br/>";
        if(email === "") errors += "Email required.<br/>";
        if(groupVk === "") errors += "Group required.<br/>";

        //if(errors !== "") {
            //$("#regstatus").html(errors).addClass("errorDiv");
            //return;
        //}

        //try to register with Parse and see if it works.
        var user = new Parse.User();
        user.set("username", registrationLogin);
        user.set("password", registrationPassword);
        user.set("firstName", name);
        user.set("lastName", lastName);
        Group = Parse.Object.extend("Group");
        var group = new Group();
        group.set("email", email);
        group.set("groupVk", groupVk);
        user.set("group", group);
        
        //$("#regstatus").html("<b>Registering user...</b>");

        user.signUp(null, {
            success:function(user) {
                currentUser = user;
                window.location='main.html';
            },
            error:function(user, error) {
                console.log("ERROR!");
                console.dir(error);
                //$("#regstatus").html(error.message).addClass("errorDiv");
            }
        });
    });

    //log in
    $("#submitButton").click(function(){
        Parse.initialize(PARSE_APP_ID,PARSE_JS_ID);
        //get values
        var login = $("#login").val();
        var password = $("#password").val();

        //do some basic validation here
        var errors = "";
        if(login === "") errors += "Login required.<br/>";
        if(password === "") errors += "Password required.<br/>";

        if(errors !== "") {
            //$("#loginstatus").html(errors).addClass("errorDiv");
            return;
        }

        Parse.User.logIn(login, password, {
            success:function(user) {
                currentUser = user;
                window.location='main.html';
            },
            error:function(user, error) {
                console.log("ERROR!");
                console.dir(error);
                //$("#loginstatus").html(error.message).addClass("errorDiv");
            }
        });
    });

    //log out
    $("#exit").click(function(){
        Parse.initialize(PARSE_APP_ID,PARSE_JS_ID);
        Parse.User.logOut();
        currentUser = null;
        window.location='index.html';
    });

});

//function wicth worked with user
function appReady() {

    Parse.initialize(PARSE_APP_ID,PARSE_JS_ID);

   /* Message = Parse.Object.extend("Message");
    
    //Am I logged in already?
    currentUser = Parse.User.current();
    if(currentUser) {
        cylon.loadPage("./notes.html");
    }

    $(document).on("pageload", "#notesPage", function(e) {
        $("h1", this).append(currentUser.get("username"));

        getMyNotes();

        $("#newNoteForm").on("submit", function(e) {
            e.preventDefault();
            var text = $("#newNoteText").val();
            //if nothing, just ingnore
            if(text === "") return;

            var msg = new Message();
            msg.set("text", text);
            msg.set("creator", currentUser);
            msg.setACL(new Parse.ACL(currentUser));

            msg.save(null, {
                success:function(note) {
                    $("#newNoteText").val("");
                    getMyNotes();
                }, error:function(note, error) {
                    //Should have something nice here...
                }
            });
            console.log("about to add a new note");
        });

    });

    function getMyNotes() {
        var query = new Parse.Query(Message);
        query.equalTo("creator", currentUser);
        query.find({
            success:function(notes) {
                var s = "";
                for(var i=0, len=notes.length; i<len; i++) {
                    s+= "<p>"+notes[i].get("text")+"</p>";
                }
                $("#currentNotes").html(s);
            }
        });
    }
    
	//log in
    $(document).on("touchend","#form", function(e) {
        e.preventDefault();

        //$("#loginstatus").html("").removeClass("errorDiv");

        //get values
        var login = $("#login").val();
        var password = $("#password").val();

        //do some basic validation here
        var errors = "";
        if(login === "") errors += "Login required.<br/>";
        if(password === "") errors += "Password required.<br/>";

        if(errors !== "") {
            //$("#loginstatus").html(errors).addClass("errorDiv");
            return;
        }

        //$("#regstatus").html("<b>Logging in...</b>");

        Parse.User.logIn(login, password, {
            success:function(user) {
                currentUser = user;
			    //cylon.loadPage("./notes.html");
			    window.location='main.html';
            },
            error:function(user, error) {
                console.log("ERROR!");
                console.dir(error);
                //$("#loginstatus").html(error.message).addClass("errorDiv");
            }
        });
    });

    $(document).on("touchend","#resetForm", function(e) {
        e.preventDefault();
        var email = $("#passwordResetEmail").val();

        if(email === "") return;

        Parse.User.requestPasswordReset(email, {
            success:function() {
                alert("Reset instructions emailed to you.");
            },
            error:function(error) {
                alert(error.message);
            }
        });

    });

    $(document).on("touchend", "#logoutLink", function(e) {
        e.preventDefault();
        Parse.User.logOut();
        currentUser = null;
        cylon.loadPage("./index.html");
    });
*/
}
