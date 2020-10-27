import { LightningElement, api } from 'lwc';
export default class HelloWorld extends LightningElement {
  greeting = 'World';
  @api auraMessage= 'default';
  changeHandler(event) {
    this.greeting = event.target.value;
    console.log('this.greeting-->>'+this.greeting);
    console.log('auraMessage-->>'+auraMessage);
  }
}