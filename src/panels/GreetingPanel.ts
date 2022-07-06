import { BasePanel } from './BasePanel';
import { html } from '../utilities/tags';

export class GreetingPanel extends BasePanel {
	public render() {
		return html`
			<!DOCTYPE html>
			<html lang="en">
				<head>
					<title>Hello World</title>
					<meta charset="UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				</head>
				<body>
					<h1>Greetings!</h1>
				</body>
			</html>
		`;
	}
}
