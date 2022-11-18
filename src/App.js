import './App.css';
import { getPosition, getPositionError, getPositionSuccess, options } from './back/main.ts';
import './back/main.ts';
import { getAPIResults } from './back/main.ts';

function App() {
	getAPIResults();
	console.log(getAPIResults());
	getPosition(getPositionSuccess, getPositionError, options)
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
