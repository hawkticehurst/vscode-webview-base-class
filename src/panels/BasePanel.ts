import { Disposable, Uri, ViewColumn, Webview, WebviewPanel, window } from 'vscode';

export class BasePanel {
	public static currentPanel: any | undefined;
	protected readonly _panel: WebviewPanel;
	protected readonly _extensionUri: Uri;
	protected readonly _webview: Webview;
	protected readonly _disposables: Disposable[] = [];

	protected constructor(panel: WebviewPanel, extensionUri: Uri) {
		this._panel = panel;
		this._panel.onDidDispose(this.dispose, null, this._disposables);
		this._webview = this._panel.webview;
		this._extensionUri = extensionUri;
    this._webview.html = this.render();
    this._setMessageListeners();
	}

	/**
	 * Renders the current webview panel if it exists otherwise a new webview panel
	 * will be created and displayed.
	 *
	 * @param extensionUri The URI of the directory containing the extension.
	 */
	public static renderPanel(extensionUri: Uri, panelClass: any) {
		if (BasePanel.currentPanel) {
			// If the webview panel already exists reveal it
			BasePanel.currentPanel._panel.reveal(ViewColumn.One);
		} else {
			// If a webview panel does not already exist create and show a new one
			const panel = window.createWebviewPanel(
				// Panel view type
				'showHelloWorld',
				// Panel title
				'Hello World',
				// The editor column the panel should be displayed in
				ViewColumn.One,
				// Extra panel configurations
				{
					// Enable JavaScript in the webview
					enableScripts: true,
				}
			);

			BasePanel.currentPanel = new panelClass(panel, extensionUri);
		}
	}

  public render() {
    // Do nothing, let child class implement this method
    return '';
  }

  private _setMessageListeners() {
    this._webview.onDidReceiveMessage(
			(message: any) => {
				this.setMessageListeners(message);
			},
			undefined,
			this._disposables
		);
  }

  public setMessageListeners(message: any) {
    // Do nothing, let child class implement this method
  }

	/**
	 * Cleans up and disposes of webview resources when the webview panel is closed.
	 */
	public dispose() {
		BasePanel.currentPanel = undefined;

		// Dispose of the current webview panel
		this._panel.dispose();

		// Dispose of all disposables (i.e. commands) for the current webview panel
		while (this._disposables.length) {
			const disposable = this._disposables.pop();
			if (disposable) {
				disposable.dispose();
			}
		}
	}
}
