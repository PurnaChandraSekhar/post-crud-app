class UI {
    constructor () {
        this.hiddenId = document.querySelector('#id');
        this.container = document.querySelector('.parent');
        this.posts = document.querySelector('.post--container');
        this.titleInput = document.querySelector('#post-title');
        this.bodyInput = document.querySelector('.post__body');
        this.btnInput = document.querySelector('#btn-post');
        this.state = 'add';
    }

    showPosts(data) {
        let output = '';

        data.forEach(post => {
            output += ` 
            <h2 class="post--title" id="post--title">${post.title}</h2>
            <p class="post--body" id="post--body">${post.body}</p>
             <a href="#" class="link edit" id="edit" data-id="${post.id}">edit</a>
             <a href="#" class="link delete" id="delete" data-id="${post.id}">delete</a>
            <hr>
            `
        })

        document.querySelector('.post--container').innerHTML = output;
    }

    showAlert(msg, classname) {
        this.clearAlert();
        //create div element
         let div = document.createElement('div');
        //add a class
        div.className = classname;
        //create text node
        div.appendChild(document.createTextNode(msg));
        //insert into DOM
        //get the parent
        const parentContainer = document.querySelector('.parent');
        //where we want to insert
        const container = document.querySelector('.post--container');
        //insert the element
        parentContainer.insertBefore(div, container);

        //timeout
        setTimeout(() => {
            this.clearAlert();
        },3000);

    }

    clearAlert() {
      const currentAlert = document.querySelector('.alert');

      if(currentAlert) {
          currentAlert.remove();
      }
    }

    clearFields() {
      this.titleInput.value = ""
      this.bodyInput.value = ""
    }

    //fill the form
    fillForm(data) {
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.hiddenId.value = data.id;

    }

}

export const ui = new UI();