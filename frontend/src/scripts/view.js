/**
 * Hello Sift. Frontend view entry point.
 */
import { SiftView, registerSiftView } from '@redsift/sift-sdk-web';

export default class MyView extends SiftView {
  constructor() {
    // You have to call the super() method to initialize the base class.
    super();
    this.controller.subscribe('name', this.onHello.bind(this));
  }

  // for more info: http://docs.redsift.com/docs/client-code-siftview
  presentView(value) {
    console.log('hello: presentView: ', value);
    // document.getElementById('name').textContent = value.data.name;
    this.onHello(value.data);
  };

  willPresentView(value) {
    console.log('hello: willPresentView: ', value);
  };

  onHello(data) {
    console.log('tutorial-sift: onHello', data);
    Object.keys(data).forEach((k) => {
      console.log("this key: " + k.toString());
      document.getElementById(k).textContent = data[k];
    });

  }
}

registerSiftView(new MyView(window));
