const loading = document.getElementById('loading');
const image = document.getElementById('image');
const imageText = document.getElementById('text')
class FormImage {
    constructor() {
        this.image = [];
    }
    uploadImage(file) {
        this.image = file;
    }
    PostImage() {
        loading.style = "display:flex"
        var myHeaders = new Headers();
        var formdata = new FormData();
        formdata.append("image", this.image);

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: formdata,
            mode: 'cors',
            redirect: 'manual'
        };

        return window.fetch("http://127.0.0.1:3001/", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                image.src = `http://127.0.0.1:3001` + result.imageUrl;
                imageText.innerHTML = result.text;
                loading.style = "display:none"

            })
            .catch(error => console.log('error', error));
    }
}

const vm = new FormImage();
var fileInput = document.getElementById('fileInput')
fileInput.addEventListener('change', async (e) => {
    e.preventDefault();
    vm.uploadImage(e.target.files[0])
})
var clickButton = document.getElementById('button')
clickButton.addEventListener('click', async (e) => {
    vm.PostImage();
    e.preventDefault();
})

