import chooseArea from "./chooseArea";
import chooseIcon from "./chooseIcon";
import menu from "./menu";
// import Menu from './menu'
import { App } from "vue";
import form from "./form"

const components = [chooseArea, chooseIcon, menu, form];

export default {
  install(app: App) {
    components.forEach((item) => {
      app.use(item);
    });
  },
};
