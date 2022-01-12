function base_url(segment) {
    pathArray = window.location.pathname.split('/');
    indexOfSegment = pathArray.indexOf(segment);
    return window.location.origin + pathArray.slice(0, indexOfSegment).join('/') + '/';
}

var hashPath = window.location.hash;
console.log("catalyst hashPath", hashPath);
var cred = new catalystCredential();
//devlopment
cred.loadFromJSON({ project_Id: 5170000000003009, zaid: 10029119372 });
//production
//cred.loadFromJSON({ project_Id: 5170000000003009, zaid: 10034473370 });


catalyst.initApp(cred, {});
var redirectURL = base_url("");
localStorage.removeItem("state");
localStorage.removeItem("current_user");
console.log("redirect url",redirectURL);
var auth = catalyst.auth;
console.log("catalyst Auth", auth);
//console.log("catalyst hashPath", hashPath);
if (hashPath == "#/") {
    console.log("catalyst show signinform");
    catalyst.auth.signIn("elemSignup");
} else if (hashPath == "#/logout") {
    console.log("catalyst logout");
    catalyst.auth.signOut(redirectURL);
}




