import Mongoose from 'mongoose';

Mongoose.Promise = global.Promise;

const mongo = Mongoose.connect('mongodb://teachest-db-admin:TCdbAdmin123123!@ds133918-a0.mlab.com:33918,ds133918-a1.mlab.com:33918/teachest-db?replicaSet=rs-ds133918', (err) => {
  if(err){
    console.error('Could not connect to mLab MongoDB');
  }
  console.log('Connected to mLab MongoDB');
});

const DbUsersSchema = Mongoose.Schema({
  firstName: String,
  lastName: String,
});

const DbUsers = Mongoose.model('users', DbUsersSchema, 'users');

const DbPostsSchema = Mongoose.Schema({
  title: String,
  content: String,
  user: String,
});

const DbPosts = Mongoose.model('posts', DbPostsSchema, 'posts');

export { DbUsers, DbPosts };
