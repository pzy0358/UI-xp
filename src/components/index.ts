import chooseArea from "./chooseArea";
import chooseIcon from "./chooseIcon";
import menu from "./menu";
// import Menu from './menu'
import { App } from "vue";
import form from "./form"
import table from "./table"

const components = [chooseArea, chooseIcon, menu, form,table];

export default {
  install(app: App) {
    components.forEach((item) => {
      app.use(item);
    });
  },
};
