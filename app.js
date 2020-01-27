import { http } from './http.js';
import { ui } from './ui.js';
 
// FETCH POSTS ON PAGE LOAD
document.addEventListener('DOMContentLoaded', getposts);

//LISTEN FOR A SUBMIT EVENT
document.querySelector('#btn-post').addEventListener('click', addPost);

//LISTEN FOR DELETE
document.querySelector('.post--container').addEventListener('click', deletePost);

//LISTEN FOR EDIT 
document.querySelector('.post--container').addEventListener('click', enableEdit);

//listen for cancel button
document.querySelector('.btn--container').addEventListener('click', cancelEdit);

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
  const id = document.querySelector('#id').value;

  const data = {
    title,
    body
  }
   
  if(data.title === "" && data.body === "") {
    ui.showAlert('Please fill all the fields', 'alert alert-warning');
  } else {
    //check for id
    if(id === ""){
      http.post('http://localhost:3000/posts', data)
      .then(res => {
      ui.showAlert('Post Added', 'alert alert-success');
      ui.clearFields();
      getposts();
   })
    }else {
      //update the post
      http.update(`http://localhost:3000/posts/${id}`, data)
       .then(res => {
         ui.showAlert('Post Updated', 'alert alert-success');
         ui.changeTheState('add');
         getposts();
       })
    }
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

//enable edit
function enableEdit(e) {
  e.preventDefault();
   
  if(e.target.classList.contains('edit')) {
    const id = e.target.dataset.id;
    const title = e.target.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.previousElementSibling.textContent;
    const data = {
      id,
      title,
      body
    }

     //fill the form
    ui.fillForm(data);

    //change the form state
    ui.changeTheState('edit');
  }
}

//cancel edit
function cancelEdit(e) {
  e.preventDefault();
  
  if(e.target.classList.contains('btn--update')) {
    ui.changeTheState('add');
  }
}

