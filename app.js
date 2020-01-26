import { http } from './http.js';
import { ui } from './ui.js';
 
// FETCH POSTS ON PAGE LOAD
document.addEventListener('DOMContentLoaded', getposts);

//LISTEN FOR A SUBMIT EVENT
document.querySelector('#btn-post').addEventListener('click', addPost);

//LISTEN FOR DELETE
document.querySelector('.post--container').addEventListener('click', deletePost);
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
        getposts();

    })
    .catch(err => console.log(err))
  }
  
}

//delete post
function deletePost(e) {
  e.preventDefault();
  if(e.target.classList.contains('delete')) {
     const id = e.target.dataset.id;
     if(confirm('you sure?')) {
       http.delete(`http://localhost:3000/posts/${id}`)
        .then(res => {
          ui.showAlert('delete successfully', 'alert alert-success');
          getposts();
        })
        .catch(err => console.log(err));
     }
  }
}

