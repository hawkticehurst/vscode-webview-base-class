import { commands, ExtensionContext } from 'vscode';
import { GreetingPanel } from './panels/GreetingPanel';

export function activate(context: ExtensionContext) {
	let showHelloWorldCommand = commands.registerCommand('webview-base-class.showHelloWorld', () => {
		GreetingPanel.renderPanel(context.extensionUri, GreetingPanel);
	});

	context.subscriptions.push(showHelloWorldCommand);
}
