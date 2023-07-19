class PostsFinder {
	constructor() {
		this.createElements();
		this.attachEventListeners();
		this.renderMain();
	}
	createElements() {
		this.header = document.createElement('div');
		this.main = document.createElement('div');
		this.search = document.createElement('input');
		this.body = document.querySelector('body');
	}
	attachEventListeners() {
		this.search.addEventListener('input', () => {
			this.searchValues = this.search.value.split(',')
				.map(id => parseInt(id))
				.filter(id => !isNaN(id))
				.filter(id => id > 0 && id <= 100);

			this.renderToDoes();
		});
	}
	renderToDoes() {
		this.main.innerText = '';
		
		const toDos = this.searchValues.map(id => (
			fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
				.then(response => response.ok ? response.json() : null)
				.catch((err) => console.log(err))
		));
			
			Promise.all(toDos)
			.then(toDos => {
				toDos.filter(toDo => toDo)
				.forEach(toDo => new ToDo(toDo));
			})
			.catch((err) => console.log(err)); 
	}
	renderMain() {
		this.main.classList.add('main');
		this.header.classList.add('header');
		this.main.classList.add('main');
		this.search.placeholder = 'Enter the post ID or post IDs. For example \'1\' or \'1, 2, 3...\'';
		this.header.append(this.search);
		this.body.append(this.header, this.main);
	}
}

class ToDo {
	constructor(toDo) {
		this.toDo = toDo;
		this.createElements();
		this.attachEventListeners();
		this.renderToDo();
	}
	createElements() {
		this.div = document.createElement('div');
		this.title = document.createElement('p');
		this.id = document.createElement('p');
		this.button = document.createElement('button');
		this.main = document.querySelector('.main');
	}
	attachEventListeners() {
		this.button.addEventListener('click', () => {
			this.button.classList.contains('hide-comment') ? this.hideComment() : this.showComment();
		});
	}
	renderToDo() {
		this.title.innerText = `title: ${this.toDo.title}`;
		this.id.innerText = `id: ${this.toDo.id}`;
		this.button.id = 'show-comment';
		this.button.classList.remove('hide-comment');
		this.button.classList.add('show-comment');
		this.button.innerText = 'Show comment';
		this.div.classList.add('toDo');
		this.div.append(this.title, this.id, this.button);
		this.main.prepend(this.div);
	}
	hideComment() {
		this.comment.remove();
		this.isCompleted.remove();
		this.userId.remove();
		this.button.classList.remove('hide-comment');
		this.button.classList.add('show-comment');
		this.button.innerText = 'Show comment';
	}
	showComment() {
		this.comment = document.createElement('p');
		this.isCompleted = document.createElement('p');
		this.userId = document.createElement('p');
		this.comment.innerText = 'what comments on the post?... There are no comments... I can pull up all the other information';
		this.isCompleted.innerText = `completed: ${this.toDo.completed}`;
		this.userId.innerText = `userId: ${this.toDo.userId}`;
		this.button.classList.remove('show-comment');
		this.button.classList.add('hide-comment');
		this.button.innerText = 'Hide comment';
		this.div.append(this.comment, this.isCompleted, this.userId);
	}
}

new PostsFinder();