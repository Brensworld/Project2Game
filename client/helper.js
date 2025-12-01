/* Takes in an error message. Sets the error message up in html, and
   displays it to the user. Will be hidden by other events that could
   end in an error.
*/
const handleError = (message) => {
  document.getElementById('errorMessage').textContent = message;
  document.getElementById('speechMessage').classList.remove('hidden');
};

/* Sends post requests to the server using fetch. Will look for various
   entries in the response JSON object, and will handle them appropriately.
*/
const sendPost = async (url, data, handler) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  document.getElementById('speechMessage').classList.add('hidden');

  if(result.redirect) {
    window.location = result.redirect;
  }

  if(result.error) {
    handleError(result.error);
  }

  if(handler){
    handler(result);
  }
};

const hideError=()=>{
    document.getElementById('speechMessage').classList.add('hidden');
}


//taken from https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


const removeUser=async()=>{
  try{
    const username=getCookie('username');
      const room=document.getElementById(channelSelect).value;
      const oldRoom=await RoomModel.findOne({name:room}).exec();
      let oldUsers=oldRoom.users;
      oldUsers.pull(username);

      await RoomModel.findOneAndUpdate(
        {name: room},
        {$set: {users: oldUsers}},
        {new: true}
      );
    }catch(err){
        console.log(err);
    }
}

module.exports={
    handleError,
    sendPost,
    hideError,
    getCookie,
    removeUser
}