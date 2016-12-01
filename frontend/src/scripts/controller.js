/**
 * Hello Sift. Frontend controller entry point.
 */
import { SiftController, registerSiftController } from '@redsift/sift-sdk-web';

export default class MyController extends SiftController {
  constructor() {
    // You have to call the super() method to initialize the base class.
    super();
    this._suHandler = this.onStorageUpdate.bind(this);
  }

  // for more info: http://docs.redsift.com/docs/client-code-siftcontroller
  loadView(state) {
    console.log('hello: loadView', state);
    // Register for storage update events on the "x" bucket so we can update the UI
    this.storage.subscribe(['who'], this._suHandler);
    switch (state.type) {
      case 'email-thread':
        return {
          html: 'email-thread.html',
          data: {}
        };
      case 'summary':
        return {
          html: 'summary.html',
          data: this.getWebhook().then(x => ({name: 'no-one', hook_uri: x})) //this.getX()
        };
      default:
        console.error('hello: unknown Sift type: ', state.type);
    }
  }

  // Event: storage update
  onStorageUpdate(value) {
    console.log('hello: onStorageUpdate: ', value);
    return this.getWho().then(xe => {
      this.publish('name', xe);
    });
  }

  getWebhook() {
    return this.storage.get({
      bucket: '_redsift',
      keys: ['webhooks/curl_input']
    }).then(d => d[0].value);
  }

   getWho() {
    return this.storage.getAll({
      bucket: 'who'
    }).then((data) => {
      console.log('hello: getWho returned:', data);
      return {name: data[0].value};
    });
  }

}

// Do not remove. The Sift is responsible for registering its views and controllers
registerSiftController(new MyController());
