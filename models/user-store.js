'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';
import { v2 as cloudinary } from "cloudinary";   

cloudinary.config({
  cloud_name: 'dczfqzcff',
  api_key: '816526861485823',
  api_secret: '2D7tT0KjM1jminX6Szzr2UIxfs'
});

const userStore = {

  store: new JsonStore('./models/user-store.json', { users: [] }),
  collection: 'users',

  getAllUsers() {
    return this.store.findAll(this.collection);
  },

  getUserById(id) {
    return this.store.findOneBy(this.collection, (user => user.id === id));
  },

  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, (user => user.email === email));
  },

  async addUser(user, picture, callback) {
    if (picture) {
      try {
        const result = await cloudinary.uploader.upload(picture.tempFilePath);

        user.picture = result.url;
        user.picture_id = result.public_id;

        await this.store.addCollection(this.collection, user); 
        callback(user);

      } catch (error) {
        logger.error("Cloudinary upload failed:", error);
        await this.store.addCollection(this.collection, user);
        callback(user);
      }

    } else {
      user.picture = "/images/default-user.png";
      await this.store.addCollection(this.collection, user);    
      callback(user);
    }
  }

};

export default userStore;
