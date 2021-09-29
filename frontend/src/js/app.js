/* eslint-disable linebreak-style */
/* eslint-disable operator-linebreak */
/* eslint-disable eol-last */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable linebreak-style */
// TODO: write code here

class TicketsContainer {
  constructor(container) {
    if (typeof container === 'string') {
      container = document.querySelector(container);
    }
    this.container = container;
    this.allTickets();

    this.addNewForm = document.querySelector('.add-new-form');
    this.addNewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.createTicket();
      this.addNewForm.reset();
      this.container.querySelector('.add-new-form').classList.add('hidden');
    });

    this.editForm = document.querySelector('.edit-form');
    this.editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.editTicket(this.taskID);
      this.editForm.reset();
      this.container.querySelector('.edit-form').classList.add('hidden');
    });

    document.querySelector('.confirm-delete').addEventListener('click', (e) => {
      if (e.target.classList.container('ok-button')) {
        this.deleteTicket(this.taskID);
        this.closeAllForms();
      }
      if (e.target.classList.contains('.cancel-button')) {
        this.closeAllForms();
      }
    });

    this.taskID = null;

    this.container.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-circle')) {
        this.closeAllForms();
        this.taskID = e.target.closest('.ticket-container');
        this.container.querySelector('.confirm-delete').classList.remove('hidden');
      }
      if (e.target.classList.contains('add-new-task')) {
        this.closeAllForms();
        this.container.querySelector('.add-new-form').classList.remove('hidden');
      }
      if (e.target.classList.contains('ticket-name') || e.target.classList.contains('ticket-description') ||
        e.target.classList.contains('.ticket-container')) {
        if (e.target.closest('.ticket-container')) {
          e.target.closest('.ticket-container').querySelector('.ticket-description').classList.toggle('hidden');
        }
      }
      if (e.target.classList.contains('done-circle')) {
        this.changeStatus(e.target.closest('.ticket-container').dataset.id);
      }
      if (e.target.classList.contains('edit-circle')) {
        this.closeAllForms();
        this.taskID = e.target.closest('.ticket-container').dataset.id;
        this.container.querySelector('.edit-form').classList.remove('hidden');
      }
      if (e.target.classList.contains('cancel-button')) {
        e.preventDefault();
        this.closeAllForms();
      }

    });
  }

  allTickets() {
    const xhr = new XMLHttpRequest();
    const url = '';

    xhr.open('GET', url, true);
    xhr.send();

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          this.renderTickets(data);
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  ticketById(id) {
    const xhr = new XMLHttpRequest();
    const url = '';

    xhr.open('GET', url, true);
    xhr.send();

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  createTicket() {
    const form = document.querySelector('.add-new-form');
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    const url = '';

    xhr.open('POST', url, true);
    xhr.send(data);

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          this.renderTickets(data);
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  deleteTicket(id) {
    const xhr = new XMLHttpRequest();
    const url = '';

    xhr.open('DELETE', url, true);
    xhr.send(null);

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          this.renderTickets(data);
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  renderTickets(data) {
    document.querySelector('.task-container').innerHTML = '';
    data.forEach((e) => {
      const ticket = `<div class='ticket-container' data-status=${e.status} data-id='${e.id}'>
      <div class='done-circle circle'></div>
      <div class='ticket-content'>
      <div class='ticket-name'>${e.name}</div>
      <div class='ticket-description hidden'>${e.description}</div>
      </div>
      <div class='ticket-time'>${e.time}</div>
      <div class='edit-delete'>
      <div class='edit-circle circle'></div><div class='delete-circle circle'></div>
      </div>`;
      document.querySelector('.task-container').insertAdjacentHTML('beforeend', ticket);
    });
  }

  changeStatus(id) {
    const xhr = new XMLHttpRequest();
    const url = '';

    xhr.open('GET', url, true);
    xhr.send();

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          this.renderTickets(data);
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  editTicket() {
    const form = document.querySelector('.edit-form');
    const data = new FormData(form);
    data.append('id', this.taskID);
    const xhr = new XMLHttpRequest();
    const url = '';

    xhr.open('POST', url, true);
    xhr.send(data);

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          this.renderTickets(data);
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  closeAllForms() {
    Array.from(document.querySelectorAll('form')).forEach((e) => {
      e.classList.add('hidden');
    });
    document.querySelector('.confirm-delete').classList.add('hidden');
  }

}
const container = new TicketsContainer('.container');