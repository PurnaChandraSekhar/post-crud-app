import { http } from './http.js';
import { ui } from './ui.js';
 
// FETCH POSTS ON PAGE LOAD
document.addEventListener('DOMContentLoaded', getposts);

//LISTEN FOR A SUBMIT EVENT
document.querySelector('#btn-post').addEventListener('click', addPost);

//get posts 
function getposts() {
  http.get('http://localhost:3000/posts')
  .then(data => ui.showPosts(data))
  .catch(err => console.log(err))
}

//add post
function addPost() {
  const title = document.querySelector('#post-title').value;
  const body = document.querySelector('.post__body').value;

  const data = {
    title,
    body
  }

  if(data.title && data.body){
    http.post('http://localhost:3000/posts', data)
      .then(res => {
        ui.showAlert('Post Added', 'alert alert-success');
        ui.clearFields();
        console.log('working');
        getposts();
        console.log('oK');

    })
    .catch(err => console.log(err))
  }
  
}

