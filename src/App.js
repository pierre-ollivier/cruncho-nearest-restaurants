import './App.css';
import './back/main.js';
import { getAPIResults } from './back/main.js';

function App() {
	console.log("Before function call");
	getAPIResults();
	console.log(getAPIResults());
	console.log("After function call");
	return (
		<div className="App">
			<header className="App-header">
				<p>
					Hello World!
				</p>
			</header>
		</div>
	);
}

export default App;
