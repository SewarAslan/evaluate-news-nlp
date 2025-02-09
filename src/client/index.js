import { handleSubmit } from './js/formHandler';

// Attach handleSubmit to global window.Client so the form in HTML can access it
window.Client = { handleSubmit };

// Import styles
import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/form.scss";
import "./styles/header.scss";

// Testing if Webpack is working
alert("I EXIST");
console.log("CHANGE!!");
