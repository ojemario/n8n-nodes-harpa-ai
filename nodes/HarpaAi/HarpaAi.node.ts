import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class HarpaAi implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Harpa AI',
    name: 'harpaAi',
    icon: 'file:harpa-ai.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: 'Interact with Harpa AI browser automation API',
    defaults: {
      name: 'Harpa AI',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'harpaAiApi',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: 'https://api.harpa.ai/api/v1',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
    properties: [
      // Operations
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Make API Call',
            value: 'apiCall',
            description: 'Perform an arbitrary authorized API call',
          },
          {
            name: 'Ping Browser Node',
            value: 'pingNode',
            description: 'Check if a browser node is online and ready',
          },
          {
            name: 'Run AI Command',
            value: 'runCommand',
            description: 'Run AI powered web automation or command',
          },
          {
            name: 'Scrape Web Page',
            value: 'scrapePage',
            description: 'Extract content from web pages',
          },
          {
            name: 'Search the Web',
            value: 'searchWeb',
            description: 'Search the web for a given query',
          },
        ],
        default: 'scrapePage',
      },
      
      // Make API Call Parameters
      {
        displayName: 'URL',
        name: 'url',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
          show: {
            operation: [
              'apiCall',
            ],
          },
        },
        routing: {
          request: {
            url: '={{$value}}',
          },
        },
      },
      {
        displayName: 'Method',
        name: 'method',
        type: 'options',
        options: [
          {
            name: 'GET',
            value: 'GET',
          },
          {
            name: 'POST',
            value: 'POST',
          },
          {
            name: 'PUT',
            value: 'PUT',
          },
          {
            name: 'PATCH',
            value: 'PATCH',
          },
          {
            name: 'DELETE',
            value: 'DELETE',
          },
        ],
        default: 'POST',
        required: true,
        displayOptions: {
          show: {
            operation: [
              'apiCall',
            ],
          },
        },
        routing: {
          send: {
            preSend: [
              async function(this: any, requestOptions: any) {
                const method = this.getNodeParameter('method', 0) as string;
                requestOptions.method = method;
                
                return requestOptions;
              },
            ],
          }
        },
      },
      {
        displayName: 'Headers',
        name: 'headers',
        placeholder: 'Add Header',
        type: 'fixedCollection',
        typeOptions: {
          multipleValues: true,
        },
        displayOptions: {
          show: {
            operation: [
              'apiCall',
            ],
          },
        },
        default: {},
        options: [
          {
            name: 'parameter',
            displayName: 'Header',
            values: [
              {
                displayName: 'Key',
                name: 'key',
                type: 'string',
                default: '',
              },
              {
                displayName: 'Value',
                name: 'value',
                type: 'string',
                default: '',
              },
            ],
          },
        ],
        routing: {
          request: {
            headers: {
              '={{$value.parameter.reduce((acc, cur) => {acc[cur.key] = cur.value; return acc;}, {})}}': undefined,
            },
          },
        },
      },
      {
        displayName: 'Query Parameters',
        name: 'queryParameters',
        placeholder: 'Add Parameter',
        type: 'fixedCollection',
        typeOptions: {
          multipleValues: true,
        },
        displayOptions: {
          show: {
            operation: [
              'apiCall',
            ],
          },
        },
        default: {},
        options: [
          {
            name: 'parameter',
            displayName: 'Parameter',
            values: [
              {
                displayName: 'Key',
                name: 'key',
                type: 'string',
                default: '',
              },
              {
                displayName: 'Value',
                name: 'value',
                type: 'string',
                default: '',
              },
            ],
          },
        ],
        routing: {
          request: {
            qs: {
              '={{$value.parameter.reduce((acc, cur) => {acc[cur.key] = cur.value; return acc;}, {})}}': undefined,
            },
          },
        },
      },
      
      // Ping Browser Node Parameters
      {
        displayName: 'Node',
        name: 'pingNodeId',
        type: 'string',
        default: 'first',
        displayOptions: {
          show: {
            operation: [
              'pingNode',
            ],
          },
        },
        description: 'Optional, tells which HARPA AI Chrome Extension node should perform the ping action. If no node specified, HARPA will perform action over the first available node. A space separated list of nodes can be specified, for example \'x91k t3od ux5e\'. You can specify \'*\' to run action over every node. You can specify a Number (e.g. 3) to run action over 3 first nodes.',
        routing: {
          request: {
            method: 'POST',
            url: '/grid',
            body: {
              action: 'ping',
              node: '={{$value}}',
            },
          },
        },
      },
      
      // Run AI Command Parameters
      {
        displayName: 'Command Name',
        name: 'commandName',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
          show: {
            operation: [
              'runCommand',
            ],
          },
        },
        description: 'Name of the command to run. Over 100+ AI-powered commands can be seen in the HARPA Chrome Extension upon typing slash /. Custom user-created commands supported.',
        routing: {
          send: {
            type: 'body',
            property: 'name',
          },
        },
      },
      {
        displayName: 'Command Inputs',
        name: 'commandInputs',
        type: 'string',
        typeOptions: {
          multipleValues: true,
        },
        default: [],
        displayOptions: {
          show: {
            operation: [
              'runCommand',
            ],
          },
        },
        description: 'Optional command inputs. Inputs are auto-applied to the ASK steps.',
        routing: {
          send: {
            type: 'body',
            property: 'inputs',
          },
        },
      },
      {
        displayName: 'URL',
        name: 'commandUrl',
        type: 'string',
        default: 'https://harpa.ai/blank',
        displayOptions: {
          show: {
            operation: [
              'runCommand',
            ],
          },
        },
        description: 'Optional, starting web page URL. Set to https://harpa.ai/blank if not specified.',
        routing: {
          send: {
            type: 'body',
            property: 'url',
          },
        },
      },
      {
        displayName: 'Result Parameter',
        name: 'resultParam',
        type: 'string',
        default: 'message',
        displayOptions: {
          show: {
            operation: [
              'runCommand',
            ],
          },
        },
        description: 'Optional, name of a parameter to use as a result. Last AI chat message by default. Supports dot notation, e.g. g.data.email, see https://harpa.ai/chatml/overview for more information.',
        routing: {
          send: {
            type: 'body',
            property: 'resultParam',
          },
        },
      },
      {
        displayName: 'Request Body',
        name: 'commandRequestBody',
        type: 'hidden',
        default: '={"action":"command"}',
        displayOptions: {
          show: {
            operation: [
              'runCommand',
            ],
          },
        },
        routing: {
          request: {
            method: 'POST',
            url: '/grid',
            body: {
              action: 'command',
            },
          },
        },
      },
      
      // Scrape Web Page Parameters
      {
        displayName: 'URL',
        name: 'scrapeUrl',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
          show: {
            operation: [
              'scrapePage',
            ],
          },
        },
        description: 'Web page URL to scrape for data.',
        routing: {
          send: {
            type: 'body',
            property: 'url',
          },
        },
      },
      {
        displayName: 'Grab Selectors',
        name: 'grabSelectors',
        placeholder: 'Add Selector',
        type: 'fixedCollection',
        typeOptions: {
          multipleValues: true,
        },
        default: {},
        displayOptions: {
          show: {
            operation: [
              'scrapePage',
            ],
          },
        },
        description: 'Optional, CSS / XPath / Text selector of the elements to grab. Omit this if you only need a markdown content of the web page.',
        options: [
          {
            name: 'selectorValues',
            displayName: 'Selector',
            values: [
              {
                displayName: 'Selector',
                name: 'selector',
                type: 'string',
                default: '',
                description: 'CSS, XPath, or Text content selector',
              },
              {
                displayName: 'Selector Type',
                name: 'selectorType',
                type: 'options',
                options: [
                  {
                    name: 'Auto',
                    value: 'auto',
                  },
                  {
                    name: 'CSS',
                    value: 'css',
                  },
                  {
                    name: 'XPath',
                    value: 'xpath',
                  },
                  {
                    name: 'Text',
                    value: 'text',
                  },
                ],
                default: 'auto',
              },
              {
                displayName: 'Position',
                name: 'at',
                type: 'options',
                options: [
                  {
                    name: 'All',
                    value: 'all',
                  },
                  {
                    name: 'First',
                    value: 'first',
                  },
                  {
                    name: 'Last',
                    value: 'last',
                  },
                ],
                default: 'first',
              },
              {
                displayName: 'Data to Extract',
                name: 'take',
                type: 'options',
                options: [
                  {
                    name: 'Inner Text',
                    value: 'innerText',
                  },
                  {
                    name: 'Text Content',
                    value: 'textContent',
                  },
                  {
                    name: 'HTML',
                    value: 'innerHTML',
                  },
                  {
                    name: 'Outer HTML',
                    value: 'outerHTML',
                  },
                  {
                    name: 'Href',
                    value: 'href',
                  },
                ],
                default: 'innerText',
              },
              {
                displayName: 'Label',
                name: 'label',
                type: 'string',
                default: 'data',
                description: 'Custom label for the extracted data',
              },
            ],
          },
        ],
        routing: {
          send: {
            preSend: [
              async function (this: any, requestOptions: any) {
                const selectors = this.getNodeParameter('grabSelectors', 0) as { selectorValues: Array<{ selector: string, selectorType: string, at: string, take: string, label: string }> };
                
                if (selectors?.selectorValues) {
                  const grab = selectors.selectorValues.map(s => ({
                    selector: s.selector,
                    selectorType: s.selectorType,
                    at: s.at,
                    take: s.take,
                    label: s.label,
                  }));
                  
                  requestOptions.body.grab = grab;
                }
                
                return requestOptions;
              },
            ],
          },
        },
      },
      {
        displayName: 'Request Body',
        name: 'scrapeRequestBody',
        type: 'hidden',
        default: '={"action":"scrape"}',
        displayOptions: {
          show: {
            operation: [
              'scrapePage',
            ],
          },
        },
        routing: {
          request: {
            method: 'POST',
            url: '/grid',
            body: {
              action: 'scrape',
            },
          },
        },
      },
      
      // Search the Web Parameters
      {
        displayName: 'Query',
        name: 'searchQuery',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
          show: {
            operation: [
              'searchWeb',
            ],
          },
        },
        description: 'Search query to perform.',
        routing: {
          send: {
            type: 'body',
            property: 'query',
          },
        },
      },
      {
        displayName: 'Request Body',
        name: 'searchRequestBody',
        type: 'hidden',
        default: '={"action":"serp"}',
        displayOptions: {
          show: {
            operation: [
              'searchWeb',
            ],
          },
        },
        routing: {
          request: {
            method: 'POST',
            url: '/grid',
            body: {
              action: 'serp',
            },
          },
        },
      },
      
      // Common Additional Fields
      {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
          show: {
            operation: [
              'runCommand',
              'scrapePage',
              'searchWeb',
              'pingNode',
            ],
          },
        },
        options: [
          {
            displayName: 'Node',
            name: 'nodeId',
            type: 'string',
            default: '',
            description: 'Optional, tells which HARPA AI Chrome Extension node should perform the action. If no node specified, HARPA will perform action over the first available node. A space separated list of nodes can be specified, for example \'x91k t3od ux5e\'. You can specify \'*\' to run action over every node. You can specify a Number (e.g. 3) to run action over 3 first nodes.',
            routing: {
              send: {
                type: 'body',
                property: 'node',
              },
            },
          },
          {
            displayName: 'Timeout',
            name: 'timeout',
            type: 'number',
            default: 300000,
            description: 'Optional, synchronous operation timeout in milliseconds. If action does not resolve in the given time, it is aborted. By default 300000, or 5 minutes.',
            routing: {
              send: {
                type: 'body',
                property: 'timeout',
              },
            },
          },
          {
            displayName: 'Results Webhook',
            name: 'resultsWebhook',
            type: 'string',
            default: '',
            description: 'Instruct HARPA to send action results to specified URL. If this field is set, HARPA will try to reach your node (browser) for 30 days until it is online. Results will be sent in a POST request to the URL provided, which can be a webhook, API endpoint, Make.com scenario trigger, etc.',
            routing: {
              send: {
                type: 'body',
                property: 'resultsWebhook',
              },
            },
          },
        ],
      },
    ],
  };

  async execute() {
    // This is a declarative node, so no execute method is needed
    return [];
  }
}