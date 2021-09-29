const http = require('http');
const Koa = require('koa');
const cors = require('@koa/cors');
const koaBody = require('koa-body');

const path = require('path');
const fs = require('fs');
const {
  v4: uuidv4
} = require('uuid');
const public = path.join(__dirname, '/public');

const app = new Koa();

app.use(cors());

app.use(koaBody({
  urlencoded: true,
  multipart: true,
}));

const port = process.env.PORT || 7071;

const tickets = [{
    id: 1,
    name: 'Задача 1',
    description: 'Полное описание задачи 1',
    status: false,
    time: '19.09.2021 23:00'
  },
  {
    id: 2,
    name: 'Задача 2',
    description: 'Полное описание задачи 2',
    status: true,
    time: '19.09.2021 23:00'
  },
  {
    id: 3,
    name: 'Задача 3',
    description: 'Полное описание задачи 3',
    status: false,
    time: '19.09.2021 23:00'
  }
];


app.use(async (ctx) => {
  const {
    method
  } = ctx.request.query;

  switch (method) {
    case 'allTickets':
      ctx.response.body = tickets;
      return;

    case 'ticketById':
      let ticket = tickets.find((e) => {
        e.id == ctx.request.query.id
      });
      if (ticket) {
        ctx.response.body = ticket;
        return;
      }
      ctx.response.status = 404;

    case 'changeStatus':
      let ticketOne = tickets.find((e) => {
        e.id == ctx.request.query.id
      });
      if (ticketOne) {
        let idOne = ctx.request.query.id;
        let statusOne = tickets[tickets.findIndex((e) => {
          e.id == idOne
        })].status;
        statusOne == true ? statusOne = false : statusOne = true;
        tickets[tickets.findIndex((e) => {
          e.id == idOne
        })].status = statusOne;
        ctx.response.body = tickets;
        return;
      }
      ctx.response.status = 404;

    case 'createTicket':
      const {
        name, description
      } = ctx.request.body;
      let id = uuidv4();
      let status = false;
      let time = getCurrentTime();
      tickets.push({
        id,
        name,
        description,
        status,
        time
      });
      ctx.response.body = tickets;
      return;

    case 'deleteTicket':
      if (tickets.some((e) => {
          e.id == ctx.request.query.id
        })) {
        tickets.splice((tickets.findIndex((e) => {
          e.id == ctx.request.query.id
        })), 1);
        ctx.response.body = tickets;
      } else {
        ctx.response.status = 404;
      }
      return;

    case 'editTicket':
      const {
        id: idNew, name: nameNew, description: descriptionNew
      } = ctx.request.body;
      tickets[tickets.findIndex((e) => {
        e.id == idNew
      })].name = nameNew;
      tickets[tickets.findIndex((e) => {
        e.id == idNew
      })].description = descriptionNew;
      ctx.response.body = tickets;
      return;

    default:
      ctx.response.status = 404;

  }
});

function getCurrentTime() {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  if (month < 10) {
    month = 0 + '' + month;
  }
  let day = now.getDate();
  let hour = now.getHours();
  if (hour < 10) {
    hour = 0 + '' + hour;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = 0 + '' + minutes;
  }

  return day + '.' + month + '.' + year + '' + hour + ':' + minutes;
}

const server = http.createServer(app.callback()).listen(port);