'use strict';

import logger from "../utils/logger.js";
import empStore from "../models/employee.js";

const about = {
  createView(request, response) {
    logger.info("About page loading!");
    const viewData = {
      title: "About the Playlist app!",
      employee: empStore.getEmpInfo()
    }; 

    logger.info(viewData.employee)
    response.render('about', viewData)
  },
};
export default about;
