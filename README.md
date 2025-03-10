# n8n-nodes-harpa-ai

This is an n8n community node package for integrating with the Harpa AI browser automation API. It provides nodes to interact with Harpa AI's powerful browser automation capabilities directly from n8n workflows.

## Features

This package provides the following n8n nodes:

### Harpa AI Node

A regular node with multiple operations to interact with Harpa AI:

- **Make API Call**: Perform arbitrary authorized API calls to the Harpa AI API
- **Ping Browser Node**: Check if a browser node is online and ready
- **Run AI Command**: Run AI-powered web automation, workflow, or command in your browser
- **Scrape Web Page**: Turn a specified URL into markdown text or extract elements content by CSS/XPath/Text selectors
- **Search the Web**: Search the web for a given query and get up to 8 search results

### Harpa AI Trigger Node

A trigger node that:

- **Watch Action Result**: Triggers when Harpa Chrome Extension node has responded to a run action request

## Installation

Follow these instructions to install this node package in your n8n instance:

### Community Nodes (Recommended)

1. Open your n8n instance
2. Go to Settings > Community Nodes
3. Select Install
4. Enter `n8n-nodes-harpa-ai` in "Enter npm package name"
5. Agree to the risks of using community nodes and click "Install"

### Manual Installation

If you prefer manual installation, follow these steps:

1. Go to your n8n user data directory, typically:
   - Docker: `/home/node/.n8n`
   - npm: `~/.n8n`
2. Create a directory for custom nodes: `mkdir -p custom`
3. Navigate to that directory: `cd custom`
4. Clone the repository: `git clone https://github.com/yourusername/n8n-nodes-harpa-ai.git`
5. Install dependencies: `cd n8n-nodes-harpa-ai && npm install`
6. Build the code: `npm run build`
7. Restart n8n

## Credentials

To use these nodes, you'll need to set up a Harpa AI API credential in n8n:

1. Create a Harpa AI account at [https://harpa.ai](https://harpa.ai)
2. Get your API key from the Harpa AI dashboard
3. In n8n, go to Credentials > New > Harpa AI API
4. Enter your API key and save

## Node Usage

### Harpa AI Node

#### Make API Call

Makes an arbitrary authorized API call to the Harpa AI API.

- **URL**: The endpoint URL to call
- **Method**: HTTP method (GET, POST, PUT, PATCH, DELETE)
- **Headers**: Additional HTTP headers to include
- **Query Parameters**: URL query parameters to include

#### Ping Browser Node

Sends a ping message to your Harpa browser extension to check if it's online and ready to run actions.

- **Node ID**: (Optional) Target Node ID which should be pinged

#### Run AI Command

Runs AI-powered web automation, workflow, or command in your browser.

- **Command Name**: Name of the command to run
- **Command Inputs**: (Optional) Inputs for the command
- **URL**: (Optional) Starting web page URL
- **Result Parameter**: (Optional) Parameter to use as the result

#### Scrape Web Page

Turns a specified URL into markdown text or extracts elements content by CSS/XPath/Text selectors.

- **URL**: Web page URL to scrape for data
- **Grab Selectors**: (Optional) CSS/XPath/Text selectors of elements to grab

#### Search the Web

Searches the web for the given query and returns up to 8 search results.

- **Query**: Search query to perform

### Harpa AI Trigger Node

The trigger node provides a webhook URL that can be used with Harpa AI's result webhook feature. When Harpa AI completes an action, it will send the results to this webhook, triggering your n8n workflow.

## Resources

- [Harpa AI Website](https://harpa.ai)
- [Harpa AI Grid API Reference](https://harpa.ai/grid/grid-rest-api-reference)
- [Harpa AI Web Automation](https://harpa.ai/grid/web-automation)

## License

[MIT](LICENSE.md)
