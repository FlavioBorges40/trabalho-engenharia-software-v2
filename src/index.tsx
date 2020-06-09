import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import * as serviceWorker from './serviceWorker';


// var a = document.getElementById('app');

// var div = document.createElement('div');
// div.innerHTML = 'Typescript';
// if(a != null) {
//     a.appendChild(div);
// }

ReactDOM.render(
<div>
    <App></App>
</div>
, document.getElementById('app'));

serviceWorker.unregister();

